import {Component, Inject, Input} from '@angular/core';

import {ActivityAction, ActivityManager, Choice, EditActivityComponent, SearchActivityComponent} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration.service";
import {SpeedDialFabPosition} from '../../speed-dial/speed-dial-fab.component';
import {
    Filter, FilterFieldStandard,
    FilterFieldType,
    FlowConfigurationFilter,
    FlowConfigurationFilterField,
    FlowNative,
    FlowTableField,
    FmFlow,
    TabgenFieldFilter,
    TabgenTableFilter,
    TabgenType,
    TypeField,
    Version
} from "../flow-configuration.model";
import {map, startWith} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import Utils from "../flow-configuration.utils";
import {DialogContentExampleDialog} from "../../dialog-box/dialog-content-example-dialog";
import {MatDialog} from "@angular/material";


@Component({
    selector: 'flow-configuration-filter',
    templateUrl: './flow-configuration-filter-activity.component.html',
    styleUrls: ['./flow-configuration-filter-activity.component.scss']
})

export class FlowConfigurationFilterActivityComponent extends EditActivityComponent {
    choice: Choice = {
        //icon:'done',
        text: 'OK',
        cssClass: '{text-align:center;}'
    };
    choices: Choice[] = [];

    @Input()
    panelWidth: string | number = 300;
    utils = new Utils();
    stateCtrl = new FormControl();
    filteredStates: Observable<FlowTableField[]>;
    sections: any;
    states: FlowTableField[] = [];
    flowConfigurationFilterField: FlowConfigurationFilterField;
    flowConfigurationFilterFieldList: FlowConfigurationFilterField[][];
    edit: boolean = false;
    opt_id: string;
    flow: FlowNative;
    flows: FlowNative[];
    version_id: string;
    dateFields: FlowTableField[] = [];
    flowConfigurationFilter: FlowConfigurationFilter = new FlowConfigurationFilter();
    flowConfigurationFilterStatic: FlowConfigurationFilter = new FlowConfigurationFilter();
    dataFilterList: FlowConfigurationFilterField[] = [];
    fmFlow: FmFlow[] = [];
    options: string[] = [];
    versions: Version[] = [];
    flusso: FmFlow;
    version: Version = new Version;
    filter: Filter = new Filter();
    count: Array<number> = [];
    filterValue: Filter = new Filter();
    showLoadingIndicator: boolean = true;
    textFilterList: FlowConfigurationFilterField[] = [];
    numericFilterList: FlowConfigurationFilterField[] = [];
    comboFilterList: FlowConfigurationFilterField[] = [];
    radioFilterList: FlowConfigurationFilterField[] = [];
    multiFilterList: FlowConfigurationFilterField[] = [];
    campiFilterList: FlowConfigurationFilterField[] = [];
    lookFilterList: FlowConfigurationFilterField[] = [];
    type: number;
    name: string;
    tableFieldFilter: TabgenFieldFilter[] = [];
    tabgenTableFilter: TabgenTableFilter[] = [];
    types: TypeField[] = [
        {value: 'text', viewValue: 'Text'},
        {value: 'data', viewValue: 'Data'},
        {value: 'numeric', viewValue: 'Numeric'}
    ];
    isDisableVersion: boolean = true;
    isDisable: boolean = false;
    isDisableType: boolean = true;
    //TODO portare cponf. fuori dalla classe.
    /**
     * Configurazione speedDialFabButtons
     */
    speedDialFabButtons = [
        {
            icon: 'date_range',
            tooltip: 'Data',
            method: 'addDateFilter'
        },
        {
            icon: 'filter_1',
            tooltip: 'Numerico',
            method: 'addNumFilter'
        },
        {
            icon: 'text_format',
            tooltip: 'Testuale',
            method: 'addTextFilter'
        },
        {
            icon: 'list',
            tooltip: 'Combo Box',
            method: 'addComboFilter'
        },
        {
            icon: 'search',
            tooltip: 'Lookup',
            method: 'addLookupFilter'

        },
        {
            icon: 'radio_button_checked',
            tooltip: 'Radio button',
            method: 'addRadioFilter'
        },
        {
            icon: 'check_box',
            tooltip: 'Combo Multiselect',
            method: 'addMultiFilter'
        },
        {
            icon: 'reorder',
            tooltip: 'Combo Campi',
            method: 'addCampiFilter'
        }
    ];

