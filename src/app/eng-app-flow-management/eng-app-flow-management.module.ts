import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
    AbstractEngAppModule,
    CommonRenderers,
    DataGridViewComponent,
    EditActivityDef,
    EngApplication,
    EngAppModuleFeature,
    ListViewComponent,
    PageDef,
    SearchActivityDef,
    ValueSetsService
} from 'eng-app';

import { ValueEditActivityComponent } from "./anagrafica/value-edit-activity.component";
import { FieldViewComponent } from "./flow-configuration/flow-edit/field-view.component";
import { AnagraficaEditActivityComponent } from "./anagrafica/anagrafica-edit-activity.component";
import { VersionEditActivityComponent } from "./flow-configuration/version/version-edit-activity.component";
import { DriverEditActivityComponent } from "./flow-configuration/driver/driver-edit-activity.component";
import { DatasourceEditActivityComponent } from "./flow-configuration/datasource/datasource-edit-activity.component";
import { FlowEditActivityComponent } from "./flow-configuration/flow-edit/flow-edit-activity.component";
import { FlowConfigurationRenderers } from "./flow-configuration/flow-configuration.renderers";
import { FlowConfigurationService } from "./flow-configuration/flow-configuration.service";
import { FlowConfigurationFilters } from "./flow-configuration/flow-configuration.filters";
import { DatasourceActivityComponent } from "./flow-configuration/datasource/datasource-search-activity/datasource-search-activity.component";
import { DriverActivityComponent } from "./flow-configuration/driver/driver-search-activity/driver-search-activity.component";
import { VersionActivityComponent } from "./flow-configuration/version/version-search-activity/version-search-activity.component";
import { FlowActivityComponent } from "./flow-configuration/flow-edit/flow-search-activity/flow-search-activity.component";
import { BadgesViewRequest } from "./anagrafica/badges-view-req.component";
import { BadgeItemRequest } from "./anagrafica/badge-item-req.component";
import { AnagraficaActivityComponent } from './anagrafica/anagrafica-search-activity/anagrafica-search-activity.component';
import { FlowViewActivityComponent } from './flow-configuration/flow-view/flow-view-activity.component';
import { BadgesFlowViewViewRequest } from './flow-configuration/flow-view/badgesflowview-view-req.component';
import { BadgeFlowViewItemRequest } from './flow-configuration/flow-view/badgeflowview-item-req.component';
import { FlowExtractActivityComponent } from './flow-configuration/flow-extract/flow-extract-activity.component';
import { BadgesFlowExtractViewRequest } from './flow-configuration/flow-extract/badgesflowextract-view-req.component';
import { BadgeFlowExtractItemRequest } from './flow-configuration/flow-extract/badgeflowextract-item-req.component';
import { FlowExtractSearchActivityComponent } from './flow-configuration/flow-extract/flow-extract-search-activity/flow-extract-search-activity.component';
import { FlowOutputSearchActivityComponent } from './flow-output/flow-output-search-activity/flow-output-search-activity.component';
import { FlowOutputActivityComponent } from './flow-output/flow-output-activity.component';
import { BadgesFlowOutputViewRequest } from './flow-output/badgesflowoutput-view-req.component';
import { BadgeFlowOutputItemRequest } from './flow-output/badgeflowoutput-item-req.component';
import { JobTalendActivityComponent } from './flow-configuration/jobTalend/jobTalend-activity.component';
import { DroolsActivityComponent } from './flow-configuration/drools/drools-activity.component';
import { BadgesJobtalendViewRequest } from './flow-configuration/jobTalend/badgesjobtalend-view-req.component';
import { BadgesDroolsViewRequest } from './flow-configuration/drools/badges-drools-view-req.component';
import { BadgeJobtalendItemRequest } from './flow-configuration/jobTalend/badgejobtalend-item-req.component';
import { BadgeDroolsItemRequest } from './flow-configuration/drools/badge-drools-item-req.component';
import { JobTalendSearchActivityComponent } from './flow-configuration/jobTalend/jobtalend-search-activity/jobtalend-search-activity.component';
import { DroolsSearchActivityComponent } from './flow-configuration/drools/drools-search-activity.component';
import { FlowConfigurationFilterActivityComponent } from './flow-configuration/flow-configuration-filter/flow-configuration-filter-activity.component';
import { FlowConfigurationFilterSearchActivityComponent } from './flow-configuration/flow-configuration-filter/flow-configuration-filter-search/flow-configuration-filter-search-activity.component';
import { SpeedDialFabComponent } from './speed-dial/speed-dial-fab.component';
import { BadgesFlowCfgViewRequest } from './flow-configuration/flow-edit/badgesflowcfg-view-req.component';
import { BadgeFlowCfgItemRequest } from './flow-configuration/flow-edit/badgeflowcfg-item-req.component';
import { BadgesFlowVersionViewRequest } from './flow-configuration/version/version-search-activity/badgeflowversion-view-req.component';
import { BadgeFlowVersionItemRequest } from './flow-configuration/version/version-search-activity/badgeflowversion-item-req.component';
import { BadgesFlowDatasourceViewRequest } from './flow-configuration/datasource/datasource-search-activity/badgeflowdatasource-view-req.component';
import { BadgeFlowDatasourceViewItemRequest } from './flow-configuration/datasource/datasource-search-activity/badgeflowdatasource-item-req.component';
import { BadgesFlowDriverViewRequest } from './flow-configuration/driver/driver-search-activity/badgeflowdriver-view-req.component';
import { BadgeFlowDriverViewItemRequest } from './flow-configuration/driver/driver-search-activity/badgeflowdriver-item-req.component';
import { FlowErrorActivityComponent } from "./flow-configuration/flow-edit/flow-error/flow-error-activity.component";
import { PraticaFlowEditActivityComponent } from './flow-configuration/flow-edit/pratica-flow-activity.component';
import { DashBoardActivityComponent } from './flow-configuration/dashBoard/dashBoard-activity.component';
import { FlowErrorDetailActivityComponent } from "./flow-configuration/flow-edit/flow-error/flow-error-detail.component";
import { MotherDashBoardActivityComponent } from './flow-configuration/dashBoard/motherDashBoard-activity.component';
import { DroolsErrorActivityComponent } from './flow-configuration/drools/drools-error-activity.component';
import { BadgesFlowConfigFilterViewRequest } from "./flow-configuration/flow-configuration-filter/flow-configuration-filter-search/badgeflowconfigfilter-view-req.component";
import { BadgeFlowConfigFilterItemRequest } from "./flow-configuration/flow-configuration-filter/flow-configuration-filter-search/badgeflowconfigfilter-item-req.component";
import { FlowRegionActivityComponent } from "./flow-configuration/flow-edit/flow-region-search-activity/flow-region-search-activity.component";
import { BadgesFlowCfgRegionViewRequest } from "./flow-configuration/flow-edit/badge-flow-cfg-region/badgesflowcfgregion-view-req.component";
import { BadgeFlowCfgRegionItemRequest } from "./flow-configuration/flow-edit/badge-flow-cfg-region/badgeflowcfgregion-item-req.component";
import { ChartsModule } from 'ng2-charts';
import {DialogContentExampleDialog} from './dialog-box/dialog-content-example-dialog';
import {HeaderComponent} from './header-component/header-component';
import { PazienteViewSearchActivityComponent } from "./paziente-view/paziente-view-search-activity/paziente-view-search-activity.component";
import { PazienteViewActivityComponent } from "./paziente-view/paziente-view-activity.component";
import {ShowPipe} from "./flow-output/ShowPipe";
import {ShowPipe2} from "./flow-output/ShowPipe2";
import {PopupUser} from "./user-popup/popup-user";
import {UploadFileSearchActivityComponent} from './upload-file/upload-file-search-activity/upload-file-search-activity.component';
import {UploadFileActivityComponent } from './upload-file/upload-file-activity.component';
import {FlowDrgActivityComponent} from './flow-output/flow-drg/flow-drg.component';
import {AnagraficaAssistitoComponent } from './anagrafica-assistito/anagrafica-assistito.component';
import { AnagraficaAssistitoEdit } from './anagrafica-assistito/anagrafica-assistito-edit.component';
import { AnagraficaAssistitoUploadComponent } from './anagrafica-assistito/anagrafica-assistito-upload.component';
import { FlowViewUploadComponent } from './flow-configuration/flow-edit/flow-search-activity/flow-view-upload.component';
import { SdoFlowMonitorComponent } from './monitor-sdo-xl/monitor-sdo-xl.component';
import { FormsModule } from '@angular/forms';
import { OrderByPipe } from './flow-configuration/flow-view/order-by-pipe';
import { RestApiService } from './rest-api.service';




