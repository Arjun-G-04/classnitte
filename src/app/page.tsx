import { caller } from "@/server/caller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Login from "./Login";

export default async function Home() {
	const session = await getServerSession();
	const userExists = await caller.user.exists();

	if (session && userExists) redirect("/home");
	if (session) redirect("/register");

	return (
		<div className=" flex flex-col gap-5 h-screen w-full justify-center items-center">
			<Login />
		</div>
	);
}
