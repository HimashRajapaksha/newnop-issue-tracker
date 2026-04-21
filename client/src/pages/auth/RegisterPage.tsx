import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ArrowRight, Sparkles, UserPlus, ShieldCheck } from "lucide-react";

import { registerUserApi } from "../../api/authApi";
import { useAuthStore } from "../../features/auth/authStore";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { APP_NAME } from "../../utils/constants";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setApiError("");
      const response = await registerUserApi(values);
      setAuth(response.data.user, response.data.token);
      navigate("/");
    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 lg:h-screen lg:overflow-hidden">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-2">
        <div className="hidden lg:flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-6 xl:px-12">
          <div className="mx-auto flex w-full max-w-xl flex-col justify-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold text-white shadow-lg">
              NN
            </div>

            <div className="mt-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                <Sparkles className="h-3.5 w-3.5" />
                Frontend assignment project
              </p>

              <h1 className="mt-4 text-3xl font-semibold leading-snug text-white xl:text-4xl">
                Create your {APP_NAME} account
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Start managing issues with a clean, responsive, and modern issue
                tracking experience built for clarity and speed.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                <div className="flex items-start gap-2">
                  <UserPlus className="mt-0.5 h-4 w-4 text-slate-300" />
                  <div>
                    <h3 className="text-xs font-semibold text-white">
                      Quick onboarding
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Create your account and start tracking issues in seconds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-slate-300" />
                  <div>
                    <h3 className="text-xs font-semibold text-white">
                      Secure access
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Protected authentication and personalized issue management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:h-screen lg:px-8 lg:py-6">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8 xl:max-w-lg xl:p-10">
            <div className="mb-8 space-y-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white shadow-md lg:hidden">
                NN
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Register
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Create your account to start managing issues
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Name"
                placeholder="Enter your name"
                {...register("name")}
                error={errors.name?.message}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password?.message}
              />

              {apiError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {apiError}
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl py-3"
              >
                {isSubmitting ? "Creating account..." : "Register"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-slate-900 underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;