import NextAuth from "next-auth";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthAPI from "../../../api/AuthAPI";

export default NextAuth({
	providers: [
		// OAuth authentication providers...
		// AppleProvider({
		// 	clientId: process.env.APPLE_ID,
		// 	clientSecret: process.env.APPLE_SECRET,
		// }),
		// FacebookProvider({
		// 	clientId: process.env.FACEBOOK_ID,
		// 	clientSecret: process.env.FACEBOOK_SECRET,
		// }),
		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_ID,
		// 	clientSecret: process.env.GOOGLE_SECRET,
		// }),

		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					let res = await AuthAPI.login(credentials);

					if (res.data) {
						return res.data;
					}
				} catch (error) {
					return null;
				}
			},
			// async authorize(credentials, req) {
			// 	// Add logic here to look up the user from the credentials supplied
			// 	const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

			// 	if (user) {
			// 		// Any object returned will be saved in `user` property of the JWT
			// 		return user;
			// 	} else {
			// 		// If you return null then an error will be displayed advising the user to check their details.
			// 		return null;

			// 		// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
			// 	}
			// },
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true;
		},
		async redirect({ url, baseUrl }) {
			if (url.startsWith(baseUrl)) return url;
			// Allows relative callback URLs
			else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
			return baseUrl;
			// console.log("base url", baseUrl, "url,", url);
			// return url.startsWith(baseUrl) ? url : `${baseUrl}${url}`;
		},

		async session({ session, user, token }) {
			session.accessToken = token.accessToken;
			session.role = token.role;
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			if (user) {
				token.accessToken = user.access_token;
				token.role = user.role;
			}
			return token;
		},
	},
	session: {
		jwt: true,
	},
	jwt: {
		encryption: true,
		secret: process.env.NEXTAUTH_SECRET,
		// signingKey: process.env.JWT_SIGNING_KEY,
		// encryptionKey: process.env.JWT_ENCRYPTION_KEY,
	},
	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {},

	// Enable debug messages in the console if you are having problems
	debug: true,
	pages: {
		signIn: "/login",
		signOut: "/login",
		error: "/login",
		// newUser: "/sign-up",
	},
});
