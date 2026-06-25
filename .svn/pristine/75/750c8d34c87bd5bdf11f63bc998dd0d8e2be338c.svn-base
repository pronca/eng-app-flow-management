import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {
    ActivityAction,
    ActivityActionType,
    ActivityManager,
    Choice,
    EditActivityComponent,
    SearchActivityComponent,
    ValueSet,
    ValueSetsService
} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration.service";

import {FieldViewComponent} from './field-view.component'
import {MatSelectChange} from '@angular/material';
import {FlowTable, FlowTableField, FlowTableLink, FmFlow} from "../flow-configuration.model";
import {MatStepper} from "@angular/material/stepper";
import Utils from "../flow-configuration.utils";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'flow-edit-activity',
    templateUrl: './flow-edit-activity.component.html',
    styleUrls: ['./flow-edit-activity.component.scss']
})

export class FlowEditActivityComponent extends EditActivityComponent {
    choice: Choice = {
        //icon:'done',
        text: 'OK',
        cssClass: '{text-align:center;}'
    };
    choices: Choice[] = [];
    utils:Utils = new Utils();
    isCompleted: boolean = false;
    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    flowTableList: FlowTable[] = [];
    value: any;
    addvisible: boolean = false;
    flowTableDTO: ValueSet = new ValueSet();
    fmflow: FmFlow;
    test: string = "";
    rendering: boolean[][] = [];
    id: string;
    editMo: number;
    jsonTypes: string[] = ["ARRAY", "OBJECT"];
    startingCode: string;
    selectedTable: FlowTable[][] = [];
    flowLink : FlowTableLink;
    readOnlyVersion: boolean = false;
    creationMode: number;
    valueType: string;
    hiddenValue: boolean = false;
    hiddenDate: boolean[][] = [];
    hiddenDateAdd: boolean[][] = [];
    indexField: number[] = [];
    indexSection: number[] = [];
    valueMonth: string;
    valueMsg: string;
    alertMessage: string;
    successMessage: string;
    createVisible: boolean = false;
    labelFlowType: string;
    datasource: string;
    flagWeekly: boolean = true;
    isExpanded: boolean[][] = [];
    @ViewChildren('fieldview')
    components: QueryList<FieldViewComponent>;

    showLoadingIndicator: boolean = false;

    @ViewChild('stepper',{ static: true }) private stepper: MatStepper;
    constructor(
        private valueSetsService: ValueSetsService,
        private flowConfigurationService: FlowConfigurationService,
        private activityManager: ActivityManager,
    ) {
        super();
    }

    ngOnInit() {
        this.valueSetsService.registerLocalValueSet("monthly-value-set", [
            {
                code: "1",
                display: "!i18n#1",
            }, {
                code: "2",
                display: "!i18n#2",
            }, {
                code: "3",
                display: "!i18n#3",
            }, {
                code: "4",
                display: "!i18n#4",
            }, {
                code: "5",
                display: "!i18n#5",
            }, {
                code: "6",
                display: "!i18n#6",
            }, {
                code: "7",
                display: "!i18n#7",
            }, {
                code: "8",
                display: "!i18n#8",
            }, {
                code: "9",
                display: "!i18n#9",
            }, {
                code: "10",
                display: "!i18n#10",
            }, {
                code: "11",
                display: "!i18n#11",
            }, {
                code: "12",
                display: "!i18n#12",
            }, {
                code: "13",
                display: "!i18n#13",
            }, {
                code: "14",
                display: "!i18n#14",
            }, {
                code: "15",
                display: "!i18n#15",
            }, {
                code: "16",
                display: "!i18n#16",
            }, {
                code: "17",
                display: "!i18n#17",
            }, {
                code: "18",
                display: "!i18n#18",
            }, {
                code: "19",
                display: "!i18n#19",
            }, {
                code: "20",
                display: "!i18n#20",
            }, {
                code: "21",
                display: "!i18n#21",
            }, {
                code: "22",
                display: "!i18n#22",
            }, {
                code: "23",
                display: "!i18n#23",
            }, {
                code: "24",
                display: "!i18n#24",
            }, {
                code: "25",
                display: "!i18n#25",
            }, {
                code: "26",
                display: "!i18n#26",
            }, {
                code: "27",
                display: "!i18n#27",
            }, {
                code: "28",
                display: "!i18n#28",
            }, {
                code: "29",
                display: "!i18n#29",
            }, {
                code: "30",
                display: "!i18n#30",
            }, {
                code: "31",
                display: "!i18n#31",
            }]);

        this.valueSetsService.registerLocalValueSet("weekly-value-set", [
            {
                code: "1",
                display: "!i18n#Lunedì",
            }, {
                code: "2",
                display: "!i18n#Martedì",
            }, {
                code: "3",
                display: "!i18n#Mercoledì",
            }, {
                code: "4",
                display: "!i18n#Giovedì",
            }, {
                code: "5",
                display: "!i18n#Venerdì",
            }, {
                code: "6",
                display: "!i18n#Sabato",
            }, {
                code: "7",
                display: "!i18n#Domenica",
            }]);

        this.valueSetsService.registerLocalValueSet("period-value-set", [
            {
                code: "Settimanale",
                display: "!i18n#Settimanale"

            }, {
                code: "Mensile",
                display: "!i18n#Mensile"

            }, {
                code: "Trimestrale",
                display: "!i18n#Trimestrale"

            }, {
                code: "Semestrale",
                display: "!i18n#Semestrale"
            }, {
                code: "Annuale",
                display: "!i18n#Annuale"
            }]);

        this.valueSetsService.registerLocalValueSet("protocol-value-set", [
            {
                code: "0",
                display: "!i18n#Servizio REST",

            },
            {
                code: "1",
                display: "!i18n#Tabella"

            }]);

        this.valueSetsService.registerLocalValueSet("yearly-value-set", [
            {
                code: "Gennaio",
                display: "!i18n#Gennaio",
            }, {
                code: "Febbraio",
                display: "!i18n#Febbraio",
            }, {
                code: "Marzo",
                display: "!i18n#Marzo",
            }, {
                code: "Aprile",
                display: "!i18n#Aprile",
            }, {
                code: "Maggio",
                display: "!i18n#Maggio",
            }, {
                code: "Giugno",
                display: "!i18n#Giugno",
            }, {
                code: "Luglio",
                display: "!i18n#Luglio",
            }, {
                code: "Agosto",
                display: "!i18n#Agosto",
            }, {
                code: "Settembre",
                display: "!i18n#Settembre",
            }, {
                code: "Ottobre",
                display: "!i18n#Ottobre",
            }, {
                code: "Novembre",
                display: "!i18n#Novembre",
            }, {
                code: "Dicembre",
                display: "!i18n#Dicembre",
            }]);

        this.valueSetsService.registerLocalValueSet("flowTableDTO", this.flowTableList);

    }


