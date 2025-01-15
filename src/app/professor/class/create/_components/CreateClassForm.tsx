"use client";

import CustomButton, {
	type AsyncProcess,
} from "@/app/_components/CustomButton";
import {
	CreateClassSchema,
	type CreateClassSchemaType,
} from "@/utils/schemas/professor/class/CreateClass";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

export default function CreateClassForm() {
	const router = useRouter();
	const validate = trpc.professor.validUsers.useMutation();
	const createClass = trpc.professor.createClass.useMutation();
	const [validStudents, setValidStudents] = useState<string[]>([]);
	const [invalidStudents, setInvalidStudents] = useState<string[]>([]);
	const [className, setClassName] = useState<string>("");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<CreateClassSchemaType>({
		resolver: zodResolver(CreateClassSchema),
	});

	const onSubmit: SubmitHandler<CreateClassSchemaType> = async (values) => {
		setValidStudents([]);
		setInvalidStudents([]);
		await validate.mutateAsync(values, {
			onSuccess: (val) => {
				setClassName(values.name);
				setValidStudents(val.validStudentsUid);
				setInvalidStudents(val.invalidStudentsUid);
			},
		});
	};

	const createClassHandle: AsyncProcess = async () => {
		try {
			await createClass.mutateAsync({
				name: className,
				students: validStudents,
			});
			return {
				ok: true,
				success: "Class created successfully",
			};
		} catch (err) {
			return {
				ok: false,
				error: (err as typeof createClass.error)?.message,
			};
		}
	};

	return (
		<div className="flex flex-col w-1/2">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col border p-5 w-full"
			>
				<label>Name</label>
				<input type="text" className="border px-2 py-1" {...register("name")} />
				<span className=" text-red-500 text-sm">{errors.name?.message}</span>
				<label className="mt-2">Students</label>
				<textarea
					className="border px-2 py-1 h-[20vh]"
					{...register("students")}
				/>
				<span className=" text-red-500 text-sm">
					{errors.students?.message}
				</span>
				<CustomButton
					type="form"
					text="Validate Students"
					isSubmitting={isSubmitting}
					className="mt-5 mx-auto"
				/>
			</form>
			{validStudents.length > 0 && (
				<div className="border border-green-500 mt-2 p-5 flex flex-col">
					<span className="font-semibold text-green-500">
						Students with valid accounts
					</span>
					<span className="mt-2">{validStudents.join(", ")}</span>
				</div>
			)}
			{invalidStudents.length > 0 && (
				<div className="border border-red-500 mt-2 p-5 flex flex-col">
					<span className="font-semibold text-red-500">
						Students without valid accounts
					</span>
					<span className="mt-2">{invalidStudents.join(", ")}</span>
				</div>
			)}
			{validStudents.length > 0 && (
				<CustomButton
					type="async"
					text="Create class with valid student accounts"
					loading="Creating class"
					className="mt-2 mx-auto"
					asyncFn={createClassHandle}
					successCallbackFn={() => {
						router.push("/professor/home");
					}}
				/>
			)}
		</div>
	);
}
