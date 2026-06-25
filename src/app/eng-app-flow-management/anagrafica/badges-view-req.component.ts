import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeItemRequest} from './badge-item-req.component';

@Component({
  selector: 'badges-view-req',
  templateUrl: './badges-view-req.component.html',
  styleUrls: ['./badges-view-req.component.scss']
})

export class BadgesViewRequest extends BadgesViewComponent {

  badgeItemComponentType: any = BadgeItemRequest;

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
