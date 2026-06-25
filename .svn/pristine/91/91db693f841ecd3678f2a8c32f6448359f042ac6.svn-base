import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeJobtalendItemRequest} from './badgejobtalend-item-req.component';

@Component({
  selector: 'badgesjobtalend-view-req',
  templateUrl: './badgesjobtalend-view-req.component.html',
  styleUrls: ['./badgesjobtalend-view-req.component.scss']
})

export class BadgesJobtalendViewRequest extends BadgesViewComponent {

  badgeItemComponentType: any = BadgeJobtalendItemRequest;

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
