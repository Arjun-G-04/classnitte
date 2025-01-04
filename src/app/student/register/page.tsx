import { getServerSession } from "next-auth";
import RegisterForm from "./(form)/RegisterForm";
import { redirect } from "next/navigation";
import { caller } from "@/server/caller";

export default async function Page() {
	const session = await getServerSession();
	const userStatus = await caller.user.exists();

	if (userStatus !== "unregistered") redirect("/");
	if (!session?.user?.email) redirect("/");

	return (
		<div className="flex flex-col p-5 h-screen w-full justify-center items-center">
			<RegisterForm email={session.user.email} />
		</div>
	);
}
