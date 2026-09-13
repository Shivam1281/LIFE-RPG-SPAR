import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Register({ onSwitchToLogin }) {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await register(
        username,
        email,
        password
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          ⚔️
        </div>

        <h1>
          Create Your Character
        </h1>

        <p>
          Start your journey and level up your life.
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Choose your username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account 🚀"}
          </button>

        </form>

        <div className="auth-switch">

          Already have an account?

          <button
            type="button"
            onClick={onSwitchToLogin}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;