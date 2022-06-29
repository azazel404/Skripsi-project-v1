import { _fetch } from "../helpers/fetcher";

const type = "/attachment";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const AttachmentAPI = {
	get: (file:any) => {
		let body: any = {
			method: "GET",
            contentType: "multipart/form-data",
		};
		return _fetch(`${type}/${file}`, body);
	},
    
};

export default AttachmentAPI;