    onInitEditComponent() {
        this.editMo = this.startingParams.editMode;
        this.isLinear = true;
        this.isCompleted = false;
        this.valueType = "String";
        this.valueMonth = "Settembre";
        this.creationMode = this.startingParams.editMode;

        if (this.editMo == 1) {
            if (this.startingParams.editItem.commProt == "0") {
                this.hiddenValue = true;
            } else {
                this.hiddenValue = false;
            } 

            if(this.startingParams.editItem.flowTableList) {
                for (let i = 0; i < this.startingParams.editItem.flowTableList.length; i++) {
                    	this.hiddenDate[i] = [];
                   	if(this.startingParams.editItem.flowTableList[i].flowTableFieldList) {
                        for (let j = 0; j < this.startingParams.editItem.flowTableList[i].flowTableFieldList.length; j++) {
                            if (this.startingParams.editItem.flowTableList[i].flowTableFieldList[j].fieldType == "Date") {
                                this.hiddenDate[i][j] = false;
                            } else {
                                this.hiddenDate[i][j] = true;
                            }
                            if (this.startingParams.editItem.flowTableList[i].flowTableFieldList[j].active == null) {
                                this.startingParams.editItem.flowTableList[i].flowTableFieldList[j].active = true
                            }
                        }
                    }
                }
            }
            /*
            this.activity.addActivityAction({
                actionType: ActivityActionType.MAIN,
                name: EditActivityComponent.SAVE_ACTION,
                tooltip: "Salva Flusso",
                icon: "check",
                fn: (activity, action) => {
                    this.valueMsg = "Flusso Salvato";
                    this.executeSaveAction(action);

                    return Promise.resolve(null);
                }
            });
            */

        }

        let starterParams: any = this.activity.startingParams;
        if (starterParams && starterParams.editItem) {
            this.fmflow = starterParams.editItem;
            this.fmflow.flowTypeBoolean = this.convertFlowTypeToBoolean(this.fmflow.flowType);
            this.datasource = this.fmflow.flowTableList[0].datasource;
            if (this.editMo == 1 && starterParams.extra != "duplica") {
                this.readOnlyVersion = true;
            } else if (this.editMo == 1 && starterParams.extra == "duplica") {
                //this.fmflow.version = undefined;
                this.fmflow.code = this.fmflow.code || '_D';
                this.fmflow.name = this.fmflow.name || '_D';
            }
            this.startingCode = this.fmflow.code;
            this.flowTableList = starterParams.editItem.flowTableList;

            // 🔥 FIX: sanificazione sezioni caricate in EDIT
            for (let i = 0; i < this.flowTableList.length; i++) {

                // inizializza lista campi se non esiste
                if (!this.flowTableList[i].flowTableFieldList) {
                    this.flowTableList[i].flowTableFieldList = [];
                }

                // inizializza lista FK se non esiste
                if (!this.flowTableList[i].listFk) {
                    this.flowTableList[i].listFk = [];
                }

                // inizializza required se null
                if (this.flowTableList[i].required === null || this.flowTableList[i].required === undefined) {
                    this.flowTableList[i].required = true;
                }

                // inizializza datasource se undefined
                if (!this.flowTableList[i].datasource) {
                    this.flowTableList[i].datasource = this.datasource ? this.datasource : null;
                }
            }

            this.isCompleted = true;
            this.isLinear = false;
            for (let i = 0; i < this.flowTableList.length; i++) {
                let tab: FlowTable[] = [];
                this.selectedTable.push(tab);
                if(this.flowTableList[i].listFk) {
                    for (let j = 0; j < this.flowTableList[i].listFk.length; j++) {
                        if (this.flowTableList[i].listFk.length > 0) {

                            this.id = this.flowTableList[i].listFk[j].idTableReferenced;
                            for (let m = 0; m < this.flowTableList.length; m++) {

                                if (this.flowTableList[m].id == this.id) {
                                    this.selectedTable[i][j] = this.flowTableList[m];
                                }
                            }
                        }
                    }
                }
            }

            for (let i = 0; i < this.flowTableList.length; i++) {
                if(this.flowTableList[i].flowTableFieldList) {
                    this.rendering[i] = [];
                    this.isExpanded[i] = [];
                    for (let j = 0; j < this.flowTableList[i].flowTableFieldList.length; j++) {
                        this.rendering[i][j] = false;
                        this.isExpanded[i][j] = false;
                    }
                }
            }

        } else {
            this.fmflow = new FmFlow();
        }

         // Forzo la valutazione iniziale degli step
        setTimeout(() => {
            this.changeStep({ selectedIndex: this.stepper.selectedIndex });
        }, 0);

    }

