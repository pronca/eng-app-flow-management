import { Component} from "@angular/core";
import * as moment_ from 'moment';
import { ActivityManager, EditActivityComponent, ResumeOperation, SearchFilters } from "eng-app";
import {FlowConfigurationService} from "../../flow-configuration/flow-configuration.service";
import { SearchPatient} from "../../flow-configuration/flow-configuration.model";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { DialogContentExampleDialog } from '../../dialog-box/dialog-content-example-dialog';

const moment = moment_;

@Component({
    selector: 'paziente-view-search-activity',
    templateUrl: './paziente-view-search-activity.component.html',
    styleUrls: ['./paziente-view-search-activity.components.scss']
})

export class PazienteViewSearchActivityComponent extends EditActivityComponent {

    showLoadingIndicator: boolean = false;
    displayedColumns: string[] = [];
    nameColumns: string[] = [];
    dataSource: any[] = [];
    dataSourceForSearch: any[] = [];
    name: string;
    surname: string;
    taxcode: string;
    birthDate: Date;
    pazienti: any;

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
    ngOnInit(filter?: SearchFilters) {
       
        super.ngOnInit();
    }

    initActivityActions() {
        super.initActivityActions();
        this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);
    }

    startSearch() {

        this.searchPatient();
    }

    /**
     * Button goEditActivity
     * @param row
     */
    goEditActivity($event, element, i) {
        let startingParams: any = {};
        startingParams.editItem = this.dataSourceForSearch[i][element['index']];
        startingParams.flow = this.pazienti[i].flow;
        startingParams.popupHeight = '700px';
        startingParams.popupWidth = '1300px';
        this.activityManager.startChildPopupActivityByName("paziente-view.edit", startingParams);
    }
  
    searchPatient() {
        if(this.taxcode || (this.name && this.surname && this.birthDate)){
        this.showLoadingIndicator = true;
        let searchPatient: SearchPatient = new SearchPatient();
        searchPatient.name = this.name;
        searchPatient.surname = this.surname;
        searchPatient.taxCode = this.taxcode;
        searchPatient.birthDate = this.birthDate;
        this.flowConfigurationService.searchPatient(searchPatient).then(response => {
            if (response.success && response.opTargetObject && response.opTargetObject.result) {
                this.pazienti = response.opTargetObject.result;
                for(let i=0; i<this.pazienti.length; i++){
                    this.displayedColumns[i] = this.pazienti[i].columnDescriptions;
                    this.nameColumns[i] = this.pazienti[i].columns;
                    this.dataSource[i] = new MatTableDataSource<any>(this.generateDatasource(i, true));
                    this.dataSourceForSearch[i] = this.generateDatasource(i, false);
                }
            } else if(response.opTargetObject && response.opTargetObject.message) {
                this.activityManager.engApplication.notifyMessage(response.opTargetObject.message);
            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
            this.showLoadingIndicator = false;
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
            this.activityManager.engApplication.notifyMessage(errorMessage);
            this.showLoadingIndicator = false;
        });
        return Promise.resolve();
    }else{
        let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n#VALORIZZARE CAMPI OBBLIGATORI');
        this.activityManager.engApplication.notifyMessage(errorMessage);
    }
    }

    onResume(operation?: ResumeOperation) {
        for(let i=0; i<this.pazienti.length; i++){
            this.displayedColumns[i] = this.pazienti[i].columnDescriptions;
            this.nameColumns[i] = this.pazienti[i].columns;
            this.dataSource[i] = new MatTableDataSource<any>(this.generateDatasource(i, true));
            this.dataSourceForSearch[i] = this.generateDatasource(i, false);
        }
        super.onResume(operation);
    }
   
    openDialog(startingParams) {
        const dialogRef = this.dialog.open(DialogContentExampleDialog, {
            data: { header: "Errore consolidamento", text: "Alcune pratiche risultano disallineate scegliere Ok per visualizzare il dettaglio", b1: "Ok", b2: "Cancel" }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                this.activityManager.checkStartChildPopupActivityByName("pratica-flow.edit", startingParams);
            }
        });
    }

    generateDatasource(i: number, display: boolean):Array<any>{

        let data = new Array();
        let lenghtRows = this.pazienti[i]["rows"].length;
        let columnValue = null;

        for(let z = 0; z < lenghtRows; z++){
            data[z] = {
                index : z
            };
            if(!display) {
                data[z] = {};
            }

            let lengthColumn = this.pazienti[i]["columns"].length;
            for(let j = 0; j < lengthColumn; j++){

                let columnName = this.displayedColumns[i][j];
                if(!display) {
                    columnName = this.nameColumns[i][j]
                }

                columnValue = this.pazienti[i]["rows"][z][j];
                if(this.isDate(columnValue)){
                    columnValue = this.dateConvert(columnValue);
                }
                data[z][columnName] = columnValue;
            }
        }
        
      return data;
  }

  isDate(value) {
    return value instanceof Date;
  }

  dateConvert(date): string {
    return this.leftpad(date.getDate())
              + '/' + this.leftpad(date.getMonth() + 1, 2)
              + '/' + this.leftpad(date.getFullYear(), 4)
              ;
  }
  
  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
          + String(val)).slice(String(val).length);
  }

}



