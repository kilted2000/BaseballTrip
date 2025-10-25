# AGENTS.md

## Build/Test Commands
- **Backend (Spring Boot/Java)**: `./mvnw clean install` (build), `./mvnw test` (all tests), `./mvnw test -Dtest=ClassName#methodName` (single test), `./mvnw spring-boot:run` (run)
- **Frontend (React/Vite)**: `npm run dev` (dev server), `npm run build` (build), `npm run lint` (lint), `npm run preview` (preview build)

## Architecture
- **Monorepo structure** with separate `backend/` (Spring Boot REST API) and `RoadtripHelper/` (React frontend) projects
- **Backend**: Java 17, Spring Boot 3.3.3, PostgreSQL database, Spring Security, WebFlux for OpenAI integration
  - Package structure: `controller/`, `service/`, `repository/`, `model/`, `games/`, `config/`, `security/`
  - Database: PostgreSQL on port 5433, JPA with Hibernate (auto-update DDL)
  - External API: OpenAI GPT-4o-mini for baseball trip planning assistant
- **Frontend**: React 18, Vite, TailwindCSS, DaisyUI, Material-UI, Clerk authentication
  - Structure: `components/`, `api/`, `assets/`
  - Components: GameFinder, Results, LandingPage, Spinner

## Code Style
- **Java**: Standard Spring Boot conventions, package-based organization, RestController with @CrossOrigin, @Value for config
- **React**: Functional components with hooks, named exports for components, JSX with double quotes
- **JavaScript**: ES2020+, ESLint configured with React plugin, no target="_blank" warnings, 2-space indentation
- **Imports**: Group by external/internal, React hooks first in components
- **Naming**: camelCase for variables/functions, PascalCase for components/classes
- **Error handling**: Mono reactive patterns in backend, try-catch in frontend services
