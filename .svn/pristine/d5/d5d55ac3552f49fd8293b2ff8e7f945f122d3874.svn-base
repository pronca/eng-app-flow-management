import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';

import {
    ActivityAction,
    ActivityActionType,
    ActivityManager,
    EditActivityComponent,
    EngApplication,
    OperationResult,
    Promises,
    SearchActivityComponent,
    SearchFilters,
    ValueSetsService,
    SearchDataDTO,
    SearchContext
} from 'eng-app';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {FlowConfigurationService} from "../flow-configuration/flow-configuration.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatSnackBarRef, MatSort, MatTableDataSource} from '@angular/material';
import {AnagraficaTable, TabgenField, TabgenValue, PermissionTypeEnum, PermissionNameEnum} from "../flow-configuration/flow-configuration.model";

@Component({
    selector: 'anagrafica-edit-activity',
    templateUrl: './anagrafica-edit-activity.component.html',
    styleUrls: ['./anagrafica-edit-activity.component.scss'],
    //table
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
            state('expanded', style({ height: '*', visibility: 'visible' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class AnagraficaEditActivityComponent extends EditActivityComponent {

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    anagraficaTable: AnagraficaTable;
    tabgenFields: TabgenField[] = [];
    tabgenValues: TabgenValue[] = [];
    addvisible: boolean = false;
    isLinear = false;
    step: number = 0;
    valuee: any;
    valuee2: TabgenField[] = [];
    displayedColumns: string[] = [];
    dataSource: any;
    filterGlob: SearchFilters = new SearchFilters();
    deleteVisible: boolean = false;
    saveVisible: boolean = false;
    importVisible: boolean = false;
    checkReadOnly: boolean = false;
    isButtonVisible: boolean = true;
    removable = true;
    fieldApp: string;
    selectedValue: any;
    selectText: any;
    totalItems: number;
    showLoadingIndicator: boolean = true;
    dateIn: Date;
    dateOut: Date;
    fromResume: boolean = false;
    permissionEdit: boolean = true;
    filter: SearchFilters = new SearchFilters();


    @ViewChild(MatSort,{ static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    @ViewChild('fileUpload',{ static: true }) fileUploadEl: ElementRef;
    @Input() multiple: boolean = true;
    fName = '';
    contents: any[];
    name = '';
    data: any;
    uploading: boolean = false;
    completed:boolean;
    editMo: number;
    ableStep: number; 

    constructor(
        private flowConfigurationService: FlowConfigurationService,
        private engApplication: EngApplication,
        private valueSetsService: ValueSetsService,
        private _formBuilder: FormBuilder,
        private activityManager: ActivityManager,
        @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent
        ) {          
        super();
        
    }

    ngOnInit() {
        
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });

        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });

        this.anagraficaTable = new AnagraficaTable();
        this.anagraficaTable.visible = 1;

        this.valueSetsService.registerLocalValueSet("fieldtype-value-set", [
            {
                code: "String",
                display: "STRING",
            },
            {
                code: "Date",
                display: "DATE"
            },
            {
                code: "Integer",
                display: "INTEGER"
            }]);


            
        let starterParams: any = this.activity.startingParams;

        if(starterParams.permission != null && starterParams.permission != undefined){
            this.permissionEdit = starterParams.permission;
            }
        if (starterParams && starterParams.editItem) {

        
            this.anagraficaTable = starterParams.editItem;
            this.activity.title = "!i18n#" + this.anagraficaTable.id;

            this.searchFieldsAndValue();
            this.valuee = starterParams.editItem.type;
            this.anagraficaTable.fieldNum = starterParams.editItem.fieldNum;

            this.filterGlob.tabgenId = this.anagraficaTable.id;
           
            this.filterGlob.limit = 10;
            this.filterGlob.offset = 0;
            this.getAnagraficaValues(this.filterGlob);
            
            if(this.anagraficaTable.type == "TRANSCODIFICHE"){
                this.checkReadOnly = true;
                this.isButtonVisible = false;
            }
 
        }else{
            this.showLoadingIndicator = false;
        }
        
    }

    initActivityActions() {
        super.initActivityActions();

        this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);

  if(!this.permissionEdit){
        this.activity.addActivityAction({
          actionType: ActivityActionType.MAIN,
          name: EditActivityComponent.SAVE_ACTION,
          tooltip: "Salva",
          icon: "check",
          fn: (activity, action) => {
              this.executeSaveAction(null);
              return Promise.resolve(null);
          }});
  
      }
    }

    changeStep($event: any) {
        let evento = $event;

        if (this.addvisible = true) {
            this.activity.removeActivityAction(SearchActivityComponent.NEW_ACTION);
            this.addvisible = false;
        }
        if (this.deleteVisible = true) {
            this.activity.removeActivityAction(SearchActivityComponent.NEW_ACTION);
            this.deleteVisible = false;
        }
        if (this.saveVisible = true) {
            this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);
            this.saveVisible = false;
        }
        if (this.importVisible = true) {
            this.activity.removeActivityAction(SearchActivityComponent.NEW_ACTION);
            this.importVisible = false;
        }
        if (evento.selectedIndex == 0) {
            this.step = 0;

            if(this.anagraficaTable.tabgenFields.length > 0){
                if(!this.permissionEdit){

                this.activity.addActivityAction({
                    actionType: ActivityActionType.MAIN,
                    name: EditActivityComponent.SAVE_ACTION,
                    tooltip: "check",
                    icon: "check",
                    fn: (activity, action) => {
                        this.executeSaveAction(null);
                        return Promise.resolve(null);
                    }});
                    this.saveVisible = true;
            }
        }
    }   
        if(this.ableStep == 1){
        this.isLinear = true;
        this.completed = false;
        }

        if (this.editMo == 0 && evento.selectedIndex == 2 && evento.previouslySelectedIndex == 0) {
               this.isLinear = true;
              this.completed = false; 
           }
    
        if (evento.selectedIndex == 1 && this.anagraficaTable.type != 'TRANSCODIFICHE') {
            //che vuol dire? commentato per necessità
        //    if(this.anagraficaTable.tabgenFields.length > 0){
                if(!this.permissionEdit){
                this.activity.addActivityAction({
                    actionType: ActivityActionType.MAIN,
                    name: EditActivityComponent.SAVE_ACTION,
                    tooltip: "Salva",
                    icon: "check",
                    fn: (activity, action) => {
                        this.executeSaveAction(null);
                        return Promise.resolve(null);
                    }});
                    this.saveVisible = true;
            }

            this.step = 1;
           
            if(!this.permissionEdit){

            this.activity.addActivityAction({
                actionType: ActivityActionType.MAIN,
                name: SearchActivityComponent.NEW_ACTION,
                tooltip: "Aggiungi Campo",
                icon: "add",
                fn: (activity, action) => {

                    let field = new TabgenField();
                    this.anagraficaTable.tabgenFields.push(field);
                    if(this.saveVisible == false){
                        this.activity.addActivityAction({
                            actionType: ActivityActionType.MAIN,
                            name: EditActivityComponent.SAVE_ACTION,
                            tooltip: "Salva",
                            icon: "check",
                            fn: (activity, action) => {
                                this.executeSaveAction(null);
                                return Promise.resolve(null);
                            }});
                            this.saveVisible = true;
                    }

                    return Promise.resolve(null);
                }
            });
        }
   // }
            this.addvisible = true;

        }
        if (evento.selectedIndex == 2) {

            this.step = 2;
            if(!this.permissionEdit){

            this.activity.addActivityAction({
                actionType: ActivityActionType.MAIN,
                name: SearchActivityComponent.NEW_ACTION,
                tooltip: "Aggiungi Valore",
                icon: "add",
                fn: (activity, action) => {
                    let starterParams: any = this.activity.startingParams;
                    starterParams.popupHeight = '700px';
                    starterParams.popupWidth = '1300px';
                    starterParams.extra = "N";
                    starterParams.editItem = this.anagraficaTable;
                    this.activityManager.startChildPopupActivityByName("value.edit", starterParams);
                    return Promise.resolve(null);
                }
            });
            this.addvisible = true;

            this.activity.addActivityAction({
                actionType: ActivityActionType.MAIN,
                name: SearchActivityComponent.NEW_ACTION,
                tooltip: "Cancella tutti i valori",
                icon: "delete",
                fn: (activity, action) => {

                    this.deleteAllValues();

                    return Promise.resolve(null);
                }
            });
        this.deleteVisible = true;

  			this.activity.addActivityAction({
                actionType: ActivityActionType.MAIN,
                name: SearchActivityComponent.NEW_ACTION,
                tooltip: "Import",
                icon: "attachment",
                fn: (activity, action) => {
                    document.getElementById('fileTabgenInput').click();
                                        return Promise.resolve(null);                   
            }
        });
        this.importVisible = true;
    }
}
    }
    executeSaveAction(action: ActivityAction): Promise<any> {

        this.generateProgressive();

        if(this.editMo == 0 && this.step == 0){
            if(this.anagraficaTable.id && this.anagraficaTable.description && this.anagraficaTable.type){
                this.ableStep = 1;  
                this.isLinear = false;
                this.completed = true;
                let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n#Step 2 abilitato');
                this.activityManager.engApplication.notifyMessage(successMessage);
           }
            else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n#Valorizzare tutti i campi obbligatori');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }  
        }    
        if (this.step == 1){
            this.showLoadingIndicator = true;
            this.flowConfigurationService.saveTabgenForm(this.anagraficaTable).then(response => {
            if (response.success) {
                if(this.editMo == 0) {  
                    this.isLinear = false;
                    this.completed = true;
                }
                if (response.opTargetObject.error) {
                    this.manageError(response.opTargetObject.error, null)
                    //this.anagraficaTable.tabgenFields.pop();
                    this.searchFieldsAndValue();
                }else{
                    let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n#Tabella salvata con successo');
                    this.activityManager.engApplication.notifyMessage(successMessage);
                    this.searchFieldsAndValue();
                }
            }
            else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
            this.showLoadingIndicator = false;
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
            this.activityManager.engApplication.notifyMessage(errorMessage);
            this.showLoadingIndicator = false;
        });
       }
        return Promise.resolve();            

    }

    sortData(event){
        this.filterGlob.fieldId = this.searchFieldById(event.active);
        this.filterGlob.direction = event.direction.toUpperCase();

        // 🔥 ogni sort deve ripartire da pagina 1
        this.filterGlob.offset = 0;

        if (this.paginator) this.paginator.firstPage();

        this.getAnagraficaValues(this.filterGlob);
    }
    
    searchFieldById(obj: any){
        let result;
        let  h =  this.anagraficaTable.tabgenFields.length;
        let j = 1;
        let columnName = null;
        let valueColumn = null;
        while (j<=h && columnName != obj){
            valueColumn = this.anagraficaTable.tabgenFields[j-1].tabgenValueColumn;
            columnName = this.anagraficaTable.tabgenFields[j-1].description;
            j = j + 1;
        }
        result = valueColumn.toLowerCase();
        return result;
    }


    onInitEditComponent() {
        this.editMo = this.startingParams.editMode;
        this.filterGlob.field = new Array();
        this.filterGlob.parameter = new Array();


        if(this.editMo == 0){
            this.permissionEdit = false;
            this.isLinear = true;
            this.completed = false;
            this.step = 0;
        }
        
    }

    removeField(index: number) {
        this.anagraficaTable.tabgenFields.splice(index, 1);
    }

    deleteField(index: number): Promise<any> {
        var _this = this;
                var i18n = this.activity.getI18nService();
                return this.activity.getUserConfirmService().askConfirmMessage
                (i18n.instant('!i18n# Eliminazione campo'), i18n.instant('!i18n# Confermi di voler eliminare il campo?')).then(function () {
                return _this.executeDeleteField(false, index);
                });
    }
    
executeDeleteField(del: boolean, i: number){
    this.showLoadingIndicator = true;
    try{
    let check = this.searchFieldById(this.anagraficaTable.tabgenFields[i].id);
    }catch (Error){
        //alert(Error.message);
        this.anagraficaTable.tabgenFields.splice(i,1);
        this.showLoadingIndicator = false;
        return;
    }
    this.flowConfigurationService.deleteFieldForm(this.anagraficaTable.tabgenFields[i], del)
    .then(result => {
        if (result.success) {
            if (result.opTargetObject.error) {
                this.manageError(result.opTargetObject.error, i)
            }else{
                this.activityManager.engApplication.notifyMessage('Campo eliminato');
                this.searchFieldsAndValue();
            }
        } else {
            this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
        }
        this.showLoadingIndicator = false;
    })
    .catch(e => {
        this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
        this.showLoadingIndicator = false;
    }
    );
}

    getAnagrafica(anagraficaTable: AnagraficaTable) {
        this.showLoadingIndicator = true;
        this.runOnZone(() => {
            let opContext = this.activity.startOperation();
            this.flowConfigurationService.getAnagraficaById(anagraficaTable.id).then((response) => {
                if (response.success) {
                    if (response.opTargetObject.error) {
                        this.manageError(response.opTargetObject.error, null)
                    }else{
                        this.anagraficaTable = response.opTargetObject;
                        this.initFormGroup(this.formGroup);
                    }
                } else {
                    let opResult: OperationResult<any> = OperationResult.fromRequestResponse(response);
                    this.showErrors(opResult);
                }
                this.showLoadingIndicator = false;
            }).catch((reason) => {
                let failedMessage: string = this.engApplication.i18nInstant('USERS_MANAGER_ORGANIZATION_RETRIEVE_FAILED');
                this.activity.notifySimpleMessage(failedMessage);
                this.showLoadingIndicator = false;
            }).finally(() => {
                this.runOnZone(() => opContext.end());
            });
        });

        this.displayedColumns = this.generaColonne();
    }


    onResume(){
        this.fromResume = true;
        this.startSearch();
    }


    executeCancelAction(action: ActivityAction): Promise<any> {
        return super.executeCancelAction(action);
    }

    change(change, index: number, property) {
        this.anagraficaTable.tabgenFields[index][property] = change;
    }

    changeTab(change, property) {
        this.anagraficaTable[property] = change;
    }

    generateProgressive() {

        if (this.anagraficaTable.type != "TRANSCODIFICHE") {
            let j = this.anagraficaTable.tabgenFields.length;
            let max = 0;

            for (let i = 0; i < j; i++) {
                if (this.anagraficaTable.tabgenFields[i].progressive != null) {
                    if (this.anagraficaTable.tabgenFields[i].progressive > max) {
                        max = this.anagraficaTable.tabgenFields[i].progressive;
                    }
                }
            }
            for (let i = 0; i < j; i++) {
                if (this.anagraficaTable.tabgenFields[i].progressive == null) {
                    this.anagraficaTable.tabgenFields[i].progressive = max + 1;
                    max = max + 1;
                }
            }
        }
    }

    generaColonne(): string[] {
        
        let j = this.anagraficaTable.tabgenFields.length;
        let colonne: string[] = [];
        for (let i = 0; i < j; i++) {
            colonne.push(this.anagraficaTable.tabgenFields[i].description);
        }
        colonne.push("enabledDate");
        colonne.push("disabledDate");
        return (colonne);
    }

    convertColumn(): Array<any> {
    
        let k = this.anagraficaTable.tabgenValues.length;
        let h = this.anagraficaTable.tabgenFields.length;
        let data = new Array(k);
        for (let i = 0; i < k; i++) {
            data[i] = {};
            for (let j = 1; j <= h; j++) {
                let valueColumn = this.anagraficaTable.tabgenFields[j - 1].tabgenValueColumn;
                let columnValue = this.anagraficaTable.tabgenValues[i][valueColumn.toLowerCase()];
                let columnName = this.anagraficaTable.tabgenFields[j - 1].description;
                data[i][columnName] = columnValue;
            }
            data[i]["enabledDate"] = this.anagraficaTable.tabgenValues[i]["enabledDate"];
            data[i]["disabledDate"] = this.anagraficaTable.tabgenValues[i]["disabledDate"];
            data[i].id = this.anagraficaTable.tabgenValues[i].id;
        }
        return data;
    }

    section($event, section: any) {
        if(!this.permissionEdit){
        this.activity.startingParams.popupHeight = '700px';
        this.activity.startingParams.popupWidth = '1300px';
        this.activity.startingParams.extra = section;

        this.activityManager.startChildPopupActivityByName("value.edit", this.activity.startingParams);
    }
    }

    refreshCombo($event) {

        let fieldN = $event.value.tabgenValueColumn.toLowerCase();
        let fieldNM = fieldN.charAt(0).toUpperCase() + fieldN.slice(1);
        this.fieldApp = fieldNM;
    }



    searchFieldsAndValue(): void {
        this.showLoadingIndicator = true;
        this.flowConfigurationService.searchTabgenFields(this.anagraficaTable.id)
            .then(result => {
                if (result.success) {
                    if (result.opTargetObject.error) {
                        this.manageError(result.opTargetObject.error, null)
                    }else{
                    this.valuee2 = result.opTargetObject.items;
                    this.anagraficaTable.tabgenFields = result.opTargetObject.items;
                    //this.startingParams.editItem = this.anagraficaTable;
                    if(this.step == 1 && this.anagraficaTable.tabgenFields.length == 0){
                        this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);
                        this.saveVisible = false;
                        this.executeDeleteAllValues();
                    }
                    if(this.anagraficaTable.type == "TRANSCODIFICHE"){
                        this.checkReadOnly = true;
                        this.isButtonVisible = false;
                    }
                    this.displayedColumns = this.generaColonne();
                    }
                } else {
                    this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
                }
                this.showLoadingIndicator = false;
            })
            .catch(e => {
                this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
                this.showLoadingIndicator = false;
            }
            );
    }


    getAnagraficaValues(filter: SearchFilters): void {
        this.showLoadingIndicator = true;

        this.flowConfigurationService.tabgenValueListSearchDataProvider(filter)
            .then(result => {

                if (result.success && !result.opTargetObject.error) {

                    this.anagraficaTable.tabgenValues = result.opTargetObject.items;
                    this.totalItems = result.opTargetObject.totalItems;

                    // Aggiorna colonne
                    this.displayedColumns = this.generaColonne();

                    // Prepara righe tabella
                    const rows = this.convertColumn();

                    // Set datasource
                    this.dataSource = new MatTableDataSource<any>(rows);
                    this.dataSource.sort = this.sort;

                    // Aggiorna solo la length del paginator
                    if (this.paginator) {
                        this.paginator.length = this.totalItems;
                    }

                } else {
                    this.activityManager.engApplication.notifyMessage('Errore in fase di ricerca');
                }

                this.showLoadingIndicator = false;
            })
            .catch(e => {
                this.activityManager.engApplication.notifyMessage('La ricerca non ha prodotto nessun valore');
                this.showLoadingIndicator = false;
            });
    }


    startSearch() {

        // Filtri field / parameter
        let index = this.filterGlob.field.findIndex(record => record === this.fieldApp);

        if (index !== -1) {
            this.filterGlob.parameter[index] = this.selectText;
        } else if (this.selectText) {
            this.filterGlob.parameter.push(this.selectText);
            this.filterGlob.field.push(this.fieldApp);
        }

        // Date
        this.filterGlob.dateIn = this.dateIn;
        this.filterGlob.dateOut = this.dateOut;

        this.filterGlob.tabgenId = this.anagraficaTable.id.toUpperCase();

        //reset paginazione perché è una nuova ricerca
        this.filterGlob.offset = 0;

        if (this.paginator) this.paginator.firstPage();

        // call
        this.getAnagraficaValues(this.filterGlob);
    }

    remove(field: string, index : number): void {
        
        this.filterGlob.parameter.splice(index,1);
        this.filterGlob.field.splice(index,1);
        this.getAnagraficaValues(this.filterGlob);
    }

    changeDateIn($event) {
        if ($event && $event.isTrusted) { return }
        let dateIn = $event;
        this.filterGlob.dateIn = dateIn;
    }


    changeDateOut($event) {
        if ($event && $event.isTrusted) { return }
        let dateOut = $event;
        this.filterGlob.dateOut = dateOut;

    }

    getServerData(event) {

        this.filterGlob.limit = event.pageSize;
        this.filterGlob.offset = event.pageIndex * event.pageSize;

        this.getAnagraficaValues(this.filterGlob);
    }

    
    public fileChanged(event): void {
        
        let inputFile = this.fileUploadEl.nativeElement.files[0];
        let anagraficaTable = this.anagraficaTable.id;
        this.readFile(inputFile).then((file) => {
            this.showLoadingIndicator = true;
            this.flowConfigurationService.importTable(file, anagraficaTable).then(response => {

                this.uploading = false;
                if (response.success) {
                    if (response.opTargetObject != null) {
                        this.showLoadingIndicator = false;
                        this.activityManager.engApplication.notifyMessage(response.opTargetObject);
                    } else {
                        this.showLoadingIndicator = false;
                        this.activityManager.engApplication.notifyMessage('File importato con successo');
                    }
                    this.getAnagraficaValues(this.filterGlob);
                }
                else {
                    this.showLoadingIndicator = false;
                    this.activityManager.engApplication.notifyMessage('Errore in fase di importazione del file');
                }
            }).catch((e) => {
                this.showLoadingIndicator = false;
                this.activityManager.engApplication.notifyMessage('Errore inaspettato');

            });
            // resetto il valore per permettere lo stesso file di nuovo
            event.target.value = '';
        });
    }

    readFile(inputFile: any): Promise<{
        name: string;
        size: number;
        type: string;
        content: any
    }> {
        let deferred = Promises.defer<any>()
        var reader = new FileReader();
        reader.onload = (onLoadEvent) => {
            var arrayBuffer = onLoadEvent.target['result'];
            console.log("on Load ", onLoadEvent);
            deferred.resolve({
                name: inputFile.name,
                size: inputFile.size,
                type: inputFile.type,
                content: arrayBuffer
            });
        };
        reader.onprogress = (progressEvent) => {
            console.log("onprogress ", progressEvent)
        };
        reader.readAsArrayBuffer(inputFile);
        return deferred.promise;
    }

    deleteAllValues(): Promise<any> {
        var _this = this;
                var i18n = this.activity.getI18nService();
                return this.activity.getUserConfirmService().askConfirmMessage
                (i18n.instant('!i18n# Eliminazione di tutti i valori'), i18n.instant('!i18n# Confermi di voler eliminare tutti i valori?')).then(function () {
                    return _this.executeDeleteAllValues();
                });
    }

    executeDeleteAllValues(){
        this.showLoadingIndicator = true;
        this.flowConfigurationService.deleteAllValueForm(this.anagraficaTable)
        .then(result => {
            if (result.success) {
                if (result.opTargetObject.error) {
                    this.manageError(result.opTargetObject.error, null)
                }else{
                    this.activityManager.engApplication.notifyMessage('Tutti i valori eliminati');
                    this.startSearch();
                }
            } else {
                this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
            }
            this.showLoadingIndicator = false;
        })
        .catch(e => {
            this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
            this.showLoadingIndicator = false;
        }
        );
    }



    manageError( error: any, i: number ) {
        let errorRow = error.errorExcelRowNumber != null ? " Riga errata : " + error.errorExcelRowNumber : "";
        let field = " ";
        if (error.fields != null && error.fields.length > 0) {
            for(let f=0; f<error.fields.length; f++){
                field = field + f + ' ';
            }
        }
        if (error.operation === "SAVING_UPDATING_TABLE") {
            if (error.tableAssociatedValues) {
                this.activityManager.engApplication.notifyMessage('Attenzione - Impossibile salvare la tabella. Ci sono valori ad essa associati'/* + errorRow*/);
            } else if (error.violatedPk) {
                this.activityManager.engApplication.notifyMessage("Attenzione - L'identificativo scelto è già stato assegnato" + errorRow);
            }
        } else if (error.operation === "SAVING_UPDATING_FIELD") {
            if (error.duplicatedProgressive) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Progressivo campo duplicato per " + field + errorRow);
            } else if (error.invalidValueColumnName) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Nome campo non valido : " + field + errorRow);
            } else if (error.duplicatedValueColumnName) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Nome campo duplicato : " + error.fieldTable + errorRow);
            } else if (error.fieldReferencingFields) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Esistono riferimenti al campo " + field + errorRow);
            } else if (error.fieldAssociatedValues) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + field + " valorizzato" + errorRow);
            } else if (error.notEnablingNotNullable) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile rendere il campo " + field + " obbligatorio" + errorRow);
            } else if (error.notEnablingFk) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile abilitare il riferimento ad altro campo per " + field + errorRow);
            } else if (error.notEnablingPk) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile abilitare il vincolo su tabella per il campo " + field + errorRow);
            } else if (error.notDisablingPk) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile disabilitare il vincolo su tabella per il campo " + field + errorRow);
            }
        } else if (error.operation === "SAVING_UPDATING_VALUE") {
            if (error.absentValueField != null) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + error.absentValueField + " inesistente" + errorRow);
            } else if (error.violatedFk && error.violatedFkRefField != null) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare il campo " + error.violatedFkField + ". Chiave esterna " + //
                        error.value + " non trovata in " + error.violatedFkRefFieldTable + " - " + error.violatedFkRefField + errorRow);
            } else if (error.violatedFk) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + error.violatedFkField + " referenziato da altri campi" + errorRow);
            } else if (error.notNullable) {
                this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + error.notNullableField + " obbligatorio" + errorRow);
            } else if (error.tableAssociatedValues) {
                this.activityManager.engApplication.notifyMessage("Errore - Esistono dei campi e dei valori associati alla tabella. Solo la descrizione può essere modificata" + errorRow);
            } else if (error.duplicatedProgressive) {
                this.activityManager.engApplication.notifyMessage("Errore - Progressivo duplicato per il campo " + field + ". Modificare i campi della tabella" + errorRow);
            } else if (error.duplicatedValueColumnName) {
                this.activityManager.engApplication.notifyMessage("Errore - Campo duplicato. Modificare i nomi dei campi:" + field + errorRow);
            } else if (error.absentValueField != null) {
                this.activityManager.engApplication.notifyMessage("Errore - Il campo " + error.absentValueField + " non esiste per la tabella selezionata" + errorRow);
            } else if (error.violatedFk) {
                this.activityManager.engApplication.notifyMessage("Errore - Chiave esterna " + error.violatedFkRefField + "non valida sul campo " + error.violatedFkField + errorRow);
            } else if (error.notNullable) {
                this.activityManager.engApplication.notifyMessage("Errore - Il campo " + error.notNullableField + " deve essere valorizzato" + errorRow);
            } else if (error.violatedPk) {
                this.activityManager.engApplication.notifyMessage("Errore - Vincolo pk violato su " + error.valueTable + errorRow);
            }
        // } else if (error.operation === "DELETING_TABLE") {
        //     if (error.tableAssociatedFields && !error.tableAssociatedValues) {
    
        //     var _this = this;
        //     var i18n = this.activity.getI18nService();
        //     return this.activity.getUserConfirmService().askConfirmMessage
        //     (i18n.instant('CANCELLAZIONE_TABELLA'), i18n.instant('Impossibile cancellare la tabella. Ci sono campi ad essa associati.' + errorRow + 'Continuare?')).then(function () {
        //         return _this.executeDeleteTabgenConfirm(true,true,false);
        //     });
    
        //     } else if (error.tableAssociatedValues) {
    
        //         var _this = this;
        //         var i18n = this.activity.getI18nService();
        //         return this.activity.getUserConfirmService().askConfirmMessage
        //         (i18n.instant('CANCELLAZIONE_TABELLA'), i18n.instant('Impossibile cancellare la tabella. Ci sono valori ad essa associati.' + errorRow + ' Continuare?')).then(function () {
        //             return _this.executeDeleteTabgenConfirm(true,true,true);
        //         });
    
        //     }
        } else if (error.operation === "DELETING_FIELD") {
            if (error.fieldAssociatedValues) {
    
                var _this = this;
                var i18n = this.activity.getI18nService();
                return this.activity.getUserConfirmService().askConfirmMessage
                (i18n.instant('!i18n# CANCELLAZIONE_CAMPO'), i18n.instant('!i18n#Impossibile cancellare il campo' + field + '!i18n# . Valore presente.' + errorRow + '!i18n# Continuare?')).then(function () {
                    return _this.executeDeleteField(true, i);
                });
                
                // INVOCARE SE CLICK SU CANCELLA TUTTI I CAMPI
            //    deleteAllFields(true);
            } else if (error.fieldReferencingFields) {
    
                var _this = this;
                var i18n = this.activity.getI18nService();
                return this.activity.getUserConfirmService().askConfirmMessage
                (i18n.instant('!i18n# CANCELLAZIONE_CAMPO'), i18n.instant('!i18n# Impossibile cancellare il campo' + field + '!i18n# . Riferimenti esterni presenti:' + error.getReferencingFields() + errorRow + '!i18n# . Continuare?')).then(function () {
                    return _this.executeDeleteField(true, i);
                });
                
                // INVOCARE SE CLICK SU CANCELLA TUTTI I CAMPI
            //    deleteAllFields(true);
            } else {
               this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile cancellare il campo" + field + ". Non e' possibile cancellare colonne di una tabella di transcodifica." + errorRow);
            }
    
        } else if (error.operation === "DELETING_VALUE") {
            if (error.valueReferencingValues) {
            //    System.out.println("Info - Alcune righe hanno un riferimento al campo " + error.getViolatedFkField() + " per il valore " + error.getValue() + errorRow + ". Continuare?");
                
                // SE L'UTENTE CONFERMA INVOCARE IL METODO CON I PARAMETRI INDICATI
                
                // INVOCARE SE CLICK SU CANCELLA RECORD
            //    deleteValue(true);
                
                // INVOCARE SE CLICK SU CANCELLA TUTTI I RECORD
            //    deleteAllValues(true);
            }
        } else if (error.operation === "SAVING_TRANSCODE_TABLE") {
            if (error.duplicatedTable) {
                this.activityManager.engApplication.notifyMessage("Attenzione - L'identificativo scelto è già stato assegnato" + errorRow);
                
            }
        }
    }


    convertTabgen() {
        this.anagraficaTable.id = this.formGroup.value.id;
        this.anagraficaTable.description = this.formGroup.value.description;
        this.anagraficaTable.fieldNum = this.formGroup.value.fieldNum;
        this.anagraficaTable.type = this.formGroup.value.type;

        let i = this.anagraficaTable.tabgenFields.length;
        for (let j = 0; j < i; j++) {
          this.anagraficaTable.tabgenFields[j].description = this.formGroup.value["description"+j];
          this.anagraficaTable.tabgenFields[j].type = this.formGroup.value["type"+j];
          this.anagraficaTable.tabgenFields[j].format = this.formGroup.value["format"+j];
          this.anagraficaTable.tabgenFields[j].pk= this.formGroup.value["pk"+j];
          this.anagraficaTable.tabgenFields[j].nullable = this.formGroup.value["nullable"+j];

}

}

public notifyMessage(msg: string): MatSnackBarRef<any> {
    let snackBarRef = this.searchComponent._snackBar.open(msg,undefined,{
        duration: 3000
    });
    window['_engAppViewport'].getNgZone().run(()=>{});
    return snackBarRef;
 }
 
 isEditModeEdit(){
    return false;
}

resetSearch() {
    this.filterGlob = new SearchFilters();
    this.filterGlob.tabgenId = this.anagraficaTable.id;
    this.filterGlob.limit = 10;
    this.filterGlob.offset = 0;
    this.filterGlob.field = [];
    this.filterGlob.parameter = [];

    // reset UI fields
    this.selectedValue = undefined;
    this.selectText = '';
    this.dateIn = undefined;
    this.dateOut = undefined;

    // reset pagina
    if (this.paginator) this.paginator.firstPage();

    this.getAnagraficaValues(this.filterGlob);
}

}



