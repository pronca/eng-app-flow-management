import {Injectable} from '@angular/core';
import {
    Datastore,
    DatastoreProviderAdapters,
    EditDataProvider,
    OperationResult,
    Promises,
    SearchContext,
    SearchDataProvider,
    SearchFilters,
} from "eng-app";
import { FilterFlow, JobTalend, RulesDownloadRequest, RulesUploadResponse, AnagraficaAssistitoDTO, FmFlow, AnagraficaAssistitoDownload } from './flow-configuration.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/**
 * Business Logic for Flow Configuration Module
 */
@Injectable()
export class FlowConfigurationService {
  exportFlusso(filter: { id: string; }) {
    throw new Error('Method not implemented.');
  }
  downloadFmFlowXlsx(fmFlowDTO: FmFlow) {
    throw new Error('Method not implemented.');
  }

    deffered = Promises.defer<any>();

    private FlowValueSet: any[];
    private AnagraficaValueSet: any[];

    constructor(private http: HttpClient,private datastore: Datastore) {
    }


    deleteFlowField(flowField: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FormFlowDTO', ['deleteField'], flowField).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteFlowSection(flowSection: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FormFlowDTO', ['deleteSection'], flowSection).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteFlowFk(flowFkId: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FormFlowDTO', ['deleteFkLink'], flowFkId).toPromise();
        return Promise.resolve(p as any).then();
    }

