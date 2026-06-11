# Sistema de Pré-cadastro de Visitantes – SiDi (Backend)

## Descrição

O backend do Sistema de Pré-cadastro de Visitantes foi desenvolvido utilizando Spring Boot e segue arquitetura REST.

Sua responsabilidade é processar as regras de negócio, persistir informações no banco de dados, controlar o fluxo das visitas e integrar o sistema com a API Gemini.

---

## Tecnologias Utilizadas

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* Lombok
* MySQL
* API REST
* Gemini AI

---

## Estrutura do Projeto

```text
src/main/java/br/com/projeto_sidi/api
├── config/
├── controller/
├── dto/
├── enums/
├── model/
├── repository/
└── service/
```

---

## Fluxo da Visita

### 1. Pré-cadastro

O visitante realiza o cadastro.

Status inicial:

```text
PENDENTE
```

### 2. Aprovação

O colaborador analisa a solicitação.

Status possíveis:

```text
APROVADO
RECUSADO
```

### 3. Check-in

A recepção confirma a chegada do visitante.

Status:

```text
PRESENTE
```

### 4. Check-out

Finalização da visita.

Status:

```text
FINALIZADO
```

---

## API REST

### Base URL

```text
http://localhost:8080/api/visitantes
```

### Criar visitante

```http
POST /api/visitantes
```

### Listar visitantes

```http
GET /api/visitantes
```

### Buscar visitante por ID

```http
GET /api/visitantes/{id}
```

### Listar visitantes pendentes

```http
GET /api/visitantes/pendentes
```

### Buscar visitantes por setor

```http
GET /api/visitantes/setor/{setor}
```

### Atualizar status

```http
PUT /api/visitantes/{id}/status
```

Exemplo:

```json
{
  "status": "APROVADO"
}
```

---

## Configuração do Banco de Dados

Banco utilizado:

```text
MySQL
```

Configuração exemplo:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/projeto_sidi_db
spring.datasource.username=root
spring.datasource.password=root

spring.jpa.hibernate.ddl-auto=update
```

---

## Configuração da IA

O sistema utiliza a API Gemini para auxiliar visitantes durante o preenchimento do formulário.

Adicionar no arquivo de configuração:

```properties
GEMINI_API_KEY=sua_chave_aqui
```

---

## Execução

### Compilar projeto

```bash
mvn clean install
```

### Executar aplicação

```bash
mvn spring-boot:run
```

A API ficará disponível em:

```text
http://localhost:8080
```

---

## Funcionalidades da IA

O assistente virtual auxilia usuários com dúvidas relacionadas a:

* CPF
* Nome completo
* Motivo da visita
* Quantidade de visitantes
* Placa do veículo
* Processo de pré-cadastro

Controller responsável:

```text
IaController
```

---

## Segurança e LGPD

Os dados coletados possuem finalidade exclusiva de:

* Controle de acesso
* Identificação de visitantes
* Registro de visitas

O sistema segue os princípios da Lei Geral de Proteção de Dados (LGPD).

---

## Melhorias Futuras

* Autenticação JWT
* Upload de documentos
* QR Code para visitantes
* Dashboard analítico
* Integração com e-mail
* Notificações em tempo real
* Deploy em nuvem

---

## Equipe

Projeto desenvolvido para o Sistema de Pré-cadastro de Visitantes da SiDi.
