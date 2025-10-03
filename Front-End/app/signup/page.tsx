"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:3333/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setMessage("Usuário criado com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      const err = await res.json();
      setMessage("Erro: " + err.message);
    }
  }

  return (
    <div className="register-container">
      <h1 className="register-title">Cadastro</h1>
      <form className="register-form" onSubmit={handleSignup}>
        <input
          type="email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit" className="register-button">Cadastrar</button>
      </form>
      {message && <p className="register-message">{message}</p>}
    </div>
  );
}
