import { Attachment } from 'src/attachment/attachment.entity';
import { TenantModel, RoleModel } from '../../base/base.model';

export class GetProfileRequestModel {
  user_id: number;
  username?: string;
}

export class GetProfileResponseModel {
  id: number;
  email: string;
  name: string;
  gender: number;
  genderInString: string;
//   profile_picture: Attachment;
  birthdate: Date;
  phone: string;
  is_activated: boolean;
//   tenant: TenantModel;
//   role: RoleModel;
}
