import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeFlowExtractItemRequest} from './badgeflowextract-item-req.component';

@Component({
  selector: 'badgesflowextract-view-req',
  templateUrl: './badgesflowextract-view-req.component.html',
  styleUrls: ['./badgesflowextract-view-req.component.scss']
})

export class BadgesFlowExtractViewRequest extends BadgesViewComponent {

  badgeItemComponentType: any = BadgeFlowExtractItemRequest;

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
