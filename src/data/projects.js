export const projects = [
  {
    id: "suplmntal",
    title: "SUPLMNTAL - Trade School Edu",
    year: 2025,
    category: "web",
    tech: ["agile", "scrum", "react", "docker", "tailwind", "java", "javascript", "mongoDB", "testing", "design"],
    summary: "An agile-built quiz platform transforming how electrical engineering students practice.",
    cover: "covers/suplmntal.png",
    role: "Product Owner, defining requirements and guiding agile delivery; also developing the front-end.",
    type: "client",
    status: "in progress",
    detail: {
      hero: "covers/suplmntal.png",
      contributions: [
        "Product Owner: backlog grooming, sprint goals, stakeholder demos.",
        "Front-end implementation in React + Tailwind; component library setup.",
        "Coordinated CI containerization with Docker; dev environment docs.",
      ],
      skills: [
        { key: "agile", label: "Agile", info: "Iterative delivery, sprint planning, review/retro.", icon: "agile" },
        { key: "scrum", label: "Scrum", info: "PO role, backlog, ceremonies, Definition of Done.", icon: "scrum" },
        { key: "react", label: "React", info: "Composable UI, stateful views for quizzes.", icon: "react" },
        { key: "docker", label: "Docker", info: "Dev containers / parity across teammates.", icon: "docker" },
        { key: "tailwind", label: "Tailwind", info: "Design tokens, responsive utility classes.", icon: "tailwind" },
        { key: "mongoDB", label: "MongoDB", info: "Flexible schema for question banks.", icon: "db" },
      ],
      background:
        "Client-facing quiz platform for electrical apprentices. The goal is faster practice, analytics, and question bank iteration with clean UX and reliable releases.",
      // optional gallery – omit or empty to hide right column
      gallery: [
        "shots/suplmntal-1.png",
        "shots/suplmntal-2.png",
        "shots/suplmntal-3.png",
      ],
    },
  },
  {
    id: "unimelb",
    title: "The University of Melbourne - Masters Degree",
    year: "2025-present",
    category: "edu",
    tech: ["agile", "javascript", "testing"],
    summary:
      "Pursuing advanced software engineering while leading hands-on industry projects.",
    cover: "covers/unimelb.jpg",
    role: "",
    type: "personal",
    status: "in progress",
    detail: {
      hero: "covers/unimelb.jpg",
      contributions: [
        "Masters projects; team leadership and client work.",
        "Advanced SWE topics; testing and delivery practices.",
      ],
      skills: [
        { key: "agile", label: "Agile", info: "Team practices & delivery.", icon: "agile" },
        { key: "javascript", label: "JS", info: "Prototypes and lab work.", icon: "js" },
        { key: "testing", label: "Testing", info: "Coverage & CI patterns.", icon: "test" },
      ],
      background:
        "Postgraduate journey blending software practice, research, and industry collaboration.",
      gallery: [],
    },
  },
  {
    id: "mhc",
    title: "Mount Holyoke College - Bachelors Degree",
    year: "2020-2024",
    category: "edu",
    tech: ["python", "java", "testing"],
    summary:
      "A liberal arts education that broadened my perspective and gave me a professional foundation in programming.",
    cover: "covers/mhc.jpg",
    role: "",
    type: "personal",
    status: "completed",
    detail: {
      hero: "covers/mhc.jpg",
      contributions: [
        "Completed CS coursework: DS/Algos, software design.",
        "Peer collaboration, mentorship, and academic projects.",
      ],
      skills: [
        { key: "python", label: "Python", info: "Coursework and projects.", icon: "python" },
        { key: "java", label: "Java", info: "DS/Algos implementations.", icon: "java" },
      ],
      background:
        "Undergraduate foundation across CS and liberal arts; exposure to research, mentorship, and teaching.",
      gallery: [],
    },
  },
  {
    id: "mhctutor",
    title: "Tutor and Student Mentor – Data Structures",
    year: "2023–2024",
    category: "job",
    tech: ["python", "java", "testing"],
    summary: "Tutored Data Structures students in Python and Java through weekly office hours and mentorship.",
    cover: "covers/mhctutor.jpg",
    role: "",
    type: "academic",
    status: "completed",
    detail: {
      hero: "covers/mhctutor.jpg",
      contributions: [
        "Led weekly office hours; guided problem-solving strategies.",
        "Reviewed code for correctness and clarity; test-driven habits.",
        "Mentored study plans ahead of exams and projects.",
      ],
      skills: [
        { key: "python", label: "Python", info: "Algorithmic practice and testing examples.", icon: "python" },
        { key: "java", label: "Java", info: "OOP design patterns for DS/algorithms.", icon: "java" },
        { key: "testing", label: "Testing", info: "Unit tests and edge-case analysis.", icon: "test" },
      ],
      background:
        "Academic teaching/mentoring role focused on data structures and algorithmic thinking, emphasizing fundamentals and code quality.",
      gallery: [], // no gallery → right column hides
    },
  },
  {
    id: "imaginarium",
    title: "ImaginariumDigital",
    cover: "covers/imaginarium.jpg",
    category: "game",
    tech: ["unity", "csharp", "photon"],
    summary: "Multiplayer storytelling card game.",
    role: "Product owner, gameplay programmer",
    year: 2025,
    type: "personal",
    status: "in progress",
    detail: {
      hero: "covers/imaginarium.jpg",
      contributions: [
        "Designed round flow and game state machine.",
        "Implemented Photon PUN rooms, matchmaking, scoring.",
        "UX for mobile/desktop; accessible controls and layout.",
      ],
      skills: [
        { key: "unity", label: "Unity", info: "Scenes, prefabs, ScriptableObjects.", icon: "unity" },
        { key: "csharp", label: "C#", info: "Gameplay logic, state orchestration.", icon: "csharp" },
        { key: "photon", label: "Photon", info: "Real-time networking, rooms, events.", icon: "cloud" },
      ],
      background:
        "A cozy online party game inspired by storytelling and creative guessing. Focus on smooth netcode and replayable mechanics.",
      gallery: [
        "shots/imaginarium-1.png",
        "shots/imaginarium-2.png",
      ],
    },
  },
  {
    id: "constructai",
    title: "ConstructAI - Skills Analyzer",
    year: 2025,
    category: "web",
    tech: ["figma", "agile", "scrum", "design"],
    summary: "A job-skills dashboard designed to map and analyze construction sector expertise.",
    cover: "covers/constructai.jpg",
    role: "Served as Scrum Master, coordinating sprints and facilitating team progress.",
    type: "client",
    status: "completed",
    detail: {
      hero: "covers/constructai.jpg",
      contributions: [
        "Scrum Master: velocity tracking, impediment removal.",
        "Led UX workshops; translated insights into Figma flows.",
        "Defined MVP scope and acceptance criteria.",
      ],
      skills: [
        { key: "figma", label: "Figma", info: "Wireframes, components, flows.", icon: "figma" },
        { key: "agile", label: "Agile", info: "Incremental product development.", icon: "agile" },
        { key: "design", label: "Design", info: "Information architecture & dashboards.", icon: "design" },
      ],
      background:
        "Client dashboard to visualize roles, skills, and gaps in construction; emphasis on clarity and executive-friendly insights.",
      gallery: ["shots/constructai-1.png"],
    },
  },
  {
    id: "shelter",
    title: "Shelter – Offline Mobile Game",
    year: 2023,
    category: "game",
    tech: ["react", "ios", "typescript", "java", "design"],
    summary: "A social deduction game where players debate who to expel from the shelter.",
    cover: "covers/shelter.png",
    role: "Built the character traits generator in Java for gameplay logic.",
    type: "personal",
    status: "completed",
    detail: {
      hero: "covers/shelter.png",
      contributions: [
        "Java trait generator for roles and social balance.",
        "Game loop and UI prototypes; usability tweaks.",
      ],
      skills: [
        { key: "react", label: "React", info: "Prototype UI for flows/screens.", icon: "react" },
        { key: "typescript", label: "TS", info: "Type safety across components.", icon: "ts" },
        { key: "java", label: "Java", info: "Core game logic utilities.", icon: "java" },
      ],
      background:
        "Offline social deduction concept exploring tension, persuasion, and replayable character mixes.",
      gallery: [
        "details/shelter/gameplay1.jpg",
        "details/shelter/gameplay2.jpg",
        "details/shelter/rules4.jpg",
        "details/shelter/rules5.jpg",
        "details/shelter/gameplay4.jpg",
        "details/shelter/gameplay7.jpg",
        "details/shelter/gameplay8.jpg",
      ],
      video: "details/shelter/demo-video.mp4",
      videoPoster: "details/shelter/video-poster.jpg",
    },
  },
  {
    id: "artwebsite",
    title: "Creative Collective - Social Media Website",
    year: 2024,
    category: "web",
    tech: ["react", "mongoDB", "typescript", "design"],
    summary: "A social platform tailored for artists to connect, share, and collaborate.",
    cover: "covers/artwebsite.png",
    role: "Designed the interface and managed database integration for user data.",
    type: "client",
    status: "completed",
    detail: {
      hero: "covers/artwebsite.png",
      contributions: [
        "Feed and profile UI; content cards and modals.",
        "Collections and tagging model; DB integration paths.",
      ],
      skills: [
        { key: "react", label: "React", info: "Declarative UI; routing & modals.", icon: "react" },
        { key: "mongoDB", label: "MongoDB", info: "Doc models for posts/profiles.", icon: "db" },
        { key: "design", label: "Design", info: "Artist-centric layout language.", icon: "design" },
      ],
      background:
        "Built as a community hub for artists; focus on creator friendliness and safe collaboration.",
      gallery: [
        "details/artwebsite/website1.png",
        "details/artwebsite/website2.png",
        "details/artwebsite/website3.png",
        "details/artwebsite/website4.png",
      ],
      video: "details/artwebsite/website-demo.mp4",
      videoPoster: "details/artwebsite/video-poster.png",
    },
  },
  {
    id: "artmemories",
    title: "Art Exhibition - Memories",
    year: 2025,
    category: "art",
    tech: ["figma", "design"],
    summary:
      "An hexagonal tile artwork showcased at the Graduate Art Prize 2025.",
    cover: "covers/artmemories.png",
    role: "",
    type: "personal",
    status: "completed",
    detail: {
      hero: "covers/artmemories.png",
      contributions: [
        "Concept, composition, and color study.",
        "Installation planning and presentation.",
      ],
      skills: [
        { key: "design", label: "Design", info: "Composition & visual rhythm.", icon: "design" },
        { key: "figma", label: "Figma", info: "Digital mockups and layout.", icon: "figma" },
      ],
      background:
        "A series exploring memory fragments and how they tile into narrative.",
      gallery: ["shots/artmemories-1.png"],
    },
  },
];
