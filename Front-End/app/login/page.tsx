"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/api";

export const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password) 
      console.log("estou logado");
      if (res.token) {
        localStorage.setItem("token", res.token);
        router.push("/dashboard");
      } else {
        setError(res.message || "Erro no login");
      }
    } catch {
      setError("Erro no login");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
