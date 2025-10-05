# Video Sharing Platform

## Overview
This is a full-stack, responsive video-sharing platform designed for community-based content sharing.  
Registered users can upload, categorize, and stream videos seamlessly.  
With secure authentication and robust content management, it provides a centralized hub for video viewing and discovery.

---

## Key Features

- **Secure Video Upload** – Registered users can easily upload videos via a dedicated interface, with content hosted externally for scalability.  
- **Real-time Video Playback** – Seamless, optimized streaming powered by Cloudinary Video Player.  
- **User-Driven Content Editing** – Uploaders can modify video titles and descriptions after submission.  
- **Admin-Controlled Categorization** – Admins can manage and assign video categories for organized indexing.  
- **Robust User Security** – Authentication powered by JWT and bcrypt for secure, industry-standard password protection.  
- **Responsive UI** – Built using React and Tailwind CSS, ensuring a smooth experience across devices.

---

## Technology Stack

### Frontend (React + Vite)

| Tool | Purpose |
|------|----------|
| React, React DOM | Core library for building the declarative user interface |
| React Router DOM | Handles client-side routing and navigation |
| Tailwind CSS, Flowbite-React | Utility-first CSS framework and UI component library |
| Cloudinary Video Player | Enables optimized and dynamic video playback |

### Backend (Node.js + Express)

| Tool | Purpose |
|------|----------|
| Express, Body-Parser, CORS | Server routing, API handling, and middleware management |
| Mongoose | MongoDB Object Data Modeling (ODM) for schema and data handling |
| Cloudinary | Video storage, asset management, and delivery network |
| Bcrypt | Secure hashing for user passwords |
| JSON Web Token (JWT) | Stateless authentication and session management |
| Multer | Handles file uploads (multipart form data) |
| dotenv | Loads environment variables securely |

---
