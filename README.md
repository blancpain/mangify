# Mangify 🥗 🚀

Welcome to Mangify, your ultimate meal planning companion built with a powerful tech stack featuring Typescript, Postgres, Express, React, and Node. This full-stack app empowers users to streamline meal planning, calculate personalized macros, and generate comprehensive shopping lists.

## Overview

Mangify offers a seamless meal planning experience, from quick meal suggestions to detailed week-long plans. When you register, unlock the full potential of Mangify: generate meals, calculate macros, create shopping lists, and access detailed cooking instructions.

## Key Features

- 🍲 **Meal Generation:** Quickly generate meal ideas based on your preferences. 
- 📊 **Personalized Macros:** Calculate your personalized daily macronutrients. Additionally, view detailed macros for each day and for each individual meal.
- 🌿 **Preferences Customization:** Tailor your experience by adding dietary preferences, allergies, and intolerances.
- 📝 **Shopping List:** View a comprehensive shopping list with ingredients and quantities. Easily add or remove items as you buy them.
- 📖 **Detailed Instructions:** Access detailed cooking instructions for each meal.

## Tech Stack

Mangify leverages a cutting-edge tech stack to deliver a robust and efficient user experience:

- 🛢️ **Postgres:** 
- 📡 **Express:** 
- ⚛️ **React:** 
- 🖥️ **Node:** 
- 🔄 **Typescript:** 

## User Authentication

Mangify ensures secure user authentication using Redis for session storage and express-session for session ID generation. This approach minimizes client-side exposure of user credentials, enhancing overall security.

- 🔒 **Session Management:** Redis serves a dual purpose. It is employed for secure server-side session storage. Additionaly, Redis aids in 1-hour caching of meals, delivering a swift and responsive experience.
- 🍪 **Cookie Storage:** The session ID is securely stored client-side in a cookie, enhancing user security. 

## Frontend Technologies

- 🎣 **React Hook Form:** Simplifies form handling for a smooth user experience.
- 🔐 **Zod:** Provides robust schema validation for form data.
- 🎨 **Mantine:** Offers a set of polished React components for an attractive UI.
- 📊 **ChartJS:** Visualize meal macros with dynamic pie charts.
- 🌐 **React Router:** Effortless client-side navigation.
- 🚀 **Redux Toolkit and RTK Query:** State management and data fetching are handled efficiently using Redux Toolkit for state management and RTK Query for seamless API integration.
- 🪝 **Custom Hooks:** Leveraging the power of custom hooks to encapsulate and reuse logic throughout the application, ensuring clean and modular code.

## Backend Technologies

- 🔒 **Bcrypt:** Ensures secure password encryption for user credentials.
- 📈 **Express Rate Limit:** Sets limits to API calls. 
- 🧹 **Helmet:** Enhances safety with HTTP header security.
- 📊 **Winston and Morgan:** Logging tools for comprehensive log management.

## Deployment and Containerization

- 🐳 **Docker Compose:** Docker compose is used for orchestrating the containers for seamless deployment. The client, server, databases (Redis and Postgres) and Nginx are containerized for straightforward management and scalability. Separate Dockerfiles are included for the client and server.
- 🚀 **Hetzner Cloud:** Hosted on a dedicated VPS for scalable performance.
- 🌐 **Nginx:** Acts as a reverse proxy for enhanced server communication.

## Testing

- 🧪 **Jest:** Backend testing for robust code coverage.
- 🌐 **Cypress:** Frontend end-to-end testing for a reliable user interface.

## Code Quality

Mangify is built with a strong emphasis on code quality and consistency:

- 🚨 **Linting:** The codebase is rigorously checked for potential issues and stylistic inconsistencies using ESLint.
- ✨ **Formatting:** Code formatting is enforced using Prettier, ensuring a clean and consistent codebase throughout the project.

## Future Planned Features

Mangify is continually evolving. Future features in the pipeline include:

- 🌐 **Social Login:** Seamless registration with Facebook and Google.
- 📧 **Email Sending:** Automated emails for registration and potentially daily updates.
- 💾 **Meal Saving and Deletion:** Store and manage your favorite meals effortlessly.

## Try It Out!

Explore the power of Mangify now! Register to unleash the full potential, plan your meals effortlessly, and enjoy a seamless meal planning experience.

[**TRY MANGIFY**](https://www.mangify.org)
