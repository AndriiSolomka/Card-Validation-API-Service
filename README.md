# 💳 Payment Card Validation API Service

A robust, production-ready RESTful API for validating payment card data.  
**Validate card numbers, check expiration dates, and determine card types**

---

## ✨ Features

- **REST API** for payment card validation
- **Card number & expiration date validation** (Luhn algorithm, date checks)
- **Wide card type support** — see [Supported Card Types](#supported-card-types)
- **Detailed error messages** for invalid input
- **Comprehensive logging** (Pino, file & pretty console)
- **Caching** of validation results in Redis for performance
- **Graceful shutdown** and robust error handling
- **Swagger/OpenAPI** documentation ([`/api/docs`](http://localhost:3000/api/docs))
- **Dockerized** for easy deployment
- **CI/CD ready** with GitHub Actions
- **Unit & E2E tests** (Jest, Supertest, Docker Compose)

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/AndriiSolomka/Card-Validation-API-Service.git
cd Card-Validation-API-Service
```

---

### 2. Environment Variables

Copy `.env.example.dev` to `.env.dev` and `.env.example.test` to `.env.test`:

```bash
cp .env.example.dev .env.dev
cp .env.example.test .env.test
```

---

### 3. 🐳 Local Development (with Docker)

**Build and start all services:**

```bash
docker compose -f docker-compose.dev.yml up --build
```

- API: [http://localhost:3000/api](http://localhost:3000/api)
- Swagger: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

**Stop and remove containers:**

```bash
docker compose -f docker-compose.dev.yml down -v
```

---

### 4. Running Tests

All tests run in isolation via Docker Compose.

#### Unit tests

```bash
docker compose -f docker-compose.test.yml up --build test-unit
```

#### E2E tests

```bash
docker compose -f docker-compose.test.yml up --build test-e2e
```

#### Clean up after tests

```bash
docker compose -f docker-compose.test.yml down -v
```

---

### 5. Manual Local Run (without Docker)

#### Install dependencies

```bash
npm install
```

#### Start Redis (locally or via Docker)

#### Start the app

```bash
npm run dev
```

---

## 📚 API Documentation

- **Swagger UI:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### Main Endpoint

| Method | Endpoint                | Description                                 |
|--------|-------------------------|---------------------------------------------|
| POST   | `/api/card/validate`    | Validate card number and expiration date    |

#### Example Request

```json
{
  "card_number": "4111111111111111",
  "expiration_month": "12",
  "expiration_year": "2028"
}
```

#### Example Success Response

```json
{
  "is_valid": true,
  "card_type": "Visa"
}
```

#### Example Error Response

```json
{
  "is_valid": false,
  "errors": [
    { "field": "card_number", "message": "Invalid card number" }
  ]
}
```

---

## 🛠️ Notable Features

- **No external card validation libs:** All logic is custom, including Luhn algorithm.
- **SOLID, Clean Code:** Modular, maintainable, and well-tested.
- **Comprehensive logging:** File and pretty console logs.
- **Caching:** Redis-backed, hashed keys for privacy.
- **Security:** Input validation, error sanitization, no sensitive data leaks.
- **CI/CD:** Linting and tests automated via GitHub Actions.

---

## 🤖 CI/CD

- **Workflow:** `.github/workflows/ci.yml`
- **Stages:** Lint, unit, e2e tests (all in Docker)
- **Secrets:** Test envs via GitHub Secrets

---
## Supported Card Types

This service supports detection of a wide range of payment card brands:

| Card Type                        | Example Value                |
|-----------------------------------|-----------------------------|
| Visa                             | `Visa`                      |
| Visa Electron                    | `Visa Electron`             |
| MasterCard                       | `MasterCard`                |
| American Express                 | `American Express`          |
| Discover                         | `Discover`                  |
| Diners Club                      | `Diners Club`               |
| Diners Club United States & Canada| `Diners Club United States & Canada` |
| JCB                              | `JCB`                       |
| China UnionPay                   | `China UnionPay`            |
| China T-Union                    | `China T-Union`             |
| InterPayment                     | `InterPayment`              |
| InstaPayment                     | `InstaPayment`              |
| Maestro                          | `Maestro`                   |
| Maestro UK                       | `Maestro UK`                |
| Dankort                          | `Dankort`                   |
| BORICA                           | `BORICA`                    |
| Troy                             | `Troy`                      |
| UATP                             | `UATP`                      |
| Verve                            | `Verve`                     |
| LankaPay                         | `LankaPay`                  |
| Uzcard                           | `Uzcard`                    |
| HUMO                             | `HUMO`                      |
| GPN                              | `GPN`                       |
| UkrCart                          | `UkrCart`                   |

---



## 👤 Author

[`Andrii Solomka`](https://github.com/AndriiSolomka)

---

> Built with ❤️ using Node.js, Express, TypeScript, Redis, Docker, and Pino.