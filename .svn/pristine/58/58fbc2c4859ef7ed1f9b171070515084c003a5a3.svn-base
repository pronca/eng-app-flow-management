import { Component, Inject } from '@angular/core';
import { Page } from 'eng-app';
import { Header } from '../flow-configuration/flow-configuration.model';

@Component({
    selector: 'header-component',
    templateUrl: 'header-component.html',
    styleUrls: ['./header-component.scss']

})
export class HeaderComponent {
  test: any ;
  isVisibles: boolean = false;
  header:String;
  lock:boolean;
  constructor(
     public page: Page) {

 
    }

onInit(){
}



isVisible(): boolean{
  this.test =  this.page.getPageMainObject();

if((this.test instanceof  Header)){   
 this.header = this.test.label;

if(this.test.label == "" || this.test.isVisible == false || this.test.label == null){
  this.isVisibles = false;

  return this.isVisibles;
}else{
  this.isVisibles = true;
return this.isVisibles;
}

  }
  return this.isVisibles;

}


}