import {Component, Inject} from '@angular/core';
import * as moment_ from 'moment';

import {
    Activity,
    ActivityAction,
    ActivityActionType,
    ActivityManager,
    BadgeItemComponent,
    ItemRenderingValue,
    ItemRenderingValueCategory,
    ItemRenderingValueType,
    SearchActivityComponent
} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration/flow-configuration.service";
import {FlowExport, FmFlow} from "../flow-configuration/flow-configuration.model";

const moment = moment_;

@Component({
  selector: 'badgeflowoutput-item-req',
  templateUrl: './badgeflowoutput-item-req.component.html',
  styleUrls: ['./badgeflowoutput-item-req.component.scss']
})
export class BadgeFlowOutputItemRequest extends BadgeItemComponent {

  imageData = '';
  mainImageValue: ItemRenderingValue;
  badgeBodyValues: ItemRenderingValue[];
  request: Request;
  fmFlow: FmFlow;
  playDisabled: boolean = true;
  requestDate: String;

  constructor(
    @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent,

    @Inject('item') public item: FlowExport,

    public activityManager: ActivityManager,
    public activity: Activity,
    
    
    public flowConfigurationService: FlowConfigurationService
  ) {
    super();
  }

  ngOnInit() {

    this.searchComponent.activity.removeActivityAction(SearchActivityComponent.NEW_ACTION);

    this.activity.addActivityAction({
      actionType: ActivityActionType.MAIN,
      name: SearchActivityComponent.NEW_ACTION,
      tooltip: "Nuovo",
      icon: "add",
      fn: (activity, action) => {
        this.activityManager.startChildActivityByName("flow-output.edit");
        return Promise.resolve(null);
      }});

    if(this.item.status == "RICHIESTA"){
      this.playDisabled = false;
    }

    super.ngOnInit();
    
    let myMoment = moment(this.item.requestDate);
    this.requestDate = myMoment.format('D MMM YYYY HH:mm');

    this.badgeBodyValues = this.getInlineItemValues().filter(val => {
      return val !== this.mainImageValue;
    });
  }

  initializeImageStyle(): any {
    if (this.imageData && this.imageData !== '') {
      return { 'background-image': 'url(' + this.imageData + ')' };
    }
  }

  getBadgeBody(): ItemRenderingValue[] {
    return this.badgeBodyValues;
  }

  getMainImageBoxValue(): ItemRenderingValue {

    const imgsVal = this._valuesByType.get(ItemRenderingValueType.IMAGE_BOX);
    return imgsVal && imgsVal.length > 0 && imgsVal[0];
  }

  getInlineItemValues(): ItemRenderingValue[] {

    const r = this._valuesByCategory.get(ItemRenderingValueCategory.BODY_ELEMENT)

    return r ? r : [];
  }



  delete(action: ActivityAction): Promise<any> {
    var _this = this;
            var i18n = this.activity.getI18nService();
            return this.activity.getUserConfirmService().askConfirmMessage
            (i18n.instant('!i18n# Cancellazione esportazione'), i18n.instant('!i18n# Confermi la cancellazione esportazione?')).then(function () {
                return _this.executeDeleteExtractionConfirm();
            });
  }

  executeDeleteExtractionConfirm(): Promise<any> {
      this.flowConfigurationService.deleteExtraction(this.item).then(response => {
          if (response.success) {
              if (response.opTargetObject == 2) {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Passaggio di stato non permesso');
                this.activityManager.engApplication.notifyMessage(errorMessage);
                
              }else if(response.opTargetObject == 1){
                let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Esportazione eliminata con successo');
                this.activityManager.engApplication.notifyMessage(successMessage);
                this.searchComponent.refreshSearch();
              }else{
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
                this.activityManager.engApplication.notifyMessage(errorMessage);
              }
          }
          else {
              let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
              this.activityManager.engApplication.notifyMessage(errorMessage);
          }
      }).catch(() => {
          let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
          this.activityManager.engApplication.notifyMessage(errorMessage);
      });

      return Promise.resolve();
  }

  getClass(r: Request): string {
    return 'material-icons';
  }

  cancel(action: ActivityAction): Promise<any> {
    var _this = this;
            var i18n = this.activity.getI18nService();
            return this.activity.getUserConfirmService().askConfirmMessage
            (i18n.instant('!i18n# Annullare esportazione'), i18n.instant('!i18n# Confermi di voler annullare esportazione?')).then(function () {
                return _this.executeCancelExtractionConfirm();
            });
  }

  executeCancelExtractionConfirm(): Promise<any> {
    this.flowConfigurationService.cancelExtraction(this.item).then(response => {
        if (response.success) {
            if (response.opTargetObject == 2) {
              let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Passaggio di stato non permesso');
              this.activityManager.engApplication.notifyMessage(errorMessage);
              
            }else if(response.opTargetObject == 1){
              let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Esportazione eliminata con successo');
              this.activityManager.engApplication.notifyMessage(successMessage);
              this.searchComponent.refreshSearch();
            }else{
              let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
              this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }
        else {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        }
    }).catch(() => {
        let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
        this.activityManager.engApplication.notifyMessage(errorMessage);
    });

    return Promise.resolve();
}


play(psAction: String, poRequest: Request, poSelected: any, $event): Promise<any> {
  var _this = this;
          var i18n = this.activity.getI18nService();
          return this.activity.getUserConfirmService().askConfirmMessage
          (i18n.instant('!i18n# Avviare esportazione'), i18n.instant('!i18n# Confermi avvio esportazione?')).then(function () {
              return _this.executePlayExtractionConfirm();
          });
}

executePlayExtractionConfirm(): Promise<any> {
    this.flowConfigurationService.startExtraction(this.item).then(response => {
        if (response.success) {
              let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Esportazione avviata con successo');
              this.activityManager.engApplication.notifyMessage(successMessage);
              this.searchComponent.refreshSearch();
            
        }
        else {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        }
    }).catch(() => {
        let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
        this.activityManager.engApplication.notifyMessage(errorMessage);
    });

    return Promise.resolve();
}

  openChildActivity(act2Name: string, asPopup: boolean) {

    let startingParams: any = {};
    startingParams.editItem = this.item;
    startingParams.popupHeight = '700px';
    startingParams.popupWidth = '1300px';

    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
      this.activityManager.startChildActivityByName("flow-output.edit", startingParams);
  }

}