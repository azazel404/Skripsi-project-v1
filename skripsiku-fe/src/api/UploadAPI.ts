import { _fetch } from "../helpers/fetcher";

const type = "/upload";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const UploadAPI = {
	attach: (paramBody:any) => {
		let body: any = {
			method: "POST",
			body: paramBody,
            contentType: "multipart/form-data",
		};
		return _fetch(`${type}/images`, body);
	},
    attachDoc: (paramBody:any) => {
		let body: any = {
			method: "POST",
			body: paramBody,
            contentType: "multipart/form-data",
		};
		return _fetch(`${type}/documents`, body);
	},
};

export default UploadAPI;
