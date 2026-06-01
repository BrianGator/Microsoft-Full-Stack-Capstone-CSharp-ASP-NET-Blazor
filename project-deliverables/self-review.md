# SkillSnap Project Self-Review
> Written by Brian McCarthy

## Project Title
SkillSnap: Full-Stack Portfolio & Project Tracker

## Describe your app and key features.
SkillSnap is a comprehensive, full-stack portfolio and project tracking application that allows me to showcase my professional skills, past projects, and biography in an interactive web interface. The application serves a dual purpose: acting as a public-facing resume for visitors and a private content management system (CMS) for myself. 

Three key features of the application include:
1. **Interactive Kanban & Role-Based CMS Dashboard**: Real-time project tracking with drag-and-drop Kanban workflow (Backlog, To Do, In Progress, Review/QA, Done), mock users management, and dynamic skill adjustments handled efficiently via React/Vite.
2. **Interactive UI Component Management**: SPA navigation with tailored skill categories spanning Quality Assurance (QA), Business Analysis (BA), Product Management (ProdM), and Development, all rendering dynamically without hard refreshes.
3. **Admin and Asset Library Visualization**: Full suite of CMS tools showcasing how a backend logic system manages assets, data tables, and access control.

## Discuss development challenges.
One of the primary challenges I faced was managing asynchronous state across multiple Blazor components, particularly when users log in and their authentication token needs to be immediately recognized by all restricted views. Initially, components would fail to reflect the user's logged-in status until a hard refresh occurred. I solved this by implementing an `AuthService` state container that broadcasts `.NET` event actions whenever a token is acquired or destroyed. Subscribed Blazor components (like the navigation menu) automatically trigger `StateHasChanged()` upon receiving this event. Another challenge was combatting circular references in Entity Framework Core when sending nested JSON (User -> Projects -> User) to the client; I resolved this by utilizing DTOs (Data Transfer Objects) and selectively returning flattened payloads from the API.

## How did you structure business logic, data persistence, and state management?
The project follows a decoupled, service-oriented architecture. Business logic is predominantly encapsulated within the ASP.NET Core API controllers and dedicated Service classes, ensuring that the Blazor client remains purely responsible for presentation. Data persistence is handled by Entity Framework Core acting as an ORM against a lightweight SQLite database, modeled via code-first migrations. State management on the client relies on Scoped Blazor Services (e.g., `UserSessionService`), treating them as isolated, persistent state containers that maintain user credentials, fetched project lists, and UI preferences across component lifecycles without redundant API calls.

## How did you implement security?
Security is implemented using a multi-layered ASP.NET Identity approach. At the database level, user records and password hashes are safely managed by Identity schema tables. At the API level, authentication endpoints generate short-lived standard JWTs (JSON Web Tokens). Endpoints interacting with sensitive CRUD operations are locked down using the `[Authorize(Roles = "Admin")]` attribute. At the UI level, the Blazor client stores the JWT safely and attaches it as a Bearer token in the `HttpClient` headers via a delegating handler for all outbound requests. This guarantees that unauthorized requests are completely blocked at the server, throwing a 401 Unauthorized status, regardless of UI manipulation.

## What performance improvements did you apply?
I applied performance improvements on both the backend and frontend. In the ASP.NET Core API, I integrated `IMemoryCache` to temporarily cache the results of the frequently accessed `GET /api/projects` and `GET /api/skills` endpoints, preventing repetitive SQLite reads for 5-minute intervals. Furthermore, I optimized the EF Core LINQ queries by appending `.AsNoTracking()` to all read-only calls, reducing memory overhead since the tracker doesn't need to monitor those entities. On the Blazor side, I minimized payload sizes by using simple DTOs and eagerly managing UI state through injected services, making transitions between the Portfolio and Management views nearly instantaneous.
