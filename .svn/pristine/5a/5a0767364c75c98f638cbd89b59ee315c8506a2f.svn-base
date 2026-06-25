import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeFlowConfigFilterItemRequest} from './badgeflowconfigfilter-item-req.component';

@Component({
    selector: 'badgeflowconfigfilter-view-req',
    templateUrl: './badgeflowconfigfilter-view-req.component.html',
    styleUrls: ['./badgeflowconfigfilter-view-req.component.scss']
})

export class BadgesFlowConfigFilterViewRequest extends BadgesViewComponent {

    badgeItemComponentType: any = BadgeFlowConfigFilterItemRequest;

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
