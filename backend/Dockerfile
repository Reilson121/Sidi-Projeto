# =============================================================
# Stage 1 — Build do Frontend (React + Vite)
# =============================================================
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./

# Força o outDir para dist local, ignorando o vite.config.js
RUN npx vite build --outDir dist --emptyOutDir

# =============================================================
# Stage 2 — Build do Backend (Spring Boot + Maven)
# =============================================================
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app

COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

COPY backend/src ./src

# Copia os estáticos do React para dentro do Spring
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static

RUN mvn package -DskipTests -B

# =============================================================
# Stage 3 — Imagem final
# =============================================================
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=backend-build /app/target/projeto-sidi-api-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]