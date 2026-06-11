#!/usr/bin/env bash
# =============================================================
# build.sh  —  Script de build full-stack para o Render
# Coloque este arquivo na RAIZ do repositório (SiDiProjeto/)
# =============================================================
set -e  # Aborta imediatamente se qualquer comando falhar

echo "========================================="
echo " [1/3] Instalando dependências do frontend"
echo "========================================="
cd frontend
npm ci                   # Usa o package-lock.json para um build reprodutível

echo "========================================="
echo " [2/3] Gerando build de produção do React"
echo "========================================="
npm run build
# O vite.config.js foi configurado para enviar o output para:
# ../backend/src/main/resources/static

echo "========================================="
echo " [3/3] Compilando o backend Spring Boot"
echo "========================================="
cd ../backend
./mvnw package -DskipTests -B

echo ""
echo "✅ Build concluído!"
echo "   JAR gerado em: backend/target/projeto-sidi-api-0.0.1-SNAPSHOT.jar"