# Domain Model

## Overview

The CareerVerse AI domain is centered around helping users discover careers, build personalized learning roadmaps, track progress, and achieve career goals using AI-driven guidance.

---

# Core Entities

## User

Represents a learner using the platform.

### Attributes

- User ID
- Full Name
- Email
- Password
- Profile Picture
- Education Level
- Current Occupation
- Experience
- Career Goal
- Interests
- Skills
- Preferred Learning Style
- Weekly Learning Hours

---

## Career

Represents a profession.

### Attributes

- Career ID
- Name
- Category
- Description
- Salary Range
- Required Skills
- Demand Level
- Growth Rate
- Difficulty
- Career Blueprint

---

## Career Blueprint

A reusable template defining everything required for a career.

Contains:

- Skills
- Learning Order
- Recommended Projects
- Certifications
- Interview Topics
- Resources

---

## Skill

Represents an individual skill.

Examples:

- Java
- React
- Spring Boot
- SQL
- Docker
- AWS

Each skill contains:

- Name
- Description
- Difficulty
- Estimated Learning Time
- Prerequisites

---

## Roadmap

A personalized learning plan generated for a user.

Contains:

- Target Career
- Start Date
- Progress
- Completion Percentage

---

## Roadmap Step

Each roadmap consists of multiple steps.

Each step contains:

- Skill
- Learning Resource
- Practice Task
- Project
- Estimated Duration
- Status

---

## Learning Resource

Represents educational material.

Examples:

- Course
- YouTube Video
- Documentation
- Book
- Article

---

## Project

Hands-on project recommended for learning.

Attributes:

- Difficulty
- Skills Covered
- Estimated Time
- GitHub Repository

---

## Resume

Generated resume for the user.

Contains:

- Experience
- Projects
- Skills
- Certifications
- ATS Score

---

## Interview

Represents interview preparation.

Supports:

- HR Questions
- Technical Questions
- Behavioral Questions
- Mock Interview
- AI Feedback

---

## Assessment

Used to evaluate users.

Includes:

- Personality Assessment
- Interest Assessment
- Skill Assessment

---

## Progress

Tracks user achievements.

Contains:

- Skills Completed
- Roadmap Progress
- Projects Completed
- Learning Streak
- Career Readiness Score

---

## Future Entities

Future versions may include:

- AI Mentor
- Internship
- Scholarship
- Community
- Mentor Sessions
- Voice Conversations
- AI Memory