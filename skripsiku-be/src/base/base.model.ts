export class BaseModel {
  id: number;
  created_at?: Date;
  updated_at?: Date;
}

export class TenantModel extends BaseModel {
  code: string;
  name: string;
  description: string;
}

export class RoleModel extends BaseModel {
  code: number;
  name: string;
}
