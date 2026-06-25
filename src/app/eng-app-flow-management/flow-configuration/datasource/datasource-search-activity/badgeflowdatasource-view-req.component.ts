import {Component} from '@angular/core';
import {BadgesViewComponent} from 'eng-app';
import {BadgeFlowDatasourceViewItemRequest} from './badgeflowdatasource-item-req.component';

@Component({
  selector: 'badgeflowdatasource-view-req',
  templateUrl: './badgeflowdatasource-view-req.component.html',
  styleUrls: ['./badgeflowdatasource-view-req.component.scss']
})

export class BadgesFlowDatasourceViewRequest extends BadgesViewComponent {

  badgeItemComponentType: any = BadgeFlowDatasourceViewItemRequest;

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
