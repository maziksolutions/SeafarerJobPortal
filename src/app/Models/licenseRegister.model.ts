export class licenseRegisterModel {
    licenceId: number;
    licenceName: string;
    stcwCode: string;
    grtKw: string;
    level: string;
    group: string;
    type: string;
    authority: string;

    expiryApplicable: boolean;
    renewalRequired: boolean;
    authenticationRequired: boolean;

    stcwRemarks: string;

    isDeleted: boolean;
    recDate: string;
    modifiedBy: string;
    modifiedDate: string;
}