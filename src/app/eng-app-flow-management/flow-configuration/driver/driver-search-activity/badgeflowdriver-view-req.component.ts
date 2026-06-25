import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeFlowDriverViewItemRequest} from './badgeflowdriver-item-req.component';

@Component({
  selector: 'badgeflowdriver-view-req',
  templateUrl: './badgeflowdriver-view-req.component.html',
  styleUrls: ['./badgeflowdriver-view-req.component.scss']
})

export class BadgesFlowDriverViewRequest extends BadgesViewComponent {

  badgeItemComponentType: any = BadgeFlowDriverViewItemRequest;

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
