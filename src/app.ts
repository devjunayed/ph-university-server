import express, { Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';


const app = express();


app.use(express.json())
app.use(cors())
app.use("/api/v1", UserRoutes)
app.get("/", (req: Request, res: Response) => {
    res.send('Server is running');
})

export default app;