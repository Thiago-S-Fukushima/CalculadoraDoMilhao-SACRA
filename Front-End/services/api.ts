const API_URL = "http://localhost:3333";

export const signup = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
};

export const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
};

export const createSimulation = async (
    token: string | null,
    aporteInicial: number,
    aporteMensal: number,
    taxaJuros: number
) => {
    if (!token) throw new Error("Token não fornecido");
    console.log("Enviando token para o backend:", token);

    const res = await fetch(`${API_URL}/simulations`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ aporteInicial, aporteMensal, taxaJuros }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        console.error("Resposta do backend:", errorData);
        throw new Error(errorData.message || "Erro na simulação");
    }

    return res.json();
};

export const getSimulations = async (token: string | null) => {
    if (!token) throw new Error("Token não fornecido");

    const res = await fetch(`${API_URL}/simulations`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao buscar histórico");
    }
    
    return res.json();
};
