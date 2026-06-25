import {Component, EventEmitter, HostBinding, Output, ViewChild} from "@angular/core";
import * as moment_ from 'moment';
import {
    ActivityActionType,
    ActivityManager,
    Choice,
    EditActivityComponent,
    ResumeOperation,
    SearchFilters
} from "eng-app";
import {FlowConfigurationService} from "../../flow-configuration/flow-configuration.service";
import {
    FlowExport,
    FlowNative,
    FmFlow,
    Header,
    Version,
    FileUploadState
} from "../../flow-configuration/flow-configuration.model";
import {MatDialog, MatSort, MatTableDataSource} from "@angular/material";
import {DialogContentExampleDialog} from '../../dialog-box/dialog-content-example-dialog';
import Utils from '../../flow-configuration/flow-configuration.utils';
import {interval, Subscription} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from "@angular/material/paginator";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const moment = moment_;

@Component({
    selector: 'upload-file-search-activity',
    templateUrl: './upload-file-search-activity.component.html',
    styleUrls: ['./upload-file-search-activity.components.scss']
})

export class UploadFileSearchActivityComponent extends EditActivityComponent {
    refreshSubscription: Subscription;
    refreshInterval = 60000; // default ogni 60 secondi
    filterGlob: SearchFilters = new SearchFilters();
    totalItems: number;
    blockLeft: boolean = true;
    blockRight: boolean;
    pageIndexStore: number = 1;
    showLoadingIndicator: boolean = true;
    choice: Choice = {
        text: 'OK',
        cssClass: '{text-align:center;}'
    };
    choices: Choice[] = [];
    flows: FlowNative[] = [];
    versions: Version[] = [];
    flow_id: string = "";
    version_id: string = "";
    status: string = "";
    aziendeLoadedInFile: string = "";
    validationStatus: string = "";
    statuss: string[] = [
        FileUploadState.LOADED,
        FileUploadState.COMPLETE,
        FileUploadState.INCOMPLETE,
        FileUploadState.WELL_FORMED,
        FileUploadState.NOT_WELL_FORMED,
        FileUploadState.VALIDATED,
        FileUploadState.VALIDATION_ERROR,
        FileUploadState.IN_IMPORT
    ];
    //displayedColumns: string[] = ['select', 'id', 'aziendeLoadedInFile', 'flow', 'version', 'username', 'creationDate', 'validationDate', 'status', 'download', 'validation', 'flowview'];
    displayedColumns: string[] = ['select', 'id', 'aziendeLoadedInFile', 'flow', 'version', 'username', 'creationDate', 'validationDate', 'status', 'download', 'flowview'];
    dataSource = new MatTableDataSource<any>();
    selection = new SelectionModel<any>(true, []);
    formFlow: FmFlow;
    fmFlow: FmFlow[] = [];
    flow: FlowNative;
    file: any = [];
    version: Version;
    files: any = [];
    editFlow: boolean = false;
    opt_id: string;
    header: Header = new Header();
    utils = new Utils();
    disableClick: boolean = false;
    sub: Subscription = new Subscription();
    val: any;
    creationDate: Date;
    validationDate: Date;
    id: String = "";

    // 🔹 Campi e controlli per Codice Azienda
    aziendeOptions: string[] = [];
    codiceAzienda: string = "";

    @ViewChild('paginator',{ static: true }) paginator: MatPaginator;
    @ViewChild(MatSort,{ static: true }) sort: MatSort;
    @Output() onFileDropped = new EventEmitter<any>();
    @HostBinding('style.background-color') background;
    @HostBinding('style.opacity') opacity = '1';
    constructor(
        public dialog: MatDialog,
        private flowConfigurationService: FlowConfigurationService,
        private activityManager: ActivityManager,
    ) {
        super();
    }

    /**
     *
     */
    ngOnDestroy() {

    }

    /**
     *
     * @param operation
     */
    onResume(operation?: ResumeOperation) {
        this.ngOnInit();
        super.onResume(operation);
    }


