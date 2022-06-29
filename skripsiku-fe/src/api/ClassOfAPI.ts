import { _fetch } from "../helpers/fetcher";

const type = "/class-of";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const ClassOfAPI = {
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
	get: (query:any) => {
		let body: any = {
			method: "GET",
		};
        let page = query.page ? query.page : 0;
        let limit = query.limit ? query.limit : "";
      
		return _fetch(`${type}?page=${page}&limit=${limit}`, body);
	},
    
    dataSource: () => {
		let body: any = {
			method: "GET",
		};
		return _fetch(`${type}/datasource`, body);
	},
    
    delete: (id:string | string[] | undefined,) => {
		let body: any = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`${type}/${id}`, body);
	},
	
};

export default ClassOfAPI;
