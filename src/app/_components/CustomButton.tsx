"use client";

import { type HTMLAttributes, useState } from "react";
import toast from "react-hot-toast";

export type AsyncProcess = () => Promise<
	{ ok: true; success: string } | { ok: false; error: string | undefined }
>;

type SyncProps = {
	type: "sync";
	text: string;
	className?: HTMLAttributes<HTMLButtonElement>["className"];
	syncFn: () => void;
};

type AsyncProps = {
	type: "async";
	text: string;
	className?: HTMLAttributes<HTMLButtonElement>["className"];
	loading: string;
	asyncFn: AsyncProcess;
	successCallbackFn?: () => void;
};

type FormProps = {
	type: "form";
	text: string;
	className?: HTMLAttributes<HTMLButtonElement>["className"];
	isSubmitting: boolean;
};

export default function CustomButton(
	props: SyncProps | AsyncProps | FormProps,
) {
	const [loading, setLoading] = useState(false);

	return (
		<button
			onClick={async () => {
				if (props.type === "sync") {
					props.syncFn();
				} else if (props.type === "async") {
					setLoading(true);
					const loading = toast.loading(props.loading);
					try {
						const result = await props.asyncFn();
						if (result.ok) {
							toast.success(result.success, { id: loading });
							if (props.successCallbackFn) props.successCallbackFn();
						} else {
							toast.error(result.error ?? `Error performing "${props.text}"`, {
								id: loading,
							});
						}
						setLoading(false);
					} catch (err) {
						toast.error(`Error performing "${props.text}"`, { id: loading });
						setLoading(false);
					}
				}
			}}
			className={`border px-2 py-1 bg-slate-200 ${(props.type === "form" ? props.isSubmitting : loading) && "cursor-not-allowed"} ${props.className ? props.className : ""}`}
			type={props.type === "form" ? "submit" : "button"}
			disabled={props.type === "form" ? props.isSubmitting : loading}
		>
			{(props.type === "form" ? props.isSubmitting : loading)
				? "Loading"
				: props.text}
		</button>
	);
}
