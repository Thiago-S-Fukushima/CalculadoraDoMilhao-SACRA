"use client";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:3333/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setMessage("Usuário criado com sucesso!");
    } else {
      const err = await res.json();
      setMessage("Erro: " + err.message);
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Cadastrar</button>
      <p>{message}</p>
    </form>
  );
}
