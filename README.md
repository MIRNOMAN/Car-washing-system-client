## Live Project URL

[Quickwash Live](https://car-washing-system-client-kappa.vercel.app/)


## Introduction

CleanCarCo is a user-friendly web application designed to simplify the car wash booking process. This frontend application provides users with easy navigation, a streamlined booking experience, and a comprehensive admin dashboard for managing services, slots, and users.

## Project Description
The CleanCarCo frontend application allows users to explore car wash services, book appointments, and manage their profiles. Administrators can manage services, slots, and users from a dedicated dashboard. The application is built with React and styled using Tailwind CSS.

## Features

# Public Pages
 Home Page

## Features
- **User Authentication**: Secure login and registration with email, password, and phone number.
- **Service Booking**: Browse, select, and book car wash services with available time slots.
- **Payment Integration**: Redirects to AAMARPAY for payment processing.
- **Rating and Reviews**: Users can rate services and view reviews from other customers.
- **Responsive Design**: Optimized for desktop and mobile devices with a clean and modern UI.
- **Search & Filter**: Easily find services based on criteria like price and duration.

## Pages & Components

### 1. **Navigation Menu**
- Links to key pages such as:
  - **Home**
  - **Services**
  - **Booking**
  - **Login**
  - **Sign Up**

### 2. **Hero/Branding Section**
- An introductory section with a strong branding message and visuals, providing a welcoming experience.

### 3. **Call-to-Action Button**
- A prominent button that directs users to book a service.

### 4. **Featured Services**
- Display of popular services with descriptions and images.

### 5. **Review Section**
- **Input Field & Rating Component**: Users can submit feedback using a star-based rating system.
- **Post-Submission Display**: Displays the average rating and last two user reviews.
- **See All Reviews**: Button linking to the full review page.
- **Login Overlay**: Black overlay with a login button if the user is not logged in.

### 6. **Footer**
- Links to relevant pages, contact information, and social media links.

---

## User Authentication Pages

### 1. **Sign Up Page**
- Allows users to create an account with the following fields:
  - Name
  - Email
  - Password
  - Phone Number
  - Address

### 2. **Login Page**
- Secure login functionality with email and password fields.

---

## Services Page

- Lists all car wash services with descriptions, prices, and durations.
- Includes search, filter, and sort functionalities to find services easily.

---

## Service Details Page

- Displays detailed information about selected services.
- Showcases available time slots, with booked slots disabled.
- Option to select a time slot and book the service.

---

## Booking Page

### Left Side:
- Displays the selected service and time slot.

### Right Side:
- A form for submitting user information (e.g., name, email, time).
- A "Pay Now" button to redirect to AAMARPAY for payment processing.
- Updates slot status upon successful payment.

---

## Error Pages

- **Custom 404 Page**: Displayed for non-existent routes with navigation options to guide users back to the home or relevant pages.
## Admin Pages

Admin Dashboard
Features: Overview of recent bookings, user management, slot management, and service management.
Service Management:
View and manage services in a table format.
Add, update, and delete services with modals and confirmation dialogs.
Slot Management:
Create and manage slots.
Update slot status between AVAILABLE and CANCELLED, excluding booked slots.
User Management:
View user bookings, list users, and edit user roles.
User Pages
User Dashboard

Features: Overview of bookings and account information.
Functionality: Update profiles, manage personal information, and view past and upcoming bookings.
Service Slot Countdown

Features: Countdown timer for upcoming bookings displayed in the navbar and booking card.

## Technology Stack
Frontend: React, Tailwind CSS
State Management: Redux

## Installation Guideline
# Car Washing System Client

This is the client-side application for the Car Washing System, a web-based platform for booking car wash services. The client allows users to view available services, book slots, and manage their bookings.

## Installation Steps

### 1. Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/MIRNOMAN/Car-washing-system-client.git