    convertFlowTypeToString(value: boolean): string {
        if (value) return 'AZIENDA';
        return 'REGIONE';
    }

    convertFlowTypeToBoolean(value: string): boolean {
        return value === 'AZIENDA';
    }

    /*
    afterRun() {
        this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);
    }*/

    changeRadio($event: any) {
        if ($event == "0") {
            this.hiddenValue = true;
        } else if ($event == "1") {
            this.hiddenValue = false;
        }
    }

    changeType($event: any, index: number, indextable: number) {

        if (this.editMo == 1) {
            if ($event == "Date") {
                this.hiddenDate[indextable][index] = false;
            } else if (($event == "String") || ($event == "Integer")) {
                this.hiddenDate[indextable][index] = true;
            }
        }
        if (this.editMo == 0) {
            if ($event == "Date") {
                this.hiddenDate[indextable][index] = false;
            } else if (($event == "String") || ($event == "Integer")) {
                this.hiddenDate[indextable][index] = true;
            }
        }

    }

    changeStep(event: any) {

        // Rimuove tutti i pulsanti MAIN (Salva / Nuovo)
        this.removeAllSaveButtons();

        this.fmflow.flowTableList = this.flowTableList;

        const step = event.selectedIndex;
        const i18n = this.activity.getI18nService();
        this.choices = [this.choice];

        // ============================================================
        // STEP 1 → SEZIONI FLUSSO (Prima serve validare FLUSSO)
        // ============================================================
        if (step === 1) {

            // --> VALIDAZIONE FLUSSO <-- (Step 0)
            if (this.editMo === 0) {
                if (!this.formGroup.value.name ||
                    !this.formGroup.value.description ||
                    !this.formGroup.value.commProt || 
                    !this.formGroup.value.version) {

                    return this.activity.getUserConfirmService().askChooseOneMessage(
                        this.choices,
                        i18n.instant('!i18n# Errore Salvataggio'),
                        i18n.instant('!i18n#Valorizzare tutti i campi obbligatori in FLUSSO')
                    );
                }
            }

            // Mostro il pulsante "Aggiungi Sezione"
            this.activity.addActivityAction({
                actionType: ActivityActionType.MAIN,
                name: SearchActivityComponent.NEW_ACTION,
                tooltip: "Aggiungi Sezione",
                icon: "add",
                fn: (activity, action) => {
                    
                    //CREA NUOVA SEZIONE
                    let flowtable = new FlowTable();
                    flowtable.flowTableFieldList = [];
                    flowtable.listFk = [];
                    flowtable.required = false;
                    flowtable.section = this.flowTableList.length;

                    //CREA AUTOMATICAMENTE IL PRIMO CAMPO DELLA SEZIONE
                    let newField = new FlowTableField();
                    newField.name = "campo1";
                    newField.description = "CAMPO1";
                    newField.descriptionsm = "CAMPO1";
                    newField.fieldType = "String";
                    newField.length = 255;
                    newField.physicalSize = 255;
                    newField.mandatory = false;
                    newField.pk = false;
                    newField.crypto = false;
                    newField.groups = false;
                    newField.active = true;
                    newField.referenceDate = false;
                    newField.position = 0;

                    // Inserisco il campo nella sezione
                    flowtable.flowTableFieldList.push(newField);

                    //AGGIUNGO LA SEZIONE ALLA LISTA
                    this.flowTableList.push(flowtable);

                    // Aggiorno valueSet
                    this.flowTableDTO.setElements(this.flowTableList);
                    this.valueSetsService.registerLocalValueSet("flowTableDTO", this.flowTableList);

                    // Aggiorno selezione FK
                    let tab: FlowTable[] = [];
                    this.selectedTable.push(tab);

                    // Inizializzo matrici di UI
                    const idx = this.flowTableList.length - 1;
                    this.rendering[idx] = [];
                    this.isExpanded[idx] = [];
                    this.hiddenDate[idx] = [];

                    // Prima espansione del primo campo
                    this.rendering[idx][0] = true;
                    this.isExpanded[idx][0] = true;
                    this.hiddenDate[idx][0] = true; // STRING

                    this.indexSection[idx] = idx;

                    return Promise.resolve(null);
                }
            });

            // SOLO IN EDIT: pulsante SALVA SEZIONI
            if (this.editMo === 1) {
                this.activity.addActivityAction({
                    actionType: ActivityActionType.MAIN,
                    name: EditActivityComponent.SAVE_ACTION,
                    tooltip: "Salva Sezioni",
                    icon: "check",
                    fn: (activity, action) => {
                        this.valueMsg = "Sezione salvata";
                        this.executeSaveAction(action);
                        return Promise.resolve(null);
                    }
                });
            }

            return;
        }

        // ============================================================
        // STEP 2 → CAMPI FLUSSO (Prima serve validare SEZIONI FLUSSO)
        // ============================================================
        if (step === 2) {

            // --> VALIDAZIONE SEZIONI FLUSSO <-- (Step 1)
            if (this.editMo === 0) {

                if (this.flowTableList.length === 0) {
                    return this.activity.getUserConfirmService().askChooseOneMessage(
                        this.choices,
                        i18n.instant('!i18n# Errore Salvataggio'),
                        i18n.instant('!i18n#Valorizzare tutti i campi obbligatori in SEZIONI FLUSSO')
                    );
                }

                for (let i = 0; i < this.flowTableList.length; i++) {
                    if (!this.formGroup.value["name" + i] ||
                        !this.formGroup.value["descr" + i]) {

                        return this.activity.getUserConfirmService().askChooseOneMessage(
                            this.choices,
                            i18n.instant('!i18n# Errore Salvataggio'),
                            i18n.instant('!i18n#Valorizzare tutti i campi obbligatori in SEZIONI FLUSSO')
                        );
                    }
                }
            }

            // MOSTRA IL SALVA CAMPI
            this.activity.addActivityAction({
                actionType: ActivityActionType.MAIN,
                name: EditActivityComponent.SAVE_ACTION,
                tooltip: "Salva Campi",
                icon: "check",
                fn: (activity, action) => {
                    this.valueMsg = "Campo salvato";
                    this.executeSaveAction(action);
                    return Promise.resolve(null);
                }
            });

            return;
        }

        // ============================================================
        // STEP 3 → COLLEGAMENTO CAMPI (Prima serve validare CAMPI FLUSSO)
        // ============================================================
        if (step === 3) {

            // --> VALIDAZIONE CAMPI FLUSSO <-- (Step 2)
            if (this.editMo === 0) {

                if (this.flowTableList.length === 0) {
                    return this.activity.getUserConfirmService().askChooseOneMessage(
                        this.choices,
                        i18n.instant('!i18n# Errore Salvataggio'),
                        i18n.instant('!i18n#Valorizzare tutti i campi obbligatori in CAMPI FLUSSO')
                    );
                }

                for (let i = 0; i < this.flowTableList.length; i++) {
                    for (let j = 0; j < this.flowTableList[i].flowTableFieldList.length; j++) {

                        const field = this.flowTableList[i].flowTableFieldList[j];

                        if (!field.name || !field.description || !field.length) {
                            return this.activity.getUserConfirmService().askChooseOneMessage(
                                this.choices,
                                i18n.instant('!i18n# Errore Salvataggio'),
                                i18n.instant('!i18n#Valorizzare tutti i campi obbligatori in CAMPI FLUSSO')
                            );
                        }
                    }
                }
            }

            // MOSTRA IL SALVA COLLEGAMENTI SOLO IN EDIT
            if (this.editMo === 1) {
                this.activity.addActivityAction({
                    actionType: ActivityActionType.MAIN,
                    name: EditActivityComponent.SAVE_ACTION,
                    tooltip: "Salva",
                    icon: "check",
                    fn: (activity, action) => {
                        this.valueMsg = "Collegamento salvato";
                        this.executeSaveAction(action);
                        return Promise.resolve(null);
                    }
                });
            }
            return;
        }

        // ============================================================
        // STEP 0 (FLUSSO) – già corretto
        // ============================================================
        if (step === 0 && this.editMo === 1) {
            this.activity.addActivityAction({
                actionType: ActivityActionType.MAIN,
                name: EditActivityComponent.SAVE_ACTION,
                tooltip: "Salva Flusso",
                icon: "check",
                fn: () => {
                    this.valueMsg = "Flusso salvato";
                    this.executeSaveAction(null);
                    return Promise.resolve(null);
                }
            });
        }
    }


