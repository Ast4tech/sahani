import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
	rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const emailId = useId();
	const passwordId = useId();
	const rememberId = useId();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isValid },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		setError("");
		setIsLoading(true);

		try {
			const { error: signInError } = await authClient.signIn.email({
				email: data.email,
				password: data.password,
				rememberMe: data.rememberMe,
			});

			if (signInError) {
				setError(signInError.message || "Invalid email or password");
			} else {
			navigate({ to: "/" });
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		setIsLoading(true);
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/",
			});
		} catch (err) {
			setError("Failed to sign in with Google");
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-secondary font-['Manrope',sans-serif]">
			<link
				href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
				rel="stylesheet"
			/>
			<link
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
				rel="stylesheet"
			/>

			<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border bg-card/80 backdrop-blur-md px-10 py-3">
				<Link to="/" className="flex items-center gap-2">
					<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
						<span className="material-icons text-white text-lg">
							restaurant_menu
						</span>
					</div>
					<span className="font-bold text-lg text-foreground">sahani</span>
				</Link>
				<div className="flex items-center gap-4">
					<span className="text-sm text-muted-foreground">Don't have an account?</span>
					<Link
						to="/signup"
						className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/10 text-foreground text-sm font-bold border border-primary/20 hover:bg-primary/20 transition-colors"
					>
						Sign Up
					</Link>
				</div>
			</header>

			<main className="flex h-screen pt-[64px]">
				<div className="hidden lg:flex w-1/2 relative overflow-hidden bg-foreground">
					<div
						className="absolute inset-0 opacity-60 bg-cover bg-center"
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=800&fit=crop')",
						}}
					/>
					<div className="relative z-10 flex flex-col justify-end p-20 w-full text-white">
						<h1 className="text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
							Welcome back!
						</h1>
						<p className="text-lg font-normal leading-relaxed text-gray-200 max-w-md">
							Sign in to continue your healthy meal planning journey. Your
							personalized recipes and meal plans are waiting for you.
						</p>
						<div className="mt-12 flex gap-4">
							<div className="flex -space-x-3">
								<div className="w-10 h-10 rounded-full border-2 border-foreground bg-gray-300 overflow-hidden">
									<img
										src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
										alt="User avatar"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="w-10 h-10 rounded-full border-2 border-foreground bg-gray-300 overflow-hidden">
									<img
										src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
										alt="User avatar"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="w-10 h-10 rounded-full border-2 border-foreground bg-gray-300 overflow-hidden">
									<img
										src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
										alt="User avatar"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="w-10 h-10 rounded-full border-2 border-foreground bg-primary flex items-center justify-center text-foreground text-xs font-bold">
									+2k
								</div>
							</div>
							<div className="flex flex-col justify-center">
								<p className="text-sm font-bold">Trusted by 2,000+ users</p>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full lg:w-1/2 flex flex-col items-center justify-start py-12 px-6 lg:px-20 overflow-y-auto bg-card">
					<div className="w-full max-w-[480px]">
						<div className="mb-8">
							<h2 className="text-foreground tracking-tight text-3xl font-black leading-tight">
								Sign in to your account
							</h2>
							<p className="text-muted-foreground mt-2">
								Enter your credentials to access your meal plans.
							</p>
						</div>

						{error && (
							<div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
								{error}
							</div>
						)}

						<div className="grid grid-cols-2 gap-4 mb-8">
							<Button
								type="button"
								variant="outline"
								onClick={handleGoogleLogin}
								disabled={isLoading}
								className="h-12 border-border hover:bg-secondary"
							>
								<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
									<title>Google Logo</title>
									<path
										fill="#4285F4"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="#34A853"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="#FBBC05"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										fill="#EA4335"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
								<span className="text-sm font-bold">Google</span>
							</Button>
							<Button
								type="button"
								variant="outline"
								disabled={isLoading}
								className="h-12 border-border hover:bg-secondary"
							>
								<svg
									className="w-5 h-5 mr-2"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<title>Apple Logo</title>
									<path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.22 7.13-.57 1.5-1.31 2.99-2.27 4.08zm-5.85-15.1c.07-2.04 1.76-3.79 3.78-3.94.29 2.32-1.93 4.48-3.78 3.94z" />
								</svg>
								<span className="text-sm font-bold">Apple</span>
							</Button>
						</div>

						<div className="relative mb-8">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-border" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-card px-2 text-muted-foreground">
									Or continue with email
								</span>
							</div>
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
							<div className="space-y-2">
								<Label htmlFor={emailId} className="text-foreground">
									Email Address
								</Label>
								<Input
									id={emailId}
									type="email"
									placeholder="john@example.com"
									{...register("email")}
									aria-invalid={errors.email ? "true" : "false"}
									className="h-12 border-border focus-visible:ring-primary/50"
								/>
								{errors.email && (
									<p className="text-sm text-red-600">{errors.email.message}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor={passwordId} className="text-foreground">
									Password
								</Label>
								<div className="relative">
									<Input
										id={passwordId}
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										{...register("password")}
										aria-invalid={errors.password ? "true" : "false"}
										className="h-12 pr-12 border-border focus-visible:ring-primary/50"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-0 top-0 h-12 w-12 text-muted-foreground hover:text-foreground"
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</Button>
								</div>
								{errors.password && (
									<p className="text-sm text-red-600">
										{errors.password.message}
									</p>
								)}
							</div>

							<div className="flex items-center justify-between py-2">
								<div className="flex items-center gap-3">
									<Checkbox
										id={rememberId}
										checked={watch("rememberMe")}
										onCheckedChange={(checked) =>
											setValue("rememberMe", checked as boolean)
										}
										className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
									/>
									<Label
										htmlFor={rememberId}
										className="text-sm leading-tight text-foreground cursor-pointer"
									>
										Remember me
									</Label>
								</div>
								<Link
									to="/"
									className="text-sm text-primary font-medium hover:underline"
								>
									Forgot password?
								</Link>
							</div>

							<Button
								type="submit"
								disabled={isLoading || !isValid}
								className="w-full h-14 bg-primary text-foreground font-black tracking-[0.015em] hover:bg-sahani-green-hover shadow-lg shadow-primary/20 disabled:opacity-50 transition-colors"
							>
								{isLoading ? (
									<span className="flex items-center gap-2">
										<Loader2 className="h-5 w-5 animate-spin" />
										Signing in...
									</span>
								) : (
									"Sign In"
								)}
							</Button>
						</form>

						<p className="mt-8 text-center text-xs text-muted-foreground">
							By signing in, you agree to our{" "}
							<Link
								to="/"
								className="underline font-bold text-foreground hover:text-primary transition-colors"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								to="/"
								className="underline font-bold text-foreground hover:text-primary transition-colors"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}

export default LoginPage;
