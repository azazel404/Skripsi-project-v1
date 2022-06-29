import { _fetch } from "../helpers/fetcher";

const type = "/announcement";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const AnnouncementAPI = {
    get: (query:any) => {
		let body: any = {
			method: "GET",
		};
        let page = query.page ? query.page : 0;
        let limit = query.limit ? query.limit : "";
      
		return _fetch(`${type}?page=${page}&limit=${limit}`, body);
	},

    getById : (id : number) => {
        let body: any = {
			method: "GET",
		};
        return _fetch(`${type}/${id}`, body);
    },

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
	
    delete: (id:string | string[] | undefined) => {
		let body: any = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`${type}/${id}`, body);
	},
	
};

export default AnnouncementAPI;
