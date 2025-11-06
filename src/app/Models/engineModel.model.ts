export class engineModel{
    engineModelId:number;
    model:string;
    maker:string;
    engineTypeId:number;
    type:string;
    engineSubTypeId:number;
    subType:string;
    countryId:number;
    countryName:string;
    stateId:number;
    stateName:string;
    cityId:number;
    cityName:string;
    isDeleted:boolean;
    recDate:string;
    modifiedBy:string;
    modifiedDate:string;

    country;any;
    state:any;
    city:any;
    engineType:any;
    engineSubType:any;
}


export class eCDIS{
    ecdisId:number;
    model:string;
    maker:string;    
    countryId:number;
    countryName:string;
    stateId:number;
    stateName:string;
    cityId:number;
    cityName:string;
    isDeleted:boolean;
    recDate:string;
    modifiedBy:string;
    modifiedDate:string;

    country;any;
    state:any;
    city:any;
   countryCode:any;
   stateCode:any;
   mobileCode:any;
}