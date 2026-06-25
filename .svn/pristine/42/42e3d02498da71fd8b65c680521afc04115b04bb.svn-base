import {Component, Inject} from '@angular/core';

import {
    Activity,
    ActivityActionType,
    ActivityManager,
    BadgeItemComponent,
    ItemRenderingValue,
    ItemRenderingValueCategory,
    ItemRenderingValueType,
    SearchActivityComponent,
    SearchFilters
} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration/flow-configuration.service";
import {AnagraficaTable, Header} from "../flow-configuration/flow-configuration.model";
import { AnagraficaActivityComponent } from './anagrafica-search-activity/anagrafica-search-activity.component';

@Component({
  selector: 'badge-item-req',
  templateUrl: './badge-item-req.component.html',
  styleUrls: ['./badge-item-req.component.scss']
})
export class BadgeItemRequest extends BadgeItemComponent {
    download_ = false;
    imageData = '';
    mainImageValue: ItemRenderingValue;
    badgeBodyValues: ItemRenderingValue[];
    request: Request;
    status: any;
    fullname: string;
    anagraficaTable: AnagraficaTable;
    AnagraficaEditActivityComponent: any;
    header: Header = new Header();
    permissionEdit: boolean = true;


    constructor(
        @Inject('SearchActivityComponent') public searchComponent: SearchActivityComponent,
        @Inject('item') public item: AnagraficaTable,
        public activityManager: ActivityManager,
        public activity: Activity,
        public flowConfigurationService: FlowConfigurationService
    ) {
        super();
    }

    ngOnInit() {
  
  if(!(this.searchComponent as AnagraficaActivityComponent).getPermission()){
    this.permissionEdit = false;
  }

        super.ngOnInit();

        this.badgeBodyValues = this.getInlineItemValues().filter(val => {
            return val !== this.mainImageValue;
        });
    }

