import {Component} from '@angular/core';


import {ActivityManager, EditActivityComponent,} from 'eng-app';

@Component({
  selector: 'drools-error-activity',
  templateUrl: './drools-error-activity.component.html',
  styleUrls: ['./drools-error-activity.component.scss']

})
export class DroolsErrorActivityComponent extends EditActivityComponent  {
  
    messages: string[];

constructor(
    private activityManager: ActivityManager,
){
    super();
}
  
  ngOnInit(): void {
    let starterParams: any = this.activity.startingParams;
    this.messages = starterParams.editItem;
  }

}