    /**
     * Costruttore FlowConfigurationFilterActivityComponent
     * @param flowConfigurationService
     * @param activityManager
     * @param searchComponent
     */
    constructor(
        private flowConfigurationService: FlowConfigurationService,
        private activityManager: ActivityManager,
        public dialog: MatDialog,
        @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent
    ) {
        super();
    }

    SpeedDialFabPosition = SpeedDialFabPosition;
    speedDialFabColumnDirection = 'column';
    speedDialFabPosition = SpeedDialFabPosition.Bottom;
    speedDialFabPositionClassName = 'speed-dial-container-bottom';

    /**
     * ngOnInit
     */
    ngOnInit() {
        this.clearAll();
        this.retrieveFlow();
        this.retrieveTabgenTableByType(TabgenType.Filtri);
        let starterParams: any = this.activity.startingParams;
        if (starterParams && starterParams.editItem) {
            this.edit = true;
            this.flowConfigurationFilter = starterParams.editItem;
            // if(this.flowConfigurationFilter.type == 2){
            //     this.loadFieldStandard();
            // }
            this.flow = this.flowConfigurationFilter.flow;
            this.version = this.flowConfigurationFilter.version;
            this.versions = this.flow.versions;
            this.opt_id = this.flow.id;
            this.version_id = this.version.id;
            //set static true/false
            this.getConfigurationFilters(this.flow.id, this.version.id, 1);
            this.name = this.flowConfigurationFilter.name;
            this.type = this.flowConfigurationFilter.type;
            this.flowConfigurationFilterFieldList = this.flowConfigurationFilter.fields;
            for (let i = 0; i < this.flowConfigurationFilter.fields.length; i++) {
                for (let j = 0; j < this.flowConfigurationFilter.fields[i].length; j++) {
                    this.flowConfigurationFilterField = this.flowConfigurationFilter.fields[i][j];
                    this.flowConfigurationFilterField.tableFieldFilter = [];
                    this.retrieveTabgenFieldByTableId(this.flowConfigurationFilterField.filterTable, i, this.flowConfigurationFilterField.tableFieldFilter);
                    if (this.flowConfigurationFilter.fields[i][j].filterType == FilterFieldType.Text) {
                        this.textFilterList.push(this.flowConfigurationFilterField);
                    }
                    if (this.flowConfigurationFilter.fields[i][j].filterType == FilterFieldType.Date) {
                        this.dataFilterList.push(this.flowConfigurationFilterField);
                    }
                    if (this.flowConfigurationFilter.fields[i][j].filterType == FilterFieldType.Numeric) {
                        this.numericFilterList.push(this.flowConfigurationFilterField);
                    }
                    if (this.flowConfigurationFilter.fields[i][j].filterType == FilterFieldType.Campi) {
                        this.campiFilterList.push(this.flowConfigurationFilterField);
                        this.getAllFlowFields(this.flow.id, this.version.id);
                        this.filteredStates = this.stateCtrl.valueChanges
                            .pipe(
                                startWith(''),
                                map(state => state ? this._filterStates(state) : this.states.slice()));
                    }
                    if (this.flowConfigurationFilter.fields[i][j].filterType == FilterFieldType.ComboBox) {
                        this.comboFilterList.push(this.flowConfigurationFilterField);
                    }
                    if (this.flowConfigurationFilter.fields[i][j].filterType == FilterFieldType.Radio) {
                        this.radioFilterList.push(this.flowConfigurationFilterField);
                    }
                    if (this.flowConfigurationFilter.fields[i][j].filterType == FilterFieldType.Multi) {
                        this.multiFilterList.push(this.flowConfigurationFilterField);
                    }
                    if (this.flowConfigurationFilter.fields[i][j].filterType == FilterFieldType.Lookup) {
                        this.lookFilterList.push(this.flowConfigurationFilterField);
                    }
                }
            }
        }
    }

