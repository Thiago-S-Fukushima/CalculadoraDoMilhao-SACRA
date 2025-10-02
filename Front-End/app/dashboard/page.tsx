"use client";
import { useState, useEffect } from "react";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { createSimulation, getSimulations } from "../../services/api";

export const DashboardPage = () => {
  useAuthGuard();

  const [aporteInicial, setAporteInicial] = useState(0);
  const [aporteMensal, setAporteMensal] = useState(0);
  const [taxaJuros, setTaxaJuros] = useState(0);
  const [historico, setHistorico] = useState<any[]>([]);
  const [resultados, setResultados] = useState<any[]>([]);

  const token = localStorage.getItem("token") || "";

  const handleSimulacao = async () => {
    const res = await createSimulation(token, aporteInicial, aporteMensal, taxaJuros);
    setResultados(res.resultados || []);
    fetchHistorico();
  };

  const fetchHistorico = async () => {
    const data = await getSimulations(token);
    setHistorico(data);
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Nova Simulação</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="number"
            placeholder="Aporte Inicial"
            value={aporteInicial}
            onChange={e => setAporteInicial(Number(e.target.value))}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Aporte Mensal"
            value={aporteMensal}
            onChange={e => setAporteMensal(Number(e.target.value))}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Taxa de Juros (%)"
            value={taxaJuros}
            onChange={e => setTaxaJuros(Number(e.target.value))}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleSimulacao}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Simular
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Resultados da Simulação</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md max-h-64 overflow-y-auto">
          {resultados.map((r, i) => (
            <li key={i} className="border-b last:border-b-0 py-2">
              Mês {r.mes}: <span className="font-bold">R$ {r.total}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Histórico de Simulações</h2>
        <ul className="space-y-4 max-h-64 overflow-y-auto">
          {historico.map((h, i) => {
            const primeiroTotal = JSON.parse(h.resultados || "[]")[0]?.total || 0;
            return (
              <li
                key={i}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span>{h.calculation_date || h.createdAt}</span>
                <span className="font-bold">R$ {primeiroTotal}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