@NgModule({
    imports: [
        EngAppModuleFeature,
        ChartsModule,
        FormsModule,
        HttpClientModule
        ],
    providers: [
        //FlowConfigurationComponent,
        FlowConfigurationService,
        FlowConfigurationFilters,
        FlowConfigurationRenderers,
        RestApiService
    ],
    exports: [],
    declarations: [
        OrderByPipe,
        ShowPipe,
        ShowPipe2,
        ValueEditActivityComponent,
        DroolsErrorActivityComponent,
        FlowEditActivityComponent,
        DatasourceEditActivityComponent,
        DriverEditActivityComponent,
        VersionEditActivityComponent,
        AnagraficaEditActivityComponent,
        FieldViewComponent,
        FlowViewActivityComponent,
        DatasourceActivityComponent,
        DriverActivityComponent,
        VersionActivityComponent,
        FlowActivityComponent,
        BadgesViewRequest,
        BadgeItemRequest,
        AnagraficaActivityComponent,
        BadgesFlowViewViewRequest,
        BadgeFlowViewItemRequest,
        BadgesFlowCfgViewRequest,
        BadgeFlowCfgItemRequest,
        BadgeFlowVersionItemRequest,
        BadgesFlowVersionViewRequest,
        FlowExtractActivityComponent,
        BadgesFlowExtractViewRequest,
        BadgeFlowExtractItemRequest,
        BadgesFlowDatasourceViewRequest,
        BadgeFlowDatasourceViewItemRequest,
        BadgesFlowDriverViewRequest,
        BadgeFlowDriverViewItemRequest,
        FlowExtractSearchActivityComponent,
        FlowConfigurationFilterActivityComponent,
        FlowConfigurationFilterSearchActivityComponent,
        SpeedDialFabComponent,
        FlowOutputActivityComponent,
        FlowOutputSearchActivityComponent,
        BadgesFlowOutputViewRequest,
        BadgeFlowOutputItemRequest,
        JobTalendActivityComponent,
        DroolsActivityComponent,
        BadgesJobtalendViewRequest,
        BadgesDroolsViewRequest,
        BadgeJobtalendItemRequest,
        BadgeDroolsItemRequest,
        JobTalendSearchActivityComponent,
        DroolsSearchActivityComponent,
        FlowErrorActivityComponent,
        PraticaFlowEditActivityComponent,
        DashBoardActivityComponent,
        FlowErrorDetailActivityComponent,
        MotherDashBoardActivityComponent,
        BadgesFlowConfigFilterViewRequest,
        BadgeFlowConfigFilterItemRequest,
        FlowRegionActivityComponent,
        BadgesFlowCfgRegionViewRequest,
        BadgeFlowCfgRegionItemRequest,
        DialogContentExampleDialog,
        HeaderComponent,
        PazienteViewSearchActivityComponent,
        PazienteViewActivityComponent,
        PopupUser,
        UploadFileSearchActivityComponent,
        UploadFileActivityComponent,
        FlowDrgActivityComponent,
        AnagraficaAssistitoComponent,
        AnagraficaAssistitoUploadComponent,
        AnagraficaAssistitoEdit,
        SdoFlowMonitorComponent,
        FlowViewUploadComponent 
    ],
    entryComponents: [
        ValueEditActivityComponent,
        DroolsErrorActivityComponent,
        FlowEditActivityComponent,
        DatasourceEditActivityComponent,
        DriverEditActivityComponent,
        VersionEditActivityComponent,
        AnagraficaEditActivityComponent,
        FieldViewComponent,
        FlowViewActivityComponent,
        DatasourceActivityComponent,
        DriverActivityComponent,
        VersionActivityComponent,
        FlowActivityComponent,
        BadgesViewRequest,
        BadgeItemRequest,
        AnagraficaActivityComponent,
        BadgesFlowViewViewRequest,
        BadgeFlowViewItemRequest,
        BadgesFlowCfgViewRequest,
        BadgeFlowCfgItemRequest,
        BadgeFlowVersionItemRequest,
        BadgesFlowVersionViewRequest,
        BadgesFlowDatasourceViewRequest,
        BadgeFlowDatasourceViewItemRequest,
        BadgesFlowDriverViewRequest,
        BadgeFlowDriverViewItemRequest,
        FlowExtractActivityComponent,
        BadgesFlowExtractViewRequest,
        BadgeFlowExtractItemRequest,
        FlowExtractSearchActivityComponent,
        FlowConfigurationFilterActivityComponent,
        FlowConfigurationFilterSearchActivityComponent,
        SpeedDialFabComponent,
        FlowOutputActivityComponent,
        FlowOutputSearchActivityComponent,
        BadgesFlowOutputViewRequest,
        BadgeFlowOutputItemRequest,
        JobTalendActivityComponent,
        DroolsActivityComponent,
        BadgesJobtalendViewRequest,
        BadgesDroolsViewRequest,
        BadgeJobtalendItemRequest,
        BadgeDroolsItemRequest,
        JobTalendSearchActivityComponent,
        DroolsSearchActivityComponent,
        FlowErrorActivityComponent,
        PraticaFlowEditActivityComponent,
        DashBoardActivityComponent,
        FlowErrorDetailActivityComponent,
        MotherDashBoardActivityComponent,
        BadgesFlowConfigFilterViewRequest,
        BadgeFlowConfigFilterItemRequest,
        FlowRegionActivityComponent,
        BadgesFlowCfgRegionViewRequest,
        BadgeFlowCfgRegionItemRequest,
        DialogContentExampleDialog,
        HeaderComponent,
        PazienteViewSearchActivityComponent,
        PazienteViewActivityComponent,
        PopupUser,
        UploadFileSearchActivityComponent,
        UploadFileActivityComponent,
        FlowDrgActivityComponent,
        AnagraficaAssistitoComponent,
        AnagraficaAssistitoUploadComponent,
        AnagraficaAssistitoEdit,
        SdoFlowMonitorComponent,
        FlowViewUploadComponent 
        
    ]
})
export class EngAppFlowManagementModule extends AbstractEngAppModule {

