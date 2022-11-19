import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import v1_Router from './v1/index.js';

// Initialize API Server
const app = express();
const PORT = process.env.PORT || 3000;

// Use Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('tiny'))

app.use("/api/v1", v1_Router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

export default app;