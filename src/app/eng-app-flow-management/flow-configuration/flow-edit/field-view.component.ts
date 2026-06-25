import {Component, Input, OnInit} from '@angular/core';
import {FlowTable} from "../flow-configuration.model";

@Component({
  selector: 'field-view',
  templateUrl: './field-view.component.html',
  styleUrls: ['./field-view.component.scss']

})
export class FieldViewComponent implements OnInit  {
  

  @Input()
  flowtableSelected: FlowTable;

  
  @Input()
  flowtable: FlowTable;

  @Input()
  id: string;

  public tests: string = "";

  ngOnInit(): void {

  }


deleteFk(j: number){
  this.flowtable.listFk.splice(j, 1)

}

test($event){
  this.tests;
  alert(this.flowtable.listFk[0].idFieldTable);
}

}