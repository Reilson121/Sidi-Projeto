# =============================================================
# Stage 1 — Build do Frontend (React + Vite)
# =============================================================
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend

# Copia apenas os arquivos de dependência primeiro (cache eficiente)
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copia o restante do frontend e gera o build de produção
COPY frontend/ ./
RUN npm run build
# O vite.config.js envia o output para ../backend/src/main/resources/static
# Mas dentro do Docker o path é relativo ao WORKDIR, então copiamos manualmente:
RUN mkdir -p /app/backend/src/main/resources/static && \
    cp -r dist/* /app/backend/src/main/resources/static/

# =============================================================
# Stage 2 — Build do Backend (Spring Boot + Maven)
# =============================================================
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copia o pom.xml e baixa dependências primeiro (cache eficiente)
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

# Copia o código-fonte do backend
COPY backend/src ./src

# Copia os estáticos do React gerados no stage anterior
COPY --from=frontend-build /app/backend/src/main/resources/static ./src/main/resources/static

# Compila o JAR
RUN mvn package -DskipTests -B

# =============================================================
# Stage 3 — Imagem final (apenas o JRE, leve)
# =============================================================
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=backend-build /app/target/projeto-sidi-api-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]