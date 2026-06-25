import {Component} from '@angular/core';

import {
    ActivityAction,
    ActivityActionType,
    EditActivityComponent,
    EditMode,
    EngApplication,
    OperationResult,
    Promises,
    ValueSetsService
} from 'eng-app';
import {FlowConfigurationService} from '../flow-configuration.service';


@Component({
    selector: 'datasource-edit-activity',
    templateUrl: './datasource-edit-activity.component.html',
    styleUrls: ['./datasource-edit-activity.component.scss']
})

export class DatasourceEditActivityComponent extends EditActivityComponent {
    value: any;
    formGroup: any;
    searchComponent: any;


    ngOnInit() {
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


    protected _doSetEditItem(newEditItem: any, editMode: EditMode) {


        let starterParams: any = this.activity.startingParams;
        this.value = starterParams.editItem.driver.id;

        super._doSetEditItem(newEditItem, editMode);

    }

    constructor(
        private engApplication: EngApplication,
        public valueSetsService: ValueSetsService,
        private flowConfigurationService: FlowConfigurationService
    ) {
        super();
    }

    onInitEditComponent() {


    }


    getDataDriver(e: any) {
        this.runOnZone(() => {

            let opContext = this.activity.startOperation();
            this.flowConfigurationService.getDriverssById(e).then((response) => {
                if (response.success) {

                    let ass = response.opTargetObject;

                    this.formGroup.get("driver").setValue(ass);
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
        let id = this.formGroup.get("driver").value;
        this.getDataDriver(id);

        /*   let id = this.formGroup.get("driver").value;
        let ass = this.flowConfigurationService.getDriverssById(id);
        this.formGroup.get("driver").setValue(ass);*/

        var deffered = Promises.defer<any>();

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