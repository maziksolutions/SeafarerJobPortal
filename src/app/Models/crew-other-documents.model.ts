export class CrewOtherDocuments {
    crewOtherDocumentsId: number;
    documentId: number;
    authorityId: number;
    authorities: string;
    documentName: string;
    documentNo: string;
    joiner:boolean;
    issueDate: Date;
    expiryDate: Date;
    extendedDate: number;
    placeOfIssue: string;
    attachment: File;
    otherDocuments: any[];
    remarks: string;
    modifiedDate: Date;
    modifiedBy: string;
    isDeleted: boolean;
    recDate: Date; 
}
