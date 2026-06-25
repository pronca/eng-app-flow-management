import {Component, Inject} from '@angular/core';

import {
    Activity,
    ActivityActionType,
    ActivityManager,
    BadgeItemComponent, EditActivityComponent,
    ItemRenderingValue,
    ItemRenderingValueCategory,
    ItemRenderingValueType,
    SearchActivityComponent, SearchContext,
    ValueSetsService
} from 'eng-app';

import {FlowConfigurationService} from "../../flow-configuration.service";
import {DialogContentExampleDialog} from "../../../dialog-box/dialog-content-example-dialog";
import {MatDialog} from "@angular/material";
import Utils from "../../flow-configuration.utils";

@Component({
    selector: 'badgeflowconfigfilter-item-req',
    templateUrl: './badgeflowconfigfilter-item-req.component.html',
    styleUrls: ['./badgeflowconfigfilter-item-req.component.scss']
})
export class BadgeFlowConfigFilterItemRequest extends BadgeItemComponent {

    imageData = '';
    mainImageValue: ItemRenderingValue;
    badgeBodyValues: ItemRenderingValue[];
    request: Request;
    utils = new Utils();

    constructor(
        @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent,
        public activityManager: ActivityManager,
        public dialog: MatDialog,
        public activity: Activity,
        public flowConfigurationService: FlowConfigurationService,
        private valueSetsService: ValueSetsService,
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
                this.activityManager.startChildActivityByName("flow-configuration-filter.edit");
                return Promise.resolve(null);
            }
        });

        super.ngOnInit();

        this.badgeBodyValues = this.getInlineItemValues().filter(val => {
            return val !== this.mainImageValue;
        });
    }

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

        this.activityManager.getCurrentPage().setPageMainObject(startingParams);


        this.activityManager.startChildActivityByName("fm.dashboardFlussoPS_cambioColore");


        this.activityManager.startChildActivityByName("flow-configuration-filter.edit", startingParams);
    }

    /**
     * Delete Flow Configuration Filter
     * @param psAction
     * @param poRequest
     * @param poSelected
     * @param $event
     */
    deleteFilter(psAction: String, poRequest: Request, poSelected: any, $event) {
        const searchContext = new SearchContext(this.activity, null);
        this.searchComponent.startOperation(searchContext);
        const dialogRef = this.dialog.open(DialogContentExampleDialog, {
            data: {
                header: "Cancellazione Estrazioni",
                text: "Sicuro di voler candellare la Configurazione " + this.item.name + " ?",
                b2: "Esci",
                b1: "Continua"
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                this.flowConfigurationService.deleteFlowConfigurationFilter(this.item).then(response => {
                    if (response.success) {
                        if (response.opTargetObject.length > 0) {
                            this.utils.messageError2("!i18n# Errore Cancellazione", "!i18n# Configurazione Collegata a " + response.opTargetObject.length + " Estrazione", this.activity,response.opTargetObject,this.activityManager);
                            //Errore Eliminazione
                            //Il filtro è utilizzato nelle estrazioni: (List<String> ID)
                        } else {
                            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Eliminazione avvenuta con Successo');
                            this.activityManager.engApplication.notifyMessage(errorMessage);
                        }
                        //refresh Search Activity
                        this.searchComponent.refreshSearch();
                    }
                    else {
                        let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
                        this.activityManager.engApplication.notifyMessage(errorMessage);
                    }
                }).catch((e) => {
                    let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
                    this.activityManager.engApplication.notifyMessage(errorMessage);
                }).finally(() => {
                    this.searchComponent._zone.run(() =>{
                        this.searchComponent.endOperation(searchContext);
                    })
                });;
                return Promise.resolve();
            }
        });
    }
}