    private removeAllSaveButtons() {
        this.clearActionsByName(EditActivityComponent.SAVE_ACTION);      // tutti i SALVA
        this.clearActionsByName(SearchActivityComponent.NEW_ACTION);     // tutti i "Aggiungi"/NEW
    }

    private clearActionsByName(name: string) {
        let found = true;

        while (found) {
            const actions = this.activity.getActivityActions();
            found = actions.some(a => a.name === name);
            if (found) {
                this.activity.removeActivityAction(name);
            }
        }
    }

    addField(index: number) {
        if(!this.flowTableList[index].flowTableFieldList) {
            this.flowTableList[index].flowTableFieldList = [];
        }

        let field = new FlowTableField();
        field.physicalSize = 255;
        field.active = true;
        field.crypto = false;
        field.name = 'CAMPO' + (this.flowTableList[index].flowTableFieldList.length + 1);
        field.description = 'CAMPO' + (this.flowTableList[index].flowTableFieldList.length + 1);
        field.descriptionsm = 'CAMPO' + (this.flowTableList[index].flowTableFieldList.length + 1);
        field.length = 255;

        this.flowTableList[index].flowTableFieldList.push(field);

        if(this.hiddenDate.length == 0) {
            this.hiddenDate[index] = [];
        }

        if (this.editMo == 1) {
            this.indexField[this.flowTableList[index].flowTableFieldList.length - 1] = this.flowTableList[index].flowTableFieldList.length - 1;
        }

        this.hiddenDate[index][this.flowTableList[index].flowTableFieldList.length - 1] = true;

        if(this.isExpanded.length == 0) {
            this.isExpanded[index] = [];
        }

        if(this.rendering.length == 0) {
            this.rendering[index] = [];
        }

        this.isExpanded[index][this.flowTableList[index].flowTableFieldList.length - 1] = true;
        this.rendering[index][this.flowTableList[index].flowTableFieldList.length - 1] = true;
    }

