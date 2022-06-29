import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_URL_API;
// const auth_username = process.env.NEXT_PUBLIC_BASIC_USERNAME;
// const auth_password = process.env.NEXT_PUBLIC_BASIC_PASSWORD;

// const getAuth = async () => {
// 	let session = await getSession();

// 	if (session) {
// 		return `Bearer ${session.accessToken}`;
// 	}

// 	return "";
// };

const getAuth = async () => {
	let session = await getSession();
	if (session) {
		return `Bearer ${session?.accessToken}`;
	}

	return "";
};

// const BasicAuth =
// 	"Basic " + Buffer.from(`${auth_username}:${auth_password}`, "utf8").toString("base64");

const _fetch = async (
	url,
	options = {
		method: "GET",
		body: {},
		contentType: "application/json",
	},
	useBasicAuth = false,
	cancelToken,
) => {
	const authorization = useBasicAuth ? "" : await getAuth();
	// const authorization = await getAuth();
	const request = {
		method: options.method,
		baseURL,
		url,
		headers: {
			Authorization: authorization,
		},
	};

	if (request.method === "POST" || request.method === "PUT" || request.method === "DELETE") {
		request.data = options.body;
	}

	try {
		const res = await axios(request, { cancelToken: cancelToken });

		if (res.status >= 200 && res.status < 400) {
			return res;
		}
	} catch (error) {
		if (error.response && error.response.status === 401) {
			signOut({ callbackUrl: "/" });
		}
		throw error;
	}
};

export { _fetch };
