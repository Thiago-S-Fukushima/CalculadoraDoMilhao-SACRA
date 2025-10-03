import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Mesma constante usada no login
const SECRET = "meuSuperSegredo123";

interface JwtPayLoad {
    id: number;
    email: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    } 

    // Bearer <token>
    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, SECRET) as JwtPayLoad;
        (req as any).user = decoded; // adiciona info do usuário na requisição
        next();
    } catch (err) {
        return res.status(401).json({ message: "token inválido" });
    }
}
