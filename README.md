# SkillSnap Portfolio & Tracker 
Microsoft Full Stack Developer Capstone
> Written by Brian McCarthy

<img width="563" height="177" alt="image" src="https://github.com/user-attachments/assets/90decbc9-f748-4a7a-b36e-f6e5b21ec2aa" />


## Table of Contents
1. [Project Overview](#project-overview)
2. [Languages & Technologies](#languages--technologies)
3. [Methodologies Used](#methodologies-used)
4. [File Structure](#file-structure)
5. [Functions & Requirements](#functions--requirements)
6. [How to Use](#how-to-use)
7. [Summary of Code Methodologies](#summary-of-code-methodologies)
8. [Automation & REST API Guide](#automation--rest-api-guide)
9. [Project Tests & Code Samples](#project-tests--code-samples)

## Project Overview
**Project Name**: SkillSnap
**Website Name**: SkillSnap Portfolio & Tracker Microsoft Ful Stack Capstone
**Description**: A full-stack portfolio management platform featuring Kanban-style project tracking, comprehensive skill domain breakdowns (QA, Development, Business Analysis, Project/Product Management), and an administrative CMS for dynamic mocked-data editing.

*(Written by Brian McCarthy)*

## Languages & Technologies
- **C#**: Primary backend and Blazor logic.
- **HTML/CSS/Tailwind**: Layout and visual presentation.
- **JavaScript**: Auxiliary client-side scripting and API interaction.
- **SQL (SQLite)**: Relational data storage.
- **ASP.NET Core**: Web API framework.
- **Blazor WebAssembly**: Front-end interactive SPA framework.
- **Entity Framework Core (EF Core)**: Database ORM.

## Methodologies Used
- **RESTful API Design**: Clear, resource-based HTTP endpoints (GET, POST, PUT, DELETE).
- **Code-First Database Modeling**: Defining C# class models first and migrating to database schemas.
- **Component-Based UI Architecture**: Reusable Razor structural segments (ProfileCard, ProjectList).
- **JWT Authentication**: Stateless, token-based security for session verification.
- **Dependency Injection**: Injecting core services and configurations.
- **In-Memory Caching**: Server-side response caching to optimize repetitive read times.

## File Structure
```text
SkillSnap/
├── SkillSnap.Api/
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── ProjectsController.cs
│   │   ├── SeedController.cs
│   │   └── SkillsController.cs
│   ├── Models/
│   │   ├── ApplicationUser.cs
│   │   ├── PortfolioUser.cs
│   │   ├── Project.cs
│   │   └── Skill.cs
│   ├── Program.cs
│   └── SkillSnapContext.cs
└── SkillSnap.Client/
    ├── Pages/
    │   ├── Login.razor
    │   ├── ProfileCard.razor
    │   ├── ProjectList.razor
    │   └── SkillTags.razor
    ├── Services/
    │   ├── ProjectService.cs
    │   └── UserSessionService.cs
    └── Program.cs
```

## Functions & Requirements
- **Guest Functions**: View portfolio, interact with Kanban board project stages (Backlog, To Do, In Progress, Review/QA, Done), view detailed skill domains (QA, DA, PM, etc.).
- **Admin Functions**: Login via secured credentials, access CMS dashboards, add/edit/drag-and-drop projects, manage simulated user tables, upload mock assets, and edit skills dynamically without needing a direct DB write.
- **Requirements**: .NET SDK 8.0+, Node.js (for asset compilation), SQLite.

## How to Use
1. Clone the repository and navigate to `SkillSnap`.
2. Navigate to `SkillSnap.Api` and run `dotnet run`.
3. Navigate to `SkillSnap.Client` and run `dotnet run`.
4. Use the `[POST] /api/seed` endpoint to seed initial data.
5. Access the Web UI on `localhost:5001`.

## Summary of Code Methodologies
SkillSnap operates using a separated architecture. The **Blazor Wasm Client** compiles into static files delivering a rich C# UI natively within the browser element natively. The **ASP.NET Core API** monitors specific networking endpoints, validates JWT authentication, and queries the SQLite database via Entity Framework Core LINQ statements. 

## Automation & REST API Guide
Automating tests against the SkillSnap REST API can be done seamlessly using built-in cURL, Postman, or JavaScript's native Fetch API.

**To obtain a JWT Token for automated testing:**
```javascript
// Written by Brian McCarthy
const response = await fetch('https://localhost:5001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: "admin@test.com", password: "Password123!" })
});
const { token } = await response.json();
// Use this token as 'Bearer <token>' in subsequent requests.
```

**Tips for REST Automation:**
1. Always grab a fresh JWT before kicking off a suite of creation tests.
2. Rely on the `/api/seed` endpoint to generate a known data state.
3. Assert standard HTTP response codes (`200 OK`, `401 Unauthorized`, `201 Created`).

## Project Tests & Code Samples

### 1. C# Backend Test Model (ASP.NET Core / Entity Framework Core)
**Explanation**: Standard model defining schema boundaries for EF Core.
```csharp
// Written by Brian McCarthy
public class Project
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    public string Description { get; set; }
    
    [ForeignKey("PortfolioUser")]
    public int PortfolioUserId { get; set; }
    public PortfolioUser PortfolioUser { get; set; }
}
```

### 2. ASP.NET Core Caching Strategy Test
**Explanation**: Testing In-Memory caching by verifying data doesn't hit DB on rapid subsequent requests.
```csharp
// Written by Brian McCarthy
[HttpGet]
public async Task<IActionResult> GetProjects()
{
    if (!_cache.TryGetValue("projects", out List<Project> projects))
    {
        projects = await _context.Projects.AsNoTracking().ToListAsync();
        _cache.Set("projects", projects, TimeSpan.FromMinutes(5));
    }
    return Ok(projects);
}
```

### 3. Blazor UI Service Connectivity Test
**Explanation**: Validating UI safely handles API fetching and DI consumption.
```html
@page "/projects"
@inject ProjectService ProjectService

<h3>My Projects</h3>
@if (projects == null)
{
    <p>Loading projects...</p>
}
else
{
    <div class="grid">
        @foreach (var proj in projects)
        {
            <ProjectCard Title="@proj.Title" Desc="@proj.Description" />
        }
    </div>
}

@code {
    private List<Project> projects;
    protected override async Task OnInitializedAsync()
    {
        projects = await ProjectService.GetProjectsAsync();
    }
}
```

### 4. SQL Data Validation Test
**Explanation**: A direct database test to verify Entity Framework migrated properly and foreign keys align.
```sql
-- Written by Brian McCarthy
SELECT 
    Users.Name, 
    Projects.Title, 
    Skills.Name as Skill 
FROM AspNetUsers Users
LEFT JOIN Projects ON Users.Id = Projects.PortfolioUserId
LEFT JOIN Skills ON Users.Id = Skills.PortfolioUserId;
```

### 5. JavaScript / UI Interaction Edge Case Test
**Explanation**: If opting out of standard Blazor constructs, verifying standard JS interops correctly pass tokens seamlessly.
```javascript
// Written by Brian McCarthy
export function testProjectDataFetch(token) {
    return fetch('https://localhost:5001/api/projects', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json())
      .then(data => console.log('Successfully retrieved ' + data.length + ' test items'));
}
```
