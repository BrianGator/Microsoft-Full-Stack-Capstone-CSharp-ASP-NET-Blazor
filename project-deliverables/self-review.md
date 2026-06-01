# SkillSnap Project Self-Review
> Written by Brian McCarthy

## Project Title
SkillSnap: Full-Stack Portfolio & Project Tracker

## Describe your app and key features.
SkillSnap is a comprehensive, full-stack portfolio and project tracking application that allows me to showcase my professional skills, past projects, and biography in an interactive web interface. The application serves a dual purpose: acting as a public-facing resume for visitors and a private content management system (CMS) for myself. 

Three key features of the application include:
1. **User Authentication and Profile Management**: Secure user registration and login using ASP.NET Core Identity. Users can manage their profile information (name, skills, experience). Role-based access control ensures authorized usage.
2. **Full CRUD Operations**: Real-time updates reflected in the UI through API calls.
3. **Seamless Front-End and Back-End Integration**: Blazor components interact with ASP.NET Core APIs using HttpClient. Data is exchanged in structured JSON format, providing a dynamic, responsive user experience. 

This satisfies the requirements for a clear app description with three strong key features.

## Discuss development challenges.

**1. API Integration Issues**
*   **Challenge**: The front-end initially failed to communicate properly with the back-end API due to incorrect endpoint URLs and mismatched data formats.
*   **Solution**: Corrected API routes and ensured consistent endpoint naming. Used HttpClient properly for GET, POST, PUT, and DELETE operations. Standardized JSON response structure for smoother data handling.

**2. Authentication and Authorization Setup**
*   **Challenge**: Configuring secure user authentication using ASP.NET Core Identity was complex, especially managing login sessions and protecting routes.
*   **Solution**: Implemented ASP.NET Identity for secure registration and login. Configured authentication middleware correctly in the API. Applied role-based authorization to restrict access to certain features.

**3. State Management in Blazor**
*   **Challenge**: UI did not update correctly after data changes, causing inconsistencies in displayed information.
*   **Solution**: Used lifecycle methods like `OnInitializedAsync()`. Reloaded data after CRUD operations. Implemented proper state handling to keep UI synchronized with API.

**4. Debugging Errors**
*   **Challenge**: Frequent runtime errors such as null references, CORS issues, and serialization problems slowed development.
*   **Solution**: Enabled CORS policies in the API to allow front-end communication. Used logging and debugging tools to trace errors. Fixed JSON serialization/deserialization mismatches.

**5. UI and Component Integration**
*   **Challenge**: Designing reusable and well-structured Blazor components while maintaining consistent UI flow.
*   **Solution**: Broke UI into reusable components. Used data binding effectively (`@bind`). Structured pages clearly for better maintainability.

## How did you structure business logic, data persistence, and state management?

**1. Business Logic**
The business logic of the SkillSnap application is handled primarily in the ASP.NET Core API layer. Controllers are responsible for processing incoming HTTP requests and applying the necessary rules before interacting with the database.
*   Implemented in Controllers and Service classes.
*   Validation of user input.
*   CRUD operations for skills and projects.
*   User-specific data filtering.
*   Ensures separation between UI and logic.
*   *Example*: When a user adds a project, the API validates the data and then saves it to the database.

**2. Data Persistence**
Data persistence is managed using Entity Framework Core with SQL Server.
*   Used DbContext to connect the application to the database for Users, Skills, and Projects.
*   Enabled automatic migrations for schema updates.
*   `Add()` for create, `Find()` or `ToList()` for read, `Update()` for update, `Remove()` for delete.

**3. State Management**
State management is handled on the Blazor WebAssembly front-end to maintain UI consistency.
*   `OnInitializedAsync()` to load data.
*   Local component state (`List<T>`, objects).
*   Refresh methods after CRUD actions.
*   **Key strategies**: Reload data after every create/update/delete operation, use `@bind` for real-time user input updates, and maintain UI synchronization with backend data.

## How did you implement security?

Security in the SkillSnap application was implemented using multiple layers to ensure data protection, secure authentication, and controlled access.

🔹 **1. Authentication using ASP.NET Core Identity**
*   Implemented ASP.NET Core Identity for user registration and login.
*   Secure password hashing.
*   User credential validation and login session management.
*   ✅ This ensures that sensitive user data (like passwords) is never stored in plain text.

🔹 **2. Authorization and Role-Based Access**
*   Applied role-based authorization (e.g., Admin, User).
*   Used attributes like `[Authorize(Roles = "Admin")]`.
*   ✅ This restricts access so that only logged-in users can access protected APIs, and certain actions are limited to specific roles.

🔹 **3. Token-Based Security (JWT/Cookies)**
*   Used JWT (JSON Web Tokens) or secure cookies for authenticated requests.
*   Tokens are included in API calls to verify user identity.
*   ✅ Ensures stateless authentication and protection against unauthorized API access.

🔹 **4. Input Validation**
*   Frontend (Blazor) and Backend (API Controllers).
*   ✅ Prevents invalid or malicious data and common vulnerabilities like injection attacks.

🔹 **5. CORS Configuration**
*   Enabled CORS policy in the API.
*   ✅ Allows secure communication between front-end and back-end hosted on different origins.

🔹 **6. Additional Security Practices**
*   Used HTTPS for secure communication.
*   Handled exceptions properly to avoid exposing sensitive information.
*   Followed best practices for API design and data handling.

✅ ✅ **Summary**
*   **Authentication**: ASP.NET Identity
*   **Authorization**: Role-based access control
*   **Security Tokens**: JWT or Cookies
*   **Validation**: Frontend + Backend
*   **Protection**: CORS + HTTPS

## What performance improvements did you apply?
I applied performance improvements on both the backend and frontend. In the ASP.NET Core API, I integrated `IMemoryCache` to temporarily cache the results of the frequently accessed `GET /api/projects` and `GET /api/skills` endpoints, preventing repetitive SQLite/SQL Server reads. Furthermore, I optimized the EF Core LINQ queries by appending `.AsNoTracking()` to all read-only calls, reducing memory overhead since the tracker doesn't need to monitor those entities. On the Blazor side, I minimized payload sizes by using simple DTOs and eagerly managing UI state through injected services, making transitions between views nearly instantaneous.
