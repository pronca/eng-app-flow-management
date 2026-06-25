import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeFlowOutputItemRequest} from './badgeflowoutput-item-req.component';

@Component({
  selector: 'badgesflowoutput-view-req',
  templateUrl: './badgesflowoutput-view-req.component.html',
  styleUrls: ['./badgesflowoutput-view-req.component.scss']
})

export class BadgesFlowOutputViewRequest extends BadgesViewComponent {

  badgeItemComponentType: any = BadgeFlowOutputItemRequest;

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
