import { IsEnum } from 'class-validator';
import { AbstractSubmissionApprovalStatus } from 'enums/AbstractSubmissionApproval.enum';

export class UpdateAbstractSubmissionApprovalDTO {
  @IsEnum(AbstractSubmissionApprovalStatus, { message: 'Invalid value for Status' })
  status: number;
}
