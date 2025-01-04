import NextAuth from "next-auth";
import { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET } from "./config";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "@drizzle/index";
import { professors } from "@drizzle/schema/professors";

export const handler = NextAuth({
	pages: {
		signIn: "/",
		signOut: "/",
		error: "/",
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			return baseUrl;
		},
	},
	providers: [
		{
			id: "dauth",
			name: "DAuth",
			type: "oauth",
			authorization: {
				url: "https://auth.delta.nitt.edu/authorize",
				params: {
					client_id: AUTH_CLIENT_ID,
					redirect_uri: `${process.env.NODE_ENV === "production" ? "https://classnitte.vercel.app" : "http://localhost:3000"}/api/auth/callback/dauth`,
					response_type: "code",
					grant_type: "authorization_code",
					state: "happycoding",
					scope: "openid email profile user",
					nonce: "happycoding",
				},
			},
			token: {
				async request(context) {
					const res = await fetch(
						"https://auth.delta.nitt.edu/api/oauth/token",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
							},
							body: new URLSearchParams({
								client_id: AUTH_CLIENT_ID,
								client_secret: AUTH_CLIENT_SECRET,
								grant_type: "authorization_code",
								code: context.params.code || "code",
								redirect_uri: `${process.env.NODE_ENV === "production" ? "https://classnitte.vercel.app" : "http://localhost:3000"}/api/auth/callback/dauth`,
							}),
						},
					);
					const tokens = await res.json();
					return { tokens };
				},
			},
			userinfo: "https://auth.delta.nitt.edu/api/resources/user",
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
				};
			},
			clientId: AUTH_CLIENT_ID,
			clientSecret: AUTH_CLIENT_SECRET,
		},
		CredentialsProvider({
			id: "profLogin",
			name: "Professor Login",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password)
					throw new Error("creds");

				const users = await db
					.select()
					.from(professors)
					.where(eq(professors.email, credentials.email));
				if (users.length !== 1) throw new Error("user");

				const user = users[0];
				const passwordCheck = new Promise<boolean>((resolve, reject) => {
					bcrypt.compare(credentials.password, user.password, (err, res) => {
						if (err) reject(err);
						resolve(res);
					});
				});

				try {
					const passwordMatch = await passwordCheck;
					if (!passwordMatch) throw new Error("password");

					return {
						id: user.id.toString(),
						email: user.email,
						name: user.name,
						image: "",
					};
				} catch {
					throw new Error("password");
				}
			},
		}),
	],
});
