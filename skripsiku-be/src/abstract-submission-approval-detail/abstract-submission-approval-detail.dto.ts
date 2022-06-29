import { IsNotEmpty } from 'class-validator';

export class UpdateAbstractSubmissionApprovalDetailDTO {
  @IsNotEmpty()
  status: number;

  remarks: string;

  @IsNotEmpty()
  abstract_submission_approval_id: number;
}
