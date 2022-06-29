import { _fetch } from "../helpers/fetcher";
import Helpers from "../helpers";


const type = "/submission";
const submissionAttachment = "/submission-attachment";
const submissionApproval = "/submission-approval";
const submissionApprovalDetail = "submission-approval-detail";

// interface PayloadInterface {
//     method? :string,
//     body?: any
// }

const SubmissionAPI = {
    create: (paramBody: any) => {
        let body: any = {
            method: "POST",
            body: paramBody,
        };
        return _fetch(`${type}`, body);
    },

    get: (query: any) => {
        let body: any = {
            method: "GET",
        };
        let page = query.page ? query.page : 0;
        let limit = query.limit ? query.limit : "";
        let registration_number = query.registration_number ? query.registration_number : "";
        let first_name = query.first_name ? query.first_name : "";

        return _fetch(`${type}?page=${page}&limit=${limit}&registration_number=${registration_number}&first_name=${first_name} `, body);
    },

    getById: (id: number) => {
        let body: any = {
            method: "GET",
        };
        return _fetch(`${type}/${id}`, body);
    },

    getByUser: (user_id: any) => {
        let body: any = {
            method: "GET",
        };

        return _fetch(`${type}/user/${user_id}`, body);
    },

    getSubmission: (query: any) => {
        let body: any = {
            method: "GET",
        };
        let submission_id = query.submission_id ? `submission_id=${query.submission_id}` : "";
        let stage = `&stage=${query.stage}`;
        return _fetch(`${submissionAttachment}?${submission_id}${stage}`, body);
    },

    createSeminar: (paramBody: any) => {
        let body: any = {
            method: "POST",
            body: paramBody,
        };
        return _fetch(`${submissionAttachment}/create-seminar`, body);
    },
    createFinal: (paramBody: any) => {
        let body: any = {
            method: "POST",
            body: paramBody,
        };
        return _fetch(`${submissionAttachment}/create-final`, body);
    },

    createGraduation: (paramBody: any) => {
        let body: any = {
            method: "POST",
            body: paramBody,
        };
        return _fetch(`${submissionAttachment}/create-graduation`, body);
    },

    updateSeminarByLecturer: (paramBody: any, id: any) => {
        let body: any = {
            method: "PUT",
            body: paramBody,
        };
        return _fetch(`${submissionAttachment}/${id}/update-seminar-by-lecturer`, body);
    },

    updateSeminarByStudent: (paramBody: any, id: any) => {
        let body: any = {
            method: "PUT",
            body: paramBody,
        };
        return _fetch(`${submissionAttachment}/${id}/update-seminar-by-student`, body);
    },

    updateFinalByLecturer: (paramBody: any, id: any) => {
        let body: any = {
            method: "PUT",
            body: paramBody,
        };
        return _fetch(`${submissionAttachment}/${id}/update-final-by-lecturer`, body);
    },

    updateFinalByStudent: (paramBody: any, id: any) => {
        let body: any = {
            method: "PUT",
            body: paramBody,
        };
        return _fetch(`${submissionAttachment}/${id}/update-final-by-student`, body);
    },

    updateGraduationByStudent: (paramBody: any, id: any) => {
        let body: any = {
            method: "PUT",
            body: paramBody,
        };
        return _fetch(`${submissionAttachment}/${id}/update-graduation-by-student`, body);
    },


    getSubmissionApproval: (query: any) => {
        let body: any = {
            method: "GET",
        };
        let stage = query.stage !== undefined ? `?stage=${query.stage}` : "";
        let submission_attachment_id = query.submission_attachment_id ? `&submission_attachment_id=${query.submission_attachment_id}` : "";
        let status = query.status !== undefined ? `&status=${query.status}` : "";
        return _fetch(`${submissionApproval}${stage}${submission_attachment_id}${status}`, body);
    },

    updateSubmissionStatus: (paramBody: any, id: any) => {
        let body: any = {
            method: "PUT",
            body: paramBody,
        };
        return _fetch(`${submissionApproval}/${id}`, body);
    },

    getSubmissionApprovalDetail: (query: any) => {
        let body: any = {
            method: "GET",
        };
        let isActionTaken = query.isActionTaken ? `isActionTaken=${query.isActionTaken}` : "";
        let submission_approval_id = query.submission_approval_id ? `submission_approval_id=${query.submission_approval_id}` : "";

        return _fetch(`${submissionApprovalDetail}?${isActionTaken}&${submission_approval_id}`, body);
    },


    updateSubmissionApproval: (paramBody: any, id: any) => {
        let body: any = {
            method: "PUT",
            body: paramBody,
        };
        return _fetch(`${submissionApprovalDetail}/${id}`, body);
    },

    // update: (id:number,paramBody:any) => {
    // 	let body: any = {
    // 		method: "PUT",
    // 		body: paramBody,
    // 	};
    // 	return _fetch(`${type}/${id}`, body);
    // },

    // delete: (id: string | string[] | undefined) => {
    //     let body: any = {
    //         method: "DELETE",
    //         body: {},
    //     };
    //     return _fetch(`${type}/${id}`, body);
    // },
};

export default SubmissionAPI;
