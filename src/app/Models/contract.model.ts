export class Contract {
    activitySignOnId: number;
    reimbursementOrDeductionId: number;
    seaportId: number;
    crewId: number;
    signonDate: Date;
    expectedSignOnDate: Date;
    duration: string;
    reviseReason: string;
    reliefDate: Date;
    contractId: number;
    type: string;
    engagementPort: number;
    reptriationPort: number;
    osa: number;
    waf: number;
    sca: number;
    other: number;
    plus: number;
    totalWage: number;
    acmApproval:any;
    gWapproval:any;
}  

export class ContractVM {
    contractVMId:any;
    activitySignOnId: number;
    reimbursementOrDeductionId: number;
    seaportId: number;
    crewId: number;
    signonDate: Date;
    expectedTravelDate: Date;
    duration: string;
    reviseReason: string;
    reliefDate: Date;
    contractId: number;
    type: string;
    engagementPort: number;
    reptriationPort: number;
    osa: number;
    waf: number;
    sca: number;
    other: number;
    plus: number;
    totalWage: number;
    pf :any;
    pfAmount :any;
     ud:any;
      udAmount:any;
      wf:any;
      wfAmount:any;   

/**Contrcat changes required for Portage Bill */
       leaveWages :any;
       fixedOvertime :any;
       uniformAllowance :any;
       pensionFund :any;
       basicWage :any;
       subsistenceAllowance :any;

} 

