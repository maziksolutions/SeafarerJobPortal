export class DocumentsDetails {
    documentDetailId: number;
    subManualListId: number;
    documentName: string;
    description: string;
    version: string;
    versionDescription: string;
    versionDate: Date;
    file: string;
    fileSize: string;
    modifiedBy: string;
    modifiedDate: Date;
    isDeleted: boolean;
    recDate: Date;
}
export interface DocumentsDetailsTree {
    manualCode: string;
    isExpired:number;
    subManualCode: string;
    subManualCodeId: string;
    subManual: DocumentsDetailsTree[];
}
export interface ExampleFlatNode {
    expandable: boolean;
    level: number;
}
