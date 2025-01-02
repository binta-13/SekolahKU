const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const userCoursesRoutes = require('./routes/userCourses');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Course Management',
      version: '1.0.0',
      description: 'API untuk mengelola users, courses, dan userCourses',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Unique ID of the user' },
            name: { type: 'string', description: 'Name of the user' },
            email: { type: 'string', description: 'Email address of the user' },
            password: { type: 'string', description: 'Password for the user' },
            role: { type: 'string', description: 'Role of the user (e.g., admin, user)' },
          },
          required: ['name', 'email', 'password', 'role'],
        },
        Course: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Unique ID of the course' },
            name: { type: 'string', description: 'Name of the course' },
            description: { type: 'string', description: 'Description of the course' },
          },
          required: ['name', 'description'],
        },
        UserCourse: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Unique ID of the user-course relation' },
            userId: { type: 'integer', description: 'ID of the user' },
            courseId: { type: 'integer', description: 'ID of the course' },
          },
          required: ['userId', 'courseId'],
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Lokasi file route
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/users', usersRoutes);
app.use('/courses', coursesRoutes);
app.use('/userCourses', userCoursesRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Course Management API. Visit /api-docs for documentation.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
