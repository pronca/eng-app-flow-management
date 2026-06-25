import {Component} from '@angular/core';


import {ActivityAction, ActivityManager, EditActivityComponent,} from 'eng-app';

import {FlowConfigurationService} from "../flow-configuration/flow-configuration.service";
import {AnagraficaTable, TabgenField, TabgenValue} from "../flow-configuration/flow-configuration.model";

@Component({
  selector: 'value-edit-activity',
  templateUrl: './value-edit-activity.component.html',
  styleUrls: ['./value-edit-activity.component.scss']

})
export class ValueEditActivityComponent extends EditActivityComponent  {
  
    anagraficaTable: AnagraficaTable;
    valuee: any;
    valuee2: TabgenField[] = [];
    element: TabgenValue
    convertback: TabgenValue;

constructor(
    private flowConfigurationService: FlowConfigurationService,
    private activityManager: ActivityManager,
){
    super();
}
  
  ngOnInit(): void {

    let starterParams: any = this.activity.startingParams;
    if (starterParams.extra == "N"){
        this.element = new TabgenValue();
        this.anagraficaTable = starterParams.editItem;
        this.anagraficaTable.tabgenFields = starterParams.editItem.tabgenFields;
        this.valuee = starterParams.editItem.type;
        this.valuee2 = starterParams.editItem.tabgenFields;
        this.anagraficaTable.tabgenFields = this.valuee2;
        this.anagraficaTable.fieldNum = starterParams.editItem.fieldNum;
        this.element.tabgen = this.anagraficaTable;
    }
    else if (starterParams && starterParams.editItem) {
        this.anagraficaTable = starterParams.editItem;
        this.anagraficaTable.tabgenFields = starterParams.editItem.tabgenFields;
        this.anagraficaTable.tabgenValues = starterParams.editItem.tabgenValues;
        this.valuee = starterParams.editItem.type;
        this.valuee2 = starterParams.editItem.tabgenFields;
        this.anagraficaTable.tabgenFields = this.valuee2;
        this.anagraficaTable.fieldNum = starterParams.editItem.fieldNum;
        this.element = starterParams.extra;
        this.element.tabgen = this.anagraficaTable;
    }
  }


