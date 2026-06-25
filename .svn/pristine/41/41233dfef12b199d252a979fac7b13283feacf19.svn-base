import {Component} from '@angular/core';
import {ActivityManager, EditActivityComponent} from 'eng-app';
import {FlowConfigurationService} from "../../flow-configuration/flow-configuration.service";
import {MatTableDataSource, MatDialog} from '@angular/material';
import {FlowDrg, FlowExport} from "../../flow-configuration/flow-configuration.model";
import * as moment_ from 'moment';
import {DialogContentExampleDialog} from '../../dialog-box/dialog-content-example-dialog';

const moment = moment_;

@Component({
    selector: 'flow-drg',
    templateUrl: './flow-drg.component.html',
    styleUrls: ['./flow-drg.component.scss'],
  })


  export class FlowDrgActivityComponent extends EditActivityComponent  {

    displayedColumns: string[] = ['extractionId', 'sendDate', 'returnDate', /*'error',*/ 'status', 'numPratiche', 'flowView'];
    flowDrg: FlowDrg = new FlowDrg();
    extraction: FlowExport;
    dataSource: any;
    map: any;
    showLoadingIndicator: boolean = false;
    month: string;


  constructor(
    public dialog: MatDialog,
    private flowConfigurationService: FlowConfigurationService, 
    private activityManager: ActivityManager,
){
    super();
}


  ngOnInit() {
    let starterParams: any = this.activity.startingParams;
    this.extraction = starterParams.editItem;

    this.viewFlowDrg(this.extraction);
   }

   initActivityActions() {
    super.initActivityActions();
    this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);
  }

  viewFlowDrg(extraction: FlowExport) {
    this.showLoadingIndicator = true;
      this.flowConfigurationService.searchDrgByExttractionId(extraction).then(result => {
          if (result.success) {
            this.flowDrg = result.opTargetObject.items[0];
            this.dataSource = new MatTableDataSource(result.opTargetObject.items);
          }else {
                  this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
              }
              this.showLoadingIndicator = false;
          })
          .catch(e => {
            this.showLoadingIndicator = false;
            this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
          }); 
    }

    isDate(value) {
      return value instanceof Date;
    }
  
    dateConvert(date): string {
      if (date != null) {
      return this.leftpad(date.getDate())
                + '/' + this.leftpad(date.getMonth() + 1, 2)
                + '/' + this.leftpad(date.getFullYear(), 2)
                ;
      }
    }

    dateHConvert(data): string {
      if (data != null) {
          let myMoment = moment(data);
          return myMoment.format('D/MM/YYYY HH:mm:ss');
      } else
          return "";
    }
    
    leftpad(val, resultLength = 2, leftpadChar = '0'): string {
      return (String(leftpadChar).repeat(resultLength)
            + String(val)).slice(String(val).length);
    }
    
  isEditModeEdit(){
    return false;
  }

  goToFlowView(){
    this.flowConfigurationService.retriveFormFlowByFlowVersion(this.extraction.flow.id, this.extraction.version.id).then(result => {
      if (result.success) {
        let starterParams: any = this.activity.startingParams;
        starterParams.editItem = result.opTargetObject.items[0];
        starterParams.editItem.extra = this.extraction.id;
        starterParams.drg = "DRG";
        this.activityManager.startChildActivityByName("flow-view.edit", starterParams);
      }else {
          this.activityManager.engApplication.notifyMessage('Errore');
      }
      this.showLoadingIndicator = false;
      })
    .catch(e => {
      this.showLoadingIndicator = false;
      this.activityManager.engApplication.notifyMessage('Errore');
    }); 
    
  }

  statusIcon(elementStatus: string) {

    if (elementStatus == "RICHIESTA") {
        return "schedule"
    }
    if (elementStatus == "IN_CORSO") {
        return "autorenew"
    }
    if (elementStatus == "KO") {
        return "error"
    }
    if (elementStatus == "OK") {
        return "check_circle"
    }

}

statusTooltip(elementStatus: string) {

    if (elementStatus == "RICHIESTA") {
        return "Richiesta"
    }
    if (elementStatus == "IN_CORSO") {
        return "In corso"
    }
    if (elementStatus == "KO") {
        return "Il calcolo presenta errori"
    }
    if (elementStatus == "OK") {
        return "Caclolo eseguito correttamente"
    }
}

errorDetails(flowErrorDetails: any) {

  if (flowErrorDetails == undefined || flowErrorDetails == null) {
      return "0";
  } else {
      // return flowErrorDetails.length;
      return "1";
  }
}

showErrorDetails(details, status) {
  if(status=="KO" && details != null){

      const dialogRef = this.dialog.open(DialogContentExampleDialog, {

          data: {
              header: "Errore calcolo DRG:",
              b1: "Ok",
              text: details
          }

      });
  }
  // this.utils.messageError("!i18n# Errori Talend: ", "!i18n#" + message, this.activity);
}

}