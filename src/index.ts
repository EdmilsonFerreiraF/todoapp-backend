import express, { Express } from 'express';
import cors from 'cors';

import { userRouter } from './controller/routes/UserRouter';
import { taskRouter } from './controller/routes/TaskRouter';
import { listRouter } from './controller/routes/ListRouter';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('/list', listRouter);

app.listen(process.env.DB_PORT || 3003, () => {
    console.log("Servidor rodando na porta 3003");
});