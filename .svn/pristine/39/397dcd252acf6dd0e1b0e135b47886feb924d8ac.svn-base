import { Component } from "@angular/core";


import { SearchActivityComponent, ValueSetsService, FilterModelElement, ActivityManager, Activity, ActivityActionType, SearchData, SearchContext, SearchDataDTO, SearchFilters } from "eng-app";
import { FlowConfigurationService } from '../../flow-configuration/flow-configuration.service';
import { PermissionTypeEnum, PermissionNameEnum } from '../../flow-configuration/flow-configuration.model';

@Component({//Components.compose(SearchActivityComponent.metaData, {
    selector: 'anagrafica-search-activity',
    templateUrl: './../../../../../../eng-app/src/app/eng-app/prototype-activity/search-activity/search-activity.component.html',
    styleUrls: ['./anagrafica-search-activity.components.scss']
})
export class AnagraficaActivityComponent extends SearchActivityComponent {
    /*
    executeEditItemAction(searchItemAction: SearchItemAction, item: any): Promise<any> {
        return this.chooseEditActivity(item).then((editActivityConfig) => {
            if (editActivityConfig) {
                return this.startChildEditActivity(editActivityConfig,{id: item.id});
            }
        });
    }*/

    constructor(
        private valueSetsService: ValueSetsService,

        public activityManager: ActivityManager,
        public activity: Activity,


        public flowConfigurationService: FlowConfigurationService
    ) {
        super();
    }

    permissionEdit: boolean = true;
    filter: SearchFilters = new SearchFilters();
  
    initActivityActions() {
            this.activity.addActivityAction({
                actionType: ActivityActionType.MAIN,
                name: SearchActivityComponent.NEW_ACTION,
                tooltip: "Nuovo",
                icon: "add",
                isShow:()=>{
                return  !this.getPermission();
                },

                fn: (activity, action) => {
                    let starterParams: any = this.activity.startingParams;
                    starterParams.editMode = 0;
                    starterParams.permission = this.permissionEdit;
                    this.activityManager.startChildActivityByName("anagrafica.edit", starterParams);
                    return Promise.resolve(null);
                }
            });

        
    }
    //initActivityActions override di questo metodo per l'init engapp (searchActivity)

    ngOnInit() {
        this.checkPermission();

        this.valueSetsService.registerLocalValueSet("typeTab-value-set", [
            {
                code: "ANAGRAFICHE",
                display: "ANAGRAFICHE"
            },
            {
                code: "MOBILITA",
                display: "MOBILITA"
            },
            {
                code: "TRANSCODIFICHE",
                display: "TRANSCODIFICHE"
            },
            {
                code: "FILTRI",
                display: "FILTRI"
            },
            {
                code: "CONFIGURAZIONI",
                display: "CONFIGURAZIONI"
            },
            {
                code: "PROFILATURA",
                display: "PROFILATURA"
            },]);

    }

    /*afterStarted() {
        let starterParams: any = this.activity.startingParams;
        if (starterParams.editItem != undefined) {

            if (starterParams.editItem.InternalProfiling != undefined) {
                if (starterParams.editItem.IternalProfile != false) {

                    this.filtersModels.splice(1, 2);
                    this.refreshSearch();
                }
            }
        }
        this.refreshSearch();

    }*/


     checkPermission(): boolean {
        this.filter.resourceQNames = PermissionNameEnum.ANAGRAFICA_MODIFICA;
        this.filter.resourceType = PermissionTypeEnum.OPERATION;
     this.flowConfigurationService.retrivePermission(PermissionTypeEnum.OPERATION, PermissionNameEnum.ANAGRAFICA_MODIFICA).executeSearch(new SearchContext(this.activity, this.filter)).then(result=>{

        const lDtoResult: SearchDataDTO = SearchDataDTO.fromRequestResult(result);

            if (lDtoResult && lDtoResult.items && lDtoResult.items.length > 0) {
                lDtoResult.items.forEach(element => {
                    if (element.resource.resourceQname == PermissionNameEnum.ANAGRAFICA_MODIFICA) {
                        this.permissionEdit = false;
                        return true;
                    }
                    else{
                        return false;
                    }
                });

            }
        });
        return false;

    }




    public getPermission() {
        return this.permissionEdit;
    }
}