    constructor(
        public injector: Injector,
        public engApplication: EngApplication,
        public flowConfigurationService: FlowConfigurationService,
        public flowConfigurationRenderers: FlowConfigurationRenderers,
        public commonRenderers: CommonRenderers,
        public flowConfigurationFilters: FlowConfigurationFilters,
        public valueSetsService: ValueSetsService
    ) {
        super(injector, "EngAppFlowManagementModule", "fm");

    }

    onModuleInit() {

      
        /* Define Activity */

        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'flow-region-configuration.list',
            label: 'FLOW_LIST_ER',
            icon: 'business',
            pageMenuMode: 3,
            searchViewTypes: [
                BadgesFlowCfgRegionViewRequest
            ],
            component: FlowRegionActivityComponent,
            configurable: false,
            dataProvider: this.flowConfigurationService.formFlowRegionListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.flowItemStyleRender(),
                this.commonRenderers.property('name').asHeader(),
                this.commonRenderers.labeledProperty('CODE_FLW', 'code'),
                this.commonRenderers.labeledProperty('FLW_DESC', 'description'),
                this.commonRenderers.labeledProperty('FLW_TYPE', 'flowType'),
                this.flowConfigurationRenderers.flowStatusValue('status', 'status'),
                this.commonRenderers.labeledProperty('FLW_MONTH_BADGE', 'monthlyDeadline')
            ],
            filtersModels: [
                this.flowConfigurationFilters.flowNameFilterModelElement()
            ]
            , editActivity: 'flow-configuration.edit'
        }));
        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'flow-configuration.list',
            label: '!i18n#Lista Flussi',
            icon: 'business',
            searchViewTypes: [
                BadgesFlowCfgViewRequest,
                ListViewComponent
            ],
            component: FlowActivityComponent,
            configurable: false,
            pageMenuMode: 3,
            dataProvider: this.flowConfigurationService.formFlowListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.flowItemStyleRender(),
                this.commonRenderers.property('name').asHeader(),
                this.commonRenderers.labeledProperty('CODE_FLW', 'code'),
                this.commonRenderers.labeledProperty('FLW_DESC', 'description'),
                this.commonRenderers.labeledProperty('FLW_TYPE', 'flowType'),
                this.flowConfigurationRenderers.flowStatusValue('status', 'status'),
                // this.commonRenderers.labeledProperty('FLW_MONTH_BADGE', 'monthlyDeadline'),
                this.commonRenderers.labeledProperty('PERIOD_FLW', 'periodicy')
            ],
            filtersModels: [
                this.flowConfigurationFilters.flowNameFilterModelElement(),
                this.flowConfigurationFilters.flowConfigurationFilterStatus()]
            , editActivity: 'flow-configuration.edit'
        }));
        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'flow-configuration.edit',
            label: '!i18n#Flow Configuration',
            icon: 'business',
            pageMenuMode: 3,
            component: FlowEditActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));
        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'datasource.list',
            label: '!i18n#Lista DataSource',
            icon: 'business',
            pageMenuMode: 3,
            component: DatasourceActivityComponent,
            searchViewTypes: [
                BadgesFlowDatasourceViewRequest,
                ListViewComponent
            ],
            configurable: false,
            dataProvider: this.flowConfigurationService.dataSourceListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.dataSourceItemStyleRender(),
                this.flowConfigurationRenderers.driverItemStyleRender(),
                this.commonRenderers.property('name').asHeader(),
                this.commonRenderers.labeledProperty('DS_LABEL_NAME', 'name'),
                this.commonRenderers.labeledProperty('DS_LABEL_HOSTNAME', 'hostname'),
                this.commonRenderers.labeledProperty('DS_LABEL_PORT', 'port'),
                this.commonRenderers.labeledProperty('DS_LABEL_SERVICE_NAME', 'serviceName'),
                //this.commonRenderers.labeledProperty('DS_LABEL_DRIVER', 'driver'),
                this.flowConfigurationRenderers.flowStatusValue('enabled', 'enabled'),
                this.flowConfigurationRenderers.flowDataSourceDriverValue('DS_LABEL_DRIVER', 'driver')
                //this.commonRenderers.labeledProperty('DS_LABEL_ENABLED', 'enabled'),
            ],
            filtersModels: [
                this.flowConfigurationFilters.dataSourceNameFilterModelElement()
            ]
            , editActivity: 'datasource.edit'
        }));
        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'datasource.edit',
            label: 'DATA_SOURCE',
            icon: 'business',
            pageMenuMode: 3,
            component: DatasourceEditActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.dataSourceEditDataProvider()
        }));
        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'driver.list',
            label: '!i18n#Lista Driver',
            icon: 'business',
            pageMenuMode: 3,
            searchViewTypes: [
                BadgesFlowDriverViewRequest,
                ListViewComponent
            ],
            component: DriverActivityComponent,
            configurable: false,
            dataProvider: this.flowConfigurationService.driverListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.driverItemStyleRender(),
                this.commonRenderers.property('name').asHeader(),
                this.commonRenderers.labeledProperty('DR_LABEL_NAME', 'name'),
                this.commonRenderers.labeledProperty('DR_LABEL_DESCRIPTION', 'description')
            ],
            filtersModels: [
                this.flowConfigurationFilters.driverNameFilterModelElement()
            ]
            , editActivity: 'driver.edit'
        }));
        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'driver.edit',
            label: 'DRIVER',
            icon: 'business',
            pageMenuMode: 3,
            component: DriverEditActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.driverEditDataProvider()
        }));
        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'version.list',
            label: '!i18n#Lista Versioni',
            icon: 'business',
            pageMenuMode: 3,
            searchViewTypes: [
                BadgesFlowVersionViewRequest,
                ListViewComponent
            ],
            component: VersionActivityComponent,
            configurable: false,
            dataProvider: this.flowConfigurationService.versionListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.versionItemStyleRender(),
                this.commonRenderers.property('version').asHeader(),
                this.commonRenderers.labeledProperty('VR_LABEL_VERSION', 'version'),
                this.commonRenderers.labeledProperty('VR_LABEL_DESCRIPTION', 'description'),
                this.commonRenderers.labeledProperty('VR_LABEL_START_DATE', 'startDate'),
                this.commonRenderers.labeledProperty('VR_LABEL_END_DATE', 'endDate'),
                this.commonRenderers.labeledProperty('VR_LABEL_CREATION_DATE', 'creationDate')
            ],
            filtersModels: [
                this.flowConfigurationFilters.versionNameFilterModelElementOne(),
                this.flowConfigurationFilters.versionNameFilterModelElementTwo()
            ]
            , editActivity: 'version.edit'
        }));
        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'version.edit',
            label: 'VERSION',
            icon: 'business',
            pageMenuMode: 3,
            component: VersionEditActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.versionEditDataProvider()
        }));
        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'anagrafica.list',
            label: 'LISTA ANAGRAFICA',
            icon: 'business',
            searchViewTypes: [
                BadgesViewRequest,
                //BadgesViewComponent,
                ListViewComponent

            ],
            component: AnagraficaActivityComponent,
            configurable: false,
            pageMenuMode: 3,
            dataProvider: this.flowConfigurationService.anagraficaListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.anagraficaItemStyleRender(),
                this.commonRenderers.property('id').asHeader(),
                this.commonRenderers.labeledProperty('AN_ID', 'id'),
                this.commonRenderers.labeledProperty('AN_DESC', 'description'),
                this.commonRenderers.labeledProperty('AN_TYPE', 'type'),
                this.commonRenderers.labeledProperty('AN_FIELDNUM', 'fieldNum'),
            ],
            filtersModels: [
                this.flowConfigurationFilters.anagraficaNameFilterModelElement(),
                this.flowConfigurationFilters.anagraficaNameFilterModelElementTwo()
            ]
            , editActivity: 'anagrafica.edit'
        }));
        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'anagrafica.edit',
            label: 'ANAGRAFICA',
            icon: 'business',
            pageMenuMode: 3,
            component: AnagraficaEditActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.anagraficaEditDataProvider()
        }));
        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'profilatura.edit',
            label: 'ANAGRAFICA',
            icon: 'business',
            pageMenuMode: 3,
            component: AnagraficaEditActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.profilaturaEditDataProvider()
        }));
        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'flow-profile.list',
            label: 'PROFILATURA',
            icon: 'business',
            searchViewTypes: [
                BadgesViewRequest,
                ListViewComponent

            ],
            component: AnagraficaActivityComponent,
            configurable: false,
            pageMenuMode: 3,
            dataProvider: this.flowConfigurationService.profilaturaFlussiListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.anagraficaItemStyleRender(),
                this.commonRenderers.property('id').asHeader(),
                this.commonRenderers.labeledProperty('AN_ID', 'id'),
                this.commonRenderers.labeledProperty('AN_DESC', 'description'),
                this.commonRenderers.labeledProperty('AN_TYPE', 'type'),
                this.commonRenderers.labeledProperty('AN_FIELDNUM', 'fieldNum'),
            ],
            filtersModels: [
                this.flowConfigurationFilters.anagraficaNameFilterModelElement(),
      //          this.flowConfigurationFilters.anagraficaNameFilterModelElementTwo()
            ]
            , editActivity: 'profilatura.edit'
        }));


        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'flow-config.list',
            label: 'TABGEN_CONFIG',
            icon: 'business',
            searchViewTypes: [
                BadgesViewRequest,
                ListViewComponent

            ],
            component: AnagraficaActivityComponent,
            configurable: false,
            pageMenuMode: 3,
            dataProvider: this.flowConfigurationService.configurazioniFlussiListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.anagraficaItemStyleRender(),
                this.commonRenderers.property('id').asHeader(),
                this.commonRenderers.labeledProperty('AN_ID', 'id'),
                this.commonRenderers.labeledProperty('AN_DESC', 'description'),
                this.commonRenderers.labeledProperty('AN_TYPE', 'type'),
                this.commonRenderers.labeledProperty('AN_FIELDNUM', 'fieldNum'),
            ],
            filtersModels: [
                this.flowConfigurationFilters.anagraficaNameFilterModelElement(),
          //      this.flowConfigurationFilters.anagraficaNameFilterModelElementTwo()
            ]
            , editActivity: 'anagrafica.edit'
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'value.edit',
            label: 'RECORD',
            icon: 'business',
            pageMenuMode: 3,
            component: ValueEditActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.anagraficaEditDataProvider()
        }));
        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'drools-error-activity',
            label: '!i18n# ERRORI DI COMPILAZIONE',
            icon: 'business',
            pageMenuMode: 3,
            component: DroolsErrorActivityComponent,
            configurable: false,
            returnAfterSave: true
        }));
        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'flow-view.list',
            label: 'VISUALIZZA FLUSSI',
            icon: 'business',
            pageMenuMode: 3,
            searchViewTypes: [
                BadgesFlowViewViewRequest,
                //BadgesViewComponent,
                ListViewComponent,
                DataGridViewComponent
            ],
            configurable: false,
            dataProvider: this.flowConfigurationService.formFlowListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.flowItemStyleRender(),
                this.commonRenderers.property('name').asHeader(),
                this.commonRenderers.labeledProperty('FLW_ID', 'code'),
                this.commonRenderers.labeledProperty('FLW_DESC', 'description'),
            ],
            filtersModels: [
                this.flowConfigurationFilters.flowNameFilterModelElement()
            ]
            , editActivity: 'flow-view.edit'
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'flow-view.edit',
            label: 'VISUALIZZA FLUSSI',
            icon: 'business',
            pageMenuMode: 2,
            component: FlowViewActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'flow-extract.list',
            label: 'IMPORTA DATI',
            icon: 'business',
            pageMenuMode: 3,
            searchViewTypes: [
                BadgesFlowExtractViewRequest,
                ListViewComponent,
                DataGridViewComponent
            ],
            component: FlowExtractSearchActivityComponent,
            configurable: false,
            dataProvider: this.flowConfigurationService.flowExtractListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.flowItemStyleRender(),
                this.flowConfigurationRenderers.flowVersionValue('VERSION_FLW', 'version'),
                this.commonRenderers.labeledProperty('STATO', 'status'),
                this.commonRenderers.labeledProperty('DATA_FINE_IMPORTAZIONE', 'endExtractionDate'),
            ],
            filtersModels: [
                this.flowConfigurationFilters.flowExtractFlowsFilterModelElement(),
                this.flowConfigurationFilters.flowExtractVersionFilterModelElement(),
                this.flowConfigurationFilters.flowExtractStatusFilterModelElement(),
                this.flowConfigurationFilters.flowExtractDateFilterModelElement(),
                this.flowConfigurationFilters.flowExtractDate2FilterModelElement(),
                this.flowConfigurationFilters.flowExtractDateEndFilterModelElement()
            ]
            , editActivity: 'flow-extract.edit'
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'flow-extract.edit',
            label: 'IMPORTA DATI',
            icon: 'business',
            component: FlowExtractActivityComponent,
            configurable: false,
            returnAfterSave: true,
            pageMenuMode: 3,
            //dataProvider: this.flowConfigurationService.flowExtractEditDataProvider()
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        // this.engApplication.defineActivity(new EditActivityDef({
        //     name: 'flow-extract.popup',
        //     label: 'ESTRATTORE FLUSSI',
        //     icon: 'business',
        //     component: FlowExtractPopupActivityComponent,
        //     configurable: false,
        //     returnAfterSave: true,
        //     //dataProvider: this.flowConfigurationService.flowExtractEditDataProvider()
        //     dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        // }));
        //SearchActivityCustom
        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'flow-output.search',
            label: 'ESTRAI FLUSSO',
            icon: 'business',
            component: FlowOutputSearchActivityComponent,
            configurable: false,
            returnAfterSave: true,
            pageMenuMode: 2,
            //dataProvider: this.flowConfigurationService.flowExtractEditDataProvider()
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        /*
        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'flow-output.list',
            label: 'ESTRAI FLUSSO',
            icon: 'business',
            searchViewTypes: [
                // BadgesViewComponent,
                BadgesFlowOutputViewRequest,
                ListViewComponent,
                DataGridViewComponent
            ],
            component: FlowOutputSearchActivityComponent,
            configurable: false,
            dataProvider: this.flowConfigurationService.flowOutputListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.flowItemStyleRender(),
                this.flowConfigurationRenderers.flowVersionValue('VERSION_FLW', 'version'),
                this.commonRenderers.labeledProperty('STATO', 'status'),
                this.commonRenderers.labeledProperty('DATA_FINE_ESPORTAZIONE', 'endExtractionDate'),
            ],
            filtersModels: [
                this.flowConfigurationFilters.flowExtractFlowsFilterModelElement(),
                this.flowConfigurationFilters.flowExtractVersionFilterModelElement(),
                this.flowConfigurationFilters.flowExtractStatus2FilterModelElement(),
                this.flowConfigurationFilters.flowExtractDateFilterModelElement(),
                this.flowConfigurationFilters.flowExtractDate2FilterModelElement(),
                this.flowConfigurationFilters.flowExtractDateEndFilterModelElement()
            ]
            , editActivity: 'flow-output.edit'
        }));
*/

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'flow-output.edit',
            label: 'ESTRAI FLUSSO',
            icon: 'business',
            pageMenuMode: 3,
            component: FlowOutputActivityComponent,
            configurable: false,
            returnAfterSave: true,
            //dataProvider: this.flowConfigurationService.flowExtractEditDataProvider()
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'flow-configuration-filter.list',
            label: 'CFG_FLT',
            icon: 'business',
            pageMenuMode: 3,
            searchViewTypes: [
                BadgesFlowConfigFilterViewRequest
            ],
            component: FlowConfigurationFilterSearchActivityComponent,
            configurable: false,
            dataProvider: this.flowConfigurationService.flowConfigurationFilterDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.flowConfigFieldStyleRender(),
                this.commonRenderers.property('name').asHeader(),
                this.flowConfigurationRenderers.flowVersionValue('FILTRO_FLOW', 'flow'),
                this.flowConfigurationRenderers.flowVersionValue('FILTRO_VERSION', 'version'),
                this.flowConfigurationRenderers.flowConfTypeValue('FILTRO_TYPE', 'type'),
            ],
            filtersModels: [
                this.flowConfigurationFilters.flowConfigurationFilterNameFilterModelElement(),
                this.flowConfigurationFilters.flowConfigurationFilterTypeFilterModelElement(),
                this.flowConfigurationFilters.flowConfigurationFilterFlowModelElement(),
                this.flowConfigurationFilters.flowConfigurationFilterVersionModelElement()
            ]
            , editActivity: 'flow-configuration-filter.edit'
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'flow-configuration-filter.edit',
            label: 'CFG_FLT',
            icon: 'business',
            pageMenuMode: 3,
            component: FlowConfigurationFilterActivityComponent,
            configurable: false,
            returnAfterSave: true,
            //dataProvider: this.flowConfigurationService.flowExtractEditDataProvider()
            //  dataProvider: ,
        }));


        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'drools.list',
            label: 'DROOLS',
            icon: 'developer_mode',
            pageMenuMode: 3,
            searchViewTypes: [
                BadgesDroolsViewRequest,
            ],
            component: DroolsSearchActivityComponent,
            configurable: false,
            dataProvider: this.flowConfigurationService.droolsListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.flowItemStyleRender(),
                this.commonRenderers.labeledProperty('DS_LABEL_FLOW_DESCRIPTION', 'flowDescription'),
                this.commonRenderers.labeledProperty('DS_LABEL_VERSION_DESCRIPTION', 'versionDescription'),
                this.commonRenderers.labeledProperty('DS_LABEL_DROOLS_PRESENT', 'numberOfRules')
            ],
            filtersModels: [
                this.flowConfigurationFilters.flowExtractFlowsFilterModelElement(),
                this.flowConfigurationFilters.flowExtractVersionFilterModelElement(),
            ],
            editActivity: 'drools.edit'
        }));

        this.engAppDeclarator.defineActivity(new SearchActivityDef({
            name: 'jobtalend.list',
            label: 'JOBTALEND',
            icon: 'business',
            pageMenuMode: 3,
            searchViewTypes: [
                BadgesJobtalendViewRequest,
            ],
            component: JobTalendSearchActivityComponent,
            configurable: false,
            dataProvider: this.flowConfigurationService.jobTalendListSearchDataProvider(),
            itemRendererElements: [
                this.flowConfigurationRenderers.flowItemStyleRender(),
                this.commonRenderers.labeledProperty('DS_LABEL_NAME', 'name'),
                this.commonRenderers.labeledProperty('TYPE', 'type'),
                this.flowConfigurationRenderers.flowVersionValue('FLUSSO', 'flow'),
                this.flowConfigurationRenderers.flowVersionValue('VERSION_FLW', 'version'),
            ],
            filtersModels: [
                this.flowConfigurationFilters.talendNameFilterModelElement(),
                this.flowConfigurationFilters.flowExtractFlowsFilterModelElement(),
                this.flowConfigurationFilters.flowExtractVersionFilterModelElement(),
            ]
            , editActivity: 'jobtalend.edit'
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'jobtalend.edit',
            label: 'JOBTALEND',
            icon: 'business',
            pageMenuMode: 3,
            component: JobTalendActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.jobTalendEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'drools.edit',
            label: 'DROOLS',
            icon: 'developer_mode',
            pageMenuMode: 3,
            component: DroolsActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.droolsListEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'flow-error.edit',
            label: 'FLOWERROR',
            icon: 'business',
            pageMenuMode: 3,
            component: FlowErrorActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'pratica-flow.edit',
            label: 'PRATICA_FLOW',
            icon: 'business',
            pageMenuMode: 3,
            component: PraticaFlowEditActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'dashBoard.edit',
            label: 'DASHBOARD',
            icon: 'business',
            pageMenuMode: 3,
            component: DashBoardActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'motherDashBoard.edit',
            label: 'DASHBOARD',
            icon: 'business',
            pageMenuMode: 3,
            component: MotherDashBoardActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'flow-error-detail.edit',
            label: 'FLOWERROR',
            icon: 'business',
            pageMenuMode: 3,
            component: FlowErrorDetailActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));
        
        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'paziente-view.search',
            label: 'RICERCA ASSISTITO',
            icon: 'business',
            pageMenuMode: 3,
            component: PazienteViewSearchActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'paziente-view.edit',
            label: 'PRATICHE ASSISTITO',
            icon: 'business',
            pageMenuMode: 3,
            component: PazienteViewActivityComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'upload-file.search',
            label: 'CARICAMENTO FILE',
            icon: 'business',
            component: UploadFileSearchActivityComponent,
            configurable: false,
            returnAfterSave: true,
            pageMenuMode: 2,
            //dataProvider: this.flowConfigurationService.flowExtractEditDataProvider()
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'upload-file.edit',
            label: 'CARICAMENTO FILE',
            icon: 'business',
            pageMenuMode: 3,
            component: UploadFileActivityComponent,
            configurable: false,
            returnAfterSave: true,
            //dataProvider: this.flowConfigurationService.flowExtractEditDataProvider()
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'flow-drg.edit',
            label: 'DRG',
            icon: 'business',
            pageMenuMode: 3,
            component: FlowDrgActivityComponent,
            configurable: false,
            returnAfterSave: true,
            //dataProvider: this.flowConfigurationService.flowExtractEditDataProvider()
            dataProvider: this.flowConfigurationService.formFlowEditDataProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'anagrafica-assistito',
            label: 'ANAGRAFICA ASSISTITO',
            icon: 'table_view',
            pageMenuMode: 3,
            component: AnagraficaAssistitoComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.anagraficaAssistitoEditProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'anagrafica-assistito.edit',
            label: 'ANAGRAFICA ASSISTITO',
            icon: 'table_view',
            pageMenuMode: 3,
            component: AnagraficaAssistitoEdit,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.anagraficaAssistitoEditProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'anagrafica-assistito-upload',
            label: 'ANAGRAFICA_ASSISTITO_IMPORT_FILE',
            icon: 'business',
            pageMenuMode: 3,
            component: AnagraficaAssistitoUploadComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.anagraficaAssistitoEditProvider()
        }));

        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'flow-view-upload',
            label: 'FLOW_IMPORT_FILE',
            icon: 'business',
            pageMenuMode: 3,
            component: FlowViewUploadComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.flowViewEditDataProvider()
        }));

		
        this.engAppDeclarator.defineActivity(new EditActivityDef({
            name: 'sdo-flow-monitor',
            label: 'SDO FLOW MONITOR',
            icon: 'table_chart',
            pageMenuMode: 3,
            component: SdoFlowMonitorComponent,
            configurable: false,
            returnAfterSave: true,
            dataProvider: this.flowConfigurationService.sdoFlowMonitorEditProvider()
        }));
    	

        /* Menu */
        this.engAppDeclarator.definePage(new
            PageDef({
                headerComponent: HeaderComponent,
                name: 'it.eng.sample.page',
                label: 'PAGE_LABEL',
                icon: 'cached',
                initialActivity: 'motherDashBoard.edit',
                menu: [

                {
                    label: 'DASHBOARD',
                    icon: 'dashboard    ',
                    activityName: 'motherDashBoard.edit'
                },
                {
                    label: '!i18n#Configurazioni',
                    icon: 'settings',
                    menu: [

                        {
                            label: 'FLOW',
                            activityName: 'flow-configuration.list',
                            icon: 'settings'
                        },
                        {
                            label: 'FLOW_ER',
                            activityName: 'flow-region-configuration.list',
                            icon: 'settings'
                        },
                        {
                            label: 'CFG_FLT',
                            icon: 'settings',
                            activityName: 'flow-configuration-filter.list'
                        },
                        {
                            label: 'DATA_SOURCE',
                            icon: 'settings',
                            activityName: 'datasource.list'
                        },
                        {
                            label: 'DRIVER',
                            icon: 'settings',
                            activityName: 'driver.list'
                        },
                        {
                            label: 'VERSION',
                            icon: 'settings',
                            activityName: 'version.list'
                        },
                        {
                            label: 'JOBTALEND',
                            icon: 'settings',
                            activityName: 'jobtalend.list'
                        },
                        {
                            label: 'DROOLS',
                            icon: 'developer_mode',
                            activityName: 'drools.list'
                        },
                        {
                            label: 'TABGEN_CONFIG',
                            activityName: 'flow-config.list',
                            icon: 'settings'
                         
                        }

                    ]
                },


                {
                    label: 'ANAGRAFICA',
                    icon: 'assignment',
                    activityName: 'anagrafica.list'
                },
                {
                    label: 'VISUALIZZA FLUSSI',
                    activityName: 'flow-view.list',
                    icon: 'cached'
                },
                {
                    label: 'IMPORTA DATI',
                    activityName: 'flow-extract.list',
                    icon: 'import_export'
                },
                {
                    label: 'ESTRAI FLUSSO',
                    activityName: 'flow-output.search',
                    icon: 'swap_vert'
                },
                {
                    label: 'PROFILATURA',
                    activityName: 'flow-profile.list',
                    icon: 'accessibility'
                   
                },
                {
                    label: 'RICERCA ASSISTITO',
                    activityName: 'paziente-view.search',
                    icon: 'people_alt'
                   
                },
                {
                    label: 'CARICAMENTO FILE',
                    activityName: 'upload-file.search',
                    icon: 'cloud_upload'
                },

                {
                    label: 'ANAGRAFICA ASSISTITO',
                    activityName: 'anagrafica-assistito',
                    icon: 'table_view'
                },
                {
                    label: 'SDO FLOW MONITOR',
                    activityName: 'sdo-flow-monitor',
                    icon: 'table_chart'
                }
            ],
        }));
        /* Define Page */
        this.engApplication.addMenuItemToApplicationMenu({ pageName: 'it.eng.sample.page' });
    }


    

}


