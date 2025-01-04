import { z } from "zod";

export const RegisterFormSchema = z.object({
	name: z.string().min(1, "Please enter your name"),
	email: z.string().email("Please enter a valid email"),
	college: z.string().min(1, "Please enter your college name"),
	uid: z.string().min(1, "Please enter your UID"),
});

export type RegisterValues = z.infer<typeof RegisterFormSchema>;
