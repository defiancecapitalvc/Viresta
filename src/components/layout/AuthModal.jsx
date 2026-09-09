import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export function AuthModal({ open, onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-ink-800 p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">Account</p>
            <h2 className="text-xl font-semibold">{mode === "login" ? "Log in" : "Create account"}</h2>
          </div>
          <button type="button" className="rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          {mode === "register" && (
            <>
              <input
                className="input"
                placeholder="Name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
              <select
                className="input"
                value={form.role}
                onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
              >
                <option value="buyer">Buyer</option>
                <option value="agent">Agent</option>
                <option value="developer">Developer</option>
              </select>
            </>
          )}
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            required
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="btn w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-400">
          {mode === "login" ? "Need an account?" : "Already registered?"}{" "}
          <button
            type="button"
            className="text-white underline-offset-2 hover:underline"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
