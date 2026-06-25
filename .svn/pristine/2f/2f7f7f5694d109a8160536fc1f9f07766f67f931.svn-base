import {Component} from "@angular/core";


import {SearchActivityComponent,} from "eng-app";

@Component({//Components.compose(SearchActivityComponent.metaData, {
    selector: 'flow-region-search-activity',
    templateUrl: './../../../../../../../eng-app/src/app/eng-app/prototype-activity/search-activity/search-activity.component.html',
    styleUrls: ['./flow-region-search-activity.components.scss']
})
export class FlowRegionActivityComponent extends SearchActivityComponent {

    initActivityActions() {
        super.initActivityActions();
        this.activity.removeActivityAction(SearchActivityComponent.NEW_ACTION);
    }

}