import { caller } from "@/server/caller";
import Buttons from "./_components/Buttons";

export default async function Page() {
	const name = await caller.user.name();

	return (
		<div className=" flex flex-col gap-2 h-screen justify-center items-center">
			<div>Welcome Home, {name}!</div>
			<Buttons />
		</div>
	);
}
