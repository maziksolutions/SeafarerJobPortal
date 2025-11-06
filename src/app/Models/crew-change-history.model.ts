export class CrewChangeHistory {
    from: Date;
    signOffDate: Date;
    countryId:any;
    signOnDate:Date;
    arrivalDate:Date;
    travelDate:Date;
    approvalDate:Date;

    signonDate:Date;
    signoffDate: Date;

    secondMedicaldate:Date;
    firstMedicaldate:Date;

    promotionDate:Date;

    dateLeft:Date;
    dateReturned:Date;
    oilExpiry:Date;
    chemExpiry:Date;
    gasExpiry:Date;
    rank:string;
    count:number;    
}



export class PemeReport {
    cdcNumber:any;
    crewId:any;
    empnumber:any;
    medicalCenter:any;
    medicalDate:any;
    medicalStatus:any;
    nationality:any;
    rank:any;
    remarks:any;
    rowId:any;
    vesselJoinedDate:any;
    vesselPlanned:any;
}


export class BMI {
    countryId:any;
}

export class StatusType {
    constructor(
        public value: string,
        public status: string
    ) { }
}
