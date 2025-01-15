import { caller } from "@/server/caller";
import Buttons from "./_components/Buttons";

export default async function Page() {
	const name = await caller.professor.name();

	return (
		<div className="flex flex-col h-screen w-screen justify-center items-center gap-2">
			Welcome Professor {name}!
			<Buttons />
		</div>
	);
}
