import { licenseRegisterModel } from "./licenseRegister.model";

export class CrewLicense {
  crewLicenseId: number;
  licenseId: number;
  LicenseNumber: string;
  placeOfIssue: string;
  issueDate: Date;
  expiryDate: Date;
  countryId: number;
    authorityId: number;
    verified: string;
    limitationRemarks: string;
    attachment: File;
    verification: File;
    courseName: string;

    instituteName: string;
    authorities: string;
licenceRegister:licenseRegisterModel;
    isDeleted: boolean;
    recDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
    verifiedBy: string;
    verifiedDate: Date;
    country:any;
}
