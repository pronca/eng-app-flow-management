import {Component, Inject} from '@angular/core';
import {BadgesViewComponent, SearchActivityComponent} from 'eng-app';
import {BadgeDroolsItemRequest} from './badge-drools-item-req.component';
import {DroolsSearchActivityComponent} from './drools-search-activity.component';

@Component({
  selector: 'badges-drools-view-req',
  templateUrl: './badges-drools-view-req.component.html',
  styleUrls: ['./badges-drools-view-req.component.scss']
})

export class BadgesDroolsViewRequest extends BadgesViewComponent { 

  badgeItemComponentType: any = BadgeDroolsItemRequest;
  fName: any;

  constructor(
    @Inject('SearchActivityComponent') public searchComponent: DroolsSearchActivityComponent,
){
    super(searchComponent);
}

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

  public uploadRuleFunctionsFile_func(event): void {
   this.searchComponent.uploadRuleFunctionsFile_func(event);
  }

}
