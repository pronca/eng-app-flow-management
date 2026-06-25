import {Component} from "@angular/core";


import {SearchActivityComponent, ValueSetsService,} from "eng-app";

@Component({//Components.compose(SearchActivityComponent.metaData, {
    selector: 'flow-configuration-filter-search-activity',
    templateUrl: './../../../../../../../eng-app/src/app/eng-app/prototype-activity/search-activity/search-activity.component.html',
    styleUrls: ['./flow-configuration-filter-search-activity.components.scss']
})
export class FlowConfigurationFilterSearchActivityComponent extends SearchActivityComponent {
    /*
    executeEditItemAction(searchItemAction: SearchItemAction, item: any): Promise<any> {
        return this.chooseEditActivity(item).then((editActivityConfig) => {
            if (editActivityConfig) {
                return this.startChildEditActivity(editActivityConfig,{id: item.id});
            }
        });
    }*/
    constructor(
        private valueSetsService: ValueSetsService,
    ) {
        super();
    }

    ngOnInit() {


        this.valueSetsService.registerLocalValueSet("confFilterType-value-set", [
            {
                code: 1,
                display: "CONF_TYPE_STATIC"
            },
            {
                code: 0,
                display: "CONF_TYPE_DINAMIC"
            },
            {
                code: 2,
                display: "CONF_TYPE_STANDARD"
            }]);

    }


}