# Projeto SIDI

Sistema Integrado de Dados e Informações (SIDI) — aplicação full-stack para gerenciamento de visitantes, com fluxo de pré-cadastro, aprovação por colaboradores, check-in/check-out pela recepção e assistente virtual baseado em IA (Google Gemini).

---

## Visão Geral

O projeto é dividido em dois módulos principais, orquestrados por um `docker-compose.yml` na raiz:

| Módulo | Tecnologia | Porta |
|--------|------------|-------|
| `backend` | Java 17 + Spring Boot 4.0.5 (API REST) | `8080` |
| `frontend` | React 19 + Vite, servido via Nginx | `5173` |
| `db` | MySQL 8.0 | (interna) |

Perfis de usuário suportados: **Visitante**, **Colaborador**, **Recepcionista** e **Administrador**.

---

## Estrutura do Repositório

```
SiDiProjeto/
├── backend/            # API Spring Boot (módulo de visitantes + IA)
├── frontend/           # Aplicação React (Vite + Nginx)
├── Docs/               # Documentação adicional
├── docker-compose.yml  # Orquestração dos serviços
└── README.md
```

---

## Pré-requisitos

Para executar via Docker, basta ter instalado:

- [Docker](https://docs.docker.com/get-docker/) (versão 20.10 ou superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (já incluso no Docker Desktop)

Não é necessário ter Java, Maven, Node.js ou MySQL instalados localmente — tudo roda nos contêineres.

---

## Como Executar com Docker

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd SiDiProjeto
```

### 2. Configurar a chave da API Gemini (obrigatório)

Copie o template `.env.example` para `.env` na raiz do projeto e preencha com a sua chave:

```bash
cp .env.example .env
```

```env
GEMINI_API_KEY=SUA_CHAVE_AQUI
```

> ⚠️ O arquivo `.env` está no `.gitignore` — **nunca** o commite. Use apenas o `.env.example` (sem valores) como referência.

Para obter uma chave gratuita:

1. Acesse [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Faça login com sua conta Google
3. Clique em **Create API Key**
4. Copie a chave gerada (inicia com `AIzaSy`)

> Sem a variável `GEMINI_API_KEY` definida, o `docker compose up` falhará com uma mensagem clara. Para rodar o sistema sem a IA, exporte `GEMINI_API_KEY=` (vazio) — o restante da aplicação continua funcionando, apenas o assistente virtual ficará indisponível.

### 3. Subir os contêineres

Na raiz do projeto, execute:

```bash
docker compose up --build
```

O comando irá:

1. Baixar a imagem do MySQL 8.0 e inicializar o banco `projeto_sidi_db`
2. Compilar a API Spring Boot (multi-stage build com Maven + JRE 17)
3. Compilar o frontend React (Vite) e empacotá-lo em uma imagem Nginx
4. Iniciar os três serviços na ordem correta, aguardando o banco ficar saudável antes de subir a API

Para executar em segundo plano, adicione a flag `-d`:

```bash
docker compose up --build -d
```

### 4. Acessar a aplicação

| Serviço | URL |
|---------|-----|
| Frontend (interface web) | [http://localhost:5173](http://localhost:5173) |
| API Backend | [http://localhost:8080](http://localhost:8080) |

### 5. Parar os contêineres

```bash
docker compose down
```

Para remover também o volume do MySQL (apaga todos os dados persistidos):

```bash
docker compose down -v
```

---

## Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `docker compose ps` | Lista os contêineres em execução |
| `docker compose logs -f api` | Acompanha os logs da API em tempo real |
| `docker compose logs -f front` | Acompanha os logs do frontend |
| `docker compose logs -f db` | Acompanha os logs do MySQL |
| `docker compose restart api` | Reinicia apenas a API |
| `docker compose build --no-cache` | Reconstrói as imagens do zero |
| `docker compose exec db mysql -uroot -proot projeto_sidi_db` | Acessa o MySQL via terminal |

---

## Variáveis de Ambiente

Configuradas no `docker-compose.yml`. Podem ser sobrescritas por um arquivo `.env` na raiz.

### Serviço `db`

| Variável | Valor padrão | Descrição |
|----------|--------------|-----------|
| `MYSQL_ROOT_PASSWORD` | `root` | Senha do usuário root |
| `MYSQL_DATABASE` | `projeto_sidi_db` | Banco criado na inicialização |

### Serviço `api`

| Variável | Valor padrão | Descrição |
|----------|--------------|-----------|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://db:3306/projeto_sidi_db` | URL de conexão com o banco |
| `SPRING_DATASOURCE_USERNAME` | `root` | Usuário do banco |
| `SPRING_DATASOURCE_PASSWORD` | `root` | Senha do banco |
| `GEMINI_API_KEY` | *(obrigatória, via `.env`)* | Chave da API Gemini para o assistente virtual |

---

## Solução de Problemas

**A porta 8080 ou 5173 já está em uso**
Pare o processo que está usando a porta ou altere o mapeamento em `docker-compose.yml` (ex.: `"8081:8080"`).

**O backend não conecta no banco**
O `docker-compose.yml` já aguarda o healthcheck do MySQL. Se ainda assim falhar, verifique os logs com `docker compose logs db` e confirme que o serviço subiu por completo.

**Alterações no código não aparecem**
As imagens são construídas uma única vez. Após modificar o código, rode:

```bash
docker compose up --build
```

**`GEMINI_API_KEY is required` ao subir os contêineres**
Crie o arquivo `.env` na raiz com `GEMINI_API_KEY=sua_chave` (ver passo 2). Para rodar sem IA, basta exportar `GEMINI_API_KEY=` (vazio).

**Erro de chave Gemini inválida em tempo de execução**
A chave foi aceita pelo Compose mas é rejeitada pela API do Google. Gere uma nova em [aistudio.google.com/apikey](https://aistudio.google.com/apikey) e atualize o `.env`.

---

## Documentação Complementar

- [`backend/README.md`](./backend/README.md) — detalhes da API, endpoints, enums e fluxo de status
- [`frontend/README.md`](./frontend/README.md) — informações sobre o setup do React + Vite
- [`Docs/`](./Docs) — documentação adicional do projeto
