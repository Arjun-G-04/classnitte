"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LoginFormSchema } from "./schema";
import type { z } from "zod";
import { signIn } from "next-auth/react";

type LoginValues = z.infer<typeof LoginFormSchema>;

export default function TeacherLogin() {
	const searchParams = useSearchParams();
	const errMsg = searchParams.get("error");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginValues>({
		resolver: zodResolver(LoginFormSchema),
	});

	useEffect(() => {
		const toasted = localStorage.getItem("toasted");
		if (toasted === "false") {
			switch (errMsg) {
				case "creds":
					toast.error("Invalid request");
					break;
				case "user":
					toast.error("User not found");
					break;
				case "password":
					toast.error("Invalid password");
					break;
			}
			localStorage.setItem("toasted", "true");
		}
	}, [errMsg]);

	const onSubmit: SubmitHandler<LoginValues> = (values) => {
		localStorage.setItem("toasted", "false");
		const loading = toast.loading("Logging in");
		signIn("profLogin", {
			email: values.email,
			password: values.password,
		})
			.then(() => {
				toast.dismiss(loading);
			})
			.catch(() => {
				toast.dismiss(loading);
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col border p-5 w-1/2"
		>
			<label className="mt-2">Email ID</label>
			<input type="text" className="border px-2 py-1" {...register("email")} />
			<span className=" text-red-500 text-sm">{errors.email?.message}</span>
			<label className="mt-2">Password</label>
			<input
				type="password"
				className="border px-2 py-1"
				{...register("password")}
			/>
			<span className=" text-red-500 text-sm">{errors.password?.message}</span>
			<button
				type="submit"
				className="mt-5 border mx-auto px-2 py-1 bg-slate-200"
			>
				Submit
			</button>
		</form>
	);
}
