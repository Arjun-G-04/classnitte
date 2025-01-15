import { caller } from "@/server/caller";
import { redirect } from "next/navigation";
import StudentLogin from "./_components/StudentLogin";
import ProfLogin from "./_components/ProfLogin";

export const dynamic = "force-dynamic";

export default async function Home() {
	const userStatus = await caller.user.exists();

	switch (userStatus) {
		case "unauthenticated":
			break;
		case "unregistered":
			redirect("/register");
			break;
		case "user":
			redirect("/student/home");
			break;
		case "professor":
			redirect("/professor/home");
			break;
	}

	return (
		<div className=" flex flex-col gap-5 h-screen w-full justify-center items-center">
			<StudentLogin />
			<ProfLogin />
		</div>
	);
}
