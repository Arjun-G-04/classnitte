import { caller } from "@/server/caller";

export default async function Page() {
	const classes = await caller.professor.getClasses();

	return (
		<div className="flex flex-col gap-2 h-screen w-screen justify-center items-center">
			{classes.map((elem) => {
				return (
					<div key={elem.id} className="p-5 border w-1/4 flex flex-col">
						<span className=" text-lg font-medium">{elem.name}</span>
						<span className="text-xs text-slate-500">#{elem.id}</span>
					</div>
				);
			})}
		</div>
	);
}
