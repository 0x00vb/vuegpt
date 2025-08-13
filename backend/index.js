import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import sessionsRoutes from './routes/sessions.routes.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', sessionsRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;