"use client";

import CustomButton from "@/app/_components/CustomButton";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Buttons() {
	const router = useRouter();

	return (
		<div className="flex flex-row gap-5">
			<CustomButton
				type="async"
				text="Logout"
				asyncFn={async () => {
					await signOut();
					return { ok: true, success: "Logged out successfully" };
				}}
				loading="Logging out..."
			/>
			<CustomButton
				type="sync"
				text="View Classes"
				syncFn={() => {
					router.push("/student/class/view");
				}}
			/>
		</div>
	);
}
