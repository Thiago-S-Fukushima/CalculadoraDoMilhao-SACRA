import express from 'express';
import authRoutes from './routers/authRouters';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API Calculadora do Milhão rodando"');
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => { 
    console.log(`Servidor Rodando na porta ${PORT}`);
});