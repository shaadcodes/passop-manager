import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiUserPlus, FiAlertTriangle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import type { RegisterInputs } from "../types/interfaces";

interface ExtendedRegisterInputs extends RegisterInputs {
  confirmPassword?: string;
}

export function Register() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExtendedRegisterInputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<ExtendedRegisterInputs> = async (data) => {
    setApiError(null);
    setIsLoading(true);

    try {
      if (registerUser) {
        await registerUser(data.email, data.password);
      }
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError("Failed to create vault. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <div className="w-full max-w-md rounded-xl bg-white/70 dark:bg-dprimary/70 p-6 m-6 shadow-2xl border border-lprimary/80 dark:border-dsecondary/60">
        <h1 className="mb-1 text-sm font-bold tracking-tight text-dsecondary dark:text-lprimary">
          Pass
          <span className="text-lprimary dark:text-lsecondary italic">OP</span>
          <div className="text-dsecondary dark:text-white text-xl">
            Create New Vault
          </div>
        </h1>

        <div className="mb-4 mt-2 flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 p-2.5 text-[11px] text-amber-700 dark:text-amber-300">
          <FiAlertTriangle className="size-4 shrink-0 mt-0.5 text-amber-500" />
          <p>
            <strong>Zero-Knowledge Notice:</strong> Your Master Password cannot
            be reset or recovered if forgotten.
          </p>
        </div>

        {apiError && (
          <div className="mb-4 rounded-md bg-red-500/30 dark:bg-red-600/30 py-3 px-4 text-sm text-red-600 dark:text-red-300">
            {apiError}
          </div>
        )}

        {isSuccess && (
          <div className="mb-4 rounded-md bg-green-500/30 dark:bg-green-600/30 py-3 px-4 text-sm text-green-600 dark:text-green-300">
            Vault created successfully! Redirecting to login...
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
          noValidate
        >
          <div>
            <label className="block text-[10px] font-bold text-dprimary dark:text-white ml-1.5 font-raleway">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full rounded-full border border-dprimary bg-white dark:bg-dsecondary/30 px-4 py-2 text-dsecondary dark:text-white placeholder-dprimary/50 focus:border-lprimary dark:focus:border-lprimary/30 focus:outline-none focus:ring-1 focus:ring-lprimary dark:focus:ring-lprimary/30 text-sm"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-dprimary dark:text-white ml-1.5 font-raleway">
              Master Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Master password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="mt-1 block w-full rounded-full border border-dprimary bg-white dark:bg-dsecondary/30 px-4 py-2 text-dsecondary dark:text-white placeholder-dprimary/50 focus:border-lprimary dark:focus:border-lprimary/30 focus:outline-none focus:ring-1 focus:ring-lprimary dark:focus:ring-lprimary/30 text-sm"
              placeholder="••••••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-dprimary dark:text-white ml-1.5 font-raleway">
              Confirm Master Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
              className="mt-1 block w-full rounded-full border border-dprimary bg-white dark:bg-dsecondary/30 px-4 py-2 text-dsecondary dark:text-white placeholder-dprimary/50 focus:border-lprimary dark:focus:border-lprimary/30 focus:outline-none focus:ring-1 focus:ring-lprimary dark:focus:ring-lprimary/30 text-sm"
              placeholder="••••••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400 ml-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full rounded-sm bg-dprimary dark:bg-lprimary py-2.5 mt-4 text-sm font-semibold text-white dark:text-dprimary transition duration-150 hover:bg-lprimary focus:outline-none focus:ring-2 focus:ring-lprimary focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 font-raleway"
          >
            {isLoading ? (
              "Creating Vault..."
            ) : isSuccess ? (
              <div className="flex justify-center items-center gap-2">
                Vault Created <FiArrowRight />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-1.5">
                <FiUserPlus className="size-4" /> Initialize Vault
              </div>
            )}
          </button>
        </form>

        <div className="mt-5 font-raleway text-center text-xs text-dprimary dark:text-slate-300">
          Already have a vault?{" "}
          <Link
            to="/login"
            className="font-bold text-lsecondary dark:text-lprimary hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
