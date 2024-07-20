# Quick-Snyk Web App

[Visit Quick-Snyk](https://quick-snyk.onrender.com)

**Author:** Hendrich Buhrer 

## Overview

Welcome to Quick-Snyk, where securing your open-source projects is as simple as entering a GitHub URL. This repository contains the full codebase for the Quick-Snyk web app. The goal of this project is to demonstrate my skills in web development, focusing on code quality, structure, and adherence to best practices.

## What is Quick-Snyk?

Quick-Snyk harnesses the power of the Snyk Command Line Interface (CLI) to swiftly scan public GitHub repositories for security vulnerabilities. Simply input the URL of any public GitHub repository, and Quick-Snyk will analyze its dependencies against Snyk's extensive database of known vulnerabilities. The scan results detail the security issues discovered, along with their severity levels.

## Unique Implementation

This project is a first of its kind, integrating Snyk CLI in a completely new way that I figured out on my own. Before this, there was no documentation or guide on how to achieve this integration. I had to build custom commands to handle the build and deployment processes, ensuring the security and functionality of the web app. An example of such a custom build command is:

**json
"build": "npm install && npm install -g snyk && npx snyk auth (YOUR OWN SNYK API KEY) && npx nuxt build"**

The Snyk API key is hidden here on GitHub for safety purposes, but the deployed website works perfectly, demonstrating the effective implementation of these custom commands.

## Code Quality and Practices

The Quick-Snyk website is developed with a strong emphasis on:

- **Clean and Maintainable Code**: Adhering to industry standards and best practices to ensure the code is easy to read and maintain.
- **Security**: Implementing security measures throughout the codebase to protect against vulnerabilities.
- **Performance**: Optimizing the website for speed and responsiveness.

## Key Features

- **No Installation Required**: Users can simply enter a GitHub URL to start scanning without needing to install anything.
- **Real-Time Vulnerability Scanning**: Uses the Snyk CLI to provide real-time security assessments of GitHub repositories.
- **User-Friendly Interface**: Designed to be accessible for both technical and non-technical users.
- **Responsive Design**: Ensuring the web app is functional across various devices and screen sizes.

## File Structure

The repository is organized to reflect a clean and intuitive structure:

- **app.vue**: Main Vue component for the application.
- **server/api/scanRepo.js**: Handles the scanning logic using Snyk CLI.
- **pages/index.html**: Main landing page.
- **pages/about-page.vue**: About page detailing what Quick-Snyk is and how to use it.
- **pages/login.vue**: Login page for users.
- **pages/please-login.vue**: Prompt page for users to login or signup.
- **pages/signup.vue**: Signup page for new users.
- **pages/user-dashboard.vue**: User dashboard displaying scan results.
- **components/ContactForm.vue**: Contact form component.
- **components/footer.vue**: Footer component.
- **components/MainHero.vue**: Main hero section component.
- **components/navbar.vue**: Navigation bar component.
- **components/threecard.vue**: Testimonial card component.

## Deployment

The Quick-Snyk web app is deployed and can be viewed live at [https://www.quick-snyk.com](https://quick-snyk.onrender.com).

## Explore the Code

All the source files for Quick-Snyk are available in this repository. You can explore the code to see the structure, implementation of security features, and overall quality of the codebase.

The key files in this repository include:

- **app.vue**: The main entry point for the Vue.js application.
- **server/api/scanRepo.js**: The API endpoint for scanning GitHub repositories using the Snyk CLI.
- **pages/**: Directory containing various Vue.js pages.
- **components/**: Directory containing reusable Vue.js components.

## Conclusion

The Quick-Snyk web app is a showcase of my web development capabilities, focusing on delivering high-quality, secure, and performant code. Feel free to review the code, provide feedback, and appreciate the efforts put into creating an efficient web application for security scanning.

---

Thank you for visiting the Quick-Snyk web app repository. Your feedback and contributions are always welcome!
