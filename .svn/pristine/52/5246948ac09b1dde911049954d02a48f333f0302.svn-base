import {Component} from '@angular/core';

import {
    ActivityAction,
    ActivityActionType,
    ActivityManager,
    EditActivityComponent,
    EngApplication,
    OperationResult,
    Promises,
    ValueSetsService
} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration.service";

@Component({
    selector: 'version-edit-activity',
    templateUrl: './version-edit-activity.component.html',
    styleUrls: ['./version-edit-activity.component.scss']
})

export class VersionEditActivityComponent extends EditActivityComponent {

     data: Date;
    searchComponent: any;
     /*versionSets: ValueSetsInterface[] = [];

     vi: ValueSetsInterface;
   */
   

    constructor(
        private engApplication: EngApplication,
        private flowConfigurationService: FlowConfigurationService,
        public valueSetsService: ValueSetsService,
        private activityManager: ActivityManager
        ) {
        super();
        this.data = new Date();
    }

    ngOnInit(){
        this.activityManager.startChildActivityByName("fm.dashboardFlussoPS_cambioColore");

    }

    initActivityActions() {
        super.initActivityActions();
        this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);
  
        this.activity.addActivityAction({
          actionType: ActivityActionType.MAIN,
          name: EditActivityComponent.SAVE_ACTION,
          tooltip: "Salva",
          icon: "check",
          fn: (activity, action) => {
              this.executeSaveAction(null);
              return Promise.resolve(null);
          }});
  
      }


    onInitEditComponent() {
    }

    getVersion(editItem: any) {
        this.runOnZone(() => {

            let opContext = this.activity.startOperation();
            this.flowConfigurationService.getVersionById(editItem.id).then((response) => {
                if (response.success) {
                    this.editItem = response.opTargetObject;
                    this.initFormGroup(this.formGroup);
                } else {
                    let opResult: OperationResult<any> = OperationResult.fromRequestResponse(response);
                    this.showErrors(opResult);
                }
            }).catch((reason) => {
                let failedMessage: string = this.engApplication.i18nInstant('USERS_MANAGER_ORGANIZATION_RETRIEVE_FAILED');
                this.activity.notifySimpleMessage(failedMessage);
            }).finally(() => {
                this.runOnZone(() => opContext.end());
            });
        });
    }


    protected initFormGroup(formGroup: any): void {

        
    }

    afterInitEditItem(editItem: any): void {

    }

    executeCancelAction(action: ActivityAction): Promise<any> {
        return super.executeCancelAction(action);
    }

    executeSaveAction(action: ActivityAction): Promise<any> {

        var deffered = Promises.defer<any>();
        //this.selectValueVersion();

        if (this.activity.isDirty()) {

            let opContext;
            this.activity.getUserConfirmService().askConfirmMessage(
                this.engApplication.i18nInstant('USERS_MANAGER_LABEL_CONFIRM_EDIT_TITLE'),
                this.engApplication.i18nInstant('USERS_MANAGER_LABEL_CONFIRM_EDIT_TEXT')).then(
                () => {

                    opContext = this.activity.startOperation();
                    deffered.resolve(super.executeSaveAction(action));
                }
            ).finally(() => {

                this.runOnZone(() => {

                    this.finalizeOperation(opContext);
                });
            });
        } else {

            deffered.resolve(super.executeSaveAction(action));
        }

        return deffered.promise;
    }

}