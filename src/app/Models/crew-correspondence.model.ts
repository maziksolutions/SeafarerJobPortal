export class CrewCorrespondence {
    crewCorrespondenceId: number;
    correspondenceId: number;
    remarksId: number;
    from: string;
    to: string;
    subject: string;
    date: Date;
    attachment: File;
    correspondenceTypes: string;
    remarksTypes: string;
    isDeleted: boolean;
    recDate: Date;
    modifiedBy:string;
    modifiedDate:string;
    remarksType:any;
    correspondenceType:any;
}
