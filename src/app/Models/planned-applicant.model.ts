export class PlannedApplicant {
    signOnId: number
    crewId: number
    vessel: string;

    countryId: number;
    seaportId: number;
    rankId: number;
    signOnReasonId: number;
    extraCrewReasonId: number;

    reliveesName: string;
    contract: string;

    expectedSignOnDate: Date;
    duration: string;
    reliefDate: Date;
    expectedTravelDate: Date;

    extraCrewOnBoard: string;
    reasonForExtraCrew: string;
    docsValidityCheckPeriod: string;
    allowBeginTravel: string;
    preJoiningMedicals: string;
    appraisal: string;
    remarks: string;

    modifiedBy: string;
    modifiedDate: Date;
    isDeleted: boolean;
    recDate: Date;
}
