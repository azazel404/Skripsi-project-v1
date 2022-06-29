import { _fetch } from "../helpers/fetcher";

const type = "/lecturer";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const LecturerAPI = {
	create: (paramBody:any) => {
		let body: any = {
			method: "POST",
			body: paramBody,
		};
		return _fetch(`${type}`, body);
	},
    update: (id:string | string[] | undefined,paramBody:any) => {
		let body: any = {
			method: "PUT",
			body: paramBody,
		};
		return _fetch(`${type}/${id}`, body);
	},
	get: (query : any) => {
		let body: any = {
			method: "GET",
		};
        let page = query.page ? query.page : "";
        let limit = query.limit ? query.limit : "";
        let major  = query.major ? query.major : "";
        let registration_number = query.registration_number ? query.registration_number : "";
        // let first_name = query.first_name ? query.first_name : "";
        
		return _fetch(`${type}?page=${page}&limit=${limit}&major_id=${major}&registration_number=${registration_number}`, body);
	},
     getById : (id:string | string[] | undefined) => {
        let body: any = {
			method: "GET",
		};
        return _fetch(`${type}/${id}`, body);
    },
    listBimbingan: (query : any,lecturerId:string | string[] | undefined) => {
		let body: any = {
			method: "GET",
		};
        let page = query.page ? query.page : "";
        let limit = query.limit ? query.limit : "";
        // let major  = query.major ? query.major : "";
        // let registration_number = query.registration_number ? query.registration_number : "";
        // let first_name = query.first_name ? query.first_name : "";
        
		return _fetch(`${type}/${lecturerId}/thesis-advisor-students?page=${page}&limit=${limit}`, body);
	},
    delete: (id:string | string[] | undefined) => {
		let body: any = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`${type}/${id}`, body);
	},
	
};

export default LecturerAPI;
