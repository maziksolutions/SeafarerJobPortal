import { HostListener } from "@angular/core";

export class AccessRights {
    registerName: string;
    categoryId: number;
    registerId: number;
    viewRights: boolean;
    addRights: boolean;
    ammendRights: boolean;
    deleteRights: boolean;
    printRights: boolean;
}

export interface ExampleFlatNode {
    expandable: boolean;
    level: number;
}

export interface AccessRightsTree {
    registerCategory: string;
    registerName: string;
    registerId: number;
    register: AccessRightsTree[];
}

