import {Component, Inject} from '@angular/core';

import {
    Activity,
    ActivityActionType,
    ActivityManager,
    BadgeItemComponent,
    ItemRenderingValue,
    ItemRenderingValueCategory,
    ItemRenderingValueType,
    SearchActivityComponent
} from 'eng-app';

import {FlowConfigurationService} from "../../flow-configuration.service";
import {FmFlow} from "../../flow-configuration.model";


@Component({
  selector: 'badgeflowdatasource-item-req',
  templateUrl: './badgeflowdatasource-item-req.component.html',
  styleUrls: ['./badgeflowdatasource-item-req.component.scss']
})
export class BadgeFlowDatasourceViewItemRequest extends BadgeItemComponent {

  imageData = '';
  mainImageValue: ItemRenderingValue;
  badgeBodyValues: ItemRenderingValue[];
  request: Request;
  status: any;
  fullname: string;
  fmFlow: FmFlow;

  constructor(
    @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent,

    @Inject('item') public item: FmFlow,

    public activityManager: ActivityManager,
    public activity: Activity,
    
    
    public flowConfigurationService: FlowConfigurationService
  ) {
    super();
  }

  ngOnInit() {

    this.searchComponent.activity.removeActivityAction(SearchActivityComponent.NEW_ACTION);

    this.activity.addActivityAction({
      actionType: ActivityActionType.MAIN,
      name: SearchActivityComponent.NEW_ACTION,
      tooltip: "Nuovo",
      icon: "add",
      fn: (activity, action) => {
        this.activityManager.startChildActivityByName("datasource.edit");
        return Promise.resolve(null);
      }});

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



  // delete(action: ActivityAction): Promise<any> {
  //   var _this = this;
  //           var i18n = this.activity.getI18nService();
  //           return this.activity.getUserConfirmService().askConfirmMessage
  //           (i18n.instant('!i18n# Eliminazione della tabella'), i18n.instant('!i18n# Confermi di voler eliminare la tabella?')).then(function () {
  //               return _this.executeDeleteTabgenConfirm(false, false, false);
  //           });
  // }

  // executeDeleteTabgenConfirm(deleteAll: boolean, deleteField: boolean, deleteValue: boolean): Promise<any> {
  //     this.flowConfigurationService.deleteTabgenForm(this.item, deleteAll, deleteField, deleteValue).then(response => {
  //         if (response.success) {
  //             if (response.opTargetObject.error) {
  //                 this.manageError(response.opTargetObject.error, null)
  //             }else{
  //             let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Tabella eliminata con successo');
  //             this.activityManager.engApplication.notifyMessage(successMessage);
              
  //             }
  //         }
  //         else {
  //             let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
  //             this.activityManager.engApplication.notifyMessage(errorMessage);
  //         }
  //     }).catch(() => {
  //         let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
  //         this.activityManager.engApplication.notifyMessage(errorMessage);
  //     });

  //     return Promise.resolve();
  // }

  // export(psAction: String, poRequest: Request, poSelected: any, $event) {
  //   let filter = new SearchFilters();
  //   filter.id = this.item.id;
  //   this.flowConfigurationService.exportTable(filter).then(idExp => {
  //     this.checkExport(idExp.opTargetObject.values.id);
  //   }).catch((e) => {

  //     this.activityManager.engApplication.notifyMessage('Errore inaspettato in fase di esportazione del file');

  //   });

  // }

  // checkExport(id) {
  //   this.flowConfigurationService.checkExportTable(id).then((result) => {
  //     //result.opTargetObject = true;
  //     if (result.opTargetObject) {
  //       this.flowConfigurationService.downloadExportTable(id);
  //       this.activityManager.engApplication.notifyMessage('Export della tabella avvenuto con successo');
  //     }
  //     else {        
  //       setTimeout(() => this.checkExport(id), 1000);
  //       //result.opTargetObject = true;
  //       //this.flowConfigurationService.downloadExportTable(id);      
  //     }
  //   });
  // }

  // getClass(r: Request): string {
  //   return 'material-icons';
  // }


  openChildActivity(act2Name: string, asPopup: boolean) {

    let startingParams: any = {};
    startingParams.editItem = this.item;

    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
    this.activityManager.startChildActivityByName("datasource.edit", startingParams);
  }


  // manageError( error: any, i: number ) {
  //   let errorRow = error.errorExcelRowNumber != null ? " Riga errata : " + error.errorExcelRowNumber : "";
  //   let field = " ";
  //   if (error.fields != null && error.fields.length > 0) {
  //       for(let f=0; f<error.fields.length; f++){
  //           field = field + f + ' ';
  //       }
  //   }
  //   if (error.operation === "SAVING_UPDATING_TABLE") {
  //       if (error.tableAssociatedValues) {
  //           this.activityManager.engApplication.notifyMessage('Attenzione - Impossibile salvare la tabella. Ci sono valori ad essa associati'/* + errorRow*/);
  //       } else if (error.violatedPk) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - L'identificativo scelto è già stato assegnato" + errorRow);
  //       }
  //   } else if (error.operation === "SAVING_UPDATING_FIELD") {
  //       if (error.duplicatedProgressive) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Progressivo campo duplicato per " + field + errorRow);
  //       } else if (error.invalidValueColumnName) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Nome campo non valido : " + field + errorRow);
  //       } else if (error.duplicatedValueColumnName) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Nome campo duplicato : " + error.fieldTable + errorRow);
  //       } else if (error.fieldReferencingFields) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Esistono riferimenti al campo " + field + errorRow);
  //       } else if (error.fieldAssociatedValues) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + field + " valorizzato" + errorRow);
  //       } else if (error.notEnablingNotNullable) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile rendere il campo " + field + " obbligatorio" + errorRow);
  //       } else if (error.notEnablingFk) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile abilitare il riferimento ad altro campo per " + field + errorRow);
  //       } else if (error.notEnablingPk) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile abilitare il vincolo su tabella per il campo " + field + errorRow);
  //       } else if (error.notDisablingPk) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile disabilitare il vincolo su tabella per il campo " + field + errorRow);
  //       }
  //   } else if (error.operation === "SAVING_UPDATING_VALUE") {
  //       if (error.absentValueField != null) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + error.absentValueField + " inesistente" + errorRow);
  //       } else if (error.violatedFk && error.violatedFkRefField != null) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare il campo " + error.violatedFkField + ". Chiave esterna " + //
  //                   error.value + " non trovata in " + error.violatedFkRefFieldTable + " - " + error.violatedFkRefField + errorRow);
  //       } else if (error.violatedFk) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + error.violatedFkField + " referenziato da altri campi" + errorRow);
  //       } else if (error.notNullable) {
  //           this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + error.notNullableField + " obbligatorio" + errorRow);
  //       } else if (error.tableAssociatedValues) {
  //           this.activityManager.engApplication.notifyMessage("Errore - Esistono dei campi e dei valori associati alla tabella. Solo la descrizione può essere modificata" + errorRow);
  //       } else if (error.duplicatedProgressive) {
  //           this.activityManager.engApplication.notifyMessage("Errore - Progressivo duplicato per il campo " + field + ". Modificare i campi della tabella" + errorRow);
  //       } else if (error.duplicatedValueColumnName) {
  //           this.activityManager.engApplication.notifyMessage("Errore - Campo duplicato. Modificare i nomi dei campi:" + field + errorRow);
  //       } else if (error.absentValueField != null) {
  //           this.activityManager.engApplication.notifyMessage("Errore - Il campo " + error.absentValueField + " non esiste per la tabella selezionata" + errorRow);
  //       } else if (error.violatedFk) {
  //           this.activityManager.engApplication.notifyMessage("Errore - Chiave esterna " + error.violatedFkRefField + "non valida sul campo " + error.violatedFkField + errorRow);
  //       } else if (error.notNullable) {
  //           this.activityManager.engApplication.notifyMessage("Errore - Il campo " + error.notNullableField + " deve essere valorizzato" + errorRow);
  //       } else if (error.violatedPk) {
  //           this.activityManager.engApplication.notifyMessage("Errore - Vincolo pk violato su " + error.valueTable + errorRow);
  //       }
  //   } else if (error.operation === "DELETING_TABLE") {
  //       if (error.tableAssociatedFields && !error.tableAssociatedValues) {

  //       var _this = this;
  //       var i18n = this.activity.getI18nService();
  //       return this.activity.getUserConfirmService().askConfirmMessage
  //       (i18n.instant('!i18n# CANCELLAZIONE_TABELLA'), i18n.instant('!i18n# Impossibile cancellare la tabella. Ci sono campi ad essa associati.' + errorRow + '!i18n# Continuare?')).then(function () {
  //           return _this.executeDeleteTabgenConfirm(true,true,false);
  //       });

  //       } else if (error.tableAssociatedValues) {

  //           var _this = this;
  //           var i18n = this.activity.getI18nService();
  //           return this.activity.getUserConfirmService().askConfirmMessage
  //           (i18n.instant('!i18n# CANCELLAZIONE_TABELLA'), i18n.instant('!i18n# Impossibile cancellare la tabella. Ci sono valori ad essa associati.' + errorRow + '!i18n# Continuare?')).then(function () {
  //               return _this.executeDeleteTabgenConfirm(true,true,true);
  //           });

  //       }
  //    }
  // }

}