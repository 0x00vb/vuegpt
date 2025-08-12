import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sessionsRoutes from './routes/sessions.routes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', sessionsRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;