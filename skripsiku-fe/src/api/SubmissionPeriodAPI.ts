import { _fetch } from "../helpers/fetcher";
import Helpers from "../helpers";
const type = "/submission-period";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const SubmissionPeriodAPI = {
	create: (paramBody:any) => {
		let body: any = {
			method: "POST",
			body: paramBody,
		};
		return _fetch(`${type}`, body);
	},

	get: (query:any) => {
		let body: any = {
			method: "GET",
		};
        let page = query.page ? query.page : 0;
        let limit = query.limit ? query.limit : "";
        let major = query.major ? query.major : "";
        let classOf = query.class_of ? query.class_of : "";
        let startDate = query.startDate ? Helpers.postDate(query.startDate) : "";
        let endDate = query.endDate ? Helpers.postDate(query.endDate) : "";
        let status = query.status 
       
		return _fetch(`${type}?page=${page}&limit=${limit}&major_id=${major}&classOf=${classOf}&startDate=${startDate}&endDate=${endDate}&status=${status}`, body);
	},
    getById : (id : number) => {
        let body: any = {
			method: "GET",
		};
        return _fetch(`${type}/${id}`, body);
    },
     // update: (id:number,paramBody:any) => {
	// 	let body: any = {
	// 		method: "PUT",
	// 		body: paramBody,
	// 	};
	// 	return _fetch(`${type}/${id}`, body);
	// },
    
    delete: (id:string | string[] | undefined) => {
		let body: any = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`${type}/${id}`, body);
	},
    close: (id:string | string[] | undefined) => {
		let body: any = {
			method: "PUT",
			body: {},
		};
		return _fetch(`${type}/${id}/close`, body);
	},
	
};

export default SubmissionPeriodAPI;
