export class DocumentsList {
    documentListId: number;
    subManualListId: number;
    documentName: string;
    description: string;
}

export interface DocumentsListTree {
    manualCode: string;
    subManualCode: string;
    subManualCodeId: number;
    subManual: DocumentsListTree[];
}

export interface ExampleFlatNode {
    expandable: boolean;
    level: number;
}
