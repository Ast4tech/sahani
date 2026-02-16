import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
	component: RootPage,
});

function RootPage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();

	if (sessionPending) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#13EC5B]" />
			</div>
		);
	}

	if (session?.user) {
		return <Dashboard userName={session.user.name} email={session.user.email} />;
	}

	return <LandingPage />;
}
