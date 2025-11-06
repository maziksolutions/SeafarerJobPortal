export class shipTypeModel{
    shipId: number;
    shipCategory:string;
    type: string;
    shipRange: string;
    isDeleted:boolean;
    recDate: string;
    modifiedBy:string;
    modifiedDate:string;
    shipRangeTo:any;
  }

  export class  VesselChange{

   vesselChangeId :number;
    vesselId:number;

    isName:any;
    isFlag:any;
    isManager:any;
    isowner:any;

    newVesselName:any;
    newManagerId:number;
    newFlagId:number;
    newOwnerId:number;

    isWagesCarriedForward:any;
    isSameCBA:any;
    isSameParticulars:any;

    expectedTakeOverDate:any;
    expectedTakeOverPort:any;

    //Updated later
    isActivityReversed:any;    
    newVesselId:any;
    isDeleted:boolean;
    //public string Attachment:number;
    remarks:number;
    modifiedDate:any;
    modifiedBy:any;
    vesselChanged:any;
    vessel:any;
    users:any;
    createdBy:any;
    recdate:any;
    recDate:any;

  }