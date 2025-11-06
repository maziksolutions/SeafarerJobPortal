export class stateModel {
    stateId: number;
    stateName: string;
    countryId: number;
    countryName: string;
    modifiedBy: string;
    modifiedDate: Date;
    isDeleted: boolean;
    recDate: Date;
    country:any;
}

export class PhotosObj implements stateModel {
    stateId: number;
    stateName: string;
    countryId: number;
    countryName: string;
    modifiedBy: string;
    modifiedDate: Date;
    isDeleted: boolean;
    recDate: Date;
    country:any;

    constructor(item?: stateModel) {
        if (item != undefined) {
            for (let key in item) {
                try { this[key] = item[key]; }
                catch (e) { }
            }
        }
    }
}