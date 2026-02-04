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

const signupSchema = z.object({
	fullName: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[0-9]/, "Password must contain at least one number"),
	newsletter: z.boolean(),
});

type SignupFormData = z.infer<typeof signupSchema>;

export const Route = createFileRoute("/signup")({
	component: SignupPage,
});

function SignupPage() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const nameId = useId();
	const emailId = useId();
	const passwordId = useId();
	const newsletterId = useId();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isValid },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		mode: "onChange",
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			newsletter: false,
		},
	});

	const password = watch("password");

	const getPasswordStrength = (pass: string): number => {
		let strength = 0;
		if (pass.length >= 8) strength++;
		if (/[A-Z]/.test(pass)) strength++;
		if (/[0-9]/.test(pass)) strength++;
		if (/[^A-Za-z0-9]/.test(pass)) strength++;
		return strength;
	};

	const passwordStrength = getPasswordStrength(password);
	const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
	const strengthColors = [
		"bg-red-500",
		"bg-yellow-500",
		"bg-blue-500",
		"bg-[#2bee79]",
	];

	const onSubmit = async (data: SignupFormData) => {
		setError("");
		setIsLoading(true);

		try {
			const { error: signUpError } = await authClient.signUp.email({
				email: data.email,
				password: data.password,
				name: data.fullName,
			});

			if (signUpError) {
				setError(signUpError.message || "Failed to create account");
			} else {
				navigate({ to: "/meal-planner" });
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignup = async () => {
		setIsLoading(true);
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/meal-planner",
			});
		} catch (err) {
			setError("Failed to sign up with Google");
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#f6f8f7] font-['Manrope',sans-serif]">
			<link
				href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&display=swap"
				rel="stylesheet"
			/>

			<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbe6df] bg-white/80 backdrop-blur-md px-10 py-3">
				<Link to="/" className="flex items-center gap-4 text-[#111814]">
					<div className="size-6 text-[#2bee79]">
						<svg
							fill="none"
							viewBox="0 0 48 48"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Meal Planner Logo</title>
							<path
								clipRule="evenodd"
								d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
								fill="currentColor"
								fillRule="evenodd"
							/>
						</svg>
					</div>
					<h2 className="text-[#111814] text-lg font-bold leading-tight tracking-[-0.015em]">
						Meal Planner
					</h2>
				</Link>
				<div className="flex items-center gap-4">
					<span className="text-sm text-[#618971]">
						Already have an account?
					</span>
					<Link
						to="/login"
						className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#2bee79]/20 text-[#111814] text-sm font-bold border border-[#2bee79]/30 hover:bg-[#2bee79]/30 transition-colors"
					>
						Log In
					</Link>
				</div>
			</header>

			<main className="flex h-screen pt-[64px]">
				<div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#102217]">
					<div
						className="absolute inset-0 opacity-60 bg-cover bg-center"
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=800&fit=crop')",
						}}
					/>
					<div className="relative z-10 flex flex-col justify-end p-20 w-full text-white">
						<h1 className="text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
							Start your healthy journey today.
						</h1>
						<p className="text-lg font-normal leading-relaxed text-gray-200 max-w-md">
							Join thousands of users planning their weekly meals with ease. Eat
							better, save time, and live healthier.
						</p>
						<div className="mt-12 flex gap-4">
							<div className="flex -space-x-3">
								<div className="w-10 h-10 rounded-full border-2 border-[#102217] bg-gray-300 overflow-hidden">
									<img
										src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
										alt="User avatar"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="w-10 h-10 rounded-full border-2 border-[#102217] bg-gray-300 overflow-hidden">
									<img
										src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
										alt="User avatar"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="w-10 h-10 rounded-full border-2 border-[#102217] bg-gray-300 overflow-hidden">
									<img
										src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
										alt="User avatar"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="w-10 h-10 rounded-full border-2 border-[#102217] bg-[#2bee79] flex items-center justify-center text-[#102217] text-xs font-bold">
									+2k
								</div>
							</div>
							<div className="flex flex-col justify-center">
								<p className="text-sm font-bold">Trusted by 2,000+ users</p>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full lg:w-1/2 flex flex-col items-center justify-start py-12 px-6 lg:px-20 overflow-y-auto bg-white">
					<div className="w-full max-w-[480px]">
						<div className="flex flex-col gap-3 mb-8">
							<div className="flex gap-6 justify-between items-center">
								<p className="text-[#111814] text-base font-bold leading-normal">
									Step 1: Account Details
								</p>
								<p className="text-[#111814] text-sm font-medium leading-normal">
									1 / 2
								</p>
							</div>
							<div className="rounded-full bg-[#dbe6df] h-2 overflow-hidden">
								<div
									className="h-2 rounded-full bg-[#2bee79]"
									style={{ width: "50%" }}
								/>
							</div>
							<p className="text-[#618971] text-sm font-medium leading-normal flex items-center gap-1">
								Next:{" "}
								<span className="font-normal opacity-80">
									Dietary Preferences
								</span>
							</p>
						</div>

						<div className="mb-8">
							<h2 className="text-[#111814] tracking-tight text-3xl font-black leading-tight">
								Create your account
							</h2>
							<p className="text-[#618971] mt-2">
								Let's get you set up for your meal planning journey.
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
								onClick={handleGoogleSignup}
								disabled={isLoading}
								className="h-12 border-[#dbe6df] hover:bg-[#f6f8f7]"
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
								className="h-12 border-[#dbe6df] hover:bg-[#f6f8f7]"
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
								<div className="w-full border-t border-[#dbe6df]" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white px-2 text-[#618971]">
									Or continue with email
								</span>
							</div>
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
							<div className="space-y-2">
								<Label htmlFor={nameId} className="text-[#111814]">
									Full Name
								</Label>
								<Input
									id={nameId}
									placeholder="John Doe"
									{...register("fullName")}
									aria-invalid={errors.fullName ? "true" : "false"}
									className="h-12 border-[#dbe6df] focus-visible:ring-[#2bee79]/50"
								/>
								{errors.fullName && (
									<p className="text-sm text-red-600">
										{errors.fullName.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor={emailId} className="text-[#111814]">
									Email Address
								</Label>
								<Input
									id={emailId}
									type="email"
									placeholder="john@example.com"
									{...register("email")}
									aria-invalid={errors.email ? "true" : "false"}
									className="h-12 border-[#dbe6df] focus-visible:ring-[#2bee79]/50"
								/>
								{errors.email && (
									<p className="text-sm text-red-600">{errors.email.message}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor={passwordId} className="text-[#111814]">
									Password
								</Label>
								<div className="relative">
									<Input
										id={passwordId}
										type={showPassword ? "text" : "password"}
										placeholder="Create a password"
										{...register("password")}
										aria-invalid={errors.password ? "true" : "false"}
										className="h-12 pr-12 border-[#dbe6df] focus-visible:ring-[#2bee79]/50"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-0 top-0 h-12 w-12 text-[#618971] hover:text-[#111814]"
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

								{password.length > 0 && (
									<div className="mt-2">
										<div className="flex gap-1 mb-1">
											{[0, 1, 2, 3].map((i) => (
												<div
													key={i}
													className={`h-1 flex-1 rounded ${
														i < passwordStrength
															? strengthColors[passwordStrength - 1]
															: "bg-[#dbe6df]"
													}`}
												/>
											))}
										</div>
										<p className="text-[11px] text-[#618971]">
											Password strength:{" "}
											<span
												className={`font-bold ${
													passwordStrength > 0
														? "text-[#2bee79]"
														: "text-[#618971]"
												}`}
											>
												{passwordStrength > 0
													? strengthLabels[passwordStrength - 1]
													: "Enter password"}
											</span>
										</p>
									</div>
								)}
							</div>

							<div className="flex items-start gap-3 py-2">
								<Checkbox
									id={newsletterId}
									checked={watch("newsletter")}
									onCheckedChange={(checked) =>
										setValue("newsletter", checked as boolean)
									}
									className="mt-0.5 border-[#dbe6df] data-[state=checked]:bg-[#2bee79] data-[state=checked]:border-[#2bee79]"
								/>
								<Label
									htmlFor={newsletterId}
									className="text-sm leading-tight text-[#111814] cursor-pointer"
								>
									Send me weekly meal inspiration, nutritional tips, and
									exclusive updates.
								</Label>
							</div>

							<Button
								type="submit"
								disabled={isLoading || !isValid}
								className="w-full h-14 bg-[#2bee79] text-[#111814] font-black tracking-[0.015em] hover:opacity-90 shadow-lg shadow-[#2bee79]/20 disabled:opacity-50"
							>
								{isLoading ? (
									<span className="flex items-center gap-2">
										<Loader2 className="h-5 w-5 animate-spin" />
										Creating account...
									</span>
								) : (
									"Continue to Preferences"
								)}
							</Button>
						</form>

						<p className="mt-8 text-center text-xs text-[#618971]">
							By clicking "Continue", you agree to our{" "}
							<Link
								to="/"
								className="underline font-bold text-[#111814] hover:text-[#2bee79] transition-colors"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								to="/"
								className="underline font-bold text-[#111814] hover:text-[#2bee79] transition-colors"
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
