import express from 'express';
import cors from "cors";
import authRoutes from './routes/authRoutes';
import simulationRoutes from "./routes/simulationRoutes";

const app = express();

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use("/simulations", simulationRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.redirect("http://localhost:3000/signup");
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => { 
    console.log(`Servidor Rodando na porta ${PORT}`);
});