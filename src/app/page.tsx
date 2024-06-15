import Sample from "@/components/Home/Sample";
import { caller } from "@/server/caller";

export default async function Home() {
	const something = await caller.sample();

	return (
		<div className=" flex flex-col gap-5 h-screen w-full justify-center items-center">
			<div className=" border flex flex-col px-10 py-5 justify-center items-center">
				<span className=" underline">Server Component</span>
				<span>Hello from the server!</span>
				<span>
					Data from db:{" "}
					{something && something[0] ? something[0].name : "No Data"}
				</span>
			</div>
			<Sample />
		</div>
	);
}
