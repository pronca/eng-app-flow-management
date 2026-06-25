import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeFlowCfgItemRequest} from './badgeflowcfg-item-req.component';

@Component({
  selector: 'badgesflowcfg-view-req',
  templateUrl: './badgesflowcfg-view-req.component.html',
  styleUrls: ['./badgesflowcfg-view-req.component.scss']
})

export class BadgesFlowCfgViewRequest extends BadgesViewComponent {

  badgeItemComponentType: any = BadgeFlowCfgItemRequest;

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
