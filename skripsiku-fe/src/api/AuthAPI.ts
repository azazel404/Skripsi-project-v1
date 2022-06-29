import { _fetch } from "../helpers/fetcher";

const type = "/auth";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const AuthAPI = {
	login: (paramBody:any) => {
		let body: any = {
			method: "POST",
			body: paramBody,
		};
		return _fetch(`${type}/login`, body, true);
	},
	profile: () => {
		let body: any = {
			method: "GET",
		};
		return _fetch(`${type}/profile`, body);
	},
    updateProfile: (paramBody:any) => {
		let body: any = {
			method: "PUT",
			body: paramBody,
		};
		return _fetch(`${type}/profile`, body);
	},
    updatePassword: (paramBody:any) => {
		let body: any = {
			method: "PUT",
			body: paramBody,
		};
		return _fetch(`${type}/profile/update-password`, body);
	},
	// logout: (paramBody) => {
	// 	let body = {
	// 		method: "GET",
	// 		body: paramBody,
	// 	};
	// 	return _fetch(`${type}/logout`, body);
	// },
};

export default AuthAPI;
