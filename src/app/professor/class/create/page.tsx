import CreateClassForm from "./_components/CreateClassForm";

export default function Page() {
	return (
		<div className="flex flex-col gap-2 min-h-screen w-screen justify-center items-center">
			<div className="font-medium text-2xl">Create Class</div>
			<CreateClassForm />
		</div>
	);
}
