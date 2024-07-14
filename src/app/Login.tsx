"use client";

import { signIn } from "next-auth/react";

export default function Login() {
	return (
		<button
			className=" border flex flex-col px-10 py-5 justify-center items-center"
			onClick={() => {
				signIn("dauth");
			}}
		>
			Login with DAuth
		</button>
	);
}
