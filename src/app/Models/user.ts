export class User {
  usersId: number;
  designationID: number;
  cityId: number;
  countryId: number;
  stateId: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  dob: Date;
  joiningDate: Date;
  email: string;
  mobileCode: string;
  mobile: number;
  photo: string | any;
  userCode: string;
  modifiedBy: number;
  isActive: boolean;
  recDate: Date;
  designation:any;
  isStepWaiver:any;
}

export interface PrincipalListTree {
  principal: string;
  vesselName: string;
  vesselId: number;
  vesselTree: PrincipalListTree[];
}

export interface ExampleFlatNode {
  expandable: boolean;
  level: number;
}

export class signAuthority {
  signAuthorityId: number;
  userId: string;
  authorityType: string;
  company: string;
  fromDate: Date;
  endDate: Date;
  
  modifiedBy: string;
  modifiedDate: string;
  isDeleted: boolean;
  recDate: string;
 givenBy:string;
} 
