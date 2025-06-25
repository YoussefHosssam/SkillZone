# SkillZone – Educational Center & Course Management Platform 🎓

SkillZone is a backend API for managing educational centers, branches, courses, instructors, and student interactions. It provides a scalable and secure system for students to discover courses and for center admins to manage their institutions efficiently.

## Features ✨

### Authentication & Authorization
- 🔐 JWT-based authentication
- 👥 Role-based access (Students & Center Admins)
- ✉️ Email verification

### Center Management
- 🏢 Create/manage multiple centers
- 🏬 Add branches with geo-location
- 📍 Nearby branch search

### Course System
- 📚 Create courses with schedules
- 🔍 Filter by location/price/rating
- 👨‍🏫 Instructor assignments

### Engagement Features
- ⭐ Review system (Courses/Instructors/Branches)
- ❤️ Bookmarking favorites
- 📊 Rating aggregations

## Tech Stack ⚙️

**Backend:**  
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)

**Database:**  
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)

**Auth:**  
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=JSON%20web%20tokens)

## API Documentation 📚

Full API documentation available via:
- [Swagger UI](http://your-api-url/docs) (when deployed)
- [Postman Collection](link-to-postman) (optional)

Key endpoints:
| Type        | Endpoint                     | Description                  |
|-------------|------------------------------|------------------------------|
| `POST`      | `/auth/register`             | User registration            |
| `POST`      | `/auth/login`                | User login                   |
| `GET`       | `/branches/nearby?lat=&lng=` | Find nearby branches         |
| `POST`      | `/branches/:id/courses`      | Add course to branch         |
| `POST`      | `/reviews`                   | Submit review                |

## Database Setup 🗄️
The application uses MongoDB with the following collections:

**users** - Student and admin accounts

**centers** - Educational institutions

**branches** - Physical locations

**courses** - Offered classes

**instructors** - Teaching staff

**reviews** - Ratings and feedback

**favorites** - Bookmarked items
