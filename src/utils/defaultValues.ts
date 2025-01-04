export function defaultValues(email: string) {
	if (email.endsWith("@nitt.edu")) {
		return {
			uid: email.split("@")[0],
			college: "NIT Trichy",
		};
	}
}
