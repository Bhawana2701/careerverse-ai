# API Design

## Overview

CareerVerse AI exposes REST APIs that allow the React frontend to communicate with the Spring Boot backend.

The API layer is responsible for authentication, user management, career discovery, assessments, roadmaps, learning progress, resumes, interviews, and AI capabilities.

---

# API Principles

- RESTful API design
- JSON request and response format
- HTTPS in production
- Stateless authentication
- Consistent error responses
- API versioning
- Input validation
- Authorization at the backend
- Pagination for large collections
- Rate limiting for expensive AI operations

---

# Base URL

Development:

```text
http://localhost:8080/api/v1
```

Production:

```text
https://api.careerverse.ai/api/v1
```

---

# Authentication

## Register

```http
POST /auth/register
```

Request:

```json
{
  "firstName": "Bhawana",
  "lastName": "Kandoi",
  "email": "user@example.com",
  "password": "********"
}
```

Response:

```json
{
  "userId": "uuid",
  "message": "Registration successful"
}
```

---

## Login

```http
POST /auth/login
```

Request:

```json
{
  "email": "user@example.com",
  "password": "********"
}
```

Response:

```json
{
  "accessToken": "token",
  "expiresIn": 3600
}
```

---

## Get Current User

```http
GET /users/me
```

Returns the authenticated user's profile.

---

# Career APIs

## List Careers

```http
GET /careers
```

Optional parameters:

```text
?page=0&size=20&category=technology
```

---

## Search Careers

```http
GET /careers/search?q=software
```

---

## Get Career

```http
GET /careers/{careerId}
```

---

## Save Career

```http
POST /users/me/saved-careers/{careerId}
```

---

## Remove Saved Career

```http
DELETE /users/me/saved-careers/{careerId}
```

---

# Assessment APIs

## Start Assessment

```http
POST /assessments
```

---

## Get Assessment

```http
GET /assessments/{assessmentId}
```

---

## Submit Assessment

```http
POST /assessments/{assessmentId}/responses
```

---

## Get Career Recommendations

```http
GET /assessments/{assessmentId}/recommendations
```

---

# Skill APIs

## Get User Skills

```http
GET /users/me/skills
```

---

## Add Skill

```http
POST /users/me/skills
```

Request:

```json
{
  "skillId": "skill-id",
  "proficiencyLevel": 3
}
```

---

## Update Skill

```http
PATCH /users/me/skills/{skillId}
```

---

## Skill Gap Analysis

```http
POST /career-paths/{careerId}/skill-gap
```

Response:

```json
{
  "career": "Backend Developer",
  "skills": [
    {
      "skill": "Spring Boot",
      "currentLevel": 1,
      "requiredLevel": 4,
      "priority": "HIGH"
    }
  ]
}
```

---

# Roadmap APIs

## Generate Roadmap

```http
POST /roadmaps
```

Request:

```json
{
  "careerId": "career-id",
  "weeklyHours": 10,
  "targetDate": "2027-01-01"
}
```

---

## Get User Roadmaps

```http
GET /roadmaps
```

---

## Get Roadmap

```http
GET /roadmaps/{roadmapId}
```

---

## Update Roadmap Step

```http
PATCH /roadmaps/{roadmapId}/steps/{stepId}
```

Request:

```json
{
  "status": "COMPLETED"
}
```

---

# Learning APIs

## Get Resources

```http
GET /resources
```

---

## Get Resources for a Skill

```http
GET /skills/{skillId}/resources
```

---

## Track Learning Progress

```http
POST /learning/progress
```

---

# Resume APIs

## Create Resume

```http
POST /resumes
```

---

## Get Resumes

```http
GET /resumes
```

---

## Get Resume

```http
GET /resumes/{resumeId}
```

---

## Analyze Resume with AI

```http
POST /resumes/{resumeId}/analysis
```

---

# Interview APIs

## Create Interview

```http
POST /interviews
```

Request:

```json
{
  "interviewType": "TECHNICAL",
  "targetRole": "Software Engineer",
  "targetCompany": "Amazon"
}
```

---

## Start Interview

```http
POST /interviews/{interviewId}/start
```

---

## Submit Answer

```http
POST /interviews/{interviewId}/answers
```

---

## Get Interview Results

```http
GET /interviews/{interviewId}/results
```

---

# AI APIs

AI APIs should be exposed through the backend rather than directly from the browser to an LLM provider.

---

## Career Recommendation

```http
POST /ai/career-recommendations
```

---

## Roadmap Generation

```http
POST /ai/roadmaps/generate
```

---

## AI Career Assistant

```http
POST /ai/chat
```

Request:

```json
{
  "message": "What should I learn after Java?",
  "conversationId": "conversation-id"
}
```

---

## AI Mentor

Future endpoint:

```http
POST /ai/mentor/sessions
```

---

## AI Interview

Future endpoints:

```http
POST /ai/interviews
POST /ai/interviews/{id}/answer
GET /ai/interviews/{id}/feedback
```

---

# Progress APIs

## Get Dashboard

```http
GET /users/me/dashboard
```

---

## Get Career Readiness

```http
GET /users/me/career-readiness
```

---

## Get Learning Statistics

```http
GET /users/me/progress
```

---

# Notifications

## Get Notifications

```http
GET /notifications
```

---

## Mark Notification as Read

```http
PATCH /notifications/{notificationId}/read
```

---

# Error Response

All APIs should use a consistent error structure.

Example:

```json
{
  "timestamp": "2026-08-07T10:30:00Z",
  "status": 400,
  "error": "VALIDATION_ERROR",
  "message": "Invalid request",
  "path": "/api/v1/roadmaps"
}
```

---

# HTTP Status Codes

Common status codes:

- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 422 Unprocessable Entity
- 429 Too Many Requests
- 500 Internal Server Error

---

# API Security

All protected endpoints must require authentication.

Authorization must be enforced by the backend.

The frontend must never be trusted to determine whether a user can access or modify another user's data.

AI endpoints should have additional rate limits because they can be computationally expensive.

---

# API Versioning

The initial API version is:

```text
/api/v1
```

Breaking API changes should use a new version rather than silently changing an existing contract.

---

# Pagination

Large collections should support pagination.

Example:

```text
GET /careers?page=0&size=20
```

Response:

```json
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 250,
  "totalPages": 13
}
```

---

# Future APIs

Potential future capabilities:

- AI Mentor Sessions
- Voice Conversations
- Video Interviews
- Live Coding
- Internships
- Scholarships
- Human Mentors
- Career Trends
- Proactive AI Notifications