import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginInputs } from "../types/interfaces";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setApiError(null);
    setIsLoading(true);

    try {
      await login(data.email, data.password);
      console.log("You are now logged in and key is derived!");
      setLoggedIn(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError("An unexpected error occured!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <div className="w-full max-w-md rounded-xl bg-white/70 dark:bg-dprimary/70 p-6 m-6 shadow-2xl border border-lprimary/80 dark:border-dsecondary/60">
        <h1 className="mb-3 text-sm font-bold tracking-tight text-dsecondary dark:text-lprimary">
          Pass
          <span className="text-lprimary dark:text-lsecondary italic">OP</span>
          <div className="text-dsecondary dark:text-white text-xl">
            Vault Login
          </div>
        </h1>

        {apiError && (
          <div className="mb-4 rounded-md bg-red-500/30 dark:bg-red-600/30 py-3 px-4 text-sm text-red-600 dark:text-red-300">
            {apiError}
          </div>
        )}

        {loggedIn && (
          <div className="mb-4 rounded-md bg-green-500/30 dark:bg-green-600/30 py-3 px-4 text-sm text-green-600 dark:text-green-300">
            Verification Successful!
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
              type="text"
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

          <Link
            to="/register"
            className="text-dprimary text-xs pt-3 ml-3 font-raleway flex items-center gap-2"
          >
            New User? Register first <FiArrowRight />{" "}
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-sm bg-dprimary dark:bg-lprimary py-2.5 mt-4 text-sm font-semibold text-white dark:text-dprimary transition duration-150 hover:bg-lprimary focus:outline-none focus:ring-2 focus:ring-lprimary focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 font-raleway"
          >
            {isLoading ? (
              "Authenticating..."
            ) : loggedIn ? (
              <Link to="/" className="flex justify-center">
                <p className="flex items-center gap-2.5">
                  Access Vault <FiArrowRight />
                </p>
              </Link>
            ) : (
              <div className="flex justify-center">
                <p className="flex items-center gap-1">
                  {" "}
                  <MdOutlineSecurity className="size-4" /> Verify{" "}
                </p>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