    deleteField(indextable: number, index: number): Promise<any> {
        var _this = this;
        var i18n = this.activity.getI18nService();
        return this.activity.getUserConfirmService().askConfirmMessage
        (i18n.instant('!i18n# Eliminazione campo'), i18n.instant('!i18n# Confermi di voler eliminare il campo?')).then(function () {
            return _this.removeField(indextable, index);
        });
    }

    removeField(indextable: number, index: number) {
        //Rimuovo solo dalla lista se non è presente ancora sul DB
        if (this.flowTableList[indextable].flowTableFieldList[index].id == null) {
            this.flowTableList[indextable].flowTableFieldList.splice(index, 1);
            let successMessage: string = this.activityManager.engApplication.i18nInstant('DELETED_FIELD');
            this.activityManager.engApplication.notifyMessage(successMessage);
        } else {
            //Rimuovo dal DB e dalla lista
            this.deleteFlowField(this.flowTableList[indextable].flowTableFieldList[index].id, indextable, index);
        }
    }

    deleteSection(flowTable: FlowTable,index): Promise<any> {
        var _this = this;
        var i18n = this.activity.getI18nService();
        return this.activity.getUserConfirmService().askConfirmMessage
        (i18n.instant('!i18n# Eliminazione Sezioni'), i18n.instant('!i18n# Confermi di voler eliminare il campo?')).then(function () {
            return  _this.deleteSectionDb(flowTable,index);
        });
        
    }

    deleteSectionDb(flowTable:FlowTable,index:number): Promise<any>{
        console.log("DeleteFunc:: "+flowTable.id)
        let filter = {id:flowTable.id};
        if(flowTable.id !== undefined ){      
            this.flowConfigurationService.deleteFlowSection(filter).then(response => {
                if (response.success) {
                    this.removeSection(index);
                let confirmMessage =  this.activityManager.engApplication.i18nInstant('!i18n# Sezione eliminata con successo');
                this.activityManager.engApplication.notifyMessage(confirmMessage);

                }
            }).catch(() => {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            });
    }else{
        this.removeSection(index);
    }
        return Promise.resolve();
    }

    removeSection(index: number) {
        console.log("FlowTable:: "+this.flowTableList[index])
        this.flowTableList.splice(index, 1);
        //TODO manca servizio backend
        /*  //Rimuovo solo dalla lista se non è presente ancora sul DB
          if (this.flowTableList[index].id == null) {
              this.flowTableList.splice(index, 1);
              let successMessage: string = this.activityManager.engApplication.i18nInstant('DELETED_FIELD');
              this.activityManager.engApplication.notifyMessage(successMessage);
          } else {
              //Rimuovo dal DB e dalla lista
              this.deleteFlowSection(this.flowTableList[index].id,index);
          }*/
    }

    test2($event,i:number,j:number){
        this.formGroup.value["fieldmandatory0" + i + j] = $event
        this.flowTableList[i].flowTableFieldList[j].mandatory = $event;
        debugger;
        console.log($event);
    }

    changeName(changeName, index: number, indextable: number) {
        if(!this.checkNameUvicov(this.flowTableList[indextable],changeName)) {
            this.flowTableList[indextable].flowTableFieldList[index].name = changeName;
        }else {
            this.choices = [];
            this.choices.push(this.choice);
            var i18n = this.activity.getI18nService();
            return this.activity.getUserConfirmService().askChooseOneMessage
            (this.choices, i18n.instant('!i18n# Errore Nome Campo'), i18n.instant('!i18n#Il nome  "' + changeName.toUpperCase() + " esiste già in questa Sezione'")).then(function () {
                return;
            });
        }
    }
    onChangeName($event){
        console.log("EV_NAME "+$event)
        this.fmflow.name = $event
    }

    onChangeDesc($event){

    }
    checkNameUvicov(sez:FlowTable,name:string){
        for(let field of sez.flowTableFieldList){
            if(name == field.name){
            return true
            }
        }
        return false
    }

    changeNameSez(changeNameSez, index: number) {
        this.flowTableList[index].name = changeNameSez;
    }

    changeDescSez(changeDescSez, index: number) {
        this.flowTableList[index].description = changeDescSez;
    }


    addFkSect(index: number) {
        let link = new FlowTableLink();
        this.flowTableList[index].listFk.push(link);
        this.selectedTable[index].push(new FlowTable());

    }


