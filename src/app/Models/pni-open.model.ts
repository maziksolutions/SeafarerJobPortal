export class PniOpen {
    pniOpenId: number;
    pniId: number;
    piId:number;
    deductible1: string;
    deductible2: string;
    vesselId: number;
    crewId: number;
    doi: Date;
    crewIllness: string;
    officeCrew: string;
    cbaOfficer: string;
    cbaRating: string;
    illnessReasonId: number;
    injurySubTypeId: number;
    pniCase: boolean;
    isDeleted: boolean;
    recDate: Date;
    modifiedBy: string;
    modifiedDate: Date;

    // pni report model
    pniReportsId: number;
    reports: string;
    shortDecription: string;
    remarks: string;

    // pni sick wages model
    sickWagesId: number;
    fromDate: Date;
    toDate: Date;
    amount: string;
    sickwagesDate: Date;

    // pni claim report model
    claimReportId: number;
    claimAmount: string;
    claimDate: Date;

    // pni claim report model
    expensesId: number;
    type: string;
    expenses: string;
    expensesDate: Date;
    isChecked:boolean;
    isApproved:boolean;

    claimClosedDate:Date;
    informPNIDate:Date;
    signOffDate:Date;

    //check attachment

    isClaimAttached:boolean;
    isExpenseAttached:boolean;
    isSickAttached:boolean;
    isReportAttached:boolean;
    isDiversionAttached:boolean;
    isFileAttached:boolean;

    rankId:any;
    cbaId:any;
    piClubId:any;

    vessel:any;
    injurySubType:any;
    claimStatus:any;
    status:any;
    fmRemark:any;
    poRemark:any;
}
