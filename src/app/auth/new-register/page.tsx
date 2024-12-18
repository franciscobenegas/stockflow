"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function NewRegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const resp = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respJSON = await resp.json();

    if (resp.ok) {
      router.push("/auth/login");
    }
    console.log(respJSON);
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center mx-5">
      <form
        onSubmit={onSubmit}
        className="flex flex-col min-h-screen pt-32 sm:pt-20"
      >
        <h1 className="text-4xl mb-5 mt-10 text-sky-600">
          Nueva cuenta | Stock Flow
        </h1>

        <div className="flex flex-col">
          <label htmlFor="username">Nombre Usuario</label>
          <input
            className="px-5 py-2 border bg-gray-200 rounded mb-5 dark:text-slate-800"
            type="text"
            {...register("username", {
              required: {
                value: true,
                message: "Nombre de Usuario requerido...",
              },
            })}
            placeholder="Usuario123"
          />
          {errors.username && (
            <p className="text-red-600 -mt-5 mb-3 text-xs">
              {errors.username.message}
            </p>
          )}

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
            className="px-5 py-2 border bg-gray-200 rounded mb-5 dark:text-slate-800"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Contraseña requerido...",
              },
              minLength: {
                value: 6,
                message: "Se requieren mas de 6 caracteres para la contraseña",
              },
            })}
            placeholder="**********"
          />
          {errors.password && (
            <p className="text-red-600 -mt-5 mb-3 text-xs">
              {errors.password.message}
            </p>
          )}

          <label htmlFor="confirmPassword">Repetir Contraseña</label>
          <input
            className="px-5 py-2 border bg-gray-200 rounded mb-5 dark:text-slate-800"
            type="password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirmacion requerido...",
              },
              minLength: {
                value: 6,
                message: "Se requieren mas de 6 caracteres para la contraseña",
              },
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "No coinciden las contraseñas.";
                }
              },
            })}
            placeholder="**********"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 -mt-5 mb-3 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
          <Button disabled={isSubmitting} className="rounded-lg">
            {isSubmitting && (
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
            )}
            Crear cuenta
          </Button>

          {/* divisor l ine */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>

          <Link
            href="/auth/login"
            className="btn-secondary text-center hover:text-sky-600"
          >
            Ir al login
          </Link>
        </div>
      </form>
    </div>
  );
}
