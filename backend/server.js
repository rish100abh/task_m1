const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

const clientUrls = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : [];
if (process.env.NODE_ENV === 'production' && clientUrls.length > 0) {
  app.use(cors({ origin: clientUrls }));
} else {
  app.use(cors()); // allow all origins if no client url configured or in development
}
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// mount routes under both /api/* and legacy /* for compatibility with deployed frontends
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// also expose projects/tasks/users without /api prefix for compatibility
app.use('/projects', require('./routes/projectRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/users', require('./routes/userRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
