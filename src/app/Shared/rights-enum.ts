export enum registerNavEnum {   
  // Type Master
    attachmentType = 'attachmentType',
    inventorytype = 'inventorytype',
    componentType = 'componentType',
      //Component Condition
    componentCondition = 'componentCondition',
    // Category
    category='category',
    // Maintenance Group
    jobGroup='jobGroup',
    // Unitmaster
    unitmaster = 'unitmaster',
    // Priority Master
    priority = 'priority',
  // Classificationsociety
  classificationsociety = 'classificationsociety',
   // maintenanceReference
   maintenanceReference='maintenanceReference',
    // maintenanceProcedure    
    maintenanceProcedure='maintenanceProcedure',
    
     // makerMaster 
     makerMaster = 'makerMaster',
    reasonMaster='reasonMaster',
    AuditType='AuditType',
    actiontype='actionType',
    activityType='activityType',
    answerType='answerType',
    Checklist='Checklist',
    commentType='commentType',
    ControlAction='ControlAction',
    Department='Department',
    FindingType='FindingType',
    JobType='JobType',
    PriorityMaster='PriorityMaster',
    Questioncategory='Questioncategory',
    QuestionPriority='QuestionPriority',
    QuestionTask='QuestionTask',
    ReferenceMaster='ReferenceMaster',
    RegulatoryMaster='RegulatoryMaster',
    ReportHeaderFooter='ReportHeaderFooter',
    riskFactor='riskFactor',
    Riskmanagement='Riskmanagement',
    severity='severity',
    Statustype='Statustype',
    TaskCategory='TaskCategory',

    workLocationRequirement='workLocationRequirement',
    workLocation='workLocation',
    WindScale='WindScale',
    weatherCondition='weatherCondition',
    visibility='visibility',
    VesselType='VesselType',
    VesselLocation='VesselLocation',
    vesselCargo='vesselCargo',
    TaskMaster='TaskMaster',
    SourceofLighting='SourceofLighting',
    BodyAffectedArea='BodyAffectedArea',
    bestPracticesTask='bestPracticesTask',
    Breach='Breach',
    causeAnalysis='causeAnalysis',
    CurrentDirection='CurrentDirection',
    eFormsMaster='eFormsMaster',
    hotWorkChecklist='hotWorkChecklist',
    HumanErrorAnalysis='HumanErrorAnalysis',
    incidentMaster='incidentMaster',
    incidentType='incidentType',
    injuryActivity='injuryActivity',
    InjuryDetails='InjuryDetails',
    InjuryNotification='InjuryNotification',
    MastersCondition='MastersCondition',
    minimumRequirement='minimumRequirement',
    NatureOfInjury='NatureOfInjury',
    ocimf='ocimf',
    onBoardLoaction='onBoardLoaction',
    Precipitation='Precipitation',
    Rankmaster='Rankmaster',
    RootCause='RootCause',
    SeaState='SeaState',
    SourceOfInjury='SourceOfInjury',
    eFormsExplorer='eFormsExplorer',
  


 }

 export enum eFormNavEnum { 
  eFormsExplorer = 'eFormsExplorer',
 }
 export enum unitMasterNavEnum
 {
   
 
 }

 export enum pmsMasterNavEnum{
  spareAssembly = 'spareAssembly',
  classificationSurvey = 'classificationSurvey',
  groupMaster = 'groupMaster',
  listmaintenance = 'listmaintenance',
  component = 'component',
  spareparts = 'spareparts',
  stores = 'stores',
  cause = 'cause'
 }
 export enum administrationNavEnum{
   vesselRegister = 'vesselRegister',
   codeList = 'codeList',
   department = 'department',
   position = 'position',
   designationRoles = 'designationRoles',
   companyType = 'companyType',
   company = 'company',
   users = 'users',
   engineType = 'engineType',
   engineSubType = 'engineSubType',
   engineModel = 'engineModel',
   shipType = 'shipType',
   eCDIS = 'eCDIS',
   countryMaster = 'countryMaster',
   functionClassifier = 'functionClassifier',   
   alert = 'alert',  
   log='log' 
 }

 export enum userNavEnum {
    users = 'users',
    pagecategory = 'page-category',    
    accessrights = 'access-rights',
    SignAuthourity = 'sign-Auth',
 }

 export enum shipMasterEnum
 {
  position='position',
  locationMaster='locationMaster',
  spareAssemblysList='spareAssemblysList',
  listShipPms='listShipPms',
  counterMaster='counterMaster',
  maintenanceMasterList='maintenanceMasterList',
  sparePartsMaster='sparePartsMaster'
 }

 export enum pmsStepEnum
{
  pmsTemplate='pmsTemplate',
  pmssetup='pmssetup',
  postponeConfigComponent='postponeConfigComponent',
  jSAmaster='jSAmaster',
  componentSetUp='componentSetUp'
}

export enum configurationEnum
{
  pages='pages',
  roleBaseAccessRights='roleBaseAccessRights',
  userBaseAccessRights='userBaseAccessRights',
  PageCategory='PageCategory',
  FileExplorer='FileExplorer'
}
export enum pmsOverviewEnum
{
  maintenanceForecast='maintenanceForecast',
  counterUpdate='counterUpdate',
  completedMaintenances='completedMaintenances',
  InventoryExplorer='InventoryExplorer',
  FileExplorer='FileExplorer'

}

export enum moduleEnum
{
  PMS='PMS',
  ADMINISTRATION='ADMINISTRATION'
}
export enum moduleEnum
{
  QHSE='QHSE',
  ADMINISTRATIONS='ADMINISTRATIONS'
}

export enum WorkFlowMasterNavEnum {
  wfevent = 'wfevent',
  wfgroup = 'wfgroup',
  wfworkflow = 'wfworkflow'
}
 