    ngOnInit(filter?: SearchFilters) {
        this.loadRefreshInterval();
   
        // this.retrieveInCorso();
        //FROM "ConfigurationFilter"
        this.paginator.pageIndex = 0;
        this.dataSource = null;
        // let starterParams: any = this.activity.startingParams;
        // if (starterParams && starterParams.ExtractIds && starterParams.from) {
        //     this.filterGlob["extractIds"] = starterParams.ExtractIds;
        //     this.filterGlob.limit = 10;
        //     this.filterGlob.offset = 0;
        //     this.retrieveExtractionFormList(this.filterGlob);
        // }
        //Default
        // else {
            // this.selection.clear();
            this.pageIndexStore = 0;
            this.disableClick = false;
            this.retrieveFlow();
            this.retrieveVersion();

            if (filter != null) {
                this.filterGlob["id"] = null;
                this.filterGlob["flow"] = null;
                this.filterGlob["version"] = null;
                this.filterGlob["status"] = null;
                this.filterGlob["creationDate"] = null;
                this.filterGlob["validationDate"] = null;
                this.filterGlob["codiceazienda"] = null;
                this.filterGlob.limit = 10;
                this.filterGlob.offset = 0;
            } else {
                this.filterGlob["id"] = null;
                this.filterGlob["flow"] = null;
                this.filterGlob["version"] = null;
                this.filterGlob["status"] = null;
                this.filterGlob["creationDate"] = null;
                this.filterGlob["validationDate"] = null;
                this.filterGlob["codiceazienda"] = null;
                this.filterGlob.limit = 10;
                this.filterGlob.offset = 0;
            }

            this.retrieveFlowFileUpload(this.filterGlob, false);
        // }

        // 🔹 Caricamento opzioni da backend
        this.loadCodiciAzienda();

        // ⏱️ Avvio timer di refresh automatico
        this.startAutoRefresh();

        super.ngOnInit();

    }

    /**
     * 🔹 Carica i codici azienda dal backend
     */
    loadCodiciAzienda(): void {
        this.flowConfigurationService.searchAzCaricamentoFile(this.filterGlob)
            .then(result => {
            if (result.success && result.opTargetObject) {
                this.aziendeOptions = result.opTargetObject;
            } else {
                this.activityManager.engApplication.notifyMessage('Errore nel caricamento dei codici azienda');
            }
        })
        .catch(() => {
        this.activityManager.engApplication.notifyMessage('Errore di connessione al servizio searchCodiciAzienda');
        });
    }

    loadRefreshInterval(): void {
        let filter: SearchFilters = new SearchFilters();
        let flowEnabledList: number = 0;
        filter.tabgenId = "PAGE_REFRESH_INTERVAL";
        this.flowConfigurationService.tabgenValueListSearchDataProvider(filter)
            .then(response => {
                if (response.success) {
                    if (response.opTargetObject.error) {
                    } else {
                    for(let i=0; i<response.opTargetObject.items.length; i++) {
                       flowEnabledList = response.opTargetObject.items[i]["field1"];
                    }
                    if (flowEnabledList !== 0) {
                        const val = Number(flowEnabledList);
                        // se il valore è valido, lo usa, altrimenti default
                        this.refreshInterval = !isNaN(val) && val > 0 ? val : 60000;
                    }
                    }
                } 
            })
            .catch(e => {
                //this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento del parametro PAGE_REFRESH_INTERVAL');
            }
        );
    }

    onFlowChange(flowId: string) {
        this.flow_id = flowId;

        // ✅ Reset combo Versioni
        this.version_id = "";
        this.versions = [];

        // ✅ Chiamo il BE per ricaricare le versioni filtrate
        this.flowConfigurationService.getAllVersion(flowId).then(response => {
            if (response.success && !response.opTargetObject.error) {

                // ✅ Popolo la combo Versioni
                this.versions = response.opTargetObject.items || [];

                // ✅ Dopo aver caricato le versioni, rilancio la ricerca
                this.startSearch();
            } else {
                // In caso di errore, reset pulito
                this.versions = [];
                this.startSearch();
            }
        });
    }

    startAutoRefresh() {
        // cancella eventuale subscription precedente per evitare duplicazioni
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }

