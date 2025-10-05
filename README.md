Video Sharing Platform
Overview
This is a full-stack, responsive video-sharing platform designed for sharing videos. It allows registered users to upload, categorize, and stream video content seamlessly. With secure user authentication and robust content management features, it provides a centralized hub for community-driven video viewing.

Key Features
This platform is equipped with modern content management and security features:

Secure Video Upload: Registered users can upload videos easily via a dedicated interface, with content hosted externally for scalability.

Real-time Video Playback: Seamless and optimized streaming is handled by the Cloudinary Video Player.

User-Driven Content Editing: Users can modify the title and description of their own uploaded videos post-submission.

Admin-Controlled Categorization: Administrators have exclusive access to manage and assign video categories to ensure organized content indexing.

Robust User Security: User authentication (sign-up/log-in) is secured using JWT and bcrypt for industry-standard password hashing.

Responsive User Interface: The application is built with React and Tailwind CSS to ensure an optimal viewing experience across mobile and desktop devices.

Technology Stack
Frontend (Built with React & Vite)
Tool

Purpose

React, React DOM

Core library for building the declarative user interface.

React Router DOM

Manages client-side routing and navigation within the application.

Tailwind CSS, Flowbite-React

Utility-first CSS framework for responsive styling and UI component integration.

Cloudinary Video Player

Facilitates dynamic, optimized video streaming and playback.

Backend (Node.js & Express)
Tool

Purpose

Express, Body-Parser, CORS

Handles server routing, API requests, and middleware management.

Mongoose

Provides MongoDB Object Data Modeling (ODM) for database interaction.

Cloudinary

External service used for video storage, asset management, and content delivery.

Bcrypt

Library used for securely hashing user passwords.

JSON Web Token (JWT)

Manages secure, stateless user session and authorization.

Multer

Middleware for handling multipart form data, primarily file uploads.
