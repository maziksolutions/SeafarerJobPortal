import { CityService } from "../Services/city.service";
import { Country } from "./country.model";

export class VendorRegister {
    vendorRegisterId: number;
    vendorName: string;
    code: string;
    preference: string;
    address1: string;
    address2: string;
    postcode: string;

    countryId: number;
    stateId: number;
    cityId: number;
    seaportId:number;
    primaryWorkCountryCode: string;
    primaryWorkStateCode: string;
    primaryWorkPhone: string;

    secondaryWorkCountryCode: string;
    secondaryWorkStateCode: string;
    secondaryWorkPhone: string;

    primaryMobileCountryCode: string;
    primaryMobilePhone: string;

    secondaryMobileCountryCode: string;
    secondaryMobilePhone: string;

    skypeId: string;
    primaryEmail: string;
    secondaryEmail: string;
    picName: string;
    mobileNo: string;
    services: any;

    modifiedBy: string;
    modifiedDate: Date;
    isDeleted: boolean;
    recDate: Date;
city: Cityname;
country:Country;
}
export class Cityname{
    cityId : number;
    cityName : string;
}


export class TodoItemNode {
    children: any;
    item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;
}
