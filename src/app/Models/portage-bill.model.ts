import { DecimalPipe } from "@angular/common";

export class PortageBill {
    portageBillId: number;
    crewId: number;
    crewListId: number;
    contractId: number
    from: Date;
    currency: string;
    nationality:string;
    to: Date;
    days: number;
    otHours: number;
    extraot: DoubleRange;
    otherEarnings: DoubleRange;
    transitDays: number;
    transitWages: DoubleRange;
    totalEarnings: DoubleRange;
    prevMonthBal: DoubleRange;
    reimbursement: number;
    totalPayable: DoubleRange;
    leaveWagesCF: DoubleRange;
    cashAdvance: DoubleRange;
    bondedStores: DoubleRange;
    otherDeductions: DoubleRange;
    allotments: DoubleRange;
    totalDeductions: DoubleRange;
    leaveWagesBF: DoubleRange;
    finalBalance: DoubleRange;
    PFAmount: DoubleRange;
    UDAmount: DoubleRange;
    WFAmount: DoubleRange;
    Deduction: DoubleRange;
    isDeleted: boolean;
    recDate: Date;
   createdBy: number;
   modifiedBy: number;
   modifiedDate: Date;
    otrate : DoubleRange;
    signOffDate: Date;
    remarks: string;
    UDdeduction: number;
    WFdeduction: number;
    WHTdeduction: number;
    isTransitApply: boolean;    
    leavePay: number;
    totalDays: number;
    crewDetails:any;
    filePath: any;
}

export class PBBankAllotment {
    bankAllotmentId : number;   
    crew : number;  
    vesselId : number;  
    from : Date;  
    to : Date;  
    allotments: DoubleRange;
}