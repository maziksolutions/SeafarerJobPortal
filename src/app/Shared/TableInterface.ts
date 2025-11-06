
export interface AuditType
    {
    AuditTypeId?: number;
    AuditTypeName?: string;
    }
    export interface AnswerType
    {
        AnswerTypeId?: number;
        AnswerTypeName?: string;
    }
    export interface CommentType
    {
        CommentTypeId?: number;
        CommentTypeName?: string;
    }
    
    export interface BestPracticesTask
    {
        BestPracticesTaskId?: number;
        BestPracticesTaskName?: string;
    }

    export interface IceCondition
    {
        IceConditionId?: number;
        IceCondition?: string;
        Type?: string;
    }

    export interface CurrentDirection
    {
        CurrentDirectionId?: number;
        CurrentDirection?: string;
    }

    export interface SeaState
    {
        SeaStateId?: number;
        SeaState?: string;
    }

    
    export interface SourceOfInjury
    {
        SourceOfInjuryeId?: number;
        SourceOfInjury?: string;
    }
    export interface NatureOfInjury
    {
        NatureOfInjuryId?: number;
        NatureOfInjury?: string;
    }

    export interface Sourceoflighting
    {
        SourceoflightingId?: number;
        Sourceoflighting?: string;
    }
    export interface BodyAffectedArea
    {
        BodyAffectedAreaId?: number;
        BodyAffectedArea?: string;
    }

    export interface Precipitation
    {
        PrecipitationId?: number;
        Precipitation?: string;
    }



    export interface Breach
    {
        BreachId?: number;
        Breach?: string;
    }


    export interface WindScale
    {
        WindScaleId?: number;
        WindScaleName?: string;
    }
    export interface MinimumRequirement
    {
        MinimumRequirementId?: number;
        MinimumRequirementName?: string;
    }

    export interface WorkLocation
    {
        WorkLocationId?: number;
        WorkLocationName?: string;
    }
    export interface WorkLocationRequirement
    {
        WorkLocationRequirementId?: number;
        Type?: string;
        WorkLocationId?: number;
        MinimumRequirementId?: number;
    }

    export interface MastersCondition
    {
        MastersConditionId?: number;
        MastersCondition?: string;
        Type?: string;
    }
    export interface EFormsMaster
    {
        EFormId?: number;
        EFormName?: string;
        EFormNumber?: string;
        EFormRevision?: string;
        EFormDate?: any;
    }
    export interface HumanError
    {
        HumanErrorId?: number;
        HumanError?: string;
    }
    export interface ViolationMaster
    {
        ViolationId?: number;
        ViolationName?: string;
    }
    export interface IncidentType
    {
        IncidentTypeId?: number;
        IncidentTypeName?: string;
    }
    export interface InjuryActivity
    {
        InjuryActivityId?: number;
        InjuryActivityName?: string;
    }
    export interface UnsafeActs
    {
        UnsafeActsId?: number;
        UnsafeAct?: string;
    }
    export interface UnsafeCondition
    {
        UnsafeConditionId?: number;
        UnsafeCondition?: string;
    }
    export interface HumanFector
    {
        HumanFactorId?: number;
        HumanFactor?: string;
    }
    export interface VesselFector
    {
        VesselFactorId?: number;
        VesselFactor?: string;
    }
    export interface ManagementFector
    {
        ManagementFactorId?: number;
        ManagementFactor?: string;
    }
    export interface OtherFactor
    {
        OtherFactorId?: number;
        OtherFactor?: string;
    }
    export interface PersonalFactor
    {
        PersonalFactorId?: number;
        PersonalFactor?: string;
    }
    export interface JobFactor
    {
        JobFactorId?: number;
        JobFactor?: string;
    }
    export interface IncidentMaster
    {
        IncidentId?: number;
        IncidentName?: string;
    }
    export interface MainCategory
    {
        MainCategoryId?: number;
        MainCategoryName?: string;
    }
    export interface SubCategory
    {
        SubCategoryId?: number;
        SubCategoryName?: string;
    }

    export interface OnBoardLoaction
    {
        OnBoardLoactionId?: number;
        OnBoardLoaction?: string;
    }
    export interface Visibility
    {
        VisibilityId?: number;
        Visibility?: string;
    }

    export interface TaskMaster
    {
        TaskId?: number;
        TaskName?:string;
        TaskType?: string;
    }

    export interface vesselLocation{
        vesselLocationId?:number;
        vesselLocationName?:string;
    }
    export interface SafePractices{
        SafePracticeId?:number;
        SafePracticeName?:string;
    }

