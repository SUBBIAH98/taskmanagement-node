require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');

const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
// app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Optional static folder (if you need file uploads later)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);   // register, login
app.use('/api/tasks', taskRoutes);  // protected task operations

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Global Error Handler
app.use(errorHandler);

// Server + DB Boot
const port = process.env.PORT;

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true }); // safe for dev
        console.log('DB connected and synced');

        app.listen(port, () =>
            console.log(`Server running on port ${port}`)
        );
    } catch (err) {
        console.error('Unable to start server:', err);
        process.exit(1);
    }
}

start();
