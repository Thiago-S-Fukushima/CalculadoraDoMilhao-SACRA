"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { createSimulation, getSimulations } from "../../services/api";

export const DashboardPage = () => {
  useAuthGuard();

  const router = useRouter();
  const [aporteInicial, setAporteInicial] = useState("");
  const [aporteMensal, setAporteMensal] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("");
  const [historico, setHistorico] = useState<any[]>([]);
  const [resultados, setResultados] = useState<any[]>([]);

  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    console.error("Token não encontrado, redirecionando para login");
    router.push("/login");
    return null;
  }
  const token: string = storedToken;

  const handleSimulacao = async () => {
    try {
      const res = await createSimulation(
        token,
        Number(aporteInicial),
        Number(aporteMensal),
        Number(taxaJuros)
      );
      setResultados(res.resultados || []);
      await fetchHistorico(); // Atualiza histórico após simulação
    } catch (err: any) {
      console.error("Erro na simulação:", err.message || err);
      alert(err.message || "Erro na simulação");
    }
  };

  const fetchHistorico = async () => {
    try {
      const data = await getSimulations(token);
      if (Array.isArray(data)) {
        setHistorico(data);
      } else {
        setHistorico([]);
        console.error("Erro ao buscar histórico:", data.message);
      }
    } catch (error: any) {
      setHistorico([]);
      console.error("Erro ao buscar histórico:", error.message || error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>

      {/* Nova Simulação */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Nova Simulação</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Aporte Inicial"
            value={aporteInicial}
            onChange={e => setAporteInicial(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Aporte Mensal"
            value={aporteMensal}
            onChange={e => setAporteMensal(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Taxa de Juros (%)"
            value={taxaJuros}
            onChange={e => setTaxaJuros(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleSimulacao}
          className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          Simular
        </button>
      </div>

      {/* Resultados */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Resultados da Simulação</h2>
        <ul className="max-h-64 overflow-y-auto divide-y divide-gray-200">
          {resultados.map((r, i) => (
            <li key={i} className="py-3 flex justify-between items-center">
              Mês {r.mes}:{" "} 
              <span className="font-bold text-green-600">
                R$ {Number(r.total).toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Histórico */}
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Histórico de Simulações</h2>
        <ul className="max-h-64 overflow-y-auto divide-y divide-gray-200">
          {historico.map((h, i) => {
            const primeiroTotal = JSON.parse(h.resultados || "[]")[0]?.total || 0;
            return (
              <li key={i} className="py-3 flex justify-between items-center">
                <span className="text-gray-600">{h.calculation_date || h.createdAt}</span>
                <span className="font-bold text-blue-600">
                  R$ {Number(primeiroTotal).toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
