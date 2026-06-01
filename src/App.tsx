import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import readmeText from '../README.md?raw';
import selfReviewText from '../project-deliverables/self-review.md?raw';
import { Layers, FileText, BookOpen, User, Briefcase, Award, FolderOpen, Database, Shield, Zap, LogIn, LogOut, Code, Menu, X, CheckSquare, Settings, Activity, Image as ImageIcon, Users as UsersGroup, CheckCircle, Smartphone, Server } from 'lucide-react';
import { MOCK_PROJECTS, MOCK_SKILLS, MOCK_DB_TABLES, MOCK_ASSETS } from './data';

type TabId = 'readme' | 'review' | 'portfolio' | 'biography' | 'projects' | 'past-projects' | 'cms' | 'cms-manage-portfolios' | 'cms-user-management' | 'cms-asset-library' | 'skills' | 'skill-qa' | 'skill-ba' | 'skill-dev' | 'skill-pm' | 'skill-prod' | 'business-logic' | 'sql-database' | 'security' | 'performance' | 'api-data' | 'login' | 'register' | 'logout';

interface NavItem {
  id: TabId;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const TOP_NAV_ITEMS: NavItem[] = [
  { id: 'projects', label: 'Project Tracking', icon: CheckSquare },
  { id: 'portfolio', label: 'Portfolio', icon: User },
  { id: 'past-projects', label: 'Past Projects', icon: FolderOpen },
  { id: 'skills', label: 'Skills', icon: Award },
  { id: 'biography', label: 'Biography', icon: FileText },
  { id: 'cms', label: 'CMS', icon: Settings },
  { id: 'business-logic', label: 'Business Logic', icon: Code },
  { id: 'sql-database', label: 'SQL', icon: Database },
  { id: 'api-data', label: 'API Data', icon: Activity },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'performance', label: 'Performance', icon: Zap },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('projects');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // Local state for app data to allow mock editing
  const [localProjects, setLocalProjects] = useState(MOCK_PROJECTS);
  const [localSkills, setLocalSkills] = useState(MOCK_SKILLS);
  const [dbTables, setDbTables] = useState(MOCK_DB_TABLES);
  const [assets, setAssets] = useState(MOCK_ASSETS);

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');

