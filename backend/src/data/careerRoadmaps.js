const careerRoadmaps = {
  "Software Engineer": {
    career: "Software Engineer",

    steps: [
      {
        stepNumber: 1,
        title: "Programming Fundamentals",
        level: "Foundation",
        duration: "4–6 weeks",
        prerequisites: "None",

        whyItMatters:
          "Strong programming fundamentals are the foundation for problem solving, data structures, application development, and technical interviews.",

        whatToLearn: [
          "Variables & Data Types",
          "Conditions & Loops",
          "Functions",
          "Arrays & Strings",
          "Objects",
          "Recursion Basics",
          "Error Handling",
          "Time & Space Complexity Basics"
        ],

        practiceStrategy:
          "Learn each concept, write small programs, solve exercises independently, debug your own mistakes, and gradually move from basic exercises to small programming problems.",

        resources: [
          "LeetCode",
          "GeeksforGeeks",
          "Structured programming courses"
        ],

        practicalTask:
          "Build a small application such as a calculator, expense tracker, number guessing game, or command-line application.",

        expectedOutcome:
          "Be able to understand a programming problem, design a basic solution, write the code independently, debug it, and explain the logic."
      },

      {
        stepNumber: 2,
        title: "Data Structures & Algorithms",
        level: "Core",
        duration: "8–12+ weeks",
        prerequisites: "Programming Fundamentals",

        whyItMatters:
          "Data structures and algorithms develop strong problem-solving skills and are an important part of software engineering technical interviews.",

        whatToLearn: [
          "Arrays & Strings",
          "Hashing",
          "Two Pointers",
          "Sliding Window",
          "Stack & Queue",
          "Binary Search",
          "Linked Lists",
          "Trees & BST",
          "Heap / Priority Queue",
          "Recursion & Backtracking",
          "Graphs",
          "Dynamic Programming"
        ],

        practiceStrategy:
          "Follow a structured progression from fundamentals to more challenging problems. Practice consistently using curated problem sets, revisit problems that were difficult to solve independently, and focus on recognizing reusable problem-solving patterns rather than only counting problems.",

        resources: [
          "LeetCode",
          "NeetCode",
          "GeeksforGeeks",
          "Curated DSA sheets"
        ],

        practicalTask:
          "Build a consistent DSA practice portfolio, solve problems across the major patterns, document selected solutions, and regularly revisit problems that were difficult to solve.",

        expectedOutcome:
          "Be able to recognize common problem-solving patterns, solve problems independently, explain your approach, and analyze time and space complexity."
      },

      {
        stepNumber: 3,
        title: "Git & GitHub",
        level: "Foundation",
        duration: "1–2 weeks",
        prerequisites: "Programming Fundamentals",

        whyItMatters:
          "Version control is an essential part of professional software development and enables developers to manage code, collaborate, and track changes.",

        whatToLearn: [
          "Git Basics",
          "Repositories",
          "Commits",
          "Branches",
          "Merging",
          "Pull & Push",
          "Pull Requests",
          "Merge Conflicts",
          ".gitignore",
          "GitHub Workflows"
        ],

        practiceStrategy:
          "Use Git while building real projects instead of learning commands only theoretically. Practice creating branches, making commits, merging changes, and resolving conflicts.",

        resources: [
          "Git documentation",
          "GitHub documentation",
          "Git tutorials"
        ],

        practicalTask:
          "Create a GitHub repository, develop a feature on a separate branch, commit the changes, create a pull request, merge it, and practice resolving a merge conflict.",

        expectedOutcome:
          "Be comfortable using Git and GitHub as part of normal software development."
      },

      {
        stepNumber: 4,
        title: "Web Development Fundamentals",
        level: "Foundation",
        duration: "4–6 weeks",
        prerequisites: "Programming Fundamentals",

        whyItMatters:
          "Understanding how the web works provides the foundation for building modern frontend and backend applications.",

        whatToLearn: [
          "HTML",
          "CSS",
          "Responsive Design",
          "JavaScript",
          "DOM",
          "Events",
          "ES6+",
          "Promises & Async/Await",
          "HTTP Basics",
          "APIs"
        ],

        practiceStrategy:
          "Build small web applications while learning HTML, CSS, and JavaScript. Gradually introduce API calls and asynchronous programming.",

        resources: [
          "MDN Web Docs",
          "freeCodeCamp",
          "JavaScript learning resources"
        ],

        practicalTask:
          "Build a responsive web application that uses JavaScript and consumes data from a public API.",

        expectedOutcome:
          "Understand how a web application works in the browser and how frontend applications communicate with APIs."
      },

      {
        stepNumber: 5,
        title: "Frontend Development",
        level: "Core",
        duration: "5–8 weeks",
        prerequisites: "Web Development Fundamentals",

        whyItMatters:
          "Frontend development allows you to build interactive user interfaces and connect users with application functionality.",

        whatToLearn: [
          "React",
          "Components",
          "Props",
          "State",
          "Hooks",
          "Forms",
          "Routing",
          "API Integration",
          "TypeScript",
          "Loading & Error States"
        ],

        practiceStrategy:
          "Build increasingly complex React applications and practice managing state, handling forms, connecting APIs, and organizing reusable components.",

        resources: [
          "React documentation",
          "TypeScript documentation",
          "Frontend project tutorials"
        ],

        practicalTask:
          "Build a React + TypeScript application that consumes an API and includes multiple components, forms, routing, and proper loading and error states.",

        expectedOutcome:
          "Be able to create a structured, maintainable frontend application using React and TypeScript."
      },

      {
        stepNumber: 6,
        title: "Backend Development",
        level: "Core",
        duration: "5–8 weeks",
        prerequisites: "Programming Fundamentals + Web Development Fundamentals",

        whyItMatters:
          "Backend development provides the APIs, business logic, authentication, and server-side functionality that power modern applications.",

        whatToLearn: [
          "Node.js",
          "Express",
          "HTTP",
          "REST APIs",
          "Routes",
          "Controllers",
          "Services",
          "Middleware",
          "Validation",
          "Error Handling",
          "Authentication Basics",
          "Environment Variables"
        ],

        practiceStrategy:
          "Build REST APIs and gradually introduce validation, middleware, error handling, authentication, and database integration.",

        resources: [
          "Node.js documentation",
          "Express documentation",
          "REST API learning resources"
        ],

        practicalTask:
          "Build a REST API for an application with multiple resources, validation, error handling, and database connectivity.",

        expectedOutcome:
          "Be able to design and implement a clean REST API and understand the main responsibilities of a backend service."
      },

      {
        stepNumber: 7,
        title: "Databases & SQL",
        level: "Core",
        duration: "3–5 weeks",
        prerequisites: "Backend Development",

        whyItMatters:
          "Most real-world applications need reliable data storage, and software engineers need to understand how to design and query databases.",

        whatToLearn: [
          "SQL",
          "SELECT & Filtering",
          "INSERT, UPDATE & DELETE",
          "Joins",
          "Aggregation",
          "Subqueries",
          "Primary & Foreign Keys",
          "Relationships",
          "Normalization",
          "Indexes",
          "Transactions"
        ],

        practiceStrategy:
          "Practice SQL queries and design databases for real applications. Connect your database to backend APIs and work with realistic datasets.",

        resources: [
          "PostgreSQL documentation",
          "SQL practice platforms",
          "Database tutorials"
        ],

        practicalTask:
          "Design a relational database for a real application and connect it to a backend API using PostgreSQL.",

        expectedOutcome:
          "Be able to design a relational database, write practical SQL queries, and integrate PostgreSQL with a backend application."
      },

      {
        stepNumber: 8,
        title: "Build Real-World Projects",
        level: "Advanced",
        duration: "Ongoing",
        prerequisites: "Frontend + Backend + Database Fundamentals",

        whyItMatters:
          "Projects demonstrate whether you can combine your technical knowledge to solve real problems and build complete applications.",

        whatToLearn: [
          "Application Architecture",
          "Frontend + Backend Integration",
          "Database Integration",
          "Authentication",
          "Validation",
          "Error Handling",
          "Testing",
          "Deployment",
          "Documentation"
        ],

        practiceStrategy:
          "Progress from small projects to full-stack applications. Choose projects that solve meaningful problems and gradually increase their technical complexity.",

        resources: [
          "GitHub",
          "Project documentation",
          "Open-source projects"
        ],

        practicalTask:
          "Build a portfolio-level full-stack application using React, Node.js, Express, PostgreSQL, APIs, Git, and deployment.",

        expectedOutcome:
          "Be able to design, build, explain, document, and deploy a complete software application."
      },

      {
        stepNumber: 9,
        title: "Computer Science Fundamentals",
        level: "Core",
        duration: "4–6 weeks",
        prerequisites: "Programming + Database Fundamentals",

        whyItMatters:
          "Core computer science knowledge helps software engineers understand how systems work and prepares them for technical interviews.",

        whatToLearn: [
          "Object-Oriented Programming",
          "DBMS",
          "Operating Systems",
          "Computer Networks",
          "Concurrency Basics"
        ],

        practiceStrategy:
          "Study the concepts, create concise notes, and practice explaining them using practical examples rather than memorizing definitions.",

        resources: [
          "CS fundamentals courses",
          "GeeksforGeeks",
          "Technical interview resources"
        ],

        practicalTask:
          "Prepare explanations and examples for the major CS concepts and connect them to technologies used in your projects.",

        expectedOutcome:
          "Be able to explain important CS concepts clearly and understand how they relate to real software systems."
      },

      {
        stepNumber: 10,
        title: "Software Engineering Practices",
        level: "Advanced",
        duration: "3–5 weeks",
        prerequisites: "Real-World Projects",

        whyItMatters:
          "Writing code is only one part of software engineering. Professional development also requires maintainability, testing, debugging, documentation, and good engineering practices.",

        whatToLearn: [
          "Clean Code",
          "Modular Architecture",
          "Testing",
          "Code Reviews",
          "Debugging",
          "Logging",
          "Error Handling",
          "API Design",
          "Basic System Design",
          "Deployment Fundamentals"
        ],

        practiceStrategy:
          "Take an existing project and improve its structure, reliability, testing, documentation, and error handling.",

        resources: [
          "Software engineering books",
          "Testing documentation",
          "System design resources"
        ],

        practicalTask:
          "Refactor an existing project, add validation and tests, improve error handling, document the architecture, and deploy the application.",

        expectedOutcome:
          "Write software that is easier to maintain, test, debug, understand, and extend."
      },

      {
        stepNumber: 11,
        title: "Resume, GitHub & Portfolio",
        level: "Career Preparation",
        duration: "1–2 weeks",
        prerequisites: "Real-World Projects",

        whyItMatters:
          "A strong technical profile helps recruiters and hiring teams quickly understand your skills, projects, and experience.",

        whatToLearn: [
          "Technical Resume",
          "Project Descriptions",
          "GitHub Profile",
          "README Files",
          "Portfolio Website",
          "Project Presentation"
        ],

        practiceStrategy:
          "Present your strongest technical work clearly and remove unnecessary or weak information from your profile.",

        resources: [
          "Professional resume examples",
          "GitHub documentation",
          "Developer portfolio examples"
        ],

        practicalTask:
          "Create a technical resume, organize your GitHub profile, improve project READMEs, and create or refine a developer portfolio.",

        expectedOutcome:
          "Have a professional profile that clearly communicates your technical skills and projects."
      },

      {
        stepNumber: 12,
        title: "Technical Interview Preparation",
        level: "Career Preparation",
        duration: "6–10+ weeks",
        prerequisites: "DSA + CS Fundamentals + Projects",

        whyItMatters:
          "Technical interviews test problem solving, computer science knowledge, coding ability, and your understanding of the projects you have built.",

        whatToLearn: [
          "DSA Interview Patterns",
          "Coding Interviews",
          "Time & Space Complexity",
          "OOP",
          "DBMS",
          "Operating Systems",
          "Computer Networks",
          "Project Discussions",
          "Basic System Design"
        ],

        practiceStrategy:
          "Solve problems under realistic time limits, explain your thinking aloud, revise CS fundamentals, practice project questions, and conduct mock interviews.",

        resources: [
          "LeetCode",
          "NeetCode",
          "Interview preparation platforms",
          "Mock interviews"
        ],

        practicalTask:
          "Complete timed coding sessions, conduct mock interviews, prepare explanations for your major projects, and revise core CS topics.",

        expectedOutcome:
          "Be able to approach technical interview problems confidently, communicate your reasoning, and discuss your technical experience clearly."
      },

      {
        stepNumber: 13,
        title: "Job Application & Interview Strategy",
        level: "Career Preparation",
        duration: "Ongoing",
        prerequisites: "Resume + Portfolio + Interview Preparation",

        whyItMatters:
          "Getting a software engineering role requires more than technical skills. Students also need a consistent and organized job-search strategy.",

        whatToLearn: [
          "Finding Relevant Roles",
          "Reading Job Descriptions",
          "Resume Customization",
          "Networking",
          "Recruiter Communication",
          "Application Tracking",
          "Interview Follow-Up"
        ],

        practiceStrategy:
          "Apply consistently to relevant positions, track applications, tailor your profile when appropriate, and learn from interview outcomes.",

        resources: [
          "LinkedIn",
          "Company career pages",
          "Job boards",
          "Professional networking communities"
        ],

        practicalTask:
          "Create an application tracker, identify suitable roles, prepare tailored applications, and maintain a consistent job-search routine.",

        expectedOutcome:
          "Have a structured approach to finding, applying for, and progressing through software engineering opportunities."
      }
    ]
  }
};

module.exports = careerRoadmaps;
