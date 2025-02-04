"use client";

import CustomButton from "@/app/_components/CustomButton";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Buttons() {
	const router = useRouter();

	const handleLogout = async () => {
		const loadingToast = toast.loading("Logging out...");
		try {
			await signOut();
			toast.success("Logged out successfully", { id: loadingToast });
		} catch (error) {
			toast.error("Error logging out", { id: loadingToast });
		}
	};

	return (
		<div className="flex flex-row gap-5">
			<CustomButton type="sync" text="Logout" syncFn={handleLogout} />
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
