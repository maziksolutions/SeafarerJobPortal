export class CrewModel {
    crewId: number;
    countryId: number;
    rankId: number;
    poolId: number;
    empNumber: string;
    englishFluency: string;
    status: string;
    firstName: string;
    country: any;
    middleName: string;
    lastName: string;
    dob: Date;
    gender: string;
    shipCategory: string;
    resume: string;
    remark: string;
    officeCrew: string;
    applicantStatus: string;
    doa: Date;
    countryName: string;
    nationality: string;
    rankName: string;
    code : string;
    vesselId: number;
    vessel: any;
    planVessel: any;
    planVesselId:number;
    cdcId: number;
    cdcNumber: string;
    place: string;
    doi: Date;
    doe: Date;

    isDeleted: boolean;
    recDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
    rankRegister: any;
userImage:any;
    LastVesselId:number;
    vesselName: string;
    lastVessel: string;
    previousStatus:string
    crewName: string;
    lastSignOffDate:Date;
    inActiveOn:Date;
    ntbrOn:Date;
    ntbrReason: any;    
    inActiveReason:any;
    planStatus:string;

    planVesselCode:string;
    vesselCode:string;
    lastVesselCode:string;
    countryCode:string;
}

export class Dashboard {
    id: number;
    total: number;
    onboard : number;
    available : number;
    ntbr : number;
    pending : number;
}

export class Dashrank {
    id: number;
    rank: string;
    count : number;
}
export class VesselCertificateExpiry {
    expireId: number;
    month: string;
    totalcount : any;
    total : any;
    columnname : any;
}
export class CrewContract{
     crewId : number;
      empNumber : string;
      status : string;
      firstName : string;
      middleName : string;
      lastName : string;
      rankName : string;
      rankId : number;
      code : string;
      dob : Date;
      nationality : string;
    //  int? LastVessel : number;
     vesselId : number;
      vesselName : string;
      doa : Date;
      countryId : number;
      reliefDate : Date;
      resume : string;
      cdcNumber : string;
      passport : string;
      rankType : string;
      ownerName : string;
      imo : string;
      vesselCountryName : string;
      gtHour : string;
      lastSignOffDate : Date;
      remark : string;
      birthPlace : string;
      applicantStatus : string;
      cbaid : number;
      cba : string;
      currency:string;
}

export class CrewPerformanceBonus{
       performanceId:number;
      crewId: number;
      rankId: number;
      age:number;
      dateOfJoining: Date;
      vesselId: number;
      planVesselId: string;
      appraisal: string;
      sire:string;  
      traningMatrix:string; 
      nationality:string;  
      approvedBy:string;
}