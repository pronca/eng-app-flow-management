import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html'
})
export class DialogContentExampleDialog {



    constructor(
        @Inject(MAT_DIALOG_DATA) public dialog: DialogData) {

     
        }
    
    
      }

      export interface DialogData {
        header: string;
        text: string;
        b1: string;
        b2: string;
        b0:string;
        elem: string[];
      }
      