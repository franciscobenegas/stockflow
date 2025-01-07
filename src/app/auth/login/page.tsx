"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const resp = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!resp?.ok) {
      alert(resp?.error);
    } else {
      router.push("/");
      router.refresh();
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center mx-5">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col min-h-screen pt-32 sm:pt-20">
          <Logo />
          <h1 className="text-4xl mb-5 text-sky-600 mt-10">Ingresar | Admin</h1>

          <div className="flex flex-col">
            <label htmlFor="email">Correo electrónico</label>
            <input
              className="px-5 py-2 border bg-gray-200 rounded mb-5 dark:text-slate-800"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Correo electronico requerido...",
                },
              })}
              placeholder="usuario@correo.com"
            />
            {errors.email && (
              <p className="text-red-600 -mt-5 mb-3 text-xs">
                {errors.email.message}
              </p>
            )}

            <label htmlFor="password">Contraseña</label>

            <input
              type={isPasswordVisible ? "text" : "password"}
              className="px-5 py-2 border bg-gray-200 rounded mb-5 dark:text-slate-800"
              {...register("password", {
                required: {
                  value: true,
                  message: "Contraseña requerido...",
                },
                minLength: {
                  value: 6,
                  message:
                    "Se requieren mas de 6 caracteres para la contraseña",
                },
              })}
              placeholder="**********"
            />
            {errors.password && (
              <p className="text-red-600 -mt-5 mb-3 text-xs">
                {errors.password.message}
              </p>
            )}
            <div className="relative">
              <div
                className="absolute bottom-7 right-2  text-gray-800 hover:text-blue-800 hover:cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </div>
            </div>

            <Button
              disabled={isSubmitting}
              className="rounded-lg dark:bg-cyan-600 dark:text-slate-200"
            >
              {isSubmitting && (
                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
              )}
              Ingresar
            </Button>

            {/* divisor l ine */}
            <div className="flex items-center my-5">
              <div className="flex-1 border-t border-gray-500"></div>
              <div className="px-2 text-gray-800">O</div>
              <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
              href="/auth/new-register"
              className="btn-secondary text-center hover:text-sky-600"
            >
              Crear una nueva cuenta
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
