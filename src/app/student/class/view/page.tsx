import { caller } from "@/server/caller";

export default async function Page() {
	const classes = await caller.user.getClasses();

	return (
		<div className="flex flex-col h-screen w-screen justify-center items-center gap-2">
			{classes.map((c) => {
				return (
					<div key={c.id} className="flex flex-col p-5 border w-1/4">
						<span className="text-lg font-medium">{c.name}</span>
						<span className="text-xs text-slate-500">#{c.id}</span>
					</div>
				);
			})}
		</div>
	);
}
