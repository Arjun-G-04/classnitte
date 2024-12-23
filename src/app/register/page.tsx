import { getServerSession } from "next-auth";
import RegisterForm from "./RegisterForm";
import { redirect } from "next/navigation";
import { caller } from "@/server/caller";

export default async function Page() {
	const session = await getServerSession();

	if (!session?.user?.email) redirect("/");

	const isUser = await caller.user.exists();

	if (isUser) redirect("/");

	return (
		<div className="flex flex-col p-5 h-screen w-full justify-center items-center">
			<RegisterForm email={session.user.email} />
		</div>
	);
}
