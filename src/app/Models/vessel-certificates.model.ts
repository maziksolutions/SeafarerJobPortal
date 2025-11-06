import { User } from './user';
export class VesselCertificates {
  vesselCertificateId: number;
  vesselId: number;
  certificateId: number;
  number: string;
  issueDate: any;
  expiryDate: any;
  attachment: string;
  remarks: string;
  modifiedBy: string;
  modifiedDate: Date;
  isDeleted: boolean;
  recDate: Date;
  users:User;
  certificate:any;

  vessel: any;
}
