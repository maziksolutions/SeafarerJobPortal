export class WageStructure {
    wageStructureId: number;
    rankId: number;
    subCodeId: number;
    wageAmount: string;
    cbaId: number;
    isDeleted: boolean;
    recDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
    wageComponent: any;
    wageId: number;
    subBudget : string;
}

export class WageStructureVM {
    wageStructureId: number;
    rankId: number;
    wageId: number;   
    wageAmount: string;
    cbaId: number;
    isDeleted: boolean;
    recDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
    subBudget : string;
}