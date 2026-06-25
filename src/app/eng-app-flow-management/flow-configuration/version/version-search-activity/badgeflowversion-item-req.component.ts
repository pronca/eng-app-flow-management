import {Component, Inject} from '@angular/core';

import {
    Activity,
    ActivityActionType,
    ActivityManager,
    BadgeItemComponent,
    ItemRenderingValue,
    ItemRenderingValueCategory,
    ItemRenderingValueType,
    SearchActivityComponent
} from 'eng-app';

import {FlowConfigurationService} from "../../flow-configuration.service";
import {FmFlow} from "../../flow-configuration.model";

@Component({
  selector: 'badgeflowversion-item-req',
  templateUrl: './badgeflowversion-item-req.component.html',
  styleUrls: ['./badgeflowversion-item-req.component.scss']
})
export class BadgeFlowVersionItemRequest extends BadgeItemComponent {

  imageData = '';
  mainImageValue: ItemRenderingValue;
  badgeBodyValues: ItemRenderingValue[];
  request: Request;
  fmFlow: FmFlow;

  constructor(
    @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent,

    @Inject('item') public item: FmFlow,

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
        this.activityManager.startChildActivityByName("version.edit");
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



 

  openChildActivity(act2Name: string, asPopup: boolean) {

    let startingParams: any = {};
    startingParams.editItem = this.item;

    this.activityManager.getCurrentPage().setPageMainObject(startingParams);


      this.activityManager.startChildActivityByName("fm.dashboardFlussoPS_cambioColore");


    this.activityManager.startChildActivityByName("version.edit", startingParams);
  }



}