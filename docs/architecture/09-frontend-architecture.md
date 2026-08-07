# Frontend Architecture

## Overview

CareerVerse AI uses React and TypeScript to provide a responsive web application for career discovery, personalized learning, AI mentoring, resume building, and interview preparation.

The frontend communicates with the Spring Boot backend through versioned REST APIs.

---

# Frontend Stack

- React
- TypeScript
- React Router
- CSS / Tailwind CSS
- REST API
- JWT-based authentication
- Vitest / React Testing Library

---

# Application Structure

```text
frontend/
├── src/
│   ├── app/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── features/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   ├── types/
│   ├── utils/
│   └── assets/
│
├── public/
├── package.json
└── README.md