  executeSaveAction(action: ActivityAction): Promise<any> {
    //this.convertTabgen()
    let check: boolean = this.checkDate();
    if(check){
        this.convertback = this.convert();
        this.convertback.tabgen = this.element.tabgen;
        
        this.flowConfigurationService.saveValueForm(this.convertback).then(response => {
        if (response.success) {
            if (response.opTargetObject.error) {
                this.manageError(response.opTargetObject.error);
            }else{
            let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Valore salvato con successo');
            this.activityManager.engApplication.notifyMessage(successMessage);
            this.activityManager.goBack();
            }
        } else if (response.errors) {
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore: Esiste già una configurazione con chiave id : '+this.convertback.field1);
            this.activityManager.engApplication.notifyMessage(errorMessage);
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

}

change(change, property){
    this.element[property] = change;
}

changeDate($event, property) {
    if ($event && $event.isTrusted) {
    return }
    
    let date = $event;
    this.element[property] = date;
    }

convert(): any{
    let  h =  this.anagraficaTable.tabgenFields.length;
    let data = {};
    for(let j = 1; j <= h ; j++){
        let valueColumn = this.anagraficaTable.tabgenFields[j-1].tabgenValueColumn;
        let columnName = this.anagraficaTable.tabgenFields[j-1].description;
        let columnValue = this.element[columnName];
        data[valueColumn.toLowerCase()] = columnValue;
    }
    data["enabledDate"] = this.element["enabledDate"];
    data["disabledDate"] = this.element["disabledDate"];
    data["id"] = this.element["id"];
    return data;
}

executeDeleteAction(action: ActivityAction): Promise<any> {
var _this = this;
        var i18n = this.activity.getI18nService();
        return this.activity.getUserConfirmService().askConfirmMessage
        (i18n.instant('!i18n# Eliminazione valore'), i18n.instant('!i18n# Confermi di voler eliminare il valore?')).then(function () {
            return _this.executeDeleteConfirm();
        });
}

executeDeleteConfirm(){
    this.convertback = this.convert();
    this.convertback.tabgen = this.element.tabgen;
    this.flowConfigurationService.deleteValueForm(this.convertback).then(response => {
        if (response.success) {
            if (response.opTargetObject.error) {
                this.manageError(response.opTargetObject.error);
            }else{
            let successMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Valore eliminato con successo');
            this.activityManager.engApplication.notifyMessage(successMessage);
            this.activityManager.goBack();
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

checkDate(): boolean{
    if(this.element.enabledDate>this.element.disabledDate){
        let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore: la data di abilitazione deve essere minore della data di disabilitazione');
        this.activityManager.engApplication.notifyMessage(errorMessage);
        return false;
    }else{
        return true;
    }
}

manageError( error ) {
    // if (result.getError() != null) {
    
    let errorRow = error.getErrorExcelRowNumber() != null ? " Riga errata : " + error.getErrorExcelRowNumber() : "";
    let field = " ";
    if (error.getFields() != null && error.getFields().size() > 0) {
        for(let f=0; f<error.fields.size(); f++){
            field = field + f + ' ';
        }
    }
    if (error.operation === "SAVING_UPDATING_VALUE") {
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
    } 
}

checkDirtyChange(change) {}
//     if (change.source && change.source.preventDirtyState) {
//       // skip makeDirty
//     } else {
//       this.activity.markDirty();
//     }
//   }

/*
convertTabgen() {
            // this.anagraficaTable.id = this.formGroup.value.id;
            // this.anagraficaTable.description = this.formGroup.value.description;
            // this.anagraficaTable.fieldNum = this.formGroup.value.fieldNum;
            // this.anagraficaTable.type = this.formGroup.value.type;
    
            // let i = this.anagraficaTable.tabgenFields.length;
            // for (let j = 0; j < i; j++) {
            //   this.anagraficaTable.tabgenFields[j].description = this.formGroup.value["description"+j];
            //   this.anagraficaTable.tabgenFields[j].type = this.formGroup.value["type"+j];
            //   this.anagraficaTable.tabgenFields[j].format = this.formGroup.value["format"+j];
            //   this.anagraficaTable.tabgenFields[j].pk= this.formGroup.value["pk"+j];
            //   this.anagraficaTable.tabgenFields[j].nullable = this.formGroup.value["nullable"+j];
    
            // }
        //     if(this.anagraficaTable.tabgenValues != null) {
            
                let k = this.anagraficaTable.tabgenValues.length;
                let a = this.anagraficaTable.tabgenFields.length;
                for (let m = 0; m < k; m++) {
                    for (let x = 0; x < a; a++) {
                        this.anagraficaTable.tabgenValues[m].enabledDate = this.formGroup.value["DATA_ABILITAZIONE"];
                        this.anagraficaTable.tabgenValues[m].disabledDate = this.formGroup.value["DATA_DISABILITAZIONE"];
                        this.anagraficaTable.tabgenValues[m].id = this.formGroup.value[this.anagraficaTable.tabgenFields[x].description];
                        this.anagraficaTable.tabgenValues[m].field1 = this.formGroup.value["fieldregexp0"+m];
                        this.anagraficaTable.tabgenValues[m].field2 = this.formGroup.value["fieldtype0"+m];
                        this.anagraficaTable.tabgenValues[m].field3 = this.formGroup.value["fieldkey0"+m];
                        this.anagraficaTable.tabgenValues[m].field4 = this.formGroup.value["fieldlength0"+m];
                        this.anagraficaTable.tabgenValues[m].field5 = this.formGroup.value["fieldrefdate0"+m];
                }
            }
    
}*/

}


