    initializeImageStyle(): any {
        if (this.imageData && this.imageData !== '') {
            return {'background-image': 'url(' + this.imageData + ')'};
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

    delete(psAction: String, poRequest: Request, poSelected: any, $event): Promise<any> {
        var _this = this;
        var i18n = this.activity.getI18nService();
        return this.activity.getUserConfirmService().askConfirmMessage
        (i18n.instant('CANCELLAZIONE_TABELLA'), i18n.instant('!i18n# Confermi di voler cancellare la tabella?')).then(function () {
            return _this.executeDeleteTabgenConfirm(false, false, false);
        });
    }

    executeDeleteTabgenConfirm(deleteAll: boolean, deleteField: boolean, deleteValue: boolean): Promise<any> {
        this.flowConfigurationService.deleteTabgenForm(this.item, deleteAll, deleteField, deleteValue).then(response => {
            if (response.success) {
                if (response.opTargetObject.error) {
                    this.manageError(response.opTargetObject.error, null);
                } else {
                    let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Tabella eliminata con successo');
                    this.activityManager.engApplication.notifyMessage(successMessage);
                    this.searchComponent.refreshSearch();
                }
            } else {
                let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
                this.activityManager.engApplication.notifyMessage(errorMessage);
            }
        }).catch(() => {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
            this.activityManager.engApplication.notifyMessage(errorMessage);
        });

        return Promise.resolve();
    }

    exportcheck(psAction: String, poRequest: Request, poSelected: any, $event)
    {
        if(!this.download_){
            this.export(psAction, poRequest, poSelected, $event);
        }
        else{
            this.activityManager.engApplication.notifyMessage('Download File XLS in corso, attendere il completamento');
        }
    }

  export(psAction: String, poRequest: Request, poSelected: any, $event) {
      this.download_ = true;
    this.header.label = "Donwloading File...";
    this.activityManager.getCurrentPage().setPageMainObject(this.header);

    let filter = new SearchFilters();
    filter.id = this.item.id;
    this.flowConfigurationService.exportTable(filter).then(idExp => {
      this.checkExport(idExp.opTargetObject);
    }).catch((e) => {

      this.activityManager.engApplication.notifyMessage('Errore inaspettato in fase di esportazione del file');
        this.download_ = false;
    });

  }

  checkExport(id) {
    this.flowConfigurationService.checkExportTable(id).then((result) => {
      //result.opTargetObject = true;
      if (result.opTargetObject) {
        let externalUrl =   this.flowConfigurationService.downloadExportTable(id);
        window.open(externalUrl);
        this.header.visible= false;
        this.header.label = "";
        this.activityManager.getCurrentPage().setPageMainObject(this.header);
          this.download_ = false;
      }
      else {        
        setTimeout(() => this.checkExport(id), 1000);
      }
    });
  }

  getClass(r: Request): string {
    return 'material-icons';
  }


  openChildActivity(act2Name: string, asPopup: boolean) {

    let startingParams: any = {};
    startingParams.editItem = this.item;
    startingParams.permission = this.permissionEdit;

    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
    this.activityManager.startChildActivityByName("anagrafica.edit", startingParams);
  }


  manageError( error: any, i: number ) {
    let errorRow = error.errorExcelRowNumber != null ? " Riga errata : " + error.errorExcelRowNumber : "";
    let field = " ";
    if (error.fields != null && error.fields.length > 0) {
        for(let f=0; f<error.fields.length; f++){
            field = field + f + ' ';
        }
    }
    if (error.operation === "SAVING_UPDATING_TABLE") {
        if (error.tableAssociatedValues) {
            this.activityManager.engApplication.notifyMessage('Attenzione - Impossibile salvare la tabella. Ci sono valori ad essa associati'/* + errorRow*/);
        } else if (error.violatedPk) {
            this.activityManager.engApplication.notifyMessage("Attenzione - L'identificativo scelto è già stato assegnato" + errorRow);
        }
    } else if (error.operation === "SAVING_UPDATING_FIELD") {
        if (error.duplicatedProgressive) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Progressivo campo duplicato per " + field + errorRow);
        } else if (error.invalidValueColumnName) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Nome campo non valido : " + field + errorRow);
        } else if (error.duplicatedValueColumnName) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Nome campo duplicato : " + error.fieldTable + errorRow);
        } else if (error.fieldReferencingFields) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare i campi. Esistono riferimenti al campo " + field + errorRow);
        } else if (error.fieldAssociatedValues) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + field + " valorizzato" + errorRow);
        } else if (error.notEnablingNotNullable) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile rendere il campo " + field + " obbligatorio" + errorRow);
        } else if (error.notEnablingFk) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile abilitare il riferimento ad altro campo per " + field + errorRow);
        } else if (error.notEnablingPk) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile abilitare il vincolo su tabella per il campo " + field + errorRow);
        } else if (error.notDisablingPk) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile disabilitare il vincolo su tabella per il campo " + field + errorRow);
        }
    } else if (error.operation === "SAVING_UPDATING_VALUE") {
        if (error.absentValueField != null) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + error.absentValueField + " inesistente" + errorRow);
        } else if (error.violatedFk && error.violatedFkRefField != null) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare il campo " + error.violatedFkField + ". Chiave esterna " + //
                    error.value + " non trovata in " + error.violatedFkRefFieldTable + " - " + error.violatedFkRefField + errorRow);
        } else if (error.violatedFk) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + error.violatedFkField + " referenziato da altri campi" + errorRow);
        } else if (error.notNullable) {
            this.activityManager.engApplication.notifyMessage("Attenzione - Impossibile salvare. Campo " + error.notNullableField + " obbligatorio" + errorRow);
        } else if (error.tableAssociatedValues) {
            this.activityManager.engApplication.notifyMessage("Errore - Esistono dei campi e dei valori associati alla tabella. Solo la descrizione può essere modificata" + errorRow);
        } else if (error.duplicatedProgressive) {
            this.activityManager.engApplication.notifyMessage("Errore - Progressivo duplicato per il campo " + field + ". Modificare i campi della tabella" + errorRow);
        } else if (error.duplicatedValueColumnName) {
            this.activityManager.engApplication.notifyMessage("Errore - Campo duplicato. Modificare i nomi dei campi:" + field + errorRow);
        } else if (error.absentValueField != null) {
            this.activityManager.engApplication.notifyMessage("Errore - Il campo " + error.absentValueField + " non esiste per la tabella selezionata" + errorRow);
        } else if (error.violatedFk) {
            this.activityManager.engApplication.notifyMessage("Errore - Chiave esterna " + error.violatedFkRefField + "non valida sul campo " + error.violatedFkField + errorRow);
        } else if (error.notNullable) {
            this.activityManager.engApplication.notifyMessage("Errore - Il campo " + error.notNullableField + " deve essere valorizzato" + errorRow);
        } else if (error.violatedPk) {
            this.activityManager.engApplication.notifyMessage("Errore - Vincolo pk violato su " + error.valueTable + errorRow);
        }
    } else if (error.operation === "DELETING_TABLE") {
        if (error.tableAssociatedFields && !error.tableAssociatedValues) {

        var _this = this;
        var i18n = this.activity.getI18nService();
        return this.activity.getUserConfirmService().askConfirmMessage
        (i18n.instant('CANCELLAZIONE_TABELLA'), i18n.instant('!i18n# Attenzione! Ci sono campi presenti in tabella.' + errorRow + ' Continuare?')).then(function () {
            return _this.executeDeleteTabgenConfirm(true,true,false);
        });

        } else if (error.tableAssociatedValues) {

            var _this = this;
            var i18n = this.activity.getI18nService();
            return this.activity.getUserConfirmService().askConfirmMessage
            (i18n.instant('CANCELLAZIONE_TABELLA'), i18n.instant('!i18n# Attenzione!. Ci sono valori presenti in tabella.' + errorRow + ' Continuare?')).then(function () {
                return _this.executeDeleteTabgenConfirm(true,true,true);
            });

        }
     }
  }

}