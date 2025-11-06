import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

export class OfferLetter {
    offerLetterId: number;
    crewId: number;
    osa: number;
    sca: number;
    waf: number;
    rjb: number;
    totalWage: number;
    duration: string;
    status: string;
    travelDate: Date;
    rankId: number;
    shipTypeId: string;
    cbaid: number;
    filePath: string;
    modifiedBy: string;
    modifiedDate:Date;
    actionDate : Date;
    recDate : Date;      
    isDeleted :boolean;    
    createdBy :number;
    shipTypes: any;
    users: any;
    ranks: any;
    cba: any;
    otherCommitment:string;
    currency:string;
}
