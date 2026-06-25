import {Component} from "@angular/core";


import {SearchActivityComponent} from "eng-app";

@Component({//Components.compose(SearchActivityComponent.metaData, {
    selector: 'datasource-search-activity',
    templateUrl: './../../../../../../../eng-app/src/app/eng-app/prototype-activity/search-activity/search-activity.component.html',
    styleUrls: ['./datasource-search-activity.components.scss']
})
export class DatasourceActivityComponent extends SearchActivityComponent {
    /*
    executeEditItemAction(searchItemAction: SearchItemAction, item: any): Promise<any> {
        return this.chooseEditActivity(item).then((editActivityConfig) => {
            if (editActivityConfig) {
                return this.startChildEditActivity(editActivityConfig,{id: item.id});
            }
        });
    }*/

}