export const MOCK_PROJECTS = [
  {
    id: 1,
    title: "SkillSnap Mobile App",
    description: "A cross-platform mobile tracker built with React Native and ASP.NET Core.",
    tags: ["Mobile", "React Native", "C#"],
    status: "Done",
    date: "Jan 2024 - Present",
    screenshot: "bg-indigo-500"
  },
  {
    id: 2,
    title: "E-Commerce Gateway",
    description: "A scalable web shopping platform with Stripe integration.",
    tags: ["Web", "React", "Node.js"],
    status: "Done",
    date: "Aug 2023 - Dec 2023",
    screenshot: "bg-blue-500"
  },
  {
    id: 3,
    title: "Real-time Chat Portal",
    description: "WebSockets based messaging application with Blazor WebAssembly.",
    tags: ["Web", "Blazor", "SignalR"],
    status: "In Progress",
    date: "Mar 2024 - Present",
    screenshot: "bg-emerald-500"
  },
  {
    id: 4,
    title: "Finance Dashboard",
    description: "Analytics dashboard parsing millions of rows using SQL Server and D3.js.",
    tags: ["Data", "SQL", "D3.js"],
    status: "Review/QA",
    date: "Feb 2023 - Jul 2023",
    screenshot: "bg-purple-500"
  },
  {
    id: 5,
    title: "Automated Testing Suite",
    description: "End-to-end testing suite for an enterprise application using Selenium and Cypress.",
    tags: ["QA", "Selenium", "Cypress"],
    status: "Done",
    date: "Nov 2022 - Jan 2023",
    screenshot: "bg-rose-500"
  },
  {
    id: 6,
    title: "Legacy System Migration",
    description: "Migrated a legacy Python monolith to a modern C# microservices architecture.",
    tags: ["Backend", "C#", "Python", "Microservices"],
    status: "To Do",
    date: "Apr 2024 - Present",
    screenshot: "bg-amber-500"
  }
];

export const MOCK_SKILLS = [
  { name: "C# & .NET Core", level: "Expert", category: "Developer" },
  { name: "Blazor WebAssembly", level: "Advanced", category: "Developer" },
  { name: "React & TypeScript", level: "Advanced", category: "Developer" },
  { name: "Java & Python", level: "Intermediate", category: "Developer" },
  { name: "HTML & CSS", level: "Expert", category: "Developer" },
  { name: "JavaScript", level: "Expert", category: "Developer" },
  { name: "Entity Framework Core", level: "Expert", category: "Database" },
  { name: "SQL Server & SQLite", level: "Advanced", category: "Database" },
  { name: "Azure & Cloud Deployment", level: "Intermediate", category: "DevOps" },
  { name: "Selenium", level: "Advanced", category: "QA" },
  { name: "Playwright", level: "Intermediate", category: "QA" },
  { name: "Appium", level: "Intermediate", category: "QA" },
  { name: "Cypress", level: "Advanced", category: "QA" },
  { name: "Cucumber", level: "Advanced", category: "QA" },
  { name: "Agile & Scrum", level: "Expert", category: "Project Management" },
  { name: "Jira & Confluence", level: "Expert", category: "Project Management" },
  { name: "Requirements Gathering", level: "Advanced", category: "Business Analysis" },
  { name: "Process Modeling", level: "Advanced", category: "Business Analysis" },
  { name: "Product Strategy", level: "Intermediate", category: "Product Management" },
  { name: "User Story Mapping", level: "Advanced", category: "Product Management" },
];

export const MOCK_DB_TABLES = {
  users: [
    { Id: 1, Name: "Brian McCarthy", Bio: "Full Stack Dev", Email: "admin@skillsnap.local" },
    { Id: 2, Name: "Alice Smith", Bio: "QA Engineer", Email: "alice@skillsnap.local" },
    { Id: 3, Name: "Bob Johnson", Bio: "Project Manager", Email: "bob@skillsnap.local" },
    { Id: 4, Name: "Charlie Davis", Bio: "Business Analyst", Email: "charlie@skillsnap.local" }
  ],
  projects: [
    { Id: 1, Title: "SkillSnap API", PortfolioUserId: 1 },
    { Id: 2, Title: "Blazor WASM Frontend", PortfolioUserId: 1 },
    { Id: 3, Title: "QA Automation Framework", PortfolioUserId: 2 },
    { Id: 4, Title: "Agile Transformation", PortfolioUserId: 3 }
  ],
  skills: [
    { Id: 1, Name: "C#", Level: "Expert", PortfolioUserId: 1 },
    { Id: 2, Name: "SQL", Level: "Advanced", PortfolioUserId: 1 },
    { Id: 3, Name: "Selenium", Level: "Expert", PortfolioUserId: 2 },
    { Id: 4, Name: "Scrum", Level: "Expert", PortfolioUserId: 3 }
  ]
};

export const MOCK_ASSETS = [
  { id: 1, name: "profile_photo.jpg", type: "Image", size: "1.2 MB", uploadDate: "2024-01-15" },
  { id: 2, name: "architecture_diagram.pdf", type: "Document", size: "3.4 MB", uploadDate: "2024-02-20" },
  { id: 3, name: "app_icon.png", type: "Icon", size: "450 KB", uploadDate: "2024-03-05" },
  { id: 4, name: "resume_update.docx", type: "Document", size: "2.1 MB", uploadDate: "2024-05-10" },
  { id: 5, name: "hero_banner.jpg", type: "Image", size: "4.5 MB", uploadDate: "2024-05-15" }
];
