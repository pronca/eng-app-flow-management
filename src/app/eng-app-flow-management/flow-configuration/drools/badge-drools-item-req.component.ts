import {Component, ElementRef, Inject, ViewChild} from '@angular/core';

import {
    Activity,
    ActivityManager,
    BadgeItemComponent,
    ItemRenderingValue,
    ItemRenderingValueCategory,
    ItemRenderingValueType,
    SearchActivityComponent
} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration.service";
import {DroolsFile, FmFlow, Header, RulesDownloadRequest} from "../flow-configuration.model";
import {DroolsSearchActivityComponent} from './drools-search-activity.component';


@Component({
  selector: 'badge-drools-item-req',
  templateUrl: './badge-drools-item-req.component.html',
  styleUrls: ['./badge-drools-item-req.component.scss']
})
export class BadgeDroolsItemRequest extends BadgeItemComponent {

  imageData = '';
  mainImageValue: ItemRenderingValue;
  badgeBodyValues: ItemRenderingValue[];
  request: Request;
  fmFlow: FmFlow;
  cancelEnabled: boolean = true;
  header: Header = new Header();

  @ViewChild('droolsFileUpload',{ static: true }) fileUploadEl: ElementRef;
  @ViewChild('droolsFileUpload2',{ static: true }) fileUploadEl2: ElementRef;

  constructor(
    @Inject('SearchActivityComponent') public searchComponent: DroolsSearchActivityComponent,

    @Inject('item') public item: DroolsFile,

    public activityManager: ActivityManager,
    public activity: Activity,
    
    
    public flowConfigurationService: FlowConfigurationService
  ) {
    super();
  }

  ngOnInit() {

    

    super.ngOnInit();

    this.badgeBodyValues = this.getInlineItemValues().filter(val => {
      return val !== this.mainImageValue;
    });
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

  getClass(r: Request): string {
    return 'material-icons';
  }

  openChildActivity(act2Name: string, asPopup: boolean) {

    let startingParams: any = {};
    startingParams.editItem = this.item;

    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
    //this.activityManager.startChildActivityByName('drools.edit', startingParams);
  
  }

  add(psAction: String, poRequest: Request, item: DroolsFile, $event) {
    document.getElementById('droolsFileUpload' + item.flowId + item.versionId).click();
  }

  add2(psAction: String, poRequest: Request, item: DroolsFile, $event) {
    document.getElementById('droolsFileUpload2' + item.flowId + item.versionId).click();
  }

  download(psAction: String, poRequest: Request, item: DroolsFile, $event) {
    let req : RulesDownloadRequest = new RulesDownloadRequest();
    req.flowId = item.flowId;
    req.versionId = item.versionId;
    this.header.label = "Download DRL in corso...";
        this.activityManager.getCurrentPage().setPageMainObject(this.header);
    this.flowConfigurationService.downloadDroolsFiles(req).then(result => {
      if (result.size > 0) {
          this.header.visible = false;
          this.header.label = "";
          this.activityManager.getCurrentPage().setPageMainObject(this.header);
          var file = new Blob([result], {type: 'application/zip'});
          var fileURL = URL.createObjectURL(file);
          var anchor = document.createElement("a");
          let nomeFileZip: string = item.flowDescription + "_" + item.versionName;
          let splitPoint: string[] = nomeFileZip.split(".");
          for (let i = 0; i < splitPoint.length; i++) {
            nomeFileZip = nomeFileZip.replace(".","_");
          }
          anchor.download = nomeFileZip;
          anchor.href = fileURL;
          anchor.click();
      } else {
          this.activityManager.engApplication.notifyMessage('Nessun File trovato');
          this.header.visible = false;
          this.header.label = "";
          this.activityManager.getCurrentPage().setPageMainObject(this.header);

      }
  }).catch(() => {
      this.header.visible = false;
      this.header.label = "";
      this.activityManager.getCurrentPage().setPageMainObject(this.header);

      let errorMessage: string = this.activityManager.engApplication.i18nInstant('UNEXPECTED_ERR');
      this.activityManager.engApplication.notifyMessage(errorMessage);

  });

  }

   

  deleteAll(psAction: String, poRequest: Request, item: DroolsFile, $event): Promise<any> {
    var _this = this;
            var i18n = this.activity.getI18nService();
            return this.activity.getUserConfirmService().askConfirmMessage
            (i18n.instant('!i18n# Cancellazione Regola'), i18n.instant('!i18n# Confermi la cancellazione di tutte le regole?')).then(function () {
                return _this.executeDeleteAllRuleConfirm(item);
            });
  }

  executeDeleteAllRuleConfirm(drools : DroolsFile): Promise<any> {
    let req : RulesDownloadRequest = new RulesDownloadRequest();
    req.flowId = drools.flowId;
    req.versionId = drools.versionId;
      this.flowConfigurationService.deleteAllDroolsFile(req).then(response => {
          if (response.success) {
              if(response.opTargetObject === 'OK'){
                let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Regole eliminate con successo');
                this.activityManager.engApplication.notifyMessage(successMessage);
                this.searchComponent.refreshSearch();
              } else if (response.opTargetObject === 'KO'){
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore durante la cancellazione delle regole');
                this.activityManager.engApplication.notifyMessage(errorMessage);
              }
          }
          else {
              let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
              this.activityManager.engApplication.notifyMessage(errorMessage);
          }
      }).catch(() => {
          let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
          this.activityManager.engApplication.notifyMessage(errorMessage);
      });

      return Promise.resolve();
  }

  public fileChanged(event, item: DroolsFile, type: string): void {
    let ne;
    let inputFile;
    if(type === '1') {
      ne = this.fileUploadEl.nativeElement;
    } else {
      ne = this.fileUploadEl2.nativeElement;
    }

    inputFile = ne.files[0];

    this.searchComponent.readFile(inputFile).then((file) => {
        ne.value = '';
        this.flowConfigurationService.importDroolsFile(file, item.versionId, item.flowId, type).then(response => {

            if (response.opTargetObject.success) {
                this.activityManager.engApplication.notifyMessage('File importato con successo');
            }
            else {
              this.searchComponent.showRuleErrors(response.opTargetObject.messages);
            }
        }).catch((e) => {
            this.activityManager.engApplication.notifyMessage('Errore inaspettato');
        });
    });

}



}