import { _fetch } from "../helpers/fetcher";

const type = "/user";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const UserAPI = {
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
    createAdminAndDekan: (paramBody:any) => {
		let body: any = {
			method: "POST",
			body: paramBody,
		};
		return _fetch(`${type}/create-admin-and-dekan`, body);
	},
    updateAdminAndDekan: (id:string | string[] | undefined,paramBody:any) => {
		let body: any = {
			method: "PUT",
			body: paramBody,
		};
		return _fetch(`${type}/${id}/update-admin-and-dekan`, body);
	},
	get: (query : any) => {
		let body: any = {
			method: "GET",
		};
        let page = query.page ? query.page : "";
        let limit = query.limit ? query.limit : "";
        let role  = query.role ? query.role : "";
        let major = query.major ? query.major : "";
        let class_of = query.class_of ? query.class_of : "";
        let registration_number = query.registration_number ? query.registration_number : "";
        // let first_name = query.first_name ? query.first_name : "";
        
		return _fetch(`${type}?page=${page}&limit=${limit}&role=${role}&major_id=${major}&registration_number=${registration_number}&class_of=${class_of}`, body);
	},
    getDekanAndAdmin: (query : any) => {
		let body: any = {
			method: "GET",
		};
        let page = query.page ? query.page : "";
        let limit = query.limit ? query.limit : "";
        // let role  = query.role ? query.role : "";
        // let registration_number = query.registration_number ? query.registration_number : "";
        // let first_name = query.first_name ? query.first_name : "";
        
		return _fetch(`${type}/dekan-and-admin?page=${page}&limit=${limit}`, body);
	},

    getById : (id : string | string[] | undefined) => {
        let body: any = {
			method: "GET",
		};
        return _fetch(`${type}/${id}`, body);
    },
    
    getApprover  : (id : number) => {
        let body: any = {
			method: "GET",
		};
        return _fetch(`${type}/${id}/user-approver`, body);
    },
    addApprover  : (id : number,paramBody:any) => {
        let body: any = {
			method: "POST",
            body: paramBody,
		};
        return _fetch(`${type}/${id}/user-approver`, body);
    },
    removeApprover  : (id : string | string[] | undefined,approverId:string | string[] | undefined) => {
        let body: any = {
			method: "DELETE",
		};
        return _fetch(`${type}/${id}/user-approver/${approverId}`, body);
    },
    delete: (id:string | string[] | undefined) => {
		let body: any = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`${type}/${id}`, body);
	},
	 userCount: () => {
		let body: any = {
			method: "GET",
			body: {},
		};
		return _fetch(`${type}/count`, body);
	},
};

export default UserAPI;
