import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeFlowVersionItemRequest} from './badgeflowversion-item-req.component';

@Component({
  selector: 'badgeflowversion-view-req',
  templateUrl: './badgeflowversion-view-req.component.html',
  styleUrls: ['./badgeflowversion-view-req.component.scss']
})

export class BadgesFlowVersionViewRequest extends BadgesViewComponent {

  badgeItemComponentType: any = BadgeFlowVersionItemRequest;

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
