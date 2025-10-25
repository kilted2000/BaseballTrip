# Backend (Spring Boot) — BaseballTrip

This document explains how to run the backend locally, configure the OpenAI API key safely, and how tests are structured to avoid hitting the real OpenAI API.

## Prerequisites
- Java 17+ (project is configured for Java 17)
- Maven (the project includes `mvnw` wrapper; using the wrapper is recommended)
- Optional: Docker if you want to run PostgreSQL locally

## Configuration
The application reads configuration from `src/main/resources/application.properties` and environment variables.

Important properties:
- `OPENAI_API_KEY` — Your OpenAI API key. Do not commit this value to source control.
- `OPENAI_API_URL` — Base URL for OpenAI API (defaults to `https://api.openai.com/v1` in `application.properties`).

Set the API key locally in zsh:

```bash
export OPENAI_API_KEY="sk-...your-key-here..."
```

For CI, add `OPENAI_API_KEY` to your pipeline secrets and expose it as an environment variable when running the app.

## Running the application locally
From the `backend/` directory:

```bash
./mvnw spring-boot:run
```

or build and run the jar:

```bash
./mvnw -DskipTests package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

The app listens on port 8080 by default (configurable via `server.port` or `PORT` env var).

## Using the AI endpoint
The backend exposes an endpoint `/api/query` that accepts a POST JSON payload with a `userPrompt` field.

Example request:

```bash
curl -X POST http://localhost:8080/api/query \
  -H "Content-Type: application/json" \
  -d '{"userPrompt":"Plan a 3-day baseball trip to San Francisco"}'
```

The controller uses the `gpt-4o-mini` model by default and calls the Chat Completions endpoint (`/chat/completions`).

## Tests
- Unit/integration tests are run with Maven (`./mvnw test`).
- To avoid making network calls to OpenAI during tests, the test configuration:
  - Disables the OpenAI Spring starter auto-configuration in `src/test/resources/application.properties`.
  - Provides placeholder values for `openai.api.key`, `openai.api.url`, and any other `${...}` placeholders used by the project so the ApplicationContext can start.

If you want to add tests that exercise AI behavior, prefer one of:
- Use `@MockBean` or a `@TestConfiguration` to provide a mocked WebClient or service that returns canned responses.
- Use WireMock to run a local fake OpenAI endpoint and configure `openai.api.url` to point at the WireMock server during the test run.

## Security notes
- Do not store secrets in `application.properties` in source control. Use environment variables, a secrets manager, or encrypted vaults.
- I replaced the literal `openai.api.key` in `application.properties` with an environment-backed placeholder `${OPENAI_API_KEY:}`.

## Next steps / optional improvements
- Add a small `AiService` class to encapsulate OpenAI interactions; makes unit testing the controller easier.
- Add a sample test that uses WireMock to simulate chat responses.
- Add CI workflow examples for running tests with secrets in GitHub Actions or other CI systems.

---
If you want, I can add the `AiService` and a unit test with a mocked WebClient next — tell me which you'd prefer (mock bean, WireMock integration, or real call with env var).
