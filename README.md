# 🚀 FitTracker – AI-Powered Fitness Analytics Platform

[![Java](https://img.shields.io/badge/Java-21-blue?logo=java)](https://www.java.com/) 
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.0-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot) 
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/) 
[![Kafka](https://img.shields.io/badge/Apache%20Kafka-2.9-yellow?logo=apachekafka)](https://kafka.apache.org/) 
[![Docker](https://img.shields.io/badge/Docker-24-blue?logo=docker)](https://www.docker.com/) 
[![Keycloak](https://img.shields.io/badge/Keycloak-21-red?logo=keycloak)](https://www.keycloak.org/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwindcss)](https://tailwindcss.com/) 
[![Material UI](https://img.shields.io/badge/Material%20UI-5-purple?logo=mui)](https://mui.com/)

---

FitTracker is a Full-Stack Microservices-based Fitness Application built with Spring Boot, React (Vite), Apache Kafka, Keycloak, and Google Gemini AI.

The platform allows users to log their physical activities (e.g., running, cycling, workouts) and receive AI-powered personalized recommendations for:
- ✅ Performance Analysis & Optimization
- ✅ Safety Guidelines
- ✅ Potential Improvements
- ✅ Wellness Suggestions

This project demonstrates modern software architecture with microservices, event-driven communication, authentication, and AI integration – designed to be scalable, secure, and future-ready.

---

## 🏗️ Architecture Overview
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend│    │  API Gateway     │    │  Eureka Server  │
│   (Vite + MUI)  │◄──►│  (Spring Cloud)  │◄──►│  (Service Disc) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Microservices Ecosystem                    │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │ Activity    │    │ User        │    │ AI Service          │  │
│  │ Service     │◄──►│ Service     │◄──►│ (Gemini Pro API)    │  │
│  └─────────────┘    └─────────────┘    └─────────────────────┘  │
│          │               │               │                      │
│          └───────┬───────┴───────────────┘                      │
│                  ▼                                              │
│          ┌───────────────┐                                      │
│          │ Apache Kafka  │                                      │
│          │ (Event Bus)   │                                      │
│          └───────────────┘                                      │
└─────────────────────────────────────────────────────────────────┘

FitTracker follows a **Microservices Architecture**:

### 🔹 Backend (Spring Boot Microservices)
- **Eureka Server** → Service discovery and registry for microservices.
- **API Gateway** → Central entry point for routing, authentication, and load balancing.
- **User Service** → Manages user accounts and fitness data (PostgreSQL).
- **Activity Service** → Handles activity logs such as duration, type, and calories burned (MongoDB).
- **AI Service** → Consumes Kafka events, communicates with Google Gemini API, and generates personalized recommendations.

### 🔹 Security
- **Keycloak Authentication Server** → Provides secure login, JWT-based authentication, and role-based access.

### 🔹 Event Streaming
- **Apache Kafka** → Enables communication between microservices via event-driven architecture.

### 🔹 Databases
- **PostgreSQL** → For user data (relational)
- **MongoDB Atlas** → For activity logs & AI recommendations (document-based)

### 🔹 Frontend (React + Vite)
- **React 19 + Vite** → Fast, modern frontend development
- **Tailwind CSS + Material UI** → Sleek, responsive UI
- **Redux Toolkit** → State management
- **Keycloak-js** → Frontend authentication with Keycloak

---

## 🔮 Workflow
1. User logs in securely via Keycloak.
2. User enters a new fitness activity (e.g., Running – 30 mins – 300 calories).
3. Activity is published to Apache Kafka.
4. AI Service consumes the event, calls Google Gemini API, and generates insights.
5. Recommendations are stored in MongoDB and displayed in the frontend.

---

## 🛠️ Tech Stack

**Backend:**  
- Java 21, Spring Boot  
- Spring Cloud (Eureka, Gateway)  
- Spring Data JPA & MongoDB  
- Spring Security + Keycloak  
- Spring Kafka  

**Frontend:**  
- React 19 + Vite  
- Tailwind CSS, Material UI  
- Redux Toolkit  
- Keycloak-js for authentication  

**Databases & Infrastructure:**  
- PostgreSQL (relational)  
- MongoDB Atlas (document-based)  
- Apache Kafka (event streaming)  

**AI Integration:**  
- Google Gemini API (Free version)  

---

## ⚡ Key Features
- 🔑 Secure Authentication & Authorization with Keycloak  
- 🏃 Track Physical Activities (type, duration, calories)  
- 📡 Event-driven communication with Apache Kafka  
- 🤖 AI-powered Recommendations (Gemini API integration)  
- 🔍 Service Discovery & Load Balancing with Eureka + Gateway  
- 🖥️ Modern Frontend with React, Tailwind, Material UI  
- 🛠️ Microservices Best Practices (scalable, loosely coupled, resilient)  

---

## 📂 Project Structure
FitTracker/
├── 📁 Microservices (Spring Boot)
│   ├── activityservice/          # Activity management service
│   │   ├── src/main/java/com/fitness/activityservice/
│   │   │   ├── ActivityserviceApplication.java
│   │   │   ├── config/           # Mongo and WebClient configuration
│   │   │   ├── controller/       # ActivityController
│   │   │   ├── dto/              # ActivityRequest, ActivityResponse
│   │   │   ├── model/            # Activity, ActivityType entities
│   │   │   └── service/          # Business logic and repository
│   │   └── application.yml
│   │
│   ├── aiservice/                # AI recommendation service
│   │   ├── src/main/java/com/fitness/aiservice/
│   │   │   ├── AiserviceApplication.java
│   │   │   ├── config/           # Mongo configuration
│   │   │   ├── controller/       # RecommendationController
│   │   │   ├── model/            # Activity, Recommendation entities
│   │   │   ├── repository/       # Data access layer
│   │   │   └── service/          # Gemini AI integration & Kafka listener
│   │   └── application.yml
│   │
│   ├── configservice/            # Central configuration service
│   │   ├── src/main/java/com/fitness/configservice/
│   │   │   └── ConfigserviceApplication.java
│   │   └── resources/config/     # Service-specific configurations
│   │
│   ├── eureka/                   # Service discovery server
│   │   ├── src/main/java/com/fitness/eureka/
│   │   │   └── EurekaApplication.java
│   │   └── application.yml
│   │
│   ├── gateway/                  # API Gateway with security
│   │   ├── src/main/java/com/fitness/gateway/
│   │   │   ├── GatewayApplication.java
│   │   │   ├── KeycloakUserSyncFilter.java
│   │   │   ├── SecurityConfig.java
│   │   │   └── user/             # User management components
│   │   └── application.yml
│   │
│   └── userservice/              # User management service
│       ├── src/main/java/com/fitness/userservice/
│       │   ├── UserRepository.java
│       │   ├── UserserviceApplication.java
│       │   ├── controller/       # UserController
│       │   ├── dto/              # Data transfer objects
│       │   ├── models/           # User entities
│       │   └── services/         # Business logic
│       └── application.yml
│
├── 📁 Frontend (React + Vite)
│   └── fitness-frontend/
│       ├── src/
│       │   ├── components/       # Reusable UI components
│       │   │   ├── ActivityCard.jsx
│       │   │   ├── ActivityDetail.jsx
│       │   │   ├── ActivityForm.jsx
│       │   │   ├── ActivityList.jsx
│       │   │   ├── Navbar.jsx
│       │   │   └── ProtectedRoute.jsx
│       │   ├── pages/            # Application pages
│       │   │   ├── DashboardPage.jsx
│       │   │   ├── Homepage.jsx
│       │   │   └── LoginPage.jsx
│       │   ├── services/         # API communication
│       │   │   └── api.js
│       │   └── store/            # Redux state management
│       │       ├── authSlice.js
│       │       └── store.js
│       ├── package.json
│       └── vite.config.js
│
├── 📄 Configuration Files
│   ├── docker-compose.yml        # Container orchestration
│   ├── pom.xml                   # Maven build configuration
│   └── application.yml files     # Service-specific configurations
│
└── 📄 Documentation
    ├── README.md                 # Project overview
    └── API_DOCS.md              # API documentation



---

## 🎯 Learning Outcomes
- Building distributed microservices architecture with Spring Boot  
- Integrating event-driven communication using Apache Kafka  
- Implementing enterprise-grade authentication with Keycloak  
- Consuming AI APIs (Google Gemini) in a real-world scenario  
- Designing a full-stack application with React & Spring Boot  

---

## 📌 Future Improvements
- Add GraphQL API Gateway  
- Enable CI/CD with GitHub Actions  
- Implement real-time notifications via WebSockets  
- Extend AI service to support dietary & workout recommendations  

---

## 👨‍💻 Author
**Praveen Verma**  
Aspiring Software Developer | Tech Enthusiast | Microsoft Learn Student Ambassador  

🌐 Passionate about Problem Solving, AI, and Microservices  

✨ FitTracker is a showcase of building scalable, secure, and AI-powered applications using modern software architecture.

