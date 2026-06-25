import {Component, ViewChild, ViewChildren, QueryList} from '@angular/core';

import {ActivityManager, EditActivityComponent} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration/flow-configuration.service";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SearchFlowPatientFilter, FmFlow, header} from "../flow-configuration/flow-configuration.model";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FieldViewComponent } from '../flow-configuration/flow-edit/field-view.component';

@Component({
    selector: 'paziente-view-activity',
    templateUrl: './paziente-view-activity.component.html',
    styleUrls: ['./paziente-view-activity.component.scss'],
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
  })


  export class PazienteViewActivityComponent extends EditActivityComponent  {

    elements: any;
    flow: FmFlow;
    name: string;
    surname: string;
    taxcode: string;
    birthDate: Date;
    dataNascitaView: string;
    map : any;
    displayedColumns: string[] = [];
    dataSource: any;
    showLoadingIndicator: boolean = false;
    pkName: string[] = [];
    colMap: header[] = [];

    @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;
  

    constructor(
        private flowConfigurationService: FlowConfigurationService,
        private activityManager: ActivityManager,
    ){
        super();
    }

    @ViewChildren('fieldview') components: QueryList<FieldViewComponent>;

  ngOnInit() {
    let starterParams: any = this.activity.startingParams;
    this.elements = starterParams.editItem;
    this.flow = starterParams.flow;
    this.name = this.elements.NOME;
    this.surname =this.elements.COGNOME;
    this.taxcode = this.elements.CODICEPAZIENTE;
    if(this.elements.DATANASCITA){
      let day: string = this.elements.DATANASCITA.substring(0,3);
      let month: string = this.elements.DATANASCITA.substring(3,6);
      let dataInvertita: string = month + day + this.elements.DATANASCITA.substring(6,this.elements.DATANASCITA.length);
      this.birthDate = new Date (dataInvertita);
    }
    this.activity.title = "!i18n#ASSISTITO: " + this.name + " " + this.surname + " " + this.taxcode + " " + this.elements.DATANASCITA;
    this.searchFlowPatient();
  }
   

   initActivityActions() {
    super.initActivityActions();
    this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);
  }

  searchFlowPatient(): void{
    this.showLoadingIndicator = true;

    let searchFlowPatientFilter: SearchFlowPatientFilter = new SearchFlowPatientFilter();
    searchFlowPatientFilter.flow = this.flow;
    if(this.birthDate){
    this.elements.DATANASCITA = this.birthDate;
    }else{
    this.elements.DATANASCITA  = new Date(this.elements.DATANASCITA);
    }
    searchFlowPatientFilter.filters = this.elements;
    
      this.flowConfigurationService.searchFlowPatient(searchFlowPatientFilter).then(result => {
          if (result.success) {
             this.map = result.opTargetObject.result;
            //  for(let i=0; i<this.map["columns"].length; i++){
            //   this.displayedColumns[i] = this.map["columns"][i].toUpperCase();
            //  }
            //  this.displayedColumns.push("LINK");
            //  this.displayedColumns.push("FLOWVIEW");
             this.displayedColumns = this.generaColonne(this.map["columnDescriptions"],this.map["columns"]);
              this.dataSource = new MatTableDataSource<any>(this.generateDatasource());
              } 
              else {
                  this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
              }
              this.showLoadingIndicator = false;
          })
          .catch(e => { 
            this.showLoadingIndicator = false;
            this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
          }); 
      }

      generaColonne(colonneMap: any, nameMap: any): string[] {
        this.colMap = [];
  
        let cols = Object.keys(colonneMap);
        let colsMap = Object.keys(nameMap);
        for(let i=0; i<colsMap.length; i++){
          let colHeader = new header();
          colHeader.name = nameMap[colsMap[i]];
          colHeader.description = colonneMap[cols[i]].toUpperCase();
          this.colMap.push(colHeader);
        }
        let colHeader4 = new header();
        colHeader4.name = "LINK";
        colHeader4.description = "LINK";
        this.colMap.push(colHeader4);
        let colHeader2 = new header();
        colHeader2.name = "FLOWVIEW";
        colHeader2.description = "FLOWVIEW";
        this.colMap.push(colHeader2);
  
      return (this.colMap.map(col => col.name));    
     }
  
      generateDatasource():Array<any>{
        let data = new Array();
        let lenghtRows = this.map["rows"].length;
        let columnValue = null;

        for(let z = 0; z < lenghtRows; z++){
            data[z] = {};
            let lengthColumn = this.map["columns"].length;
            for(let j = 0; j < lengthColumn; j++){
                let columnName = this.displayedColumns[j];
                    columnValue = this.map["rows"][z][j];
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

    openExternalActivity(element: any){

      this.getContextParam(element);
  
    }

    getContextParam(element: any){

      let keys: String[][] = [];
      for(let i=0; i<this.flow.flowTableList[0].flowTableFieldList.length; i++){
        if(this.flow.flowTableList[0].flowTableFieldList[i].pk){
          this.pkName.push(this.flow.flowTableList[0].flowTableFieldList[i].name);
        }
      }
      for(let i=0; i<this.pkName.length; i++){
        keys[i] = []
        keys[i][0] = this.pkName[i];
        keys[i][1] = element[this.pkName[i]];
      }
      
      this.flowConfigurationService.getContextParam(this.flow.code, keys)
      .then(result => {
          if (result.success) {
            
            let extra = result.opTargetObject.params;
  
            let activity = result.opTargetObject.activity;

            let param: any = {

              extra
        
            };
  
            if(this.startingParams.editItem.extra == "popup-extr"){    
                param.popupHeight = '700px';
                param.popupWidth = '1300px';
                this.activityManager.startChildActivityByName(activity, param);
      
            }else{
      
                this.activityManager.startChildActivityByName(activity, param);
            }
           
          } else {
              this.activityManager.engApplication.notifyMessage('Errore caricamento paramentri');
          }
      })
      .catch(e => {
        this.activityManager.engApplication.notifyMessage('Errore caricamento paramentri');
      }
      ); 
    }
    
    goToFlowView(element){
      let starterParams: any = this.activity.startingParams;
      starterParams.extra = element;
      starterParams.editItem = this.flow;
      starterParams.popupeight = '900px';
      starterParams.popupWidth = '1700px';
      this.activityManager.startChildActivityByName("flow-view.edit", starterParams);
    }

    isEditModeEdit(){
      return false;
    }

}  