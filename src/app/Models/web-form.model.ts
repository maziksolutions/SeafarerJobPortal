export class WebForm {
  webFormId: number;
  parentId:number;
  name:string;
  url: string;
  usersId:number;
  isDeleted:boolean;
  recDate: string;
  modifiedDate: string;
  //children: any[];
 children: WebForm[];
 type: any;
}
