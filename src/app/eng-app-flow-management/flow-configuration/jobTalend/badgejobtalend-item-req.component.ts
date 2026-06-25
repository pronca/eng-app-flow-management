import {Component, Inject} from '@angular/core';

import {
    Activity,
    ActivityActionType,
    ActivityManager,
    BadgeItemComponent,
    ItemRenderingValue,
    ItemRenderingValueCategory,
    ItemRenderingValueType,
    SearchActivityComponent,
} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration.service";
import {FmFlow, JobTalend} from "../flow-configuration.model";

@Component({
  selector: 'badgejobtalend-item-req',
  templateUrl: './badgejobtalend-item-req.component.html',
  styleUrls: ['./badgejobtalend-item-req.component.scss']
})
export class BadgeJobtalendItemRequest extends BadgeItemComponent {

  imageData = '';
  mainImageValue: ItemRenderingValue;
  badgeBodyValues: ItemRenderingValue[];
  request: Request;
  fmFlow: FmFlow;
  cancelEnabled: boolean = true;

  constructor(
    @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent,

    @Inject('item') public item: JobTalend,

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
        this.activityManager.startChildActivityByName("jobtalend.edit");
        return Promise.resolve(null);
      }});
    

    super.ngOnInit();

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

  getClass(r: Request): string {
    return 'material-icons';
  }

  openChildActivity(act2Name: string, asPopup: boolean) {

    let startingParams: any = {};
    startingParams.editItem = this.item;
    startingParams.popupHeight = '700px';
    startingParams.popupWidth = '1300px';

    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
    this.activityManager.startChildActivityByName("jobtalend.edit", startingParams);
  }

  delete(psAction: String, poRequest: Request, poSelected: any, $event): Promise<any> {
    var _this = this;
            var i18n = this.activity.getI18nService();
            return this.activity.getUserConfirmService().askConfirmMessage
            (i18n.instant('!i18n# Cancellazione Job Talend'), i18n.instant('!i18n# Confermi la cancellazione del Job Talend?')).then(function () {
                return _this.executeDeleteJobTalendConfirm();
            });
  }

  executeDeleteJobTalendConfirm(): Promise<any> {
      this.flowConfigurationService.deleteJobTalend(this.item).then(response => {
          if (response.success) {
              if(response.opTargetObject == 1){
                let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Job Talend eliminato con successo');
                this.activityManager.engApplication.notifyMessage(successMessage);
                this.searchComponent.refreshSearch();
              }else if (response.opTargetObject == 0){
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore: Jar non trovato');
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

}