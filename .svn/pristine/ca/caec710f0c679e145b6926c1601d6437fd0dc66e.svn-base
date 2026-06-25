import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogData } from '../dialog-box/dialog-content-example-dialog';
import { FlowConfigurationService } from '../flow-configuration/flow-configuration.service';
import { ActivityManager, User, UserPanelComponent, LoginManager, EngApplication } from 'eng-app';
import { UserDTO } from '../flow-configuration/flow-configuration.model';

@Component({
    selector: 'popup-user',
    templateUrl: 'popup-user.html',
    styleUrls: ['./popup-user.scss'],

})


export class PopupUser implements OnInit{

      
        currentUser: User;
        showLoading: boolean;
        private _selectedLanguageLabel: string;
      
        /*private*/ panelConfiguration: {
          languageChangeEnabled: boolean;
          profileChangeEnabled: boolean;
          passwordChangeEnabled: boolean;
        };
      
        constructor(
          @Inject(MAT_DIALOG_DATA) public user: UserDTO,
          public dialogRef: MatDialogRef<PopupUser>,
          private loginManager: LoginManager,
          private snackBar: MatSnackBar,
          ) 
      {
       //   this.currentUser = this.loginManager.getCurrentUser();
        }
      
        ngOnInit() {
        // this.getUser(element);
        }
      

      
        username(): string {
          return this.user.username;
        }
      
        name(): string {
          return this.user.name;
        }
      
        surname(): string {
          return this.user.surname;
        }

    
    
    
      
}
      

 
      
      

      