        // ogni X secondi richiama la funzione di refresh
        this.refreshSubscription = interval(this.refreshInterval).subscribe(() => {
            console.log("⏳ Auto-refresh dati in corso...");
            this.retrieveFlowFileUpload(this.filterGlob, true);
        });
    }

    /**
     *
     */
    initActivityActions() {
        super.initActivityActions();
        this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);

        this.activity.addActivityAction({
            actionType: ActivityActionType.MAIN,
            name: EditActivityComponent.EDIT_ITEM,
            tooltip: "Nuovo",
            icon: "add",
            fn: (activity, action) => {
                this.activityManager.startChildActivityByName("upload-file.edit", null);
                return Promise.resolve(null);
            }
        });

        this.activity.addActivityAction({
            actionType: ActivityActionType.MAIN,
            name: EditActivityComponent.DELETE_ACTION,
            tooltip: "Cancella",
            icon: "delete",
            fn: (activity, action) => {
                this.deleteRequest();
                return Promise.resolve(null);
            }
        });

    }

    /**
     *
     */
    startSearch() {
        this.filterGlob["id"] = this.id;
        this.filterGlob["flow"] = this.flow;
        this.filterGlob["version"] = this.version;
        this.filterGlob["status"] = this.status;
        this.filterGlob["creationDate"] = this.creationDate;
        this.filterGlob["validationDate"] = this.validationDate;

        this.filterGlob["codiceazienda"] = this.codiceAzienda && this.codiceAzienda.trim() !== '' 
        ? this.codiceAzienda.trim()
        : null;

        this.retrieveFlowFileUpload(this.filterGlob, false);
    }

    /**
     *
     */
    resetSearch() {
        this.selection.clear();

        // ✅ Reset campi UI
        this.id = "";
        this.flow_id = "";
        this.version_id = "";
        this.status = "";
        this.creationDate = null;
        this.validationDate = null;
        this.codiceAzienda = "";

        // ✅ Reset filtro globale
        this.filterGlob["id"] = null;
        this.filterGlob["flow"] = null;
        this.filterGlob["version"] = null;
        this.filterGlob["status"] = null;
        this.filterGlob["creationDate"] = null;
        this.filterGlob["validationDate"] = null;
        this.filterGlob["codiceazienda"] = null;
        this.filterGlob.limit = 10;
        this.filterGlob.offset = 0;

        // ✅ Svuoto combo versioni e ricarico tutte le versioni "iniziali"
        this.versions = [];
        this.retrieveVersion();  // <--- ricarica tutte le versioni disponibili

        this.flow = null;
        this.version = null;

        // ✅ Aggiorno tabella
        this.retrieveFlowFileUpload(this.filterGlob, false);
    }

    /**
     * Button goEditActivity
     * @param row
     */
    goEditActivity(row) {
        if (!this.disableClick) {
            // this.sub.unsubscribe();
            this.disableClick = true;
            let startingParams: any = {};
            startingParams.editItem = row;
            this.activityManager.getCurrentPage().setPageMainObject(startingParams);
            this.activityManager.startChildActivityByName("upload-file.edit", startingParams);
        }
    }
   
    /**
     * setLastVersion
     * alla selezione del flusso setta l'ultima versione
     */
    setLastVersion(flowId) {
        this.flow_id = flowId;
        this.retrieveLastVersionByFlow(flowId);
    }

    /**
     * RetriveFlow
     * Retrive Object FlowDTO
     */
    retrieveFlow() {
        this.flowConfigurationService.searchFlowExtr().then(response => {
            if (response.success) {
                if (response.opTargetObject.error) {
                    //this.manageError(response.opTargetObject.error);
                } else {
                    this.flows = response.opTargetObject.items;
                }
            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });

        return Promise.resolve();
    }

    /**
     * RetriveFlow
     * Retrive Object FlowDTO
     */
    retrieveVersion() {
        this.flowConfigurationService.getAllVersion(null).then(response => {
            if (response.success) {
                if (response.opTargetObject.error) {
                    //this.manageError(response.opTargetObject.error);
                } else {
                    this.versions = response.opTargetObject.items;
                }
            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });

        return Promise.resolve();
    }

    /**
     * RetrieveLastVersionByFlow
     * Recupera l'ultima versione per un determinato flow ID
     */
    retrieveLastVersionByFlow(flowId: any) {
        this.flowConfigurationService.getFlowWithLastVersion(null, flowId).then(response => {
            if (response.success) {
                if (response.opTargetObject.error) {
                    //this.manageError(response.opTargetObject.error);
                } else {
                    this.version_id = response.opTargetObject.version;
                    //this.startSearch(this.flow_id,this.version_id,null,null,null);
                }
            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });

        return Promise.resolve();
    }

    retrieveFlowFileUpload(filterGlob, silentRefresh: boolean) {
        // se è un refresh automatico, non mostrare la maschera di caricamento
        if (!silentRefresh) {
            this.showLoadingIndicator = true;
        }

        this.flowConfigurationService.getFlowFileUpload(filterGlob).then(response => {
            if (response.success && !response.opTargetObject.error) {

            const newItems = response.opTargetObject.items;

            if (!this.dataSource || !this.dataSource.data || this.dataSource.data.length === 0) {
                // primo caricamento normale
                this.dataSource = new MatTableDataSource(newItems);
            } else {
                // 🔁 aggiornamento incrementale
                const currentData = this.dataSource.data;
                let changed = false;

                // aggiorna o aggiungi
                newItems.forEach(newItem => {
                const existingIndex = currentData.findIndex(c => c.id === newItem.id);
                if (existingIndex >= 0) {
                    // confronta se è cambiato
                    const oldItem = currentData[existingIndex];
                    if (JSON.stringify(oldItem) !== JSON.stringify(newItem)) {
                    currentData[existingIndex] = { ...oldItem, ...newItem };
                    changed = true;
                    }
                } else {
                    // nuovo elemento
                    currentData.unshift(newItem);
                    changed = true;
                }
                });

                // elimina righe non più presenti
                const updatedData = currentData.filter(c => newItems.find(n => n.id === c.id));
                if (updatedData.length !== currentData.length) {
                changed = true;
                }

                // aggiorna la datasource solo se è cambiata
                if (changed) {
                this.dataSource.data = [...updatedData];
                }
            }

            this.totalItems = response.opTargetObject.totalItems;
            } else {
            const errorMessage = this.activityManager.engApplication.i18nInstant('ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
            }

            if (!silentRefresh) {
            this.showLoadingIndicator = false;
            }

        }).catch(() => {
            if (!silentRefresh) {
            this.showLoadingIndicator = false;
            }
            const errorMessage = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });

        return Promise.resolve();
        }


    /**
     * Download XML Extraction
     * @param element
     */
    downloadFiles(element) {
        this.header.label = "Download Files in corso...";
        this.activityManager.getCurrentPage().setPageMainObject(this.header);
        this.flowConfigurationService.downloadFiles(element).then(result => {
            if (result.size > 0) {
                this.header.visible = false;
                this.header.label = "";
                this.activityManager.getCurrentPage().setPageMainObject(this.header);
                var file = new Blob([result], {type: 'application/zip'});
                var fileURL = URL.createObjectURL(file);
                var anchor = document.createElement("a");
                anchor.download = element.flow.name;
                anchor.href = fileURL;
                anchor.click();
            } else {
                this.activityManager.engApplication.notifyMessage('Nessun File trovato');
                this.header.visible = false;
                this.header.label = "";
                this.activityManager.getCurrentPage().setPageMainObject(this.header);

            }
        }).catch(() => {
            this.header.visible = false;
            this.header.label = "";
            this.activityManager.getCurrentPage().setPageMainObject(this.header);

            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
     
        });


    }

    /**
     * Download LOG Extraction
     * @param element
     */
    downloadLOG(element) {
        this.header.label = "Download LOG in corso...";
        this.activityManager.getCurrentPage().setPageMainObject(this.header);
        this.flowConfigurationService.downloadUploadLOG(element).then(result => {
            if (result.size > 0) {
                this.header.visible = false;
                this.header.label = "";
                this.activityManager.getCurrentPage().setPageMainObject(this.header);
                var file = new Blob([result], {type: 'application/zip'});
                var fileURL = URL.createObjectURL(file);
                var anchor = document.createElement("a");
                anchor.download = element.id + "_" + element.flow.name + "_Log";
                anchor.href = fileURL;
                anchor.click();

            } else {
                this.activityManager.engApplication.notifyMessage('Nessun File trovato');
                this.header.visible = false;
                this.header.label = "";
                this.activityManager.getCurrentPage().setPageMainObject(this.header);

            }
        }).catch(() => {
            this.header.visible = false;
            this.header.label = "";
            this.activityManager.getCurrentPage().setPageMainObject(this.header);

            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
     
        });


    }

    //TEST PAGIN

    getServerData($event) {
        this.filterGlob.limit = $event.pageSize;
        this.filterGlob.offset = $event.pageIndex * $event.pageSize;
        this.retrieveFlowFileUpload(this.filterGlob, false);

    }

    sortData($event) {
        this.filterGlob["sortfield"] = $event.active;
        this.filterGlob["sort"] = $event.direction.toUpperCase();
        this.retrieveFlowFileUpload(this.filterGlob, false);
    }

    convertData(data): string {
        if (data != null) {
            let myMoment = moment(data);
            return myMoment.format('D/MM/YYYY');
        } else
            return "";
    }

    convertTimestamp(data): string {
        if (data != null) {
            let myMoment = moment(data);
            return myMoment.format('D MMM YYYY HH:mm:ss');
        } else
            return "";
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        // const numRows = this.dataSource.data.data.length;

        const numRowsMinusExcluded = this.dataSource.data
            .filter(row => ((row.status != "IN_CORSO") && (!row.consolidata)))
            .length;

        return numSelected === numRowsMinusExcluded;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            // this.dataSource.data.forEach(row => this.selection.select(row));
            this.dataSource.data.forEach(row => {
                if ((row.status != "IN_CORSO")) {
                    if ((!row.consolidata)) {
                        this.selection.select(row);
                    }
                }
            });
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: FlowExport): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    statusIcon(elementStatus: string) {
        if (elementStatus == "NOT_WELL_FORMED") {
            return "warning"
        }
        if (elementStatus == "INCOMPLETE") {
            return "cancel"
        }
        if (elementStatus == "WELL_FORMED") {
            return "reorder"
        }
        if (elementStatus == "VALIDATED") {
            return "done_all"
        }
        if (elementStatus == "VALIDATION_ERROR") {
            return "error"
        }
        if (elementStatus == "COMPLETE") {
            return "done"
        }
        if (elementStatus == "LOADED") {
            return "autorenew"
        }
        if (elementStatus == "IN_IMPORT") {
            return "import_export"
        }
    }

    statusTooltip(elementStatus: string) {
        if (elementStatus == "NOT_WELL_FORMED") {
            return "Non ben formata"
        }
        if (elementStatus == "INCOMPLETE") {
            return "Incompleta"
        }
        if (elementStatus == "WELL_FORMED") {
            return "Ben formata"
        }
        if (elementStatus == "VALIDATED") {
            return "Validato"
        }
        if (elementStatus == "VALIDATION_ERROR") {
            return "Validazione fallita"
        }
        if (elementStatus == "COMPLETE") {
            return "Completa"
        }
        if (elementStatus == "LOADED") {
            return "Caricata"
        }
        if (elementStatus == "IN_IMPORT") {
            return "In fase di importazione"
        }
    }

    errorDetails(errors: any) {

        if (errors == undefined || errors == null) {
            return "0";
        } else {
            return errors.length;
        }
    }

    showErrorDetails(element) {
        let message: string = "";

        this.flowConfigurationService.getUpdateFlowErrors(element).then(result => {
            if (result.success) {
                let details = result.opTargetObject;
                for (let i = 0; i < details.length; i++) {
                    details[i] = details[i] + ".";
                }
        
                const dialogRef = this.dialog.open(DialogContentExampleDialog, {
        
                    data: {
                        header: "Errori:",
                        b1: "Ok",
                        elem: details
                    }
        
                });
            } else {
                this.activityManager.engApplication.notifyMessage('Errore nella ricezione dei messaggi');
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
    }

    deleteRequest() {
        const dialogRef = this.dialog.open(DialogContentExampleDialog, {
            data: {
                header: "Cancellazione Richieste",
                text: "Stai cancellando " + this.selection.selected.length + " Richieste?",
                b2: "Esci",
                b1: "Continua"
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                this.showLoadingIndicator = true;
                this.flowConfigurationService.deleteRequestUpload(this.selection.selected).then(response => {
                    if (response.success) {
                        this.showLoadingIndicator = false;
                        let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Cancellati ' + this.selection.selected.length + ' Record con successo');
                        this.activityManager.engApplication.notifyMessage(successMessage);
                        this.resetSearch();
                    } else {
                        this.choices = [];
                        this.choices.push(this.choice);
                        this.showLoadingIndicator = false;
                        this.activity.getUserConfirmService().askChooseOneMessage(this.choices, 'Attenzione', result.message)
                            .then(function () {
                                    return;
                                }
                            );
                    }
                }).catch((e) => {
                    this.showLoadingIndicator = false;
                    let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
                    this.activityManager.engApplication.notifyMessage(errorMessage);
                });
                return Promise.resolve();
            }
        });
    }

    validation(elem){
        this.showLoadingIndicator = true;
        this.flowConfigurationService.validationFileUpload(elem).then(response => {
            if (response.success) {
                let chiavi = Object.keys(response.opTargetObject);
                this.showLoadingIndicator = false;
                let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Validazione effettuata con successo');
                this.activityManager.engApplication.notifyMessage(successMessage);
                for(let i=0; i<this.dataSource.data.length; i++){
                    if(this.dataSource.data[i].id == elem.id){
                        let index = i;
                        this.dataSource.data[i].status = chiavi[0];
                        if(chiavi[0] == 'INCOMPLETE'){
                            this.flowConfigurationService.checkIncompleteErrors(elem).then(response => {
                                this.showLoadingIndicator = false;
                                if (response.success) {
                                    for(let i=0; i<this.dataSource.data.length; i++){
                                        if(this.dataSource.data[i].id == elem.id){
                                            this.dataSource.data[index].status = chiavi[0];
                                            this.dataSource.data[i].errors = response.opTargetObject;
                                        }
                                    }
                                }
                            }).catch((e) => {
                                this.showLoadingIndicator = false;
                            });
                            return Promise.resolve();
                        }else{
                            this.dataSource.data[index].status = chiavi[0];
                            this.dataSource.data[index].validationDate = response.opTargetObject[chiavi[0]];
                        }
                    }
                    this.retrieveFlowFileUpload(this.filterGlob, false);
                }
            } else {
                this.showLoadingIndicator = false;
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch((e) => {
            this.showLoadingIndicator = false;
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
        return Promise.resolve();
    }

    /**
     * Button goViewActivity
     * @param element
     */
    goViewActivity(element) {
        this.retriveFormFlowAndGoToView(element);
    }

    retriveFormFlowAndGoToView(element: any) {
        this.showLoadingIndicator = true;
        this.flowConfigurationService.retriveFormFlowByFlowVersion(element.flow.id, element.version.id).then(response => {
            if (response.success) {
                this.showLoadingIndicator = false;
                if (response.opTargetObject.error) {
                    //this.manageError(response.opTargetObject.error);
                } else {
                    this.formFlow = response.opTargetObject.items[0];
                    let startingParams: any = {};
                    startingParams.editItem = this.formFlow;
                    startingParams.editItem.extra = element.id;
                    // this.sub.unsubscribe();
                    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
                    this.activityManager.startChildActivityByName("flow-view.edit", startingParams);
                }
            } else {
                this.showLoadingIndicator = false;
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch(() => {
            this.showLoadingIndicator = false;
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
    }
    

}



