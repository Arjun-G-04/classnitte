"use client";

import CustomButton from "@/app/_components/CustomButton";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Buttons() {
	const router = useRouter();

	return (
		<div className="flex flex-row gap-5">
			<CustomButton
				type="sync"
				text="Logout"
				syncFn={() => {
					signOut();
				}}
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
