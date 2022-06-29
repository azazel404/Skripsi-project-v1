import { _fetch } from "../helpers/fetcher";

const type = "/erepository";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const ERepositoryAPI = {
    get: (query:any) => {
		let body: any = {
			method: "GET",
		};
        
        const renderAmpersand = (params:any) => (params.length === 0 ? "" : "&");

        let page = query.page ? query.page : 0;
        let limit = query.limit ? query.limit : ""; 
        let status  = query.status;
        let search = query.search ? query.search : "";
        let year = query.year ? query.year : "";
        let major = query.major ? query.major : "";
        let order = query.order ? query.order : "";
      
        let params = "";

        if (search) {
            params += renderAmpersand(params) + `name=${search}`;
        }

        if (year) {
            params += renderAmpersand(params) + `year=${year}`;
        }

        if (major) {
            params +=
                renderAmpersand(major) + `major_id=${major}`;
        }
        if (order) {
            params +=
                renderAmpersand(order) + `order=${order}`;
        }

		return _fetch(`${type}?page=${page}&limit=${limit}&status=${status}&${params}`, body,true);
	},

    getById : (id : string | string[] | undefined) => {
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

export default ERepositoryAPI;