    /**
     * Initialize ComboBox Version
     * @param opt2
     */
    initField(combo, i, x) {
        if (x == FilterFieldType.ComboBox) {
            this.comboFilterList[i].tableFieldFilter = [];
            this.retrieveTabgenFieldByTableId(combo.id, i, this.comboFilterList[i].tableFieldFilter);
        }
        if (x == FilterFieldType.Radio) {
            this.radioFilterList[i].tableFieldFilter = [];
            this.retrieveTabgenFieldByTableId(combo.id, i, this.radioFilterList[i].tableFieldFilter);
        }
        if (x == FilterFieldType.Multi) {
            this.multiFilterList[i].tableFieldFilter = [];
            this.retrieveTabgenFieldByTableId(combo.id, i, this.multiFilterList[i].tableFieldFilter);
        }
        if (x == FilterFieldType.Lookup) {
            this.lookFilterList[i].tableFieldFilter = [];
            this.retrieveTabgenFieldByTableId(combo.id, i, this.lookFilterList[i].tableFieldFilter);
        }

    }

    clearAll() {
        //FieldList
        this.dataFilterList = [];
        this.textFilterList = [];
        this.numericFilterList = [];
        this.comboFilterList = [];
        this.radioFilterList = [];
        this.multiFilterList = [];
        this.campiFilterList = [];
        this.lookFilterList = [];
    }

