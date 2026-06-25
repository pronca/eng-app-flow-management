import {Component, Inject} from '@angular/core';

import {
    Activity,
    ActivityManager,
    BadgeItemComponent,
    ItemRenderingValue,
    ItemRenderingValueCategory,
    ItemRenderingValueType,
    SearchActivityComponent,
    SearchFilters,
    SearchContext,
    SearchDataDTO
} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration.service";
import {FmFlow, Header, PermissionTypeEnum, PermissionNameEnum} from "../flow-configuration.model";
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'badgeflowcfg-item-req',
  templateUrl: './badgeflowcfg-item-req.component.html',
  styleUrls: ['./badgeflowcfg-item-req.component.scss']
})
export class BadgeFlowCfgItemRequest extends BadgeItemComponent {

  imageData = '';
  mainImageValue: ItemRenderingValue;
  badgeBodyValues: ItemRenderingValue[];
  request: Request;
  status: any;
  fullname: string;
  fmFlow: FmFlow;
  versionName: String;
  download_: boolean;
  header: Header = new Header();
  showLoadingIndicator: boolean = false;
  permissionEdit: boolean = true;
  filter: SearchFilters = new SearchFilters();

  constructor(
    @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent,
    @Inject('item') public item: FmFlow,

    public activityManager: ActivityManager,
    public activity: Activity,
    public flowConfigurationService: FlowConfigurationService
  ) {
    super();
  }

ngOnInit(){

  this.checkPermission();

  super.ngOnInit()


  this.flowConfigurationService.getVersionById(this.item.version).then(response => {

    if (response.success) {
        this.versionName = response.opTargetObject.version;
    } else {
        let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
        this.activityManager.engApplication.notifyMessage(errorMessage);
    }
  }).catch(() => {
    let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
    this.activityManager.engApplication.notifyMessage(errorMessage);
  });


};

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

get versionNameValue() : String{
  return this.versionName;
}

  initializeImageStyle(): any {
    if (this.imageData && this.imageData !== '') {
      return { 'background-image': 'url(' + this.imageData + ')' };
    }
  }

  getBadgeBody(): ItemRenderingValue[] {
    return this.badgeBodyValues;
  }

  getMainImageBoxValue(): ItemRenderingValue {

    const imgsVal = this._valuesByType.get(ItemRenderingValueType.IMAGE_BOX);
    return imgsVal && imgsVal.length > 0 && imgsVal[0];
  }

  getInlineItemValues(): ItemRenderingValue[] {

    const r = this._valuesByCategory.get(ItemRenderingValueCategory.BODY_ELEMENT)

    return r ? r : [];
  }

  openChildActivity(act2Name: string, asPopup: boolean) {

    let startingParams: any = {};
    startingParams.editItem = this.item;
    startingParams.editMode = 1;
    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
    this.activityManager.startChildActivityByName("flow-configuration.edit", startingParams);
  }

  /*dashBoard(psAction: String, poRequest: Request, poSelected: any, $event): void {
    let startingParams: any = {};
    startingParams.editItem = this.item;
    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
    this.activityManager.startChildActivityByName("dashBoard.edit", startingParams);

  }*/

  duplica(psAction: String, poRequest: Request, poSelected: any, $event): void {
    let startingParams: any = {};
    startingParams.editItem = this.item;
    startingParams.extra = "duplica";
    startingParams.editMode = 1;
    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
    this.activityManager.startChildActivityByName("flow-configuration.edit", startingParams);

  }

  exportFlusso(item:FmFlow){
    let filter = {
      flow:item
    };
    this.download_ = true;
    this.header.label = "Download XML in corso...";
    this.activityManager.getCurrentPage().setPageMainObject(this.header);

    this.flowConfigurationService.exportFmFlow(item)
    .then(result => {
      if (result.size > 0) {
        this.header.visible = false;
        this.header.label = "";
        this.activityManager.getCurrentPage().setPageMainObject(this.header);
          var file = new Blob([result], { type: 'application/zip' });
          var fileURL = URL.createObjectURL(file);
          var anchor = document.createElement("a");
          anchor.download = "Export_flow_"+item.code; 
          anchor.href = fileURL;
          anchor.click();   
          this.download_ = false;     
        } else {
          this.activityManager.engApplication.notifyMessage('Nessun file presente');
          this.download_ = false;
        }
    })
    .catch(e => {
      this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
      // this.showLoadingIndicator = false;
      console.log("Error:: "+e);
    });
    
  }

  eliminaFlusso(item:FmFlow): Promise<any> {
    var _this = this;
    var i18n = this.activity.getI18nService();
    return this.activity.getUserConfirmService().askConfirmMessage
    (i18n.instant('!i18n# Eliminazione flusso'), i18n.instant('!i18n# Confermi di voler eliminare il flusso '+ item.name +' ?')).then(function () {
        return _this.executeEliminazioneFlusso(item);
    });
  }

  executeEliminazioneFlusso(item:FmFlow){
      this.showLoadingIndicator=true;
      this.flowConfigurationService.deleteFlow(this.item.id).then(response => {
      if (response.success) {
        this.showLoadingIndicator=false;
          let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Flusso eliminato con successo');
          this.activityManager.engApplication.notifyMessage(successMessage);
          this.searchComponent.refreshSearch();
      } else {
          if (response.opTargetObject != null) {
              this.showLoadingIndicator=false;
              this.activityManager.engApplication.notifyMessage(response.opTargetObject);
          } else {
              this.showLoadingIndicator=false;
              let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore nella eliminazione del flusso');
              this.activityManager.engApplication.notifyMessage(errorMessage);
          }
          
      }
  }).catch(() => {
    this.showLoadingIndicator=false;
    let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
    this.activityManager.engApplication.notifyMessage(errorMessage);
  });

  }

}