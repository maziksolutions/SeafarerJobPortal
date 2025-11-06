export class courseRegisterModel {
    courseId: number;
    rankId: string;
    courseName: string;
    courseCode: string;
    courseType: string;
    reference: string;
    level: string;
    method: string;
    rankName: string;

    expiryApplicable: boolean;
    renewalRequired: boolean;
    authenticationRequired: boolean;

    modifiedBy: string;
    modifiedDate: Date;
    isDeleted: boolean;
    recDate: Date;
} 