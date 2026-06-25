import {Component, Inject} from '@angular/core';

import {
    Activity,
    ActivityManager,
    BadgeItemComponent,
    ItemRenderingValue,
    ItemRenderingValueCategory,
    ItemRenderingValueType,
    SearchActivityComponent
} from 'eng-app';
import {FmFlow} from "../../flow-configuration.model";
import {FlowConfigurationService} from "../../flow-configuration.service";

@Component({
    selector: 'badgeflowcfgregion-item-req',
    templateUrl: './badgeflowcfgregion-item-req.component.html',
    styleUrls: ['./badgeflowcfgregion-item-req.component.scss']
})
export class BadgeFlowCfgRegionItemRequest extends BadgeItemComponent {

    imageData = '';
    mainImageValue: ItemRenderingValue;
    badgeBodyValues: ItemRenderingValue[];
    request: Request;
    status: any;
    fullname: string;
    fmFlow: FmFlow;
    versionName: String;

    constructor(
        @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent,
        @Inject('item') public item: FmFlow,
        public activityManager: ActivityManager,
        public activity: Activity,
        public flowConfigurationService: FlowConfigurationService
    ) {
        super();
    }

    get versionNameValue(): String {
        return this.versionName;
    }

    ngOnInit() {


        super.ngOnInit()


        this.flowConfigurationService.getVersionById(this.item.version).then(response => {

            if (response.success) {
                this.versionName = response.opTargetObject.version;
            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });


    };

    initializeImageStyle(): any {
        if (this.imageData && this.imageData !== '') {
            return {'background-image': 'url(' + this.imageData + ')'};
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
        startingParams.editMode = 1;
        this.activityManager.getCurrentPage().setPageMainObject(startingParams);
        this.activityManager.startChildActivityByName("flow-configuration.edit", startingParams);
    }

    dashBoard(psAction: String, poRequest: Request, poSelected: any, $event): void {
        let startingParams: any = {};
        startingParams.editItem = this.item;
        this.activityManager.getCurrentPage().setPageMainObject(startingParams);
        this.activityManager.startChildActivityByName("dashBoard.edit", startingParams);

    }

    duplica(psAction: String, poRequest: Request, poSelected: any, $event): void {
        let startingParams: any = {};
        startingParams.editItem = this.item;
        startingParams.extra = "duplica";
        startingParams.editMode = 1;
        this.activityManager.getCurrentPage().setPageMainObject(startingParams);
        this.activityManager.startChildActivityByName("flow-configuration.edit", startingParams);

    }


}