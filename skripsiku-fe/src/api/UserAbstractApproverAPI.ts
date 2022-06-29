import { _fetch } from "../helpers/fetcher";

const type = "/user-abstract-approver";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const UserAbstractApproverAPI = {
	create: (paramBody:any) => {
		let body: any = {
			method: "POST",
			body: paramBody,
		};
		return _fetch(`${type}`, body);
	},
   
	get: (id : number) => {
		let body: any = {
			method: "GET",
		};
        
		return _fetch(`user/${id}/user-abstract-approver`, body);
	},
    delete: (id:string | string[] | undefined) => {
		let body: any = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`${type}/${id}`, body);
	},
};

export default UserAbstractApproverAPI;
