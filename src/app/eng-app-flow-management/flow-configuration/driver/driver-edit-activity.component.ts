import {Component} from '@angular/core';

import {FormControl, Validators} from "@angular/forms";

import {
    ActivityAction,
    ActivityActionType,
    EditActivityComponent,
    EngApplication,
    OperationResult,
    Promises,
    ValueSetsService
} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration.service";

@Component({
    selector: 'driver-edit-activity',
    templateUrl: './driver-edit-activity.component.html',
    styleUrls: ['./driver-edit-activity.component.scss']
})

export class DriverEditActivityComponent extends EditActivityComponent {
    searchComponent: any;

    constructor(
        private engApplication: EngApplication,
        private flowConfigurationService: FlowConfigurationService,
        public valueSetsService:ValueSetsService
        ) {
        super();
    }

    ngOnInit(){
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
        let starterParams: any = this.activity.startingParams;
        if (starterParams && starterParams.editItem) {
            this.getDriver(starterParams.editItem);
        }

    }

    getDriver(editItem: any) {
        this.runOnZone(() => {

            let opContext = this.activity.startOperation();
            this.flowConfigurationService.getDriverssById(editItem.id).then((response) => {
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

        formGroup.addControl('name', new FormControl(null, [Validators.required, Validators.maxLength(100)]));
        formGroup.addControl('description', new FormControl(null, [Validators.required, Validators.maxLength(100)]));

        if (this.editItem) {
            formGroup.get("name").setValue(this.editItem.name);
            formGroup.get("description").setValue(this.editItem.description);

            this.afterInitEditItem(this.editItem);
        }
    }

    afterInitEditItem(editItem: any): void {

    }

    executeCancelAction(action: ActivityAction): Promise<any> {
        return super.executeCancelAction(action);
    }

    executeSaveAction(action: ActivityAction): Promise<any> {

        var deffered = Promises.defer<any>();
        //this.selectValueDriver();
        
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



    
  /*selectValueDriver(){
    let filter = new SearchFilters();
    let p = this.flowConfigurationService.driverListSearchDataProvider().executeSearch(new
    SearchContext(null,filter)).then(op=>{
      return SearchDataDTO.fromRequestResult(op);
    });
    p.then(result=>{
      for (let key = 0; key< result.items.length;key++) {
        this.vi = new ValueSetsInterface();
        this.vi.code = result.items[key].id;
       // this.vi.value = result.items[key];
        this.vi.display = "!i18n#" + result.items[key].name;
        this.vi.icon = 'build';
        this.vi.tooltip = result.items[key].description;
        this.driverSets[key] = this.vi;
      }
    });
    this.valueSetsService.registerLocalValueSet("DriverDTO",this.driverSets);

  }*/
}