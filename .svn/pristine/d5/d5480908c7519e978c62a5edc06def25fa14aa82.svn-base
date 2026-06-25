import {Component} from "@angular/core";


import {Activity, ActivityActionType,ActivityManager, SearchActivityComponent, ValueSetsService,} from "eng-app";

import { FlowViewUploadComponent } from "./flow-view-upload.component";

@Component({//Components.compose(SearchActivityComponent.metaData, {
    selector: 'flow-search-activity',
    templateUrl: './../../../../../../../eng-app/src/app/eng-app/prototype-activity/search-activity/search-activity.component.html',
    styleUrls: ['./flow-search-activity.components.scss']
})
export class FlowActivityComponent extends SearchActivityComponent {
  
    constructor(
        public activity: Activity,
        public activityManager : ActivityManager,
        private valueSetsService: ValueSetsService,
    ) {
        super();
    }

    ngOnInit(){

        this.valueSetsService.registerLocalValueSet("status-value-set", [

            {
                code: "abilitato",
                display: "!i18n#ATTIVO"
            }, 
            {
                code: "disabilitato",
                display: "!i18n#DISATTIVO"
            }]);
    
        }

        initActivityActions(){
            super.initActivityActions();
            this.activity.addActivityAction({
                actionType: ActivityActionType.MAIN,
                name: FlowViewUploadComponent.EDIT_ITEM,
                tooltip: "FLOW_IMPORT_FILE",
                icon: "north",
                fn: (activity, action) => {
                    let starterParams: any = this.activity.startingParams;
                    starterParams.popupHeight = '400px';
                    starterParams.popupWidth = '400px';
                    this.activityManager.startChildPopupActivityByName("flow-view-upload", starterParams);
                   
                    return Promise.resolve(null);
              }
             
          }); 
        }

}