    /**
     * retriveFlow
     * Recupera un FlowDTO
     */
    retrieveFlow() {
        this.showLoadingIndicator = true;
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
            this.showLoadingIndicator = false;
        }).catch(() => {
            this.showLoadingIndicator = false;
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });

        return Promise.resolve();
    }

    /**
     *
     */
    addCampiFilter() {
        this.flowConfigurationFilterField = new FlowConfigurationFilterField();
        this.flowConfigurationFilterField.filterType = FilterFieldType.Campi;
        this.campiFilterList.push(this.flowConfigurationFilterField);
        this.getAllFlowFields(this.flow.id, this.version.id);
        this.filteredStates = this.stateCtrl.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this._filterStates(state) : this.states.slice()));
    }

    /**
     *
     */
    addLookupFilter() {
        this.flowConfigurationFilterField = new FlowConfigurationFilterField();
        this.flowConfigurationFilterField.filterType = FilterFieldType.Lookup;
        this.lookFilterList.push(this.flowConfigurationFilterField);
    }

    /**
     *
     */
    addDateFilter() {
        this.flowConfigurationFilterField = new FlowConfigurationFilterField();
        this.flowConfigurationFilterField.filterType = FilterFieldType.Date;
        this.dataFilterList.push(this.flowConfigurationFilterField);
    }

    /**
     *
     */
    addTextFilter() {
        this.flowConfigurationFilterField = new FlowConfigurationFilterField();
        this.flowConfigurationFilterField.id = null;
        this.flowConfigurationFilterField.filterType = FilterFieldType.Text;
        this.flowConfigurationFilterField.filterTable = null;
        this.flowConfigurationFilterField.filterField = null;
        this.textFilterList.push(this.flowConfigurationFilterField);
    }

    /**
     *
     */
    addNumFilter() {
        this.flowConfigurationFilterField = new FlowConfigurationFilterField();
        this.flowConfigurationFilterField.filterType = FilterFieldType.Numeric;
        this.numericFilterList.push(this.flowConfigurationFilterField);
    }

    /**
     *
     */
    addComboFilter() {
        this.flowConfigurationFilterField = new FlowConfigurationFilterField();
        this.flowConfigurationFilterField.filterType = FilterFieldType.ComboBox;
        this.flowConfigurationFilterField.filterTable = null;
        this.flowConfigurationFilterField.filterField = null;
        this.comboFilterList.push(this.flowConfigurationFilterField);

    }

    addMultiFilter() {
        this.flowConfigurationFilterField = new FlowConfigurationFilterField();
        this.flowConfigurationFilterField.filterType = FilterFieldType.Multi;
        this.multiFilterList.push(this.flowConfigurationFilterField);
    }


    /**
     *
     */
    addRadioFilter() {
        this.flowConfigurationFilterField = new FlowConfigurationFilterField();
        this.flowConfigurationFilterField.filterType = FilterFieldType.Radio;
        this.radioFilterList.push(this.flowConfigurationFilterField);
    }

    /**
     * Rimuove un filtro Data
     * @param i
     */
    removeCampiFilter(i) {
        this.deleteFlowConfigirationField(this.campiFilterList, i);
        this.campiFilterList.splice(i, 1);
    }

    /**
     * Rimuove un filtro Data
     * @param i
     */
    removeLookupFilter(i) {
        this.deleteFlowConfigirationField(this.lookFilterList, i);
        this.lookFilterList.splice(i, 1);
    }


    /**
     * Rimuove un filtro Data
     * @param i
     */
    removeDateFilter(i) {
        this.deleteFlowConfigirationField(this.dataFilterList, i);
        this.dataFilterList.splice(i, 1);
    }

    /**
     * Rimuove un filtro Data
     * @param i
     */
    removeMultiFilter(i) {
        this.deleteFlowConfigirationField(this.multiFilterList, i);
        this.multiFilterList.splice(i, 1);
    }

    /**
     * Rimuove un filtro Text
     * @param i
     */
    removeTextFilter(i) {
        this.deleteFlowConfigirationField(this.textFilterList, i);
    }

    /**
     * Rimuove un filtro Number
     * @param i
     */
    removeNumFilter(i) {
        this.deleteFlowConfigirationField(this.numericFilterList, i);
        this.numericFilterList.splice(i, 1);
    }

    /**
     * Rimuove un filtro ComboBox
     * @param i
     */
    removeComboFilter(i) {
        this.deleteFlowConfigirationField(this.comboFilterList, i);
        this.comboFilterList.splice(i, 1);
    }

    /**
     * Rimuove un value Filtro ComboBox
     * @param i
     */
    removeRadioFilter(i) {
        this.deleteFlowConfigirationField(this.radioFilterList, i);
        this.radioFilterList.splice(i, 1);
    }

    /**
     * onPositionChange SpeedDialFabPosition
     * @param position
     */
    onPositionChange(position: SpeedDialFabPosition) {
        switch (position) {
            case SpeedDialFabPosition.Bottom:
                this.speedDialFabPositionClassName = 'speed-dial-container-bottom';
                this.speedDialFabColumnDirection = 'column-reverse';
                break;
            default:
                this.speedDialFabPositionClassName = 'speed-dial-container-top';
                this.speedDialFabColumnDirection = 'column';
        }
    }

    /**
     * onSpeedDialFabClicked Click Botton Boom!
     * @param btn
     */
    onSpeedDialFabClicked(btn) {
        let method = btn.method;
        this[method]();
    }

    /**
     * Recupera FlowTableFieldDTO da Flow/Version
     * @param flow
     * @param version
     */
    getAllFlowFields(flow: string, version: string) {
        this.showLoadingIndicator = true;
        this.flowConfigurationService.getAllFlowFields(flow, version).then(response => {
            if (response.success) {
                this.dateFields = response.opTargetObject.items;
                this.states = response.opTargetObject.items;

            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
            this.showLoadingIndicator = false;
        }).catch(() => {
            this.showLoadingIndicator = false;
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });

        return Promise.resolve();
    }

    /**
     * Recupera FlowTableFieldDTO da Flow/Version
     * @param flow
     * @param version
     */
    getDataFields(flow: string, version: string) {
        this.showLoadingIndicator = true;
        this.flowConfigurationService.getDataFields(flow, version).then(response => {
            if (response.success) {
                this.dateFields = response.opTargetObject.items;
            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
            this.showLoadingIndicator = false;
        }).catch(() => {
            this.showLoadingIndicator = false;
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
        return Promise.resolve();
    }

    /**
     * Initialize ComboBox Version
     * @param opt
     */
    initVersion(opt) {
        this.isDisableVersion = false;
        this.flow = opt;
        this.versions = opt.versions;
        this.retriveLastVersionByFlow(this.flow.code);
    }

    /**
     * Initialize ComboBox Flow
     * @param $event
     */
    initDataField($event) {
        this.version = $event;
        this.getConfigurationFilters(this.flow.id, this.version.id, 1);
        //this.getDataFields(this.opt_id, $event.id);
    }


    deleteFlowConfigirationField(entitys: FlowConfigurationFilterField[], i: number): Promise<any> {
        this.flowConfigurationService.deleteFlowConfigurationFilterField(entitys[i]).then(response => {
            if (response.success) {
                entitys.splice(i, 1);
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
     * executeSaveAction Save FlowConfigurationFilter
     * @param action
     */
    executeSaveAction(action: ActivityAction): Promise<any> {
        let id = this.flowConfigurationFilter.id;
        if (id != null || id != undefined) {
            this.flowConfigurationFilter = new FlowConfigurationFilter();
            this.flowConfigurationFilter.id = id;
        }
        this.flowConfigurationFilter.name = this.name;
        this.flowConfigurationFilter.flow = this.flow;
        this.flowConfigurationFilter.version = this.version;
        this.flowConfigurationFilter.type = this.type;
        if (this.textFilterList.length != 0) {
            for (let i = 0; i < this.textFilterList.length; i++) {
                if (this.textFilterList[i].id != null) {
                    //this.textFilterList.splice(i, 1);
                }
            }
            this.flowConfigurationFilter.fields.push(this.textFilterList);
        }
        if (this.dataFilterList.length != 0) {
            for (let i = 0; i < this.dataFilterList.length; i++) {
                if (this.dataFilterList[i].id != null) {
                    //this.dataFilterList.splice(i, 1);
                }
            }
            this.flowConfigurationFilter.fields.push(this.dataFilterList);
        }
        if (this.radioFilterList.length != 0) {
            for (let i = 0; i < this.radioFilterList.length; i++) {
                if (this.radioFilterList[i].id != null) {
                    //this.radioFilterList.splice(i, 1);
                }
            }
            this.flowConfigurationFilter.fields.push(this.radioFilterList);
        }
        if (this.numericFilterList.length != 0) {
            for (let i = 0; i < this.numericFilterList.length; i++) {
                if (this.numericFilterList[i].id != null) {
                    //this.numericFilterList.splice(i, 1);
                }
            }
            this.flowConfigurationFilter.fields.push(this.numericFilterList);
        }
        if (this.multiFilterList.length != 0) {
            for (let i = 0; i < this.multiFilterList.length; i++) {
                if (this.multiFilterList[i].id != null) {
                    //this.multiFilterList.splice(i, 1);
                }
            }
            this.flowConfigurationFilter.fields.push(this.multiFilterList);
        }
        if (this.comboFilterList.length != 0) {
            for (let i = 0; i < this.comboFilterList.length; i++) {
                if (this.comboFilterList[i].id != null) {
                    //this.comboFilterList.splice(i, 1);
                }
            }
            this.flowConfigurationFilter.fields.push(this.comboFilterList);
        }
        if (this.lookFilterList.length != 0) {
            for (let i = 0; i < this.lookFilterList.length; i++) {
                if (this.lookFilterList[i].id != null) {
                    //this.lookFilterList.splice(i, 1);
                }
            }
            this.flowConfigurationFilter.fields.push(this.lookFilterList);
        }
        if (this.campiFilterList.length != 0) {
            for (let i = 0; i < this.campiFilterList.length; i++) {
                if (this.campiFilterList[i].id != null) {
                    //this.campiFilterList.splice(i, 1);
                }
            }
            this.flowConfigurationFilter.fields.push(this.campiFilterList);
        }
        //var controllo
        this.choices = [];
        this.choices.push(this.choice);
        var i18n = this.activity.getI18nService();
        //controllo Header
        if (this.name == "" || this.name == null || this.opt_id == "" || this.opt_id == null || this.version_id == "" || this.version_id == null || this.type == null) {
            return this.activity.getUserConfirmService().askChooseOneMessage
            (this.choices, i18n.instant('!i18n# Errore Salvataggio'), i18n.instant('!i18n#Valorizzare il Campi Obbligatori')).then(function () {
                return;
            });
        }
        //controllare campi valorizzati
        if (this.flowConfigurationFilter.fields.length > 0) {
            for (let i = 0; i < this.flowConfigurationFilter.fields.length; i++) {
                for (let j = 0; j < this.flowConfigurationFilter.fields[i].length; j++) {
                    if (this.flowConfigurationFilter.fields[i][j].name == null || this.flowConfigurationFilter.fields[i][j].name == ""
                        || this.flowConfigurationFilter.fields[i][j].position == null || this.flowConfigurationFilter.fields[i][j].position == "") {
                        return this.activity.getUserConfirmService().askChooseOneMessage
                        (this.choices, i18n.instant('!i18n# Errore Salvataggio'), i18n.instant('!i18n#Valorizzare il Campi Obbligatori dei Filtri')).then(function () {
                            return;
                        });
                    }
                }
            }
        } else {
            //non ho aggiunto nessun filtro non posso salvare
            this.choices = [];
            this.choices.push(this.choice);
            var i18n = this.activity.getI18nService();

            return this.activity.getUserConfirmService().askChooseOneMessage
            (this.choices, i18n.instant('!i18n# Errore Salvataggio'), i18n.instant('ERR_FILTER_SAVE')).then(function () {
                return;
            });
            // let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR_FILTER_SAVE');
            // this.activityManager.engApplication.notifyMessage(errorMessage);
        }
        this.flowConfigurationService.saveConfigurationFilter(this.flowConfigurationFilter).then(response => {
            if (response.success) {
                if (response.opTargetObject.error) {
                    //this.manageError(response.opTargetObject.error);
                } else {
                    let successMessage: string = this.activityManager.engApplication.i18nInstant('CONF_FILTER_SAVE_SUCC');
                    this.activityManager.engApplication.notifyMessage(successMessage);
                    this.activityManager.goBack();
                }
            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
                this.flowConfigurationFilter = null;
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
        return Promise.resolve();
    }

    retrieveTabgenFieldByTableId(tableId: string, i: number, x: TabgenFieldFilter[]) {
        this.showLoadingIndicator = true;
        this.flowConfigurationService.searchTabgenFields(tableId).then(response => {
            if (response.success) {
                if (response.opTargetObject.error) {
                    //this.manageError(response.opTargetObject.error);
                } else {
                    for (let i = 0; i < response.opTargetObject.items.length; i++) {
                        x.push(response.opTargetObject.items[i]);
                    }

                }
                this.showLoadingIndicator = false;
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

        return Promise.resolve();
    }

    retrieveTabgenTableByType(type: string) {
        this.flowConfigurationService.searchTabgenTableByType(type).then(response => {
            if (response.success) {
                if (response.opTargetObject.error) {
                    //this.manageError(response.opTargetObject.error);
                } else {
                    this.tabgenTableFilter = response.opTargetObject.items;
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

    private _filterStates(value: string): FlowTableField[] {
        const filterValue = value.toLowerCase();
        return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
    }
    /**
     * Delete Flow Configuration Filter
     * @param psAction
     * @param poRequest
     * @param poSelected
     * @param $event
     */
    executeDeleteAction(action: ActivityAction): Promise<any> {
        const dialogRef = this.dialog.open(DialogContentExampleDialog, {
            data: {
                header: "Cancellazione Estrazioni",
                text: "Sicuro di voler candellare il la Configurazione " + this.flowConfigurationFilter.name + " ?",
                b2: "Esci",
                b1: "Continua"
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                this.showLoadingIndicator = true;
                this.flowConfigurationService.deleteFlowConfigurationFilter(this.flowConfigurationFilter).then(response => {
                    if (response.success) {
                        if (response.opTargetObject.length > 0) {
                            this.utils.messageError2("!i18n# Errore Cancellazione", "!i18n# Configurazione Collegata a " + response.opTargetObject.length + " Estrazione", this.activity,response.opTargetObject,this.activityManager);
                            //Errore Eliminazione
                            //Il filtro è utilizzato nelle estrazioni: (List<String> ID)
                        } else {
                            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Eliminazione avvenuta con Successo');
                            this.activityManager.engApplication.notifyMessage(errorMessage);
                        }
                        this.showLoadingIndicator = false;
                        this.activityManager.goBack();
                        //refresh Search Activity
                        //this.searchComponent.refreshSearch();
                    } else {
                        this.showLoadingIndicator = false;
                        let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
                        this.activityManager.engApplication.notifyMessage(errorMessage);
                    }
                }).catch((e) => {
                    //this.showLoadingIndicator = false;
                    let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
                    this.activityManager.engApplication.notifyMessage(errorMessage);
                });
            }
        });
        return Promise.resolve();
    }


    /**
     * getConfigurationStaticFilters
     * Retrive all Configuration Filters Static ("FLAG TRUE")
     * @param flow
     * @param version
     * @param type
     */
    getConfigurationFilters(flow: string, version: string, type: number) {
        this.flowConfigurationService.getConfigFilter(flow, version, type).then(response => {
            if (response.success) {
                if (response.opTargetObject.error) {
                    //this.manageError(response.opTargetObject.error);
                } else {
                    this.isDisableType = false;
                    if (response.opTargetObject.items.length > 0) {
                        if (this.flowConfigurationFilter.id != null || this.flowConfigurationFilter.id == undefined) {
                            if (response.opTargetObject.items[0].id == this.flowConfigurationFilter.id) {
                                this.isDisable = false;
                            } else {
                                this.isDisable = true;
                            }
                        }
                    } else {
                        this.isDisable = false;
                    }
                }
            }
        }).catch(() => {
            this.showLoadingIndicator = false;
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
        return Promise.resolve();
    }

    retriveLastVersionByFlow(flowcode: any): Promise<any> {
        this.flowConfigurationService.getFlowWithLastVersion(flowcode).then(response => {
            if (response.success) {
                if (response.opTargetObject.error) {
                    //this.manageError(response.opTargetObject.error);
                } else {
                    this.version_id = response.opTargetObject.version;
                }
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });
        return Promise.resolve();
    }

    loadFieldStandard() {
        this.comboFilterList = [];
        this.flowConfigurationFilterField = new FlowConfigurationFilterField();
        this.flowConfigurationFilterField.id = null;
        this.flowConfigurationFilterField.name = "NUMERO INVIO";
        this.flowConfigurationFilterField.position = "1";
        this.flowConfigurationFilterField.filterType = FilterFieldType.ComboBox;
        this.flowConfigurationFilterField.filterTable = null;
        this.flowConfigurationFilterField.filterField = null;
        this.comboFilterList.push(this.flowConfigurationFilterField);
        this.flowConfigurationFilterField = new FlowConfigurationFilterField();
        this.flowConfigurationFilterField.id = null;
        this.flowConfigurationFilterField.name = "ANNO";
        this.flowConfigurationFilterField.position = "2";
        this.flowConfigurationFilterField.filterType = FilterFieldType.ComboBox;
        this.flowConfigurationFilterField.filterTable = null;
        this.flowConfigurationFilterField.filterField = null;
        this.comboFilterList.push(this.flowConfigurationFilterField);
        this.textFilterList = [];
        let index = 0;
        for (let item in FilterFieldStandard) {
            index++;
            if (isNaN(Number(item)) && item != "Numero_Invio" && item != "Flusso") {
                this.flowConfigurationFilterField = new FlowConfigurationFilterField();
                this.flowConfigurationFilterField.id = null;
                this.flowConfigurationFilterField.name = item;
                this.flowConfigurationFilterField.position = index.toString();
                this.flowConfigurationFilterField.filterType = FilterFieldType.Text;
                this.flowConfigurationFilterField.filterTable = null;
                this.flowConfigurationFilterField.filterField = null;
                this.textFilterList.push(this.flowConfigurationFilterField);
            }

        }

    }

}




