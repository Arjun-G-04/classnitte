import { z } from "zod";

export const CreateClassValidSchema = z.object({
	name: z.string().min(1, "Please enter a name"),
	students: z.array(z.string(), {
		message: "Please enter list of student roll nos.",
	}),
});
