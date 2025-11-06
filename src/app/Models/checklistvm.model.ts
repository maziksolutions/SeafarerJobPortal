export class Checklistvm {
    constructor(  
    public checklistId :number,
    public  crewId :number,
    public  rankId :number,
    public  vesselId :number,
    public  activitySignOnId :number,
    public  expectedSignOnDate :Date,
    public duration :string,
    public validityPeriod: string,
    ){}
}