  const navTo = (tab: TabId) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setCurrentUser('admin');
      navTo('portfolio');
    } else if (username && password) {
       setIsLoggedIn(true);
       setCurrentUser(username);
       navTo('portfolio');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'readme':
        return (
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{readmeText}</ReactMarkdown>
          </div>
        );
      case 'review':
        return (
          <div className="markdown-body">
             <ReactMarkdown remarkPlugins={[remarkGfm]}>{selfReviewText}</ReactMarkdown>
          </div>
        );
      case 'portfolio':
        return (
          <div className="flex flex-col gap-8">
            <div className="text-center pb-4 border-b border-slate-100">
               <h2 className="text-2xl font-bold text-slate-800 tracking-tight">SkillSnap Portfolio & Tracker Microsoft Ful Stack Capstone</h2>
               <p className="text-slate-500 mt-2">A full-stack portfolio and project tracking application that allows me to showcase my professional skills, past projects, and biography.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex flex-col items-center text-center p-6 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white text-4xl font-serif italic shadow-md mb-4 border-4 border-white">
                  BM
                </div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Brian McCarthy</h1>
                <p className="text-slate-500 mt-2 font-medium">Full Stack C# Developer</p>
                <div className="mt-4 pt-4 border-t border-slate-200 w-full flex justify-around text-xs uppercase tracking-wider font-bold text-slate-400">
                  <span>{localProjects.length} Projects</span>
                  <span>{localSkills.length} Skills</span>
                </div>
              </div>
              <div className="md:w-2/3 flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">Recent Highlights</h2>
                  {isLoggedIn && <button onClick={() => navTo('cms-manage-portfolios')} className="text-sm bg-blue-500 text-white px-3 py-1 rounded">Edit</button>}
                </div>
                {localProjects.slice(0, 2).map((p, i) => (
                  <div key={i} className="p-4 border border-slate-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-800">{p.title}</h3>
                      <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold uppercase tracking-wider">{p.status}</span>
                    </div>
                    {p.screenshot && (
                      <div className={`w-full h-24 rounded-md mb-3 ${p.screenshot} opacity-80 flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold uppercase tracking-widest mix-blend-overlay">Preview Screenshot</span>
                      </div>
                    )}
                    <p className="text-sm text-slate-600">{p.description}</p>
                    {p.date && <p className="text-xs text-slate-400 mt-2">Date: {p.date}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'biography':
        return (
          <div className="max-w-2xl mx-auto text-slate-700 leading-relaxed space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6 text-center">About Me</h2>
            <p>I am a passionate Full-Stack Developer specializing in Microsoft technologies and high-performance cross-platform applications. My journey with C# and the .NET ecosystem has driven me to build scalable architectures ranging from native mobile apps to rich web dashboards.</p>
            <p>Through the Microsoft Full Stack Track, I developed "SkillSnap" — a comprehensive portfolio and project tracking system. It leverages the latest in ASP.NET Core, Blazor WebAssembly, and Entity Framework Core to deliver a deeply responsive and secure platform.</p>
            <p>I thrive on turning complex business requirements into clean, modular code. Whether it's architecting a SQL database schema, implementing automated testing (Selenium, Playwright), or optimizing In-Memory server caching, I am committed to delivering resilient software solutions.</p>
          </div>
        );
      case 'projects':
        const columns = ['Backlog', 'To Do', 'In Progress', 'Review/QA', 'Done'];
        
        const handleDragStart = (e: React.DragEvent, id: number) => {
          e.dataTransfer.setData('projectId', id.toString());
        };

        const handleDrop = (e: React.DragEvent, status: string) => {
           e.preventDefault();
           const id = parseInt(e.dataTransfer.getData('projectId') || '0', 10);
           if (!id) return;
           const updated = localProjects.map(p => p.id === id ? { ...p, status } : p);
           setLocalProjects(updated);
        };

        return (
          <div className="flex flex-col gap-6">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 border border-slate-200 rounded-xl shadow-sm gap-4">
                <div>
                   <h2 className="text-xl font-bold text-slate-800 tracking-tight">Active Project Tracking (Kanban)</h2>
                   <div className="text-xs text-slate-500 mt-2 flex flex-wrap gap-4">
                     <span className="bg-slate-50 px-2 py-1 rounded border"><strong>Lead Time:</strong> 12 Days</span>
                     <span className="bg-slate-50 px-2 py-1 rounded border"><strong>Cycle Time:</strong> 5 Days</span>
                     <span className="bg-slate-50 px-2 py-1 rounded border"><strong>Throughput:</strong> 14 tasks/mo</span>
                   </div>
                </div>
                {isLoggedIn && <button onClick={() => {
                  const newProj = { id: Date.now(), title: "New Task", description: "Edit me in CMS", tags: [], status: "Backlog", date: "Present", screenshot: "" };
                  setLocalProjects([...localProjects, newProj]);
                }} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-bold shadow-sm hover:bg-blue-700 whitespace-nowrap">+ Track New</button>}
             </div>

             <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
               <h3 className="font-bold text-blue-900 mb-3 text-sm">Core Elements of a Kanban Board</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-blue-800">
                  <div className="bg-white p-3 rounded shadow-sm border border-blue-50 leading-relaxed md:h-20"><strong>Columns:</strong> Represent distinct stages of your project workflow.</div>
                  <div className="bg-white p-3 rounded shadow-sm border border-blue-50 leading-relaxed md:h-20"><strong>Cards:</strong> Represent individual tasks or project deliverables.</div>
                  <div className="bg-white p-3 rounded shadow-sm border border-blue-50 leading-relaxed md:h-20"><strong>WIP Limits:</strong> Strict caps on active tasks to prevent bottlenecks.</div>
                  <div className="bg-white p-3 rounded shadow-sm border border-blue-50 leading-relaxed md:h-20"><strong>Swimlanes:</strong> Horizontal rows used to separate distinct projects or teams.</div>
               </div>
               <h3 className="font-bold text-blue-900 mt-4 mb-3 text-sm">The Standard Project Workflow</h3>
               <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs text-blue-800">
                 <div className="bg-white p-3 rounded shadow-sm border border-blue-50"><strong>Backlog:</strong> A raw list of all incoming project requests.</div>
                 <div className="bg-white p-3 rounded shadow-sm border border-blue-50"><strong>To Do:</strong> Tasks approved and prioritized for upcoming work.</div>
                 <div className="bg-white p-3 rounded shadow-sm border border-blue-50"><strong>In Progress:</strong> Tasks actively being worked on by team members.</div>
                 <div className="bg-white p-3 rounded shadow-sm border border-blue-50"><strong>Review/QA:</strong> Completed work undergoing verification and testing.</div>
                 <div className="bg-white p-3 rounded shadow-sm border border-blue-50"><strong>Done:</strong> Fully completed deliverables ready for production or delivery.</div>
               </div>
             </div>

             <div className="flex gap-4 overflow-x-auto pb-6 snap-x min-h-[600px]">
               {columns.map(col => (
                 <div
                   key={col}
                   className="flex-shrink-0 w-72 bg-slate-100/80 border border-slate-200 rounded-xl p-3 flex flex-col snap-center"
                   onDragOver={(e) => e.preventDefault()}
                   onDrop={(e) => handleDrop(e, col)}
                 >
                   <div className="flex justify-between items-center mb-4 px-1">
                     <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">{col}</h3>
                     <span className="bg-white border border-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">{localProjects.filter(p => p.status === col).length}</span>
                   </div>
                   <div className="flex flex-col gap-3 overflow-y-auto flex-grow pr-1 pb-4">
                     {localProjects.filter(p => p.status === col).map((p, i) => (
                       <div 
                         key={i}
                         draggable={isLoggedIn}
                         onDragStart={(e) => handleDragStart(e, p.id)}
                         className={`bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-blue-300 transition-colors ${isLoggedIn ? 'cursor-grab active:cursor-grabbing' : ''}`}
                       >
                         <div className="flex justify-between items-start mb-1 gap-2">
                           <h4 className="font-bold text-slate-800 text-sm leading-tight">{p.title}</h4>
                           <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded uppercase whitespace-nowrap">Sprint {(p.id%3)+1}</span>
                         </div>
                         <p className="text-xs text-slate-500 mb-3 line-clamp-3 leading-relaxed">{p.description}</p>
                         <div className="flex flex-wrap gap-1.5 mb-3">
                           {p.tags.map(t => <span key={t} className="px-1.5 py-0.5 bg-slate-50 text-slate-500 border border-slate-100 rounded text-[10px] whitespace-nowrap font-medium">{t}</span>)}
                         </div>
                         <div className="flex justify-between items-center mt-auto border-t pt-2 border-slate-100">
                           <span className="text-[10px] text-slate-400 font-mono">{p.date || 'TBD'}</span>
                           {p.screenshot && <span className="w-4 h-4 rounded-full opacity-60 bg-slate-300" title="Has Screenshot"></span>}
                         </div>
                       </div>
                     ))}
                     {localProjects.filter(p => p.status === col).length === 0 && (
                        <div className="border-2 border-dashed border-slate-200 rounded-lg h-24 flex items-center justify-center text-slate-400 text-xs font-semibold uppercase tracking-wider">
                           Drop tasks here
                        </div>
                     )}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        );
      case 'past-projects':
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight border-b border-slate-100 pb-2">Past Projects Archive</h2>
            <div className="space-y-4">
               {localProjects.filter(p => p.status === 'Done').map((p, i) => (
                 <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-200 bg-slate-50 rounded-lg items-start md:items-center">
                   <div className="w-16 h-16 bg-slate-200 rounded shrink-0 flex items-center justify-center">
                      <FolderOpen className="text-slate-400 w-8 h-8" />
                   </div>
                   <div className="flex-grow">
                     <h3 className="font-bold text-slate-800">{p.title}</h3>
                     <p className="text-sm text-slate-600">{p.description}</p>
                     <p className="text-[10px] font-mono text-slate-400 mt-1">{p.date}</p>
                   </div>
                   <button className="px-4 py-1.5 border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 rounded text-sm font-semibold">View Details</button>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'cms':
        if (!isLoggedIn) return <div className="text-red-500">Access Denied. Please Login as Admin.</div>;
        return (
          <div className="flex flex-col gap-4">
             <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-lg mb-4 flex items-start gap-2">
               <Settings className="w-5 h-5 shrink-0" />
               <p><strong>Admin CMS Access:</strong> You are currently logged in as {currentUser}. You can edit platform configurations, manage featured portfolios, and update global settings.</p>
               <button className="ml-auto bg-slate-900 text-white px-3 py-1 rounded text-xs" onClick={() => setActiveTab('login')}>Admin Settings</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => navTo('cms-manage-portfolios')} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2"><Briefcase /></div>
                  <h3 className="font-bold text-slate-800">Manage Portfolios & Skills</h3>
                  <p className="text-xs text-slate-500">Add or edit projects, skills, and languages.</p>
                </div>
                <div onClick={() => navTo('cms-user-management')} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2"><UsersGroup /></div>
                  <h3 className="font-bold text-slate-800">User Management</h3>
                  <p className="text-xs text-slate-500">Manage site members and access roles.</p>
                </div>
                <div onClick={() => navTo('cms-asset-library')} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-2"><ImageIcon /></div>
                  <h3 className="font-bold text-slate-800">Asset Library</h3>
                  <p className="text-xs text-slate-500">Upload images, icons, and document assets.</p>
                </div>
             </div>
          </div>
        );
      case 'cms-manage-portfolios':
        if (!isLoggedIn) return <div className="text-red-500">Access Denied.</div>;
        return (
           <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-2">Portfolio Management Page</h2>
              <div>
                 <h3 className="font-bold">Programming Languages & Skills</h3>
                 <div className="text-sm text-slate-600 mb-2">Current list:</div>
                 <div className="flex flex-wrap gap-2 mb-4">
                    {localSkills.map((s, idx) => (
                       <div key={idx} className="bg-slate-100 px-2 py-1 rounded text-xs flex items-center gap-2">
                         {s.name} <span className="text-slate-400 font-mono">[{s.category}]</span>
                         <button onClick={() => setLocalSkills(localSkills.filter((_, i) => i !== idx))} className="text-red-500 ml-2">&times;</button>
                       </div>
                    ))}
                 </div>
                 <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm mb-6" onClick={() => {
                    const skill = prompt("Enter new skill logic:");
                    if(skill) setLocalSkills([...localSkills, { name: skill, level: "Intermediate", category: "Developer" }]);
                 }}>+ Add Skill / Language</button>
              </div>

              <div>
                 <h3 className="font-bold">Projects</h3>
                 {localProjects.map((p, idx) => (
                    <div key={idx} className="border p-4 rounded mb-2 bg-slate-50 items-center justify-between">
                       <div className="font-bold">{p.title}</div>
                       <div className="text-xs text-slate-500">Desc: {p.description}</div>
                       <div className="text-xs text-slate-500">Dates: {p.date} | Status: {p.status}</div>
                       <div className="mt-2 text-xs text-blue-600 cursor-pointer underline flex gap-4">
                         <span onClick={() => {
                            const changed = prompt("New description:", p.description);
                            if(changed) { const nx = [...localProjects]; nx[idx].description = changed; setLocalProjects(nx); }
                         }}>Edit Description</span>
                         <span onClick={() => {
                            const changed = prompt("New status (Backlog/To Do/In Progress/Review/QA/Done):", p.status);
                            if(changed) { const nx = [...localProjects]; nx[idx].status = changed; setLocalProjects(nx); }
                         }}>Edit Status</span>
                       </div>
                    </div>
                 ))}
                 <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm mt-2" onClick={() => setLocalProjects([...localProjects, { id: 999, title: "New", description: "Placeholder", tags: [], status: "Testing", date: "TBD", screenshot: "bg-gray-500" }])}>+ Add Project</button>
              </div>
           </div>
        );
      case 'cms-user-management':
        if (!isLoggedIn) return <div className="text-red-500">Access Denied.</div>;
        return (
           <div className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2">User Management Page</h2>
              <div className="bg-white border rounded">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b">
                      <tr><th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">Bio</th><th className="p-3">Email</th><th className="p-3">Action</th></tr>
                    </thead>
                    <tbody>
                      {dbTables.users.map(u => (
                        <tr key={u.Id} className="border-b last:border-0 hover:bg-slate-50">
                           <td className="p-3">{u.Id}</td><td className="p-3">{u.Name}</td><td className="p-3">{u.Bio}</td><td className="p-3">{u.Email}</td>
                           <td className="p-3">
                             <button className="text-blue-500 hover:text-blue-700 underline text-xs mr-2">Edit</button>
                             <button className="text-red-500 hover:text-red-700 underline text-xs" onClick={() => setDbTables({...dbTables, users: dbTables.users.filter(x => x.Id !== u.Id)})}>Remove</button>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={() => {
                  setDbTables({...dbTables, users: [...dbTables.users, { Id: Date.now(), Name: "New User", Bio: "Role", Email: "new@local"}]});
              }}>+ Invite User</button>
           </div>
        );
      case 'cms-asset-library':
        if (!isLoggedIn) return <div className="text-red-500">Access Denied.</div>;
        return (
           <div className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2">Asset Library</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {assets.map((a, i) => (
                    <div key={i} className="border rounded p-4 flex flex-col items-center bg-slate-50">
                       {a.type === 'Image' && <ImageIcon className="w-8 h-8 text-blue-500 mb-2"/>}
                       {a.type === 'Document' && <FileText className="w-8 h-8 text-green-500 mb-2"/>}
                       {a.type === 'Icon' && <Layers className="w-8 h-8 text-purple-500 mb-2"/>}
                       <div className="text-xs font-bold truncate w-full text-center">{a.name}</div>
                       <div className="text-[10px] text-slate-500">{a.size} • {a.uploadDate}</div>
                    </div>
                 ))}
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm mt-4">+ Upload File</button>
           </div>
        );
      case 'skills':
         const skillsByCategory = localSkills.reduce((acc, skill) => {
           if (!acc[skill.category]) acc[skill.category] = [];
           acc[skill.category].push(skill);
           return acc;
         }, {} as Record<string, any[]>);
         
         return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight border-b border-slate-100 pb-2">Technical Capabilities</h2>
            {isLoggedIn && <button onClick={() => navTo('cms-manage-portfolios')} className="text-sm bg-blue-500 text-white px-3 py-1 rounded">Edit Skills</button>}
            {Object.keys(skillsByCategory).map(cat => (
              <div key={cat} className="mb-6">
                <h3 className="text-lg font-bold text-slate-700 border-b border-slate-100 pb-2 mb-4 capitalize">{cat} Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {skillsByCategory[cat].map((s: any, i: number) => (
                    <div key={i} className="p-4 border border-slate-200 bg-white rounded-lg flex flex-col gap-2 shadow-sm relative">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{s.category}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${s.level === 'Expert' ? 'bg-indigo-100 text-indigo-700' : s.level === 'Advanced' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                          {s.level}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg">{s.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'skill-qa':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Quality Assurance (QA) Skills</h2>
            <p className="text-slate-600 leading-relaxed">Comprehensive testing is vital. Expertise includes building scalable, automated frameworks ensuring enterprise reliability.</p>
            <ul className="list-disc pl-5 space-y-2 font-medium text-slate-700">
               <li>Test Planning & Strategy</li>
               <li>Manual Testing Execution</li>
               <li>Automation Engineering</li>
               <li>Defect Life Cycle Management</li>
               <li>API & Database Testing</li>
               <li>Non-Functional Testing</li>
               <li>CI/CD Integration</li>
               <li>Root Cause Analysis</li>
               <li className="mt-4 pt-4 border-t border-slate-100"><strong>Tools:</strong> Selenium, Playwright, Appium, Cypress, Cucumber</li>
            </ul>
          </div>
        );
      case 'skill-dev':
         return (
           <div className="space-y-4">
            <h2 className="text-2xl font-bold">Developer Skills</h2>
            <p className="text-slate-600 leading-relaxed">Full-Stack engineering creating robust performance-intensive architectures.</p>
            <ul className="list-disc pl-5 space-y-2 font-medium text-slate-700">
               <li><strong>C# / ASP.NET:</strong> Primary backend language utilizing OOP architectures.</li>
               <li><strong>JavaScript / HTML / CSS:</strong> Standard web interactions and responsive design.</li>
               <li><strong>Blazor:</strong> Modern framework executing C# natively in browser environments.</li>
               <li><strong>SQL:</strong> RDBMS foundations for querying complex datasets securely.</li>
               <li><strong>Java & Python:</strong> Object-Oriented and scripting backend alternatives utilized depending on infrastructure needs.</li>
            </ul>
          </div>
         )
      case 'skill-ba':
         return (
           <div className="space-y-4">
            <h2 className="text-2xl font-bold">Business Analysis (BA) Skills</h2>
            <p className="text-slate-600 leading-relaxed">Bridging the gap between stakeholders and technical execution.</p>
            <ul className="list-disc pl-5 space-y-2 font-medium text-slate-700">
               <li>Requirements Elicitation</li>
               <li>Process Modeling</li>
               <li>Functional Documentation</li>
               <li>Gap Analysis</li>
               <li>Data Mapping</li>
               <li>User Story Creation</li>
               <li>System Logic Definition</li>
               <li>UAT Facilitation</li>
            </ul>
          </div>
         )
      case 'skill-pm':
         return (
           <div className="space-y-4">
            <h2 className="text-2xl font-bold">Project Management (PM) Skills</h2>
            <p className="text-slate-600 leading-relaxed">Ensuring deliverables are met precisely on time through orchestrated teamwork.</p>
            <ul className="list-disc pl-5 space-y-2 font-medium text-slate-700">
               <li>Scope Management</li>
               <li>Timeline Scheduling</li>
               <li>Budgeting and Financials</li>
               <li>Risk Management</li>
               <li>Resource Allocation</li>
               <li>Stakeholder Reporting</li>
               <li>Methodology Governance</li>
               <li>Issue Escalation</li>
            </ul>
          </div>
         )
      case 'skill-prod':
         return (
           <div className="space-y-4">
            <h2 className="text-2xl font-bold">Product Management (ProdM) Skills</h2>
            <p className="text-slate-600 leading-relaxed">Focusing on User-Centric value and strategic roadmaps.</p>
            <ul className="list-disc pl-5 space-y-2 font-medium text-slate-700">
               <li>Product Vision & Strategy</li>
               <li>Market & Competitor Analysis</li>
               <li>User Research & Discovery</li>
               <li>Roadmapping & Prioritization</li>
               <li>Product Metrics Tracking</li>
               <li>Product Lifecycle Management</li>
               <li>Go-To-Market (GTM) Planning</li>
               <li>Cross-Functional Alignment</li>
            </ul>
          </div>
         )
      case 'api-data':
         return (
           <div className="space-y-6">
            <h2 className="text-xl font-bold">Live API Data Console</h2>
            <p className="text-slate-600 text-sm">Simulated fetch responses from the REST backend.</p>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded text-slate-300 font-mono text-sm max-h-96 overflow-y-auto">
               <div className="text-green-400 mb-2">$ curl -X GET "https://api.skillsnap.local/v1/projects"</div>
               <pre>
{JSON.stringify(localProjects.slice(0,2), null, 2)}
               </pre>
               <div className="mt-4 text-green-400 mb-2">$ curl -X GET "https://api.skillsnap.local/v1/users"</div>
               <pre>
{JSON.stringify(dbTables.users.slice(0,1), null, 2)}
               </pre>
            </div>
           </div>
         );
      case 'business-logic':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight border-b border-slate-100 pb-2">Business Logic Architecture</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-300 font-mono text-sm overflow-x-auto shadow-inner">
              <p className="text-slate-500 mb-4">// API Controller separating logic from presentation</p>
              <pre className="text-[13px]">
{`[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly SkillSnapContext _context;
    private readonly IMemoryCache _cache;

    public ProjectsController(SkillSnapContext context, IMemoryCache cache)
    {
        _context = context;
        _cache = cache;
    }

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        // Business Logic: Return cached projects if available, otherwise fetch
        if (!_cache.TryGetValue("projects", out List<Project> projects))
        {
            projects = await _context.Projects.AsNoTracking().ToListAsync();
            _cache.Set("projects", projects, TimeSpan.FromMinutes(5));
        }
        return Ok(projects);
    }
}`}
              </pre>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">The application follows an N-Tier architecture. The endpoints serve as the orchestrators querying data via Entity Framework Core, while services injected via standard .NET Dependency Injection handle side-effects and mapping.</p>
          </div>
        );
      case 'sql-database':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
               <h2 className="text-xl font-bold text-slate-800 tracking-tight">SQL Relational Data</h2>
               {isLoggedIn && <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded">Migrate DB</button>}
            </div>
            <div className="space-y-8">
              {Object.entries(dbTables).map(([tableName, rows]) => (
                <div key={tableName}>
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 ml-1">dbo.{tableName}</h3>
                    {isLoggedIn && <button className="text-xs text-blue-600 underline" onClick={() => {
                        if(tableName === 'users') setDbTables({...dbTables, users: [...dbTables.users, { Id: 99, Name: "DB Insert", Bio: "Manual", Email: "test" }]});
                    }}>+ Insert Row</button>}
                  </div>
                  <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {Object.keys(rows[0]).map((k, idx) => (
                            <th key={idx} className="px-4 py-2 font-bold text-slate-700">{k}</th>
                          ))}
                          {isLoggedIn && <th className="px-4 py-2 font-bold text-slate-700">Actions</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, idx) => (
                          <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                            {Object.values(row).map((val, vIdx) => (
                              <td key={vIdx} className="px-4 py-2 text-slate-600">{val as string}</td>
                            ))}
                            {isLoggedIn && (
                              <td className="px-4 py-2 text-slate-600 text-xs">
                                <button className="text-red-500 underline" onClick={() => {
                                   if(tableName === 'users') setDbTables({...dbTables, users: dbTables.users.filter((_, filterIdx) => filterIdx !== idx)});
                                }}>Delete</button>
                                <span className="mx-2 text-slate-300">|</span>
                                <button className="text-blue-500 underline">Update</button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight border-b border-slate-100 pb-2">Security & Authentication</h2>
            <div className="flex flex-col md:flex-row gap-6">
               <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800">ASP.NET Identity</h3>
                  <p className="text-sm text-slate-600">User accounts and hashed passwords are securely managed by the underlying ASP.NET Identity provider framework. Routes modifying data are decorated with <code>[Authorize]</code> attributes.</p>
               </div>
               <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800">JWT Tokens</h3>
                  <p className="text-sm text-slate-600">The Blazor WASM client stores a secure JWT token inside browser storage upon authentication. All subsequent API calls pass this Token in the <code>Authorization: Bearer</code> header.</p>
               </div>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg text-sm text-slate-600 font-mono shadow-sm">
              <span className="text-indigo-600 font-bold">[Authorize(Roles = "Admin")]</span>
              <br/>
              public async Task&lt;IActionResult&gt; CreateProject(Project dto)
            </div>
          </div>
        );
      case 'performance':
         return (
          <div className="space-y-6">
             <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Performance Benchmarks</h2>
                <div className="text-[10px] uppercase font-bold tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded">Optimized</div>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                   <div className="text-2xl font-bold text-slate-800 mb-1">12ms</div>
                   <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Latency</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                   <div className="text-2xl font-bold text-slate-800 mb-1">99.9%</div>
                   <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cache Hit Rate</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                   <div className="text-2xl font-bold text-slate-800 mb-1">0.12s</div>
                   <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">LCP (Web)</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
                   <div className="text-2xl font-bold text-slate-800 mb-1">EF Core</div>
                   <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AsNoTracking()</div>
                </div>
             </div>

             <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-4 leading-relaxed text-sm text-slate-700">
                <p><strong>Caching Strategy:</strong> The .NET pipeline uses <code>IMemoryCache</code> to reduce SQLite file I/O for globally identical requests (like the public portfolio data). Blazor State Management handles client-side caching so returning to a view is instantaneous.</p>
             </div>
          </div>
         );
      case 'login':
      case 'register':
         if (isLoggedIn) {
            return (
              <div className="max-w-md mx-auto text-center border p-8 rounded-xl bg-white shadow-sm border-slate-200">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CheckCircle className="w-8 h-8"/>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">You are Logged In</h2>
                <p className="text-slate-500 mb-6">Your session is active. You have full CMS privileges to modify projects and skills.</p>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => navTo('cms')} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold text-sm transition-colors">Go to CMS</button>
                  <button onClick={() => navTo('logout')} className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-bold text-sm transition-colors">Go to Logout</button>
                </div>
              </div>
            );
         }
         return (
          <div className="max-w-sm mx-auto p-8 border border-slate-200 rounded-xl bg-white shadow-lg">
            <div className="mb-6 flex space-x-4 border-b pb-2">
              <button className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'login' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`} onClick={() => setActiveTab('login')}>Login</button>
              <button className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'register' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`} onClick={() => setActiveTab('register')}>Register</button>
            </div>
            
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{activeTab === 'login' ? 'Admin Login' : 'Create Account'}</h2>
              <p className="text-xs text-slate-500 mt-1">Authenticate via ASP.NET Identity</p>
            </div>
            
            {activeTab === 'login' && <div className="text-xs bg-yellow-50 text-yellow-800 p-2 rounded mb-4 text-center font-mono">Use 'admin' / 'password'</div>}
            
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Username / Email Address</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="admin" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-sm"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none text-sm"/>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-2.5 rounded hover:bg-slate-800 transition-colors shadow-sm">
                {activeTab === 'login' ? 'Sign In' : 'Register Account'}
              </button>
            </form>
          </div>
         );
      case 'logout':
         return (
           <div className="max-w-md mx-auto text-center border p-8 rounded-xl bg-white shadow-sm border-slate-200">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                 <LogOut className="w-8 h-8"/>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to Leave?</h2>
              <p className="text-slate-500 mb-6">Logging out will destroy your local JWT token and remove administrative CMS functionality.</p>
              <button onClick={() => { setIsLoggedIn(false); setCurrentUser(''); navTo('login'); }} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-bold text-sm shadow-sm transition-colors">Confirm Logout</button>
           </div>
         );
      default:
        return <div>Tab content not found.</div>;
    }
  };

  const getTitle = () => {
    const directMatch = TOP_NAV_ITEMS.find(n => n.id === activeTab);
    if(directMatch) return directMatch.label;
    if(activeTab === 'login' || activeTab === 'register') return "Authentication";
    if(activeTab.startsWith('cms-')) return "Content Management";
    if(activeTab.startsWith('skill-')) return "Detailed Skillset";
    return 'Content';
  };

  const IconComponent = TOP_NAV_ITEMS.find(n => n.id === activeTab)?.icon || FileText;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col overflow-x-hidden">
      
      {/* Top Header Row */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="w-full px-4 md:px-6 py-2 min-h-[4rem] flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-sm">
              S
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">SkillSnap</span>
          </div>

          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-wrap items-center justify-end gap-1">
               {TOP_NAV_ITEMS.map((item) => {
                 if (item.id === 'cms' && !isLoggedIn) return null;
                 
                 return (
                   <button 
                     key={item.id}
                     onClick={() => navTo(item.id)}
                     className={`px-3 py-1.5 flex items-center text-xs font-bold whitespace-nowrap rounded-md transition-colors \${activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                   >
                     <item.icon className="w-3.5 h-3.5 mr-1.5" />
                     {item.label}
                   </button>
                 );
               })}
               <span className="mx-2 text-slate-200">|</span>
               {!isLoggedIn ? (
                 <button onClick={() => navTo('login')} className="px-3 py-1.5 flex items-center text-xs font-bold rounded-md text-white bg-slate-900 hover:bg-slate-800">
                    Login
                 </button>
               ) : (
                 <button onClick={() => navTo('logout')} className="px-3 py-1.5 flex items-center text-xs font-bold rounded-md text-slate-600 hover:bg-red-50 hover:text-red-700">
                    <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
                 </button>
               )}
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow flex w-full relative">
        
        {/* Left Sidebar (Desktop Subnav / Documentation Links) */}
        <aside className={`absolute lg:relative z-10 w-64 bg-slate-50 lg:bg-transparent h-[calc(100vh-4rem)] lg:h-auto border-r border-slate-200 p-4 flex flex-col gap-6 transition-transform transform \${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} shadow-2xl lg:shadow-none overflow-y-auto`}>
          <div className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-100 p-3 rounded-lg leading-relaxed shadow-sm">
            Microsoft Full Stack Capstone Project using CSharp ASP.NET Blazor SQL Javascript
          </div>
          <div className="flex flex-col gap-1 tracking-tight">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2">Project Files</h3>
             <button onClick={() => navTo('readme')} className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md transition-colors \${activeTab === 'readme' ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}>
                <BookOpen className="w-4 h-4 mr-2" /> README
             </button>
             <button onClick={() => navTo('review')} className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md transition-colors \${activeTab === 'review' ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}>
                <FileText className="w-4 h-4 mr-2" /> Self Review
             </button>
          </div>

          <div className="flex flex-col gap-1 tracking-tight">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2">Knowledge Domains</h3>
             <button onClick={() => navTo('skill-dev')} className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md \${activeTab === 'skill-dev' ? 'bg-blue-100 text-blue-800' : 'text-slate-600 hover:bg-slate-200'}`}><Server className="w-4 h-4 mr-2"/> Developer Skills</button>
             <button onClick={() => navTo('skill-qa')} className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md \${activeTab === 'skill-qa' ? 'bg-blue-100 text-blue-800' : 'text-slate-600 hover:bg-slate-200'}`}><CheckCircle className="w-4 h-4 mr-2"/> QA Skills</button>
             <button onClick={() => navTo('skill-ba')} className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md \${activeTab === 'skill-ba' ? 'bg-blue-100 text-blue-800' : 'text-slate-600 hover:bg-slate-200'}`}><Briefcase className="w-4 h-4 mr-2"/> Business Analysis Skills</button>
             <button onClick={() => navTo('skill-pm')} className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md \${activeTab === 'skill-pm' ? 'bg-blue-100 text-blue-800' : 'text-slate-600 hover:bg-slate-200'}`}><UsersGroup className="w-4 h-4 mr-2"/> Project Management Skills</button>
             <button onClick={() => navTo('skill-prod')} className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md \${activeTab === 'skill-prod' ? 'bg-blue-100 text-blue-800' : 'text-slate-600 hover:bg-slate-200'}`}><Smartphone className="w-4 h-4 mr-2"/> Product Management</button>
          </div>

          {isLoggedIn && (
            <div className="flex flex-col gap-1 tracking-tight">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2">CMS Controls</h3>
               <button onClick={() => navTo('cms-manage-portfolios')} className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md \${activeTab === 'cms-manage-portfolios' ? 'bg-yellow-100 text-yellow-900' : 'text-slate-600 hover:bg-slate-200'}`}>Portfolio Management</button>
               <button onClick={() => navTo('cms-user-management')} className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md \${activeTab === 'cms-user-management' ? 'bg-yellow-100 text-yellow-900' : 'text-slate-600 hover:bg-slate-200'}`}>User Management</button>
               <button onClick={() => navTo('cms-asset-library')} className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md \${activeTab === 'cms-asset-library' ? 'bg-yellow-100 text-yellow-900' : 'text-slate-600 hover:bg-slate-200'}`}>Asset Library</button>
            </div>
          )}

          <div className="lg:hidden flex flex-col gap-1 border-t border-slate-200 pt-6 mt-auto pb-8">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2">Mobile Nav</h3>
             {TOP_NAV_ITEMS.map((item) => {
               if (item.id === 'cms' && !isLoggedIn) return null;
               return (
                 <button 
                   key={item.id}
                   onClick={() => navTo(item.id)}
                   className={`px-3 py-2 flex items-center text-sm font-semibold rounded-md transition-colors \${activeTab === item.id ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}
                 >
                   <item.icon className="w-4 h-4 mr-2 text-slate-400" />
                   {item.label}
                 </button>
               )
             })}
             {!isLoggedIn ? (
               <button onClick={() => navTo('login')} className="px-3 py-2 mt-2 bg-slate-900 text-white rounded-md text-sm font-bold text-center">Login</button>
             ) : (
               <button onClick={() => navTo('logout')} className="px-3 py-2 mt-2 bg-red-100 text-red-700 rounded-md text-sm font-bold text-center">Logout</button>
             )}
          </div>
        </aside>
        
        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 w-full lg:w-[calc(100%-16rem)] flex flex-col">
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex-1 ring-1 ring-slate-900/5 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <IconComponent className="w-5 h-5 text-slate-600" />
                 </div>
                 <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                   {getTitle()}
                 </h2>
              </div>
              <div className="flex items-center gap-2">
                 <div className="px-3 py-1 bg-slate-50 text-slate-500 rounded text-xs font-mono border border-slate-200 shadow-inner">
                   {isLoggedIn ? 'Token: Valid (Admin)' : 'Token: null (Guest)'}
                 </div>
              </div>
            </div>
            
            <div className="animate-in fade-in duration-300 h-full">
              {renderContent()}
            </div>
          </section>
        </main>
      </div>

      {/* Footer Info Bar */}
      <footer className="px-4 md:px-6 py-3 bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">API Status: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Memory Cache: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full \${isLoggedIn ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Auth: {isLoggedIn ? 'Admin' : 'Guest'}</span>
            </div>
          </div>
          <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase text-center md:text-right">
            Written by Brian McCarthy &bull; Capstone 2024
          </div>
        </div>
      </footer>
    </div>
  );
}
