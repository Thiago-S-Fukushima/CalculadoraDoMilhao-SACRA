import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayLoad {
    id: number;
    email: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({message: 'Token não fornecido'});
    } 

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayLoad;

        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({mesage: "token inválido"});
    }
}