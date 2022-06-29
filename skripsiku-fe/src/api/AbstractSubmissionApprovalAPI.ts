import { _fetch } from "../helpers/fetcher";

const type = "/abstract-submission-approval";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const AbstractSubmissionApprovalAPI = {
	update: (paramBody:any) => {
		let body: any = {
			method: "PUT",
			body: paramBody,
		};
		return _fetch(`${type}`, body);
	},
	get: (query : any) => {
		let body: any = {
			method: "GET",
		};
        let abstractSubmissionId = query.abstractSubmissionId ? query.abstractSubmissionId : "";
		return _fetch(`${type}?abstractSubmissionId=${abstractSubmissionId}`, body);
	},
    getApproval: (id:string | string[] | undefined,query : any) => {
		let body: any = {
			method: "GET",
		};
        let isActionTaken = query.isActionTaken ? query.isActionTaken : "";
		return _fetch(`${type}/${id}/abstract-submission-approval-detail?isActionTaken=${isActionTaken}`, body);
	},
};

export default AbstractSubmissionApprovalAPI;
