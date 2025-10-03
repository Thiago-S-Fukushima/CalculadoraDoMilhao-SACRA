"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, senha);
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Erro no login");
    }
  };

  return (
    <div className="login">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
}
