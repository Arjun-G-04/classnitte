"use client";

import CustomButton from "@/app/_components/CustomButton";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Buttons() {
	const router = useRouter();

	return (
		<div className="flex flex-row gap-5">
			<CustomButton
				type="async"
				text="Logout"
				asyncFn={async () => {
					try {
						await signOut();
						return { ok: true, success: "Logged out successfully" };
					} catch (error) {
						const errorMessage =
							(error as Error).message || "An unknown error occurred";
						toast.error(`Error performing logout: ${errorMessage}`);
						return { ok: false, error: errorMessage };
					}
				}}
				loading="true"
			/>
			<CustomButton
				type="sync"
				text="Create Class"
				syncFn={() => {
					router.push("/professor/class/create");
				}}
			/>
			<CustomButton
				type="sync"
				text="View Classes"
				syncFn={() => {
					router.push("/professor/class/view");
				}}
			/>
		</div>
	);
}
