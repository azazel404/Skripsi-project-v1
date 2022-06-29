import { AnyARecord } from "dns";
import { _fetch } from "../helpers/fetcher";

const type = "/abstract-submission-approval-detail";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const AbstractSubmissionApprovalDetailAPI = {
	update: (paramBody:any) => {
		let body: any = {
			method: "PUT",
			body: paramBody,
		};
		return _fetch(`${type}`, body);
	},
};

export default AbstractSubmissionApprovalDetailAPI;
