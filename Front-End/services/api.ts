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
    token: string,
    aporteInicial: number,
    aporteMensal: number,
    taxaJuros: number
) => {
    const res = await fetch(`${API_URL}/simulations`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ aporteInicial, aporteMensal, taxaJuros }),
    });
    return res.json();
};

export const getSimulations = async (token: string) => {
    const res = await fetch(`${API_URL}/simulations`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};
