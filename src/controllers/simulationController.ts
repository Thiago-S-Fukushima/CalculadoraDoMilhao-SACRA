import { Request, Response } from "express";
import { prisma } from "../prisma";

export const createSimulation = async (req: Request, res: Response) => {
  try {
    const { aporteInicial, aporteMensal, taxaJuros } = req.body;
    const userId = (req as any).user.id;

    let total = aporteInicial;
    let mes = 0;
    const resultados: { mes: number; total: number }[] = [];

    while (total < 1_000_000) {
      mes++;
      total = (total + aporteMensal) * (1 + taxaJuros / 100);
      resultados.push({
        mes,
        total: parseFloat(total.toFixed(2)),
      });
    }

    const simulation = await prisma.simulation.create({
      data: {
        userId,
        aporteInicial,
        aporteMensal,
        taxaJuros,
        resultados: JSON.stringify(resultados),
      },
    });

    return res.status(201).json({ simulation, resultados });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar simulação", error });
  }
};

export const getSimulations = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const simulations = await prisma.simulation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return res.json(simulations);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar histórico", error });
  }
};