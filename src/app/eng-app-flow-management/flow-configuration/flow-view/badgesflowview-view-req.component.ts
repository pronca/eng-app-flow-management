import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeFlowViewItemRequest} from './badgeflowview-item-req.component';

@Component({
  selector: 'badgesflowview-view-req',
  templateUrl: './badgesflowview-view-req.component.html',
  styleUrls: ['./badgesflowview-view-req.component.scss']
})

export class BadgesFlowViewViewRequest extends BadgesViewComponent {

  badgeItemComponentType: any = BadgeFlowViewItemRequest;

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
