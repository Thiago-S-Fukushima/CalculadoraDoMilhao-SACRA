"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/signup");
  }, [router]);

  return null;
}


/*
export default function SimulationForm() {
  const [aporteInicial, setAporteInicial] = useState(1000);
  const [aporteMensal, setAporteMensal] = useState(500);
  const [taxaJuros, setTaxaJuros] = useState(1.5);
  const [result, setResult] = useState<any>(null);

  async function handleSimulation(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado.");
      return;
    }

    const res = await fetch("http://localhost:3333/simulations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ aporteInicial, aporteMensal, taxaJuros }),
    });

    if (res.ok) {
      const data = await res.json();
      setResult(data);
    } else {
      const err = await res.json();
      alert("Erro: " + err.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSimulation}>
        <input type="number" value={aporteInicial} onChange={(e) => setAporteInicial(Number(e.target.value))} />
        <input type="number" value={aporteMensal} onChange={(e) => setAporteMensal(Number(e.target.value))} />
        <input type="number" value={taxaJuros} onChange={(e) => setTaxaJuros(Number(e.target.value))} />
        <button type="submit">Simular</button>
      </form>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
*/