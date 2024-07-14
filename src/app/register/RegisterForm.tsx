"use client";

import { defaultValues } from "@/utils/register/defaultValues";
import { RegisterFormSchema, RegisterValues } from "@/utils/register/schema";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterForm(props: { email: string }) {
	const router = useRouter();
	const userRegistration = trpc.user.register.useMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<RegisterValues>({
		resolver: zodResolver(RegisterFormSchema),
	});
	const onSubmit: SubmitHandler<RegisterValues> = (values) => {
		const loading = toast.loading("Registering user");
		userRegistration.mutate(values, {
			onSuccess: (val) => {
				toast.success("User registered successfully", { id: loading });
				router.push("/home");
			},
			onError: (err) => {
				toast.error(err.message, { id: loading });
			},
		});
	};

	useEffect(() => {
		setValue("email", props.email);
		setValue("college", defaultValues(props.email)?.college ?? "");
		setValue("uid", defaultValues(props.email)?.uid ?? "");
	}, [setValue, props.email]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col border p-5 w-full"
		>
			<span className=" font-medium text-2xl text-center">Register</span>
			<label className="mt-2">Name</label>
			<input
				type="text"
				className="border px-2 py-1"
				{...register("name")}
			/>
			<span className=" text-red-500 text-sm">
				{errors.name?.message}
			</span>
			<label className="mt-2">Email</label>
			<input
				defaultValue={props.email}
				type="text"
				className="border px-2 py-1"
				{...register("email")}
				disabled
			/>
			<span className=" text-red-500 text-sm">
				{errors.email?.message}
			</span>
			<label className="mt-2">College</label>
			<input
				{...(defaultValues(props.email) !== undefined && {
					value: defaultValues(props.email)?.college,
				})}
				type="text"
				className="border px-2 py-1"
				{...register("college")}
				disabled={defaultValues(props.email) !== undefined}
			/>
			<span className=" text-red-500 text-sm">
				{errors.college?.message}
			</span>
			<label className="mt-2">Unique Identification No./ID</label>
			<input
				defaultValue={defaultValues(props.email)?.uid}
				type="text"
				className="border px-2 py-1"
				{...register("uid")}
				disabled={defaultValues(props.email) !== undefined}
			/>
			<span className=" text-red-500 text-sm">{errors.uid?.message}</span>
			<button
				type="submit"
				className="mt-5 border mx-auto px-2 py-1 bg-slate-200"
			>
				Submit
			</button>
		</form>
	);
}
