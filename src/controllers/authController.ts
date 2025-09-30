import {Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const signup = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({error: 'Email e senha obrigatórios'});

    const existingUser = await prisma.user.findUnique({ where: {email} });
    if(existingUser) return res.status(409).json({error: 'Usuario já existe'});

    const password_hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({data: {email, password_hash} });

    return res.status(201).json({ id: user.id, email: user.email });
}

export const login = async(req: Request, res:Response) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({error: 'Email e Senha obrigatórios'});

    const user = await prisma.user.findUnique({ where: {email} });
    if(!user) return res.status(401).json({error: 'Credenciais Inválidas'});

    const valid = await bcrypt.compare(password, user.password_hash);
    if(!valid) return res.status(401).json({error: 'Credenciais Inválidas'});

    const token =jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
}