"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Footer } from "@/components/footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      setIsSuccess(true);
      setTimeout(() => {
        localStorage.setItem("paisabank-token", data.data.token);
        const isSecure = window.location.protocol === "https:";
        document.cookie = `paisabank-token=${data.data.token}; path=/; max-age=2592000; SameSite=Lax${isSecure ? "; Secure" : ""}`;
        router.push("/");
      }, 1000);
    },
    onError: () => {
      setGeneralError("Email o contraseña incorrectos");
    },
  });

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!email.trim()) {
      setEmailError("El email es requerido");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Ingresa un email válido");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("La contraseña es requerida");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      loginMutation.mutate({ email, password });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start px-6 pt-12">
      <div className="w-full max-w-[400px]">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 mb-5">
            <Image
              src="/paisabank-logo.svg"
              alt="PaisaBank Logo"
              width={80}
              height={80}
              priority
            />
          </div>
          <h1 className="text-[32px] leading-tight font-bold font-[family-name:var(--font-poppins)] text-[#1a1a1a] mb-2">
            PaisaBank
          </h1>
          <p className="text-[14px] text-gray-500 text-center">
            Comienza a manejar tu vida financiera
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-[13px] font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
                setGeneralError("");
              }}
              className={`w-full h-[48px] px-4 text-[15px] rounded-lg focus:outline-none focus:ring-2 transition-all shadow-md bg-white ${
                emailError
                  ? "focus:ring-red-500 shadow-red-200"
                  : "focus:ring-blue-500 hover:shadow-lg"
              }`}
            />
            {emailError && (
              <p className="text-xs text-red-600 mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[13px] font-medium text-gray-700 mb-2"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                  setGeneralError("");
                }}
                className={`w-full h-[48px] px-4 pr-12 text-[15px] rounded-xl focus:outline-none focus:ring-2 transition-all shadow-md bg-white ${
                  passwordError
                    ? "focus:ring-red-500 shadow-red-200"
                    : "focus:ring-blue-500 hover:shadow-lg"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-red-600 mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex items-center pt-1">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: "#2563eb" }}
              className="w-[18px] h-[18px] border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="ml-2.5 text-[14px] text-gray-600 cursor-pointer"
            >
              Recordarme
            </label>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending || isSuccess}
            className={`w-full h-[56px] text-white text-[16px] font-semibold rounded-xl transition-all duration-300 ${
              isSuccess
                ? "bg-green-500 scale-105"
                : "bg-blue-600 hover:bg-blue-700"
            } disabled:cursor-not-allowed mt-6 relative overflow-hidden`}
          >
            {isSuccess ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-6 h-6 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                ¡Ingreso exitoso!
              </span>
            ) : loginMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Ingresando...
              </span>
            ) : (
              "Ingresar"
            )}
          </button>

          {generalError && (
            <div className="text-sm text-red-600 text-center py-2 bg-red-50 rounded-xl">
              {generalError}
            </div>
          )}
        </form>

        <Footer />
      </div>
    </div>
  );
}

