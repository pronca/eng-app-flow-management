import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeFlowCfgRegionItemRequest} from "./badgeflowcfgregion-item-req.component";

@Component({
    selector: 'badgesflowcfgregion-view-req',
    templateUrl: './badgesflowcfgregion-view-req.component.html',
    styleUrls: ['./badgesflowcfgregion-view-req.component.scss']
})

export class BadgesFlowCfgRegionViewRequest extends BadgesViewComponent {

    badgeItemComponentType: any = BadgeFlowCfgRegionItemRequest;

    ngOnInit() {

        super.ngOnInit();

        if (this.viewConfig && this.viewConfig.options) {
            const opt = this.viewConfig.options;
            if (opt.badgeItemFlex) {
                this.badgeItemFlex = this.viewConfig.options.badgeItemFlex;
            }
            if (opt.badgeItemComponentType) {
                this.badgeItemComponentType = this.viewConfig.options.badgeItemComponentType;
            }
        }
    }

}
