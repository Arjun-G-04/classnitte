import Logout from "@/app/(logout)/Logout";
import { caller } from "@/server/caller";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
	const userStatus = await caller.user.exists();
	if (userStatus !== "user") redirect("/");

	const name = await caller.user.name();

	return (
		<div className=" flex flex-col gap-2 h-screen justify-center items-center">
			<div>Welcome Home, {name}!</div>
			<Logout />
		</div>
	);
}
