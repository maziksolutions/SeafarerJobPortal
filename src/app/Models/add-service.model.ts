export class AddServiceModel {
    addServiceId: number;
    serviceName:string;
    addServiceGroupId:number;
    isDeleted:boolean;
    recDate: string;
    modifiedBy:string;
    modifiedDate:string;

    addServiceGroup:any;
  }

  export class ServiceItems {
    serviceItemId:number;
    addServiceGroupId:number
    addServiceId: number;
    serviceItem:string;
    isDeleted:boolean;
    recDate: string;
    modifiedBy:string;
    modifiedDate:string;

    addServiceGroup:any;
    addService:any;
  }