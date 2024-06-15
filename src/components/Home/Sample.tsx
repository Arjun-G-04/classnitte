"use client";

import { trpc } from "@/utils/trpc";

export default function Sample() {
	const { data: something, isLoading: somethingLoading } =
		trpc.sample.useQuery();

	return (
		<div className=" border flex flex-col px-10 py-5 justify-center items-center">
			<span className=" underline">Client Component</span>
			<span>Hello from the client!</span>
			<span>
				Data from db:{" "}
				{somethingLoading
					? "Loading"
					: something && something[0]
						? something[0].name
						: "No Data"}
			</span>
		</div>
	);
}
