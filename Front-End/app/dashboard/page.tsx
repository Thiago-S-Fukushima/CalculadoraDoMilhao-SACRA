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
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Nova Simulação */}
      <div className="card">
        <h2 className="card-title">Nova Simulação</h2>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Aporte Inicial"
            value={aporteInicial}
            onChange={e => setAporteInicial(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Aporte Mensal"
            value={aporteMensal}
            onChange={e => setAporteMensal(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Taxa de Juros (%)"
            value={taxaJuros}
            onChange={e => setTaxaJuros(e.target.value)}
            className="input"
          />
        </div>
        <button onClick={handleSimulacao} className="button">
          Simular
        </button>
      </div>

      {/* Resultados */}
      <div className="card">
        <h2 className="card-title">Resultados da Simulação</h2>
        <ul className="list">
          {resultados.map((r, i) => (
            <li key={i} className="list-item">
              Mês {r.mes}:{" "}
              <span className="highlight">
                R$ {Number(r.total).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Histórico */}
      <div className="card">
        <h2 className="card-title">Histórico de Simulações</h2>
        <ul className="list">
          {historico.map((h, i) => {
            const primeiroTotal = JSON.parse(h.resultados || "[]")[0]?.total || 0;
            return (
              <li key={i} className="list-item">
                <span className="date">{h.calculation_date || h.createdAt}</span>
                <span className="highlight">
                  R$ {Number(primeiroTotal).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