    executeSaveActionPersist(action: ActivityAction): Promise<any> {
        this.activity.resetDirty();
        this.convertFlow();

        this.flowConfigurationService.saveFlowFormPersist(this.fmflow).then(response => {

            if (response.success) {
                let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n#Tabelle create con successo');
                this.activityManager.startRootActivity(this.activityDef);
                this.activityManager.engApplication.notifyMessage(successMessage);
                

            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });

        return Promise.resolve();

    }

    checkEmptySection(): string {
        if (!this.flowTableList) {
            return "";
        }

        for (let entry of this.flowTableList) {
            if (!entry.flowTableFieldList || entry.flowTableFieldList.length <= 0) {
                // Se il name non è valorizzato, evito undefined
                return entry.name || "";
            } else {
                return "";
            }
        }
        return "";
    }

    validateSection(): string {
        if (!this.flowTableList) {
            return "";
        }

        for (let entry of this.flowTableList) {
            console.log("Name:: " + entry.name + " desc:: " + entry.description);
            if (!entry.name || entry.name.length === 0) {
                console.log("EmptyName:: " + entry.name + " " + entry.description);
                return entry.name || "";
            } else if (!entry.description || entry.description.length === 0) {
                console.log("EmptyDesc:: " + entry.name + " " + entry.description);
                return entry.name || "";
            }
        }
        return "";
    }

    checkEmptyLength(): string {
        if (!this.flowTableList) {
            return "";
        }

        for (let section of this.flowTableList) {
            if (!section.flowTableFieldList) {
                continue;
            }
            for (let field of section.flowTableFieldList) {
                if (field.fieldType === "String" && (field.length == null)) {
                    return field.name || "";
                }
            }
        }
        return "";
    }

    executeSaveAction(action: ActivityAction): Promise<any> {
        if(!this.formGroup.value.version) {
            this.activityManager.engApplication.notifyMessage('Selezionare una versione');
            return null;
        }

        let tableFieldsExcist = this.checkEmptySection();
        let checkTableData = this.validateSection();
        
        if (checkTableData != "" ) {
            // this.alertMessage = this.activityManager.engApplication.i18nInstant('!i18n#Aggiungere almeno un campo alla Sezione ' + check.toUpperCase());
            // this.activityManager.engApplication.notifyMessage(this.alertMessage);
            this.choices = [];
            this.choices.push(this.choice);
            //var _this = this;
            var i18n = this.activity.getI18nService();
            return this.activity.getUserConfirmService().askChooseOneMessage
            (this.choices, i18n.instant('!i18n# Errore Salvataggio Sezione'), i18n.instant('!i18n#Aggiungere almeno un campo alla Sezione "' + checkTableData.toUpperCase() + "'")).then(function () {
                return;
            });
        }
       if (tableFieldsExcist != "" ) {
            // this.alertMessage = this.activityManager.engApplication.i18nInstant('!i18n#Aggiungere almeno un campo alla Sezione ' + check.toUpperCase());
            // this.activityManager.engApplication.notifyMessage(this.alertMessage);
            this.choices = [];
            this.choices.push(this.choice);
            //var _this = this;
            var i18n = this.activity.getI18nService();
            return this.activity.getUserConfirmService().askChooseOneMessage
            (this.choices, i18n.instant('!i18n# Errore Salvataggio Sezione'), i18n.instant('!i18n#Aggiungere almeno un campo alla Sezione "' + tableFieldsExcist.toUpperCase() + "'")).then(function () {
                return;
            });
        }
        
        this.activity.resetDirty();       
        this.convertFlow();
        
        //Check Field type-Date-String-lenght
        let check2 = this.checkEmptyLength();
        if (check2 != "") {
            this.choices = [];
            this.choices.push(this.choice);
            //var _this = this;
            var i18n = this.activity.getI18nService();
            return this.activity.getUserConfirmService().askChooseOneMessage
            (this.choices, i18n.instant('!i18n# Errore Salvataggio'), i18n.instant('!i18n#Aggiungere Lunghezza al campo "' + check2.toUpperCase() + "'")).then(function () {
                return;
            });
            
        }
        let starterParams: any = this.activity.startingParams;
        if (starterParams.extra == "duplica") {
            this.flushId();
            this.showLoadingIndicator = true;
            this.flowConfigurationService.saveFlowForm(this.fmflow).then(response => {
                if (response.success) {
                    this.showLoadingIndicator = false;
                    this.successMessage = this.activityManager.engApplication.i18nInstant('!i18n#Flusso salvato con successo');
                    this.activityManager.startRootActivity(this.activityDef);
                    this.activityManager.engApplication.notifyMessage(this.successMessage);
                    this.fmflow = response.opTargetObject;
                    this.flowTableList = response.opTargetObject.flowTableList;
                    
                    this.isCompleted = true;

                    this.activityManager.goBack();
                } else {
                    this.showLoadingIndicator = false;
                    let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore: flusso già presente in versione');
                    this.activityManager.engApplication.notifyMessage(errorMessage);
                }
            }).catch(() => {
                this.showLoadingIndicator = false;
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            });

            return Promise.resolve();
        } else {
            this.showLoadingIndicator = true;
            this.flowConfigurationService.saveFlowForm(this.fmflow).then(response => {
                if (response.success) {
                    this.showLoadingIndicator = false;
                    if (this.valueMsg == "Flusso salvato") {
                        this.successMessage = this.activityManager.engApplication.i18nInstant('!i18n#Flusso salvato con successo');
                    }
                    if (this.valueMsg == "Sezione salvata") {
                        this.successMessage = this.activityManager.engApplication.i18nInstant('!i18n#Sezioni salvate con successo');
                    }
                    if (this.valueMsg == "Campo salvato") {
                        this.successMessage = this.activityManager.engApplication.i18nInstant('!i18n#Campi salvati con successo');
                    }
                    if (this.valueMsg == "Collegamento salvato") {
                        this.successMessage = this.activityManager.engApplication.i18nInstant('!i18n#Collegamento campi salvati con successo');
                        this.createVisible = true;
                    }
                    this.activityManager.startRootActivity(this.activityDef);
                    this.activityManager.engApplication.notifyMessage(this.successMessage);
                    this.fmflow = response.opTargetObject;
                    this.flowTableList = response.opTargetObject.flowTableList;
                    console.log("flowTableObj:: "+JSON.stringify(this.flowTableList) );
                    
                    this.isCompleted = true;
                    this.editMo=1;
                    // if (this.valueMsg != "Collegamento salvato") {
                    //     this.activityManager.goBack();
                    // }
                    //this.refreshFlow(this.fmflow.id);
                }
                else if (response.errors) {
                    this.showLoadingIndicator = false;
                    this.activityManager.engApplication.notifyMessage('!i18n# Errore Inaspettato');
                }
                else {
                     }
            }).catch(() => {
                this.showLoadingIndicator = false;
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            });
            
            return Promise.resolve();
        }
        
    }


    convertFlow() {
        this.fmflow.code = this.formGroup.value.code;
        this.fmflow.name = this.formGroup.value.name;
        this.fmflow.description = this.formGroup.value.description;
        this.fmflow.descrb = this.formGroup.value.descrb;
        this.fmflow.status = this.formGroup.value.status;
        this.fmflow.remoteSend = this.formGroup.value.remoteSend;
        this.fmflow.uniqueness = this.formGroup.value.uniqueness;
        this.fmflow.scheduling = this.formGroup.value.scheduling;
        this.fmflow.periodicy = this.formGroup.value.periodicy;
        this.fmflow.monthlyDeadline = this.formGroup.value.monthlyDeadline;
        this.fmflow.version = this.formGroup.value.version;
        this.fmflow.commProt = this.formGroup.value.commProt;
        this.fmflow.yearlyDeadline = this.formGroup.value.yearlyDeadline;
        this.fmflow.flowTableList = this.flowTableList;
        this.fmflow.flowType = this.convertFlowTypeToString(this.formGroup.value.flowTypeBoolean);
        let i = this.fmflow.flowTableList.length;
        for (let j = 0; j < i; j++) {
            if (this.formGroup.value["descr" + j] != null) {
                this.fmflow.flowTableList[j].description = this.formGroup.value["descr" + j];
            }
            if (this.formGroup.value["required" + j] != null) {
                this.fmflow.flowTableList[j].required = this.formGroup.value["required" + j];
            }
            if (this.formGroup.value.datasource != null) {
                this.fmflow.flowTableList[j].datasource = this.formGroup.value.datasource;
            }
            this.fmflow.flowTableList[j].section = j;
            let k = this.fmflow.flowTableList[j].flowTableFieldList.length;
            for (let m = 0; m < k; m++) {
                if (this.formGroup.value["fieldname0" + j + m] != null) {
                    this.fmflow.flowTableList[j].flowTableFieldList[m].name = this.formGroup.value["fieldname0" + j + m];
                }
                if (this.formGroup.value["fielddesc0" +
                "" + j + m] != null) {
                    this.fmflow.flowTableList[j].flowTableFieldList[m].description = this.formGroup.value["fielddesc0" + j + m];
                }
                if (this.formGroup.value["fielddescsm0" +
                "" + j + m] != null) {
                    this.fmflow.flowTableList[j].flowTableFieldList[m].descriptionsm = this.formGroup.value["fielddescsm0" + j + m];
                }
                if (this.formGroup.value["fieldmandatory0" + j + m] != null) {
                    this.fmflow.flowTableList[j].flowTableFieldList[m].mandatory = this.formGroup.value["fieldmandatory0" + j + m];
                }
                if (this.formGroup.value["fieldregexp0" + j + m] != null) {
                    this.fmflow.flowTableList[j].flowTableFieldList[m].regExp = this.formGroup.value["fieldregexp0" + j + m];
                }
                if (this.formGroup.value["fieldtype0" + j + m] != null) {
                    this.fmflow.flowTableList[j].flowTableFieldList[m].fieldType = this.formGroup.value["fieldtype0" + j + m];
                }
                if (this.formGroup.value["fieldkey0" + j + m] != null) {

                    this.fmflow.flowTableList[j].flowTableFieldList[m].pk = this.formGroup.value["fieldkey0" + j + m];
                }
                if (this.formGroup.value["fieldlength0" + j + m] != null) {

                    this.fmflow.flowTableList[j].flowTableFieldList[m].length = this.formGroup.value["fieldlength0" + j + m];
                }
                if (this.formGroup.value["tablefieldlen0" + j + m] != null) {

                    this.fmflow.flowTableList[j].flowTableFieldList[m].physicalSize = this.formGroup.value["tablefieldlen0" + j + m];
                }else{
                    this.fmflow.flowTableList[j].flowTableFieldList[m].physicalSize = 255;
                }
                if (this.formGroup.value["fieldrefdate0" + j + m] != null) {
                    this.fmflow.flowTableList[j].flowTableFieldList[m].referenceDate = this.formGroup.value["fieldrefdate0" + j + m];
                }
                if (this.formGroup.value["fieldgroup0" + j + m] != null) {
                    this.fmflow.flowTableList[j].flowTableFieldList[m].groups = this.formGroup.value["fieldgroup0" + j + m];
                }
                if (this.formGroup.value["fieldcrypto0" + j + m] != null) {
                    this.fmflow.flowTableList[j].flowTableFieldList[m].crypto = this.formGroup.value["fieldcrypto0" + j + m];
                }
                if (this.formGroup.value["fieldactive0" + j + m] != null) {
                    this.fmflow.flowTableList[j].flowTableFieldList[m].active = this.formGroup.value["fieldactive0" + j + m];
                }
                this.fmflow.flowTableList[j].flowTableFieldList[m].position = m;
            }

            if(this.flowTableList[j].listFk) {
                for (let p = 0; p < this.flowTableList[j].listFk.length; p++) {
                    this.flowTableList[j].listFk[p].idTable = this.flowTableList[j].id;
                    this.flowTableList[j].listFk[p].jsonField = this.flowTableList[j].name
                }
            } else {
                this.flowTableList[j].listFk = [];

            }
        }


    }


    selectedTables($event: MatSelectChange, i: number, j: number, tp: any) {
        for (let m = 0; m < this.flowTableList.length; m++) {
            if (this.flowTableList[m].id == $event.value) {
                this.selectedTable[i][j] = this.flowTableList[m];

            }
        }

    }

    deleteFk(i: number, j: number,fk) {
        
        this.flowConfigurationService.deleteFlowFk(fk).then(response => {
            if (response.success) {
                this.flowTableList[i].listFk.splice(j, 1);
                let successMessage: string = this.activityManager.engApplication.i18nInstant('DELETED_FIELD');
                this.activityManager.engApplication.notifyMessage(successMessage);

            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            } 
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
       
    }

    renderDOM(index: number, indexT: number) {
        this.rendering[indexT][index] = true;
    }

    isDomRedered(index: any, indexT: number) {
        return this.rendering[indexT][index];
    }

    protected initFormGroup(): void {

    }


    flushId() {
        for (let i = 0; i < this.fmflow.flowTableList.length; i++) {
            for (let j = 0; j < this.fmflow.flowTableList[i].flowTableFieldList.length; j++) {
                this.fmflow.flowTableList[i].flowTableFieldList[j].id = undefined;
            }
            this.fmflow.flowTableList[i].id = undefined;
        }
        this.fmflow.id = undefined;
    }

    changePeriodicity($event) {
        if ($event == "Settimanale") {
            this.flagWeekly = true;
        } else {
            this.flagWeekly = false;
        }
    }

    /**
     * deleteFlowField
     * Rimuove un campo dalla configurazione del flusso
     * @param fieldid
     * @param indextable
     * @param index
     */
    deleteFlowField(fieldid: string, indextable: number, index: number) {
        this.flowConfigurationService.deleteFlowField(fieldid).then(response => {
            if (response.success) {
                //Rimuovo dalla lista dopo aver rimosso da DB
                this.flowTableList[indextable].flowTableFieldList.splice(index, 1);
                let successMessage: string = this.activityManager.engApplication.i18nInstant('DELETED_FIELD');
                this.activityManager.engApplication.notifyMessage(successMessage);

            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
    }

    deleteFlowSection(sectionid: string, index: number) {
        this.flowConfigurationService.deleteFlowSection(sectionid).then(response => {
            if (response.success) {
                //Rimuovo dalla lista dopo aver rimosso da DB
                this.flowTableList.splice(index, 1);
                let successMessage: string = this.activityManager.engApplication.i18nInstant('DELETED_SECTION');
                this.activityManager.engApplication.notifyMessage(successMessage);

            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
    }


    isEditModeEdit(){
        return false;
    }
    refreshFlow(flowId:string){
        this.flowConfigurationService.searchFlow(flowId).then(response => {
            if (response.success) {
                this.fmflow = response.opTargetObject.items[0];
                //   startingParams.editItem.extra = this.item.id;
                //   this.activityManager.getCurrentPage().setPageMainObject(startingParams);
                //   this.activityManager.startChildActivityByName("flow-view.edit", startingParams);
            }
            else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
    }
    // checkFlowName(name:string){
    //     this.flowConfigurationService.searchFlowByName(name).then(response => {
    //         if (response.success) {
    //             if(this.editMo==1 && (response.opTargetObject.items.lenght==) ){
    //
    //             }
    //             else{
    //
    //             }
    //             if(response.opTargetObject.items.lenght>0) {
    //                 this.choices = [];
    //                 this.choices.push(this.choice);
    //                 var i18n = this.activity.getI18nService();
    //                 return this.activity.getUserConfirmService().askChooseOneMessage
    //                 (this.choices, i18n.instant('!i18n# Errore Nome Flusso'), i18n.instant('!i18n#Il nome  "' + name.toUpperCase() + " esiste già'")).then(function () {
    //                     return;
    //                 });
    //             }
    //         } else {
    //
    //                   }
    //     }).catch(() => {
    //         let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
    //         this.activityManager.engApplication.notifyMessage(errorMessage);
    //     });
    // }

    // checkSectionName(name:string){
    //     this.flowConfigurationService.searchFlowByName(name).then(response => {
    //         if (response.success) {
    //             if(response.opTargetObject.items.length>0) {
    //                 this.choices = [];
    //                 this.choices.push(this.choice);
    //                 var i18n = this.activity.getI18nService();
    //                 return this.activity.getUserConfirmService().askChooseOneMessage
    //                 (this.choices, i18n.instant('!i18n# Errore Nome Flusso'), i18n.instant('!i18n#Il nome  "' + name.toUpperCase() + " esiste già'")).then(function () {
    //                     return;
    //                 });
    //             }
    //         } else {
    //
    //         }
    //     }).catch(() => {
    //         let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
    //         this.activityManager.engApplication.notifyMessage(errorMessage);
    //     });
    // }

    checkDataRiferimento(flow:FmFlow){
        //controllo che tra le sezione ci sia soltato una data i riferimento

    }

}