    //FLOW API
    flowListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/FlowDTO');
    }

    formFlowListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/FormFlowDTO');
    }

    formFlowRegionListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/FormFlowRegionDTO');
    }

    formFlowEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/FormFlowDTO');
    }

    flowEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/FlowDTO');
    }

    flowFormEditDataProvider(flowDTO: any): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/FlowFormDTO');

    }

    saveFlowForm(flowDTO: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FormFlowDTO/save', flowDTO).toPromise();
        return Promise.resolve(p as any).then();
    }

    saveFlowFormPersist(flowDTO: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FormFlowDTO/createTable', flowDTO).toPromise();
        return Promise.resolve(p as any).then();
    }


    getFlowValueSet(): any[] {
        return this.FlowValueSet;
    }

    getFlowById(flowId: string): Promise<OperationResult<any>> {
        return this.flowEditDataProvider().getDataById(flowId, null);
    }

    //END FLOW API

    //DATASOURCE API
    dataSourceListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/DataSourceDTO');
    }


    dataSourceEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/DataSourceDTO');
    }

    getDataSourcesById(dataSourceId: string): Promise<OperationResult<any>> {
        return this.dataSourceEditDataProvider().getDataById(dataSourceId, null);
    }

    //END DATASOURCE API

    //DRIVER API
    driverListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/DriverDTO');
    }

    driverEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/DriverDTO');
    }

    getDriverssById(dataSourceId: string): Promise<OperationResult<any>> {
        return this.driverEditDataProvider().getDataById(dataSourceId, null);
    }

    //END DRIVER API

    //VERSION API
    versionListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/VersionDTO');
    }

    versionEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/VersionDTO');
    }

    getAllVersion(flow: any): Promise<OperationResult<any>> {
        let filter = {
            limit: 10,
            sortBy: [],
            startIndex: 0,
            flusso: flow
        };
        let p = this.datastore.postData('fm/VersionDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    getLastVersionByFlow(flowId: any): Promise<OperationResult<any>> {
        let filter = {
            flusso: flowId,
            limit: 10,
            sortBy: [],
            startIndex: 0
        };
        let p = this.datastore.postData('fm/VersionDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    getVersionById(dataSourceId: string): Promise<OperationResult<any>> {
        let filter = new SearchFilters();
        let searchContext = new SearchContext(null, filter);
        return this.versionEditDataProvider().getDataById(dataSourceId, searchContext);
    }

    getVersionsByFlow(flow: any): Promise<OperationResult<any>> {
        let filter = {
            flusso: flow
        };
        let p = this.datastore.postData('fm/VersionDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    //ANAGRAFICA API
    anagraficaListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/Tabgen');
    }

    profilaturaFlussiListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/ProfilaturaFlussi');
    }

    configurazioniFlussiListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/ConfigFlussi');
    }

    anagraficaEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/Tabgen');
    }

    profilaturaEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/ProfilaturaValue');
    }

    anagraficaValueEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/TabgenValue');
    }

    getAnagraficaValueSet(): any[] {
        return this.AnagraficaValueSet;
    }

    getAnagraficaById(anagraficaId: string): Promise<OperationResult<any>> {
        return this.anagraficaEditDataProvider().getDataById(anagraficaId, null);
    }

    saveTabgenForm(tabgen: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/Tabgen/save', tabgen).toPromise();
        return Promise.resolve(p as any).then();
    }

    saveValueForm(tabgenValue: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/TabgenValue/saveValue', tabgenValue).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteValueForm(tabgenValue: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/TabgenValue/deleteValue', null, tabgenValue).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteAllValueForm(tabgen: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/Tabgen/deleteAllValue', tabgen).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteTabgenForm(tabgen: any, dtAll: boolean, dtField: boolean, dtValue: boolean): Promise<OperationResult<any>> {
        let data = {
            id: tabgen.id,
            deleteAll: dtAll,
            deleteField: dtField,
            deleteValue: dtValue
        }
        let p = this.datastore.postData('fm/Tabgen/deleteTabgen', null, data).toPromise();
        return Promise.resolve(p as any).then();
    }

    searchTabgenFields(tabgenId: any): Promise<any> {
        let filter = {
            id: tabgenId
        };
        let p = this.datastore.postData('fm/Tabgen/_searchFields', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    searchTabgenTableByType(type: any): Promise<any> {
        let filter = {
            type: type,
            limit: 0,
            startIndex: 0
        };
        let p = this.datastore.postData('fm/Tabgen/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    searchTabgenTableValueByColumn(table: any, column: any): Promise<any> {
        let filter = {
            table: table,
            column: column,
            limit: 0,
            startIndex: 0
        };
        let p = this.datastore.postData('fm/TabgenValue/retriveColumnValue', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteFieldForm(tabgenField: any, del: boolean): Promise<OperationResult<any>> {
        let data = {
            id: tabgenField.id,
            delete: del
        }
        let p = this.datastore.postData('fm/Tabgen/deleteField', null, data).toPromise();
        return Promise.resolve(p as any).then();
    }

    tabgenValueListSearchDataProvider(filter: SearchFilters): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/TabgenValue/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    importTable(file: any, anagraficaTableId: any): Promise<OperationResult<any>> {
        return this.datastore.getHttpDatastore()
            .rawOperation('fm/Tabgen', 'import', file.content, {
                'Content-Type': 'application/octet-stream',
                'fileName': file.name,
                'fileType': file.type,
                'anagraficaTableId': anagraficaTableId
            }).toPromise();
    }

    exportTable(idTab: any): Promise<any> {
        return this.datastore.postData('fm/Tabgen/_export', null, idTab).toPromise();
    }

    checkExportTable(idExp: any): Promise<OperationResult<any>> {
        return this.datastore.getHttpDatastore()
            .rawOperation('fm/Tabgen', 'checkExport', idExp, {}).toPromise();
    }

    downloadExportTable(idExport: any): string {
        let attachLink = this.datastore.getHttpDatastore().getRemoteServiceUrlForGet('fm/Tabgen/_downloadExport', idExport, false);
        let externalUrl = attachLink + "?content=application/zip";
        return externalUrl;
    }


    //END ANAGRAFICA API

    //FLOW-VIEW API

    flowViewListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/FlowViewDTO');
    }

    flowViewEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/FlowViewDTO');
    }

    searchFlowView(filterInput: any): Promise<any> {
        let p = this.datastore.postData('fm/FlowViewDTO/searchTables', null, filterInput).toPromise();
        return Promise.resolve(p as any).then();
    }

    getVersionNameById(flow: any): Promise<any> {
        let p = this.datastore.postData('fm/FlowViewDTO/getVersionNameById', null, flow).toPromise();
        return Promise.resolve(p as any).then();
    }

    validateRecord(validationFilter: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/ValidatorController/validateRecord', validationFilter).toPromise();
        return Promise.resolve(p as any).then();
    }

    validateRecords(validationFilter: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/ValidatorController/validateRecords', validationFilter).toPromise();
        return Promise.resolve(p as any).then();
    }

    checkValidation(id: string): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/ValidatorController/checkValidation', {'validationId': id}).toPromise();
        return Promise.resolve(p as any).then();
    }

    checkSecondLevelJob(id: string): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/ValidatorController/checkSecondLevelJob', {'validationId': id}).toPromise();
        return Promise.resolve(p as any).then();
    }

    checkResetJob(id: string): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/ValidatorController/checkResetJob', {'validationId': id}).toPromise();
        return Promise.resolve(p as any).then();
    }

    resetValidation(validationFilter: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/ValidatorController/resetValidation', validationFilter).toPromise();
        return Promise.resolve(p as any).then();
    }

    crossValidation(validationFilter: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/ValidatorController/crossValidation', validationFilter).toPromise();
        return Promise.resolve(p as any).then();
    }

    getErrors(filterInput: any): Promise<any> {
        let p = this.datastore.postData('fm/FlowViewDTO/getErrors', null, filterInput).toPromise();
        return Promise.resolve(p as any).then();
    }

    countTables(filterInput: any): Promise<any> {
        let p = this.datastore.postData('fm/FlowViewDTO/countTables', null, filterInput).toPromise();
        return Promise.resolve(p as any).then();
    }

    //END FLOW-VIEW API

    //FLOW-EXTRACT API

    flowExtractListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/FlowImportRequestDTO');
    }

    flowExtractEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/FlowImportRequestDTO');
    }

    searchFlow(flow: any): Promise<OperationResult<any>> {
        let filter = {
            flowId: flow
        };
        let p = this.datastore.postData('fm/FormFlowDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    retriveFormFlowByFlowVersion(flow: any, version: any): Promise<OperationResult<any>> {
        let filter = {
            flowId: flow,
            versionId: version
        };
        let p = this.datastore.postData('fm/FormFlowDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }


    getAllFlowFields(flow: any, version: any): Promise<OperationResult<any>> {
        let filter = {
            flowId: flow,
            versionId: version
        };
        let p = this.datastore.postData('fm/FlowConfigurationFilter/getAllFlowFields', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    getDataFields(flow: any, version: any): Promise<OperationResult<any>> {
        let filter = {
            flowId: flow,
            versionId: version
        };
        let p = this.datastore.postData('fm/FlowImportRequestDTO/getDataFields', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }


    searchFlowExtr(): Promise<OperationResult<any>> {
        let filter = {
            flowType: "AZIENDA"
        };
        let p = this.datastore.postData('fm/FlowDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    searchAllFlows(): Promise<OperationResult<any>> {
        let filter = {};
        let p = this.datastore.postData('fm/FlowDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    getFlowTableFieldByFlowAndVersion(flow: any, versione: any): Promise<OperationResult<any>> {
        let filter = {
            flusso: flow,
            version: versione
        };
        let p = this.datastore.postData('fm/FlowExportDTO/getFields', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    importFlowFromTable(file: any): Promise<OperationResult<any>> {
        return this.datastore.getHttpDatastore()
            .rawOperation('fm/FormFlowDTO', 'import', file.content, {
                'Content-Type': 'application/octet-stream',
                'fileName': file.name,
                'fileType': file.type
            }).toPromise();
    }

    exportFmFlow(filter:any): Promise<any> {
        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/FormFlowDTO', ['_export']);
        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, filter, {
                headers: {'Content-Type': 'application/json'},
                responseType: "blob"
            });
        return p.toPromise().then();
    }

    deleteFlow(flowId: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FormFlowDTO', ['delete'], { id: flowId }).toPromise();
        return Promise.resolve(p as any).then();
    }

    saveExtraction(flowExtractDTO: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FlowImportRequestDTO/save', flowExtractDTO).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteExtraction(input: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowImportRequestDTO/delete', null, input).toPromise();
        return Promise.resolve(p as any).then();
    }

    cancelExtraction(input: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowImportRequestDTO/cancelExtraction', null, input).toPromise();
        return Promise.resolve(p as any).then();
    }

    startImport(flowExtractDTO: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FlowImportRequestDTO/start', flowExtractDTO).toPromise();
        return Promise.resolve(p as any).then();
    }

    searchCodiciPresidio(filterInput: any): Promise<any> {
        let p = this.datastore.postData('fm/FlowDTO/_searchCodiciPresidio', null, filterInput).toPromise();
        return Promise.resolve(p as any).then();
    }

    searchCodiciAzienda(filterInput: any): Promise<any> {
        let p = this.datastore.postData('fm/FlowDTO/_searchCodiciAzienda', null, filterInput).toPromise();
        return Promise.resolve(p as any).then();
    }
    
    searchAzCaricamentoFile(filterInput: any): Promise<any> {
        let p = this.datastore.postData('fm/FlowDTO/_searchCodAzCaricamentoFile', null, filterInput).toPromise();
        return Promise.resolve(p as any).then();
    }

    //END FLOW-EXTRACT API   


    flowOutputListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/FlowExportDTO');
    }

    saveExport(flowExportDTO: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FlowExportDTO/save', flowExportDTO).toPromise();
        return Promise.resolve(p as any).then();
    }

    checkObsolete(flowExportDTO: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FlowExportDTO/checkExtractObsoleta', flowExportDTO).toPromise();
        return Promise.resolve(p as any).then();
    }


    sconsolida(flowExportDTO: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FlowExportDTO/sconsolidaPratiche', flowExportDTO).toPromise();
        return Promise.resolve(p as any).then();
    }

    //getExportingRequest(flowid?: any, versionid?: any, extractionid?: any, status?: any, schedulingType?: any): Promise<OperationResult<any>> {
    getExportingRequest(filter: SearchFilters): Promise<OperationResult<any>> {
        // let filter = {
        //         flowid: flowid,
        //         versionid: versionid,
        //         id: extractionid,
        //         stateName: status,
        //         schedulingType: schedulingType,
        //         limit: 10,
        //         sortBy: [],
        //         startIndex: 0
        //     };
        let p = this.datastore.postData('fm/FlowExportDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }


    searchTalend(flusso: any, versione: any): Promise<OperationResult<any>> {
        let filter = {
            flow: flusso,
            version: versione
        };
        let p = this.datastore.postData('fm/JobTalendDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    startExtraction(flowExportDTO: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FlowExportDTO/start', flowExportDTO).toPromise();
        return Promise.resolve(p as any).then();
    }

    killExtraction(exportId: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FlowExportDTO/killExtraction', exportId).toPromise();
        return Promise.resolve(p as any).then();
    }

    //END FLOW-OUTPUT API

    //JOB TALEND API

    jobTalendListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/JobTalendDTO');
    }

    droolsListSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/ValidatorController');
    }

    droolsListEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/ValidatorController');
    }

    jobTalendEditDataProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/JobTalendDTO');
    }

    saveTalendJob(talendJobDTO: any): Promise<OperationResult<JobTalend>> {
        let p = this.datastore.saveEntity('fm/JobTalendDTO/save', talendJobDTO).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteJobTalend(talendJobDTO: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/JobTalendDTO/delete', null, talendJobDTO).toPromise();
        return Promise.resolve(p as any).then();
    }

    importTalend(talendJob: JobTalend, file: any): Promise<OperationResult<any>> {
        return this.datastore.getHttpDatastore()
            .rawOperation('fm/JobTalendDTO', 'import', file.content, {
                'Content-Type': 'application/octet-stream',
                'fileName': file.name,
                'jobTalendId': talendJob.id
            }).toPromise();
    }

    //END JOB TALEND API

    //VISUALIZZA PRATICA

    flowPratica(filterInputErr: any): Promise<any> {
        let p = this.datastore.postData('fm/FlowPraticaDTO/searchPraticaTableError', null, filterInputErr).toPromise();
        return Promise.resolve(p as any).then();
    }

    flowErrors(filterInput: any): Promise<any> {
        let p = this.datastore.postData('fm/FlowPraticaDTO/searchErrors', null, filterInput).toPromise();
        return Promise.resolve(p as any).then();
    }
    //Flow Configuration Filter API
    flowConfigurationFilterDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/FlowConfigurationFilter');
    }

    saveConfigurationFilter(flowConfigurationFilter: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FlowConfigurationFilter/save', flowConfigurationFilter).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteFlowConfigurationFilterField(flowConfigFilterField: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowConfigurationFilterField', ['delete'], flowConfigFilterField).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteFlowConfigurationFilter(flowConfigFilter: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowConfigurationFilter', ['delete'], flowConfigFilter).toPromise();
        return Promise.resolve(p as any).then();
    }

    getDashboardByFlow(flow: any, month: any, year: any, 
        extraFilter: any, canViewMonthFromToFilters: any, valueFilterMonthTo: any, valueFilterMonthFrom: any, canViewDateFromToFilters: any, valueFilterDateTo: any, valueFilterDateFrom: any): Promise<OperationResult<any>> {
        let filter = {
            flow: flow,
            month: month,
            year: year,
            extraFilter: extraFilter,
            canViewMonthFromToFilters: canViewMonthFromToFilters,
            valueFilterMonthTo: valueFilterMonthTo,
            valueFilterMonthFrom: valueFilterMonthFrom,
            canViewDateFromToFilters: canViewDateFromToFilters,
            valueFilterDateTo: valueFilterDateTo,
            valueFilterDateFrom: valueFilterDateFrom
        };
        let p = this.datastore.postData('fm/DashboardDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }


    getMotherDashboard(monthFrom: any, monthTo: any, year: any, status?: any): Promise<OperationResult<any>> {
        let filter = {
            monthFrom: monthFrom,
            monthTo: monthTo,
            year: year,
            status: status
        };
        let p = this.datastore.postData('fm/DashboardDTO/_searchMother', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }


    getDashboardProcedureByFlow(flowName: any, extraFilter: any): Promise<OperationResult<any>> {
        let filter = {
            flowName: flowName,
            extraFilter: extraFilter
        };
        let p = this.datastore.postData('fm/DashboardDTO/_searchProcedure', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    getDashboardErrorsByFlow(flowName: any, month: any, year: any, 
        extraFilter: any, canViewMonthFromToFilters: any, valueFilterMonthTo: any, valueFilterMonthFrom: any, canViewDateFromToFilters: any, valueFilterDateTo: any, valueFilterDateFrom: any): Promise<OperationResult<any>> {
        let filter = {
            flowName: flowName,
            month: month.toString(),
            year: year.toString(),
            extraFilter: extraFilter,
            canViewMonthFromToFilters: canViewMonthFromToFilters,
            valueFilterMonthTo: valueFilterMonthTo, 
            valueFilterMonthFrom: valueFilterMonthFrom,
            canViewDateFromToFilters: canViewDateFromToFilters,
            valueFilterDateTo: valueFilterDateTo, 
            valueFilterDateFrom: valueFilterDateFrom
        };
        let p = this.datastore.postData('fm/DashboardDTO/_searchTopErrors', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

//SEARCH COUNT PRATICHE DALLA TABELLA DASHBOARD
    getTotalItems(flow: any, month: any, year: any, widget_name: any): Promise<any> {
        let filter = {
            flow: flow,
            month: month,
            year: year,
            widget_name: widget_name
        };
        let p = this.datastore.postData('fm/DashboardDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    importDroolsFile(file: any, versionId: string, flowId: string, type: string): Promise<any> {
        return this.datastore.getHttpDatastore()
            .rawOperation('fm/ValidatorController', 'import', file.content, {
                'Content-Type': 'application/octet-stream',
                'flowId': flowId,
                'versionId': versionId,
                'ruleType': type,
                'fileName': file.name,
                'fileType': file.type
            }).toPromise();
    }

    importDroolsFiles(files: any[], versionId: string, flowId: string, type: string): Promise<any>[] {
        let results: Promise<RulesUploadResponse>[] = [];
        files.forEach(file => {
            results.push(this.importDroolsFile(file, versionId, flowId, type));
        });
        return results;
    }

    downloadDroolsFiles(rule: RulesDownloadRequest): Promise<any>  {
        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/ValidatorController', ['_downloadRules']);
        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, rule, {headers: {'Content-Type': 'application/json'}, responseType: "blob"});

        return p.toPromise().then();
    }


    downloadExportXML(exportId: any): Promise<any> {
        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/FlowExportDTO', ['_downloadXml']);

        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, exportId, {headers: {'Content-Type': 'text/plain'}, responseType: "blob"});


        return p.toPromise().then();
    }

        downloadSimulation(exportId: any,flusso: any): Promise<any> {
            let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/FlowExportDTO',['_downloadSimulation']);
    
            let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url,{'exportId':exportId,'flusso':flusso}, {headers: {'Content-Type':'application/json'}, responseType:"blob" ,observe: 'response' });
    
                
        return p.toPromise().then();
            }

    simulateFlowDrg(exportId: any,flusso: any): Promise<OperationResult<any>> {
            let p = this.datastore.postData('fm/FlowExportDTO/_drg', null,{'exportId':exportId,'flusso':flusso}).toPromise();
         
                return Promise.resolve( p as any ).then();
            
            }


    downloadExportLOG(exportId: any): Promise<any> {
        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/FlowExportDTO', ['_downloadLog']);

        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, exportId, {headers: {'Content-Type': 'text/plain'}, responseType: "blob"});

        return p.toPromise().then();
    }


    downloadDroolsFunctions(): Promise<any> {
        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/ValidatorController', ['_downloadFunctions']);
        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, null, {headers: {'Content-Type': 'application/json'}, responseType: "blob"});

        return p.toPromise().then();
    }

    deleteAllDroolsFile(rule: RulesDownloadRequest): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/ValidatorController/delete', null, rule).toPromise();
        return Promise.resolve(p as any).then();
    }

    importDroolsFunctionsFile(file: any): Promise<any> {
        return this.datastore.getHttpDatastore()
            .rawOperation('fm/ValidatorController', 'functions', file.content, {
                'Content-Type': 'application/octet-stream',
                'fileName': file.name,
                'fileType': file.type
            }).toPromise();
    }


    getFlowWithLastVersion(code: any, id?: any): Promise<OperationResult<any>> {
        let filter = {
            code: code,
            id: id
        };
        let p = this.datastore.postData('fm/FormFlowDTO/searchFlowWithLastVersion', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    /**
     * SERVICE FLOW-CONFIGURATION-FILTER
     * */

    /**
     * Recupera tutti i FLOW-CONFIGURATION-FILTER
     * @param flow
     * @param version
     * @param type (Statico/Dinamico)
     */
    getConfigFilter(flow: any, version: any, type: any): Promise<OperationResult<any>> {
        let filter = {
            flow: flow,
            version: version,
            type: type
        };
        let p = this.datastore.postData('fm/FlowConfigurationFilter/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }


    /**
     * SERVICE FLOW_REGION_UNION
     */
    saveFlowRegionUnion(flowRegionUnion: any): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/FlowRegionUnionDTO/save', flowRegionUnion).toPromise();
        return Promise.resolve(p as any).then();
    }

    getFmFlowByFlowAzienda(flow: any, version: any): Promise<OperationResult<any>> {
        let filter = {
            flow: flow,
            version: version
        };
        let p = this.datastore.postData('fm/FlowRegionUnionDTO/getFmFlowByFlowAzienda', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }
    

    downloadFlowViewXlsx(filterFlow: FilterFlow): Promise<any> {
        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/FlowViewDTO', ['_downloadXlsx']);

        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, JSON.stringify(filterFlow), {
                headers: {'Content-Type': 'application/json'},
                responseType: "blob"
            });

        return p.toPromise().then();

    }

    //PORTARE FUORI

    downloadFlowErrorXlsx(flow: any, month: any, year: any, tipo: any, name: any, extraMonthFrom:any, extraMonthTo:any, canViewMonthFromToFilters:any, canViewDateFromToFilters:any, extraDateFrom:any, extraDateTo:any): Promise<any> {
        let filter = {
            flow: flow,
            year: year,
            month: month,
            type: tipo,
            name: name,
            extraMonthFrom: extraMonthFrom,
            extraMonthTo: extraMonthTo,
            canViewMonthFromToFilters: canViewMonthFromToFilters,
            extraDateFrom: extraDateFrom,
            extraDateTo: extraDateTo,
            canViewDateFromToFilters: canViewDateFromToFilters
        };
        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/FlowPraticaDTO', ['_downloadXlsx']);

        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, JSON.stringify(filter), {
                headers: {'Content-Type': 'application/json'},
                responseType: "blob"
            });

        return p.toPromise().then();


    }


    downloadFlowErrorXlsx2(filterError:any): Promise<any> {

        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/FlowPraticaDTO', ['_downloadXlsx2']);

        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, JSON.stringify(filterError), {
                headers: {'Content-Type': 'application/json'},
                responseType: "blob"
            });

        return p.toPromise().then();


    }



    //PORTARE FUORI

    getContextParam(flow: any, keys: any): Promise<OperationResult<any>> {
        let filter = {
            flow: flow,
            keys: keys
        };
        let p = this.datastore.postData('fm/FlowPraticaDTO/searchContextParam', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }
    
    saveReturnsFiles(file: any, extractionId: string): Promise<any> {
        var fileName = 'empty.txt';
        var body: any = this.buildUploadBody(file);

        if (file && file.name) {
            fileName = file.name;
        }

        return this.datastore.getHttpDatastore()
            .rawOperation('fm/RegionReturnsDTO', 'import', body, {
                'Content-Type': 'application/octet-stream',
                'fileName': fileName,
                'extractionId': extractionId
            }).toPromise();
    }
    
   saveReturnsFilesTot(file: any, flowId: any, versionId: any, year: any): Promise<any> {
        var fileName = 'empty.txt';
        var body: any = this.buildUploadBody(file);

        if (file && file.name) {
            fileName = file.name;
        }

        return this.datastore.getHttpDatastore()
            .rawOperation('fm/RegionReturnsDTO', 'importTot', body, {
                'Content-Type': 'application/octet-stream',
                'fileName': fileName,
                'flowId': flowId,
                'versionId': versionId,
                'year': year
            }).toPromise();
    }

    private buildUploadBody(file: any): any {
        var fileName = '';
        var lowerFileName = '';
        var isTextFile = false;
        var content: any = null;

        if (file && file.name) {
            fileName = file.name;
            lowerFileName = fileName.toLowerCase();
            isTextFile = lowerFileName.indexOf('.txt') > -1 || lowerFileName.indexOf('.csv') > -1;
        }

        if (file) {
            content = file.content;
        }

        if (content !== null && content !== undefined) {
            if (content instanceof ArrayBuffer) {
                if (content.byteLength > 0) {
                    return content;
                }

                return isTextFile ? this.stringToArrayBuffer('\n') : content;
            }

            if (typeof content === 'string') {
                if (content.length > 0) {
                    return content;
                }

                return isTextFile ? '\n' : content;
            }

            if (content.byteLength !== undefined) {
                return content.byteLength > 0 ? content : (isTextFile ? this.stringToArrayBuffer('\n') : content);
            }

            if (content.size !== undefined) {
                return content.size > 0 ? content : (isTextFile ? this.stringToArrayBuffer('\n') : content);
            }

            if (content.length !== undefined) {
                return content.length > 0 ? content : (isTextFile ? '\n' : content);
            }

            return content;
        }

        return isTextFile ? this.stringToArrayBuffer('\n') : new ArrayBuffer(0);
    }

    private stringToArrayBuffer(value: string): ArrayBuffer {
        var buf = new ArrayBuffer(value.length);
        var view = new Uint8Array(buf);

        for (var i = 0; i < value.length; i++) {
            view[i] = value.charCodeAt(i);
        }

        return buf;
    }

    getReturns(filterInput: any, extractionId: string): Promise<any> {
        filterInput.extractionId = extractionId;
        let p = this.datastore.postData('fm/RegionReturnsDTO/getReturns', null, filterInput).toPromise();
        return Promise.resolve(p as any).then();
    }

    getDashboardConfig(flow: any, tipo: any) {
        let filter = {
            badge: "TRUE",
            tipo: tipo,
            flowId: flow
        };
        let p = this.datastore.postData('fm/DashboardDTO/_searchBadge', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }


    saveDependency(file: any, talendJob: any, dependencyType:string): Promise<any> {
        return this.datastore.getHttpDatastore()
            .rawOperation('fm/JobTalendDTO', 'dependency', file.content, {
                'Content-Type': 'application/octet-stream',
                'fileName': file.name,
                'jobTalendId': talendJob,
                'dependencyType': dependencyType
            }).toPromise();
    }

    saveXsd(file: any, flowName: any, sez: any): Promise<any> {
        return this.datastore.getHttpDatastore()
            .rawOperation('fm/JobTalendDTO', 'xsd', file.content, {
                'Content-Type': 'application/octet-stream',
                'flowName': flowName,
                'sez': sez
            }).toPromise();
    }

    searchDipendency(talendJob: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/JobTalendDTO/searchDipendency', null, talendJob).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteDipendency(dip: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/JobTalendDTO/deleteDipendency', null, dip).toPromise();
        return Promise.resolve(p as any).then();
    }

    searchPatient(searchPatient: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowPatientDTO/searchPatient', null, searchPatient).toPromise();
        return Promise.resolve(p as any).then();
    }

    searchFlowPatient(searchFlowPatientFilter: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowPatientDTO/searchFlowPatient', null, searchFlowPatientFilter).toPromise();
        return Promise.resolve(p as any).then();
    }

    pingServiceExtraction(extractions: any[]): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowExportDTO/pingServiceExtraction', null, extractions).toPromise();
        return Promise.resolve(p as any).then();
    }

    //
    deleteRequestExport(input: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowExportDTO/delete', null, input).toPromise();
        return Promise.resolve(p as any).then();
    }

    /**
     * Service.
     * Search Flow by Name
     * @param flowName
     */
    searchFlowByName(name: any): Promise<OperationResult<any>> {
        let filter = {
            nameNoLike: name
        };
        let p = this.datastore.postData('fm/FlowDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }
    
    retrivePermission(type: any, name:any): SearchDataProvider {
        let filter = {
            resourceType: type, 
            resourceQNames:[name]
        };
        return DatastoreProviderAdapters.searchProviderForRestAPIFiltered(
            this.datastore, "fm/Permissions", filter);
    }
    
    getUser(username: any): Promise<OperationResult<any>> {
        let filter = {
            username: username
        };
        let p = this.datastore.postData('fm/Permissions/getUser', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    getFlowFileUpload(filter: SearchFilters): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowFileUploadDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    downloadFiles(fileUpload: any): Promise<any> {

        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/FlowFileUploadDTO', ['_downloadFiles']);

        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, JSON.stringify(fileUpload), {
                headers: {'Content-Type': 'application/json'},
                responseType: "blob"
            });

        return p.toPromise().then();
    }

    downloadUploadLOG(fileUpload: any): Promise<any> {

        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/FlowFileUploadDTO', ['_downloadLogs']);

        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, JSON.stringify(fileUpload), {
                headers: {'Content-Type': 'application/json'},
                responseType: "blob"
            });

        return p.toPromise().then();
    }

    deleteRequestUpload(input: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowFileUploadDTO/delete', null, input).toPromise();
        return Promise.resolve(p as any).then();
    }

    getUpdateFlowErrors(input: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowFileUploadDTO/getUploadFlowErrors', null, input).toPromise();
        return Promise.resolve(p as any).then();
    }

    saveUploadRequest(filter: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowFileUploadDTO/save', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    saveUploadFile(input: any, file: any, sec: any): Promise<OperationResult<any>> {
        // Normalizzo il nome in minuscolo per gestire estensioni maiuscole
        const fileNameLower = file.name.toLowerCase();

        // Default: TXT
        let contentType = 'application/octet-stream';
        let extension = 'txt';

        if (fileNameLower.endsWith('.txt')) {
            contentType = 'text/plain';
            extension = 'txt';
        } else if (fileNameLower.endsWith('.csv')) {
            contentType = 'text/csv';
            extension = 'csv';
        } else if (fileNameLower.endsWith('.xls')) {
            contentType = 'application/vnd.ms-excel';
            extension = 'xls';
        } else if (fileNameLower.endsWith('.xlsx')) {
            contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            extension = 'xlsx';
        } else if (fileNameLower.endsWith('.zip')) {
            contentType = 'application/zip';
            extension = 'zip';
        } else if (fileNameLower.endsWith('.tar.gz') || fileNameLower.endsWith('.tgz')) {
            contentType = 'application/gzip';
            extension = 'tar.gz';
        } else if (fileNameLower.endsWith('.txt.gz')) {
            contentType = 'application/gzip';
            extension = 'txt.gz';
        } else if (fileNameLower.endsWith('.csv.gz')) {
            contentType = 'application/gzip';
            extension = 'csv.gz';
        } else if (fileNameLower.endsWith('.xls.gz')) {
            contentType = 'application/gzip';
            extension = 'xls.gz';
        } else if (fileNameLower.endsWith('.xlsx.gz')) {
            contentType = 'application/gzip';
            extension = 'xlsx.gz';
        } else {
            // Formato non accettato
            const errorMessage = "Formato file non accettato. Sono ammessi solo i formati TXT, CSV, XLS, XLSX, ZIP, GZ, TAR.GZ, TGZ";
            
            // Restituisce una Promise "simile" a OperationResult fallita
            return Promise.resolve({
                success: false,
                opTargetObject: {
                    message: errorMessage
                }
            } as OperationResult<any>);
        }

        //Se il formato è valido, procede con il caricamento
        return this.datastore.getHttpDatastore()
            .rawOperation('fm/FlowFileUploadDTO', 'saveRequest', file.content, {
                'Content-Type': contentType,
                'fileName': file.name,
                'fileUpload': input.id,
                'section': sec,
                'extension': extension,
                'flowName': input.flow.name 
            })
            .toPromise();
    }

    
    deleteFileUpload(requestId: any, section: any): Promise<OperationResult<any>> {
        let filter = {
            requestId: requestId,
            section: section
        }
        let p = this.datastore.postData('fm/FlowFileUploadDTO/deleteFile', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    validationFileUpload(request: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowFileUploadDTO/validation', null, request).toPromise();
        return Promise.resolve(p as any).then();
    }

    importazione(request: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowFileUploadDTO/import', null, request).toPromise();
        return Promise.resolve(p as any).then();
    }

    checkIncompleteErrors(request: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowFileUploadDTO/checkIncompleteErrors', null, request).toPromise();
        return Promise.resolve(p as any).then();
    }

    searchDrgByExttractionId(extraction: any): Promise<OperationResult<any>> {
        let p = this.datastore.postData('fm/FlowDrgDTO/_searchByExtractionId', null, extraction.id).toPromise();
        return Promise.resolve(p as any).then();
    }

    anagraficaAssistitoSearchDataProvider(): SearchDataProvider {
        return DatastoreProviderAdapters.searchProviderForRestAPI(this.datastore, 'fm/AnagraficaAssistitoDTO');
    }

    

    anagraficaAssistitoEditProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/AnagraficaAssistitoDTO');
    }

    getAnagraficaAssistioById(Id: string): Promise<OperationResult<any>> {
        return this.anagraficaAssistitoEditProvider().getDataById(Id, null);
    }

    searchAllAnagraficaAssistitoData(filter1): Promise<OperationResult<any>> {    
        let filter = filter1;
        let p = this.datastore.postData('fm/AnagraficaAssistitoDTO/searchAnagrafica', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    exportAllAnagraficaAssistitoData(filter1): Promise<OperationResult<any>> {    
        let filter = filter1;
        let p = this.datastore.postData('fm/AnagraficaAssistitoDTO/export', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    getAnagraficaAssistioPaginated(pageNo:number, pageSize:number,sortField:string,sortDir:string): Promise<OperationResult<any>> {
        let filter = {
            pageNo : pageNo,
            pageSize : pageSize,
            sortField : sortField,
            sortDir : sortDir
        };
        let p = this.datastore.postData('fm/AnagraficaAssistitoDTO/pagin', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    saveAnagraficaAssistitoData(anagraficaAssistitoDto: AnagraficaAssistitoDTO): Promise<OperationResult<any>> {
        let p = this.datastore.saveEntity('fm/AnagraficaAssistitoDTO',  anagraficaAssistitoDto).toPromise();
        return Promise.resolve(p as any).then();
    }

    deleteAnagraficaAssistitoData(anagraficaAssistitoDto: AnagraficaAssistitoDTO): Promise<OperationResult<any>> {
        let p = this.datastore.deleteEntity('fm/AnagraficaAssistitoDTO/id', anagraficaAssistitoDto.id).toPromise();
        console.log("P::: "+p)
        return Promise.resolve(p as any).then();
    }

    getAnagraficaAssistitoFilter(filter): Promise<OperationResult<any>> {       
        let p = this.datastore.postData('fm/AnagraficaAssistitoDTO/_search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
      }

    importAnagraficaAssTable(file: any): Promise<OperationResult<any>> {
        return this.datastore.getHttpDatastore()
            .rawOperation('fm/AnagraficaAssistitoDTO', 'import', file.content, {
                'Content-Type': 'application/octet-stream',
                'fileName': file.name,
                'fileType': file.type
            }).toPromise();
    }

    downloadAnagraficaAssistitoXlsx(data:AnagraficaAssistitoDownload): Promise<any> {
        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/AnagraficaAssistitoDTO', ['_downloadXlsx']);
        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, data, {
                headers: {'Content-Type': 'application/json'},
                responseType: "blob"
            });
        return p.toPromise().then();
    }

    sdoFlowMonitorEditProvider(): EditDataProvider {
        return DatastoreProviderAdapters.editProviderForRestAPI(this.datastore, 'fm/MonitorSdoXlDTO');
    }

    getSdoMonitorDataPaginated(pageNo:number, pageSize:number,sortField:string,sortDir:string): Promise<OperationResult<any>> {
        let filter = {
            pageNo : pageNo,
            pageSize : pageSize,
            sortField : sortField,
            sortDir : sortDir
        };
        let p = this.datastore.postData('fm/MonitorSdoXlDTO/pagin', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    filterMonitorSdoData(filter): Promise<OperationResult<any>> {     
        let p = this.datastore.postData('fm/MonitorSdoXlDTO/search', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    filterMonitorSdoDataErrors(filter): Promise<OperationResult<any>> {    
        let p = this.datastore.postData('fm/MonitorSdoXlDTO/errors', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }
   
    getFlusso(filter): Promise<OperationResult<any>> {    
        let p = this.datastore.postData('fm/MonitorSdoXlDTO/getAllFlusso', null, filter).toPromise();
        return Promise.resolve(p as any).then();
    }

    exportMonitorXMLFile(filter: any): Promise<any> {
        let url = this.datastore.getHttpDatastore().getRemoteServiceUrl('fm/MonitorSdoXlDTO', ['_downloadXml']);

        let p = this.datastore.getHttpDatastore().getHttpClient()
            .post(url, filter, {headers: {'Content-Type': 'application/json'}, responseType: "blob"});
        return p.toPromise().then();
    }
}