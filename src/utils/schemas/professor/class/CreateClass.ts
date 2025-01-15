import { z } from "zod";

export const CreateClassSchema = z.object({
	name: z.string().min(1, "Please enter a name"),
	students: z.string().min(1, "Please enter list of student roll nos."),
});

export type CreateClassSchemaType = z.infer<typeof CreateClassSchema>;
