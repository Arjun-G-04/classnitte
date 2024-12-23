"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
	return (
		<button
			className="border px-2 py-1 bg-slate-200"
			onClick={() => {
				signOut();
			}}
		>
			Logout
		</button>
	);
}
