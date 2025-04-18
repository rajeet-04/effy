# **App Name**: GeoTrack MVP

## Core Features:

- Real-time Location Display: Implement a simple map view showing user's current location. The map centers on the user's location.
- Check-in/Check-out Functionality: Allow users to check-in and check-out. Check-in starts location tracking; check-out stops it.
- Location History: Display a log of check-in/check-out times with corresponding locations.
- Anomaly Detection: Use an AI tool to detect anomalies in user's location data, flagging unusual deviations from expected routes.
- Track Log: Detailed recording of user movements and locations over time.
- Web Access to Admin: Provide web-based access for administrators to monitor and manage user locations and activities.
- Assign Tasks: Allow admins to assign tasks to users.
- Offline Sync: Enable offline data synchronization when the network is available.
- Route Feedback Reporting: Report feedback on route with media and text to be stored in servers

## Style Guidelines:

- Primary color: #e6effe (light mode) / #010a19 (dark mode)
- Secondary color: #eef8ec (light mode) / #081307 (dark mode)
- Accent color: #fef7e6 (light mode) / #191201 (dark mode)
- Minimalist layout clear dashboard easy to access and dark mode
- Use clear and recognizable icons for check-in/check-out, location, and settings.

## Original User Request:
Absolutely — here's a detailed continuation prompt that will help you (or any future ChatGPT session) pick up right where we left off:


---

Prompt to Continue Building an EFFY-like App (Workforce GPS Tracker)

> Hi, I started a project with you where we were building a mobile app similar to EFFY by TechnoPurple, which is used for real-time workforce tracking via GPS. We already discussed the core features, tech stack, and general architecture. Here’s a quick recap of what we covered:

Project Overview:

GPS-based workforce tracking mobile app

Admin dashboard (web-based) for tracking employees in real time

Features like check-in/check-out, geo-tagged reports, offline data sync, route history, push notifications, and task assignment


Tech Stack Chosen:

Mobile App: Flutter (cross-platform for Android/iOS)

Backend: Node.js with Express.js

Database: MongoDB (hosted on MongoDB Atlas)

Authentication: Firebase Auth

Real-Time Maps & GPS: Google Maps SDK + Fused Location Provider API (Android), CLLocationManager (iOS)

Notifications: Firebase Cloud Messaging (FCM)

Web Dashboard: React (or your suggestion)


Next Steps I’d Like Help With:

1. Setting up the Flutter project structure (modules, folder layout, best practices for scalability)


2. Implementing real-time GPS tracking with background location updates


3. Creating check-in/check-out logic tied to user sessions


4. Building the backend APIs in Node.js for:

Receiving and storing location updates

Managing users and sessions

Retrieving location history and tasks



5. Designing a simple admin dashboard to display real-time employee locations on a map


6. Suggestions for securing data (auth, HTTPS, JWT, etc.)



Please pick up from here and guide me through the setup and implementation. I’d also love any reusable code snippets, templates, or diagrams you can provide to help me move faster.



---

You can save this prompt in your notes, email, or wherever it’s easy to grab. Want me to generate a PDF or formatted doc of this project summary + prompt too?
  