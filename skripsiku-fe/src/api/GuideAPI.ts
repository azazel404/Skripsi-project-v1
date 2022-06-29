import { _fetch } from "../helpers/fetcher";

const type = "/comment";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const GuideAPI = {
	// create: (paramBody:any) => {
	// 	let body: any = {
	// 		method: "POST",
	// 		body: paramBody,
	// 	};
	// 	return _fetch(`${type}`, body);
	// },
    // update: (id:number,paramBody:any) => {
	// 	let body: any = {
	// 		method: "PUT",
	// 		body: paramBody,
	// 	};
	// 	return _fetch(`${type}/${id}`, body);
	// },
	// get: (query : any) => {
	// 	let body: any = {
	// 		method: "GET",
	// 	};
    //     let page = query.page ? query.page : "";
    //     let limit = query.limit ? query.limit : "";
    //     let major  = query.major ? query.major : "";
    //     let registration_number = query.registration_number ? query.registration_number : "";
    //     let first_name = query.first_name ? query.first_name : "";
        
	// 	return _fetch(`${type}?page=${page}&limit=${limit}&major_id=${major}`, body);
	// },
    
    history : (userId: number,lectureId: number) => {
        let body: any = {
			method: "GET",
			body: {},
		};
        return _fetch(`${type}/history?user_id=${userId}&lecturer_id=${lectureId}`,body);
    },
    sendCommentToThesis : (paramBody:any) => {
       	let body: any = {
			method: "POST",
			body: paramBody,
		};
		return _fetch(`${type}/to-thesis-advisor`, body);
    },
    sendCommentToStudent : (id:any,paramBody:any) => {
       	let body: any = {
			method: "POST",
			body: paramBody,
		};
		return _fetch(`${type}/to-student/${id}`, body);
    }
    //  getById : (id : number) => {
    //     let body: any = {
	// 		method: "GET",
	// 	};
    //     return _fetch(`${type}/${id}`, body);
    // },
	
};

export default GuideAPI;
