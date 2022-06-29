import { BaseModel } from 'src/base/base.model';
import { Exclude, Expose } from 'class-transformer';

export class FindMajorDTO {
  id?: number;
  code?: string;
  name?: string;
 
}
@Exclude()
export class MajorDTO extends BaseModel {
    


  @Expose()
  code: string;

  @Expose()
  name: string;

}
