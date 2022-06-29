import { _fetch } from "../helpers/fetcher";

const type = "/abstract-submission";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const AbstractSubmissionAPI = {
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
        let submission_period_id = query.submission_period_id ? query.submission_period_id : "";
        let user_id = query.user_id ? query.user_id : "";
        let major_id = query.major_id ? query.major_id : "";
        let name = query.name ? query.name : "";
        let registration_number = query.registration_number ? query.registration_number : "";
        let transaction_date = query.transaction_date ? query.transaction_date : "";
      
		return _fetch(`${type}?page=${page}&limit=${limit}&submission_period_id=${submission_period_id}&user_id=${user_id}&major_id=${major_id}&name=${name}&registration_number=${registration_number}&transaction_date=${transaction_date}`, body);
	},
    getById : (id:string | string[] | undefined) => {
        let body: any = {
			method: "GET",
		};
        return _fetch(`${type}/${id}`, body);
    },
   getRate: (query:any) => {
		let body: any = {
			method: "GET",
		};
        let majorId = query.majorId ? query.majorId : "";
        let submissionPeriodId = query.submissionPeriodId ? query.submissionPeriodId : "";
		return _fetch(`${type}/rate?majorId=${majorId}&submissionPeriodId=${submissionPeriodId}`, body);
	},
  
	
};

export default AbstractSubmissionAPI;
