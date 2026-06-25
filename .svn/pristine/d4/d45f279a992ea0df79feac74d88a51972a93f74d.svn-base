import { AnagraficaAssistitoDownload, AnagraficaAssistitoDTO, AnagraficaAssistitoPagination, Header } from './../flow-configuration/flow-configuration.model';
import {  Component, Input, ViewChild } from '@angular/core';



import {
    ActivityActionType,
    ActivityManager,
    EditActivityComponent,
    I18nService,
    Objects
} from 'eng-app';

import { FlowConfigurationService } from '../flow-configuration/flow-configuration.service';
import { AnagraficaAssistitoEdit } from './anagrafica-assistito-edit.component';
import { DatePipe } from '@angular/common';
import { MatSort,MatTableDataSource} from '@angular/material';


let pageCount = 0;
let firstResultDisplay = 0;

@Component({
    selector: 'anagrafica-assistito',
    templateUrl: './anagrafica-assistito.component.html',
    styleUrls: ['./anagrafica-assistito.component.scss']
  })
  
  export class AnagraficaAssistitoComponent extends EditActivityComponent {
  
    selectedValue: string;
    anagraficaAssistitoDTO: AnagraficaAssistitoDTO;
    anagraficaAssistitoDTOs : AnagraficaAssistitoDTO[] = [];
    anagraficaAssistitoDTOsExport : AnagraficaAssistitoDTO[] = [];
    anagraficaAssistitoPagination : AnagraficaAssistitoPagination; 
    anagraficaAssistitoDownload : AnagraficaAssistitoDownload;
    permissionEdit: boolean = true;
    displayedColumns: string[] = ['nome','cognome','datanascita','comunenascita','sesso','codiceFiscale','codicePaziente','comuneResidenza','nazionalita','aslResidenza','abilitazione','buttons'];
    optionColumns : string[] = ['Nome','Cognome','Data Nascita','Comune Nascita','Sesso','Codice Fiscale','Codice Paziente','Comune Residenza','Nazionalita','Asl Residenza','Abilitazione',];
    dataSource: MatTableDataSource<AnagraficaAssistitoDTO>;
    totalItems: number;
    endPage : number;
    editAna:string;
    selectedText: string;
    deleteAna:string;
    firstResultDisplay:number;
    maxItemPerPage: number = 10;
    selectedOption: string ='Nome';
    fileName:string =  'ExcelSheet.xlsx';
    showLoadingIndicator : boolean = false;
    abilitacione: string;
    filterValue: string;
    sortField: string = '';
    sortDir: string = 'ASC';
    isFilterActive: boolean = false;
    download_ = false;
    header: Header = new Header();


    
    
    //@ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true} ) sort: MatSort;
    @Input() multiple: boolean = true;
    
     

    constructor(
        private datepipe: DatePipe,
        private flowConfigurationService: FlowConfigurationService,
        private i18nService: I18nService,
        private activityManager: ActivityManager){ super() };
        

    ngOnInit(): void {
      let i18n = this.activity.getI18nService();
      this.editAna = i18n.instant("ANA_EDIT_DATA");
      this.deleteAna = i18n.instant("ANA_DELETE_DATA");
      this.anagraficaAssistitoPagination = new AnagraficaAssistitoPagination();
      this.anagraficaAssistitoDownload = new AnagraficaAssistitoDownload();
      this.anagraficaAssistitoDTO = new AnagraficaAssistitoDTO();     
      this.retriveAnagraficaAssistito(pageCount,this.maxItemPerPage);
      this.firstResultDisplay = pageCount + 1;
     
      console.log("InitCoumt:: "+pageCount);
      console.log("ParamInit:: "+this.selectedValue)

       
    }

    ngAfterViewInit() {
     
    }

    sortData(event){
        if(!this.isFilterActive){         
          this.showLoadingIndicator = true;
          this.sortField = event.active;
          this.sortDir = event.direction;
          console.log("Sort direction:: "+this.sortDir);
          this.flowConfigurationService.getAnagraficaAssistioPaginated(pageCount,this.maxItemPerPage , this.sortField, this.sortDir).then(response => {
         
          if (response.success) {
            if (response.opTargetObject.error){              
            } else {
              this.anagraficaAssistitoDTOs = response.opTargetObject.anagraficaData;
              this.anagraficaAssistitoDTOs.forEach((a) => {
                if(a.sesso =='M') a.sessoDescrizione = 'Maschio';
                else if(a.sesso =='F') a.sessoDescrizione = 'Femmina';
                if(a.abilitazione ==0) a.abilitazioneDescrizione = 'No';
                else if(a.abilitazione ==1) a.abilitazioneDescrizione = 'Si';
              });
              this.dataSource = new MatTableDataSource(this.anagraficaAssistitoDTOs);
            }
            this.showLoadingIndicator=false;
          }
          else {
            this.showLoadingIndicator=false;
            let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
            this.activityManager.engApplication.notifyMessage(errorMessage);
          }
        }).catch(() => {
          this.showLoadingIndicator=false;
          let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
          this.activityManager.engApplication.notifyMessage(errorMessage);
        });
      }
        
        return Promise.resolve();
    }
    
    initActivityActions() {
        super.initActivityActions();
        
        this.activity.removeActivityAction(EditActivityComponent.SAVE_ACTION);
        this.activity.addActivityAction({
            actionType: ActivityActionType.MAIN,
            name: AnagraficaAssistitoEdit.EDIT_ITEM,
            tooltip: "ANA_CREATE_DATA",
            icon: "add",
            fn: (activity, action) => {
                let starterParams: any = this.activity.startingParams;
                starterParams.popupHeight = '550px';
                starterParams.popupWidth = '520px';
                starterParams.extra = "N";
                starterParams.editItem = new AnagraficaAssistitoDTO;              
                this.selectedValue = starterParams
                this.activityManager.startChildPopupActivityByName("anagrafica-assistito.edit", starterParams);
                this.activityManager.onActivityStopped().subscribe(() =>{
                  if(this.isFilterActive){
                    let filter={
                       pageNo : pageCount,
                       pageSize: 10,
                       selectedOption : this.validateSelectedOption(this.selectedOption),
                       filterValue : this.filterValue
                     }
                     this.filterData(filter);
                   }else{
                    this.retriveAnagraficaAssistito(pageCount,this.maxItemPerPage);
                   }
                });
                return Promise.resolve(null);
            }
        });
        
        this.activity.addActivityAction({
            actionType: ActivityActionType.MAIN,
            name: AnagraficaAssistitoEdit.EDIT_ITEM,
            tooltip: "ANAGRAFICA_ASSISTITO_IMPORT_FILE",
            icon: "north",
            fn: (activity, action) => {
                let starterParams: any = this.activity.startingParams;
                starterParams.popupHeight = '400px';
                starterParams.popupWidth = '400px';
                starterParams.extra = "N";
                starterParams.editItem = this.anagraficaAssistitoDTO;
                this.activityManager.startChildPopupActivityByName("anagrafica-assistito-upload", starterParams);
                this.activityManager.onActivityStopped().subscribe(() =>{
                  this.retriveAnagraficaAssistito(pageCount,this.maxItemPerPage);
                });
                return Promise.resolve(null);
          }
         
      }); 
             this.activity.addActivityAction({
             actionType: ActivityActionType.MAIN,
             name: AnagraficaAssistitoEdit.EDIT_ITEM,
             tooltip: "ANAGRAFICA_ASSISTITO_EXPORT_FILE",
             icon: "south",
               fn: (activity, action) => {
                 let starterParams: any = this.activity.startingParams;
                this.exportData(this.anagraficaAssistitoDTOs);
                 return Promise.resolve(null);
               }

           });
        
      }

      openChildActivity(anagraficaAssistitoDTO: AnagraficaAssistitoDTO) {

        let startingParams: any = {};
        startingParams.popupHeight = '550px';
        startingParams.popupWidth = '720px';
        startingParams.editItem = anagraficaAssistitoDTO;
        startingParams.permission = this.permissionEdit;
        this.activityManager.getCurrentPage().setPageMainObject(startingParams);
        this.activityManager.startChildPopupActivityByName("anagrafica-assistito.edit", startingParams); 
        this.activityManager.onActivityStopped().subscribe(() =>{
        if(this.isFilterActive){
              let filter={
                pageNo : pageCount,
                pageSize: 10,
                selectedOption : this.validateSelectedOption(this.selectedOption),
                filterValue : this.filterValue
              }
              this.filterData(filter);
            }else{
              this.retriveAnagraficaAssistito(pageCount,this.maxItemPerPage);
            }
        });     
        
      }  

    retriveAnagraficaAssistito(pageNo:number, pageSize:number){
      this.showLoadingIndicator = true;
      this.isFilterActive = false;
      
      this.flowConfigurationService.getAnagraficaAssistioPaginated(pageNo,pageSize,this.sortField,this.sortDir).then(response => {
        if (response.success) {
         
          if (response.opTargetObject.error) {
          } else {
            console.log(response.opTargetObject);
            this.anagraficaAssistitoPagination = response.opTargetObject;
            this.anagraficaAssistitoDTOs = this.anagraficaAssistitoPagination.anagraficaData;
            this.anagraficaAssistitoDTOs.forEach((a) => {
              if(a.sesso =='M') a.sessoDescrizione = 'Maschio';
              else if(a.sesso =='F') a.sessoDescrizione = 'Femmina';
              if(a.abilitazione ==0) a.abilitazioneDescrizione = 'No';
              else if(a.abilitazione ==1) a.abilitazioneDescrizione = 'Si';
            });
            this.endPage = this.anagraficaAssistitoPagination.allPages;
            this.dataSource = new MatTableDataSource(this.anagraficaAssistitoDTOs);
              
            console.log("DATA:: "+this.anagraficaAssistitoPagination);
          }
        } else {
          let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
          this.activityManager.engApplication.notifyMessage(errorMessage);
        }
        this.showLoadingIndicator = false;
      }).catch(() => {
        this.showLoadingIndicator = false;
        let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
        this.activityManager.engApplication.notifyMessage(errorMessage);
      });
  
      return Promise.resolve();
    }

    getLocalizedDate(date : Date): string {
      let currentLocale = this.i18nService.getCurrentLocale();
      const datePipe: DatePipe = new DatePipe(currentLocale);
      return Objects.isNotEmpty(this.anagraficaAssistitoDTO.datanascita) ? datePipe.transform(this.anagraficaAssistitoDTO.datanascita, 'dd MM yyyy') : "";
    }
    
    deleteAnagraficAssData(anaDTO:AnagraficaAssistitoDTO){
      this.showLoadingIndicator = true;
      console.log("ID::"+ anaDTO.id);
      this.flowConfigurationService.deleteAnagraficaAssistitoData(anaDTO)
      .then(result => {
          if (result.success) {
              let res = result.opTargetObject;
              console.log("PageCount:: "+pageCount+" endPage:: "+this.endPage);
              if(this.isFilterActive){
               let filter={
                  pageNo : pageCount,
                  pageSize: 10,
                  selectedOption : this.validateSelectedOption(this.selectedOption),
                  filterValue : this.filterValue
                }
                this.filterData(filter);
              }else{
                this.retriveAnagraficaAssistito(pageCount,this.maxItemPerPage);
              }              
              if(pageCount>this.endPage){
                this.showLoadingIndicator = false;               
                this.getServerDataLeft();
              }
          } else {
              this.showLoadingIndicator = false;
              this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
          }
      })
      .catch(e => {
        this.showLoadingIndicator = false;
        this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
        console.log("Error:: "+e);
      });
    }

    goToFirstPage() : void{
      if(pageCount){
        pageCount = 0;
        if(this.isFilterActive){
          let filter={
            pageNo : pageCount,
            pageSize: 10,
            //selectedOption : this.selectedOption,
            //filterValue : this.filterValue
          }
          console.log("RightPage::  "+filter.pageNo+" pageCount "+filter.pageSize);
          this.filterData(filter);
        }else{
          this.retriveAnagraficaAssistito(pageCount, this.maxItemPerPage);
        }   
        console.log("FirstPage::  "+firstResultDisplay);
        this.firstResultDisplay = pageCount+1;      
      }
    }

    getServerDataLeft() : void{
      console.log("pageCount "+pageCount);
      if(pageCount){
        if(this.isFilterActive){
          let filter={
            pageNo : --pageCount,
            pageSize: 10,
            selectedOption : this.validateSelectedOption(this.selectedOption),
            filterValue : this.filterValue
          }
          console.log("LeftPage::  "+filter.pageNo+" pageCount "+pageCount);
          console.log("FresDisplay:: "+this.firstResultDisplay+" endPage "+this.endPage);
          this.filterData(filter);
        }else{
          this.retriveAnagraficaAssistito( --pageCount, this.maxItemPerPage)
        }           
        --this.firstResultDisplay   
           
      }    
    }

    getServerDataRight() :void{
      console.log("pageCount "+pageCount);
      if(this.firstResultDisplay <= this.endPage-1){
        if(this.isFilterActive){
          let filter={
            pageNo : ++pageCount,
            pageSize: 10,
            selectedOption : this.validateSelectedOption(this.selectedOption),
            filterValue : this.filterValue
          }
          console.log("RightPage:: "+filter.pageNo+" pageCount "+pageCount);
          console.log("FresDisplay:: "+this.firstResultDisplay+" endPage "+this.endPage);
          this.filterData(filter);
        }else{
          this.retriveAnagraficaAssistito(++pageCount, this.maxItemPerPage);
        }           
        ++this.firstResultDisplay;   
        
      }
    }

    goToLastPage() : void{
      console.log("LastPageFDisp:: "+this.firstResultDisplay+" pageCount:: "+pageCount);
      if(this.firstResultDisplay < this.endPage){

        if(this.isFilterActive){
          let filter={
            pageNo : this.endPage-1,
            pageSize: this.maxItemPerPage,
            selectedOption : this.validateSelectedOption(this.selectedOption),
            filterValue : this.filterValue           
          }
          this.firstResultDisplay = this.endPage;//dodato
          pageCount=this.endPage-1;//dodato
          console.log("RightPage::  "+filter.pageNo+" pageCount "+filter.pageSize);
          console.log("LastPageFDispI:: "+this.firstResultDisplay+" pageCount:: "+pageCount);
          this.filterData(filter);
        }else{
          this.retriveAnagraficaAssistito( this.endPage-1, this.maxItemPerPage);
        }          
        this.firstResultDisplay = this.endPage;
        pageCount=this.endPage-1;
        console.log("LastPageFDisp:: "+this.firstResultDisplay+" pageCount:: "+pageCount);
        
      }
    }

    exportData(anagraficaAssistitoDTOs : AnagraficaAssistitoDTO[]){
      this.download_ = true;
      this.header.label = "Download XLS in corso...";
      this.activityManager.getCurrentPage().setPageMainObject(this.header);
      //if(this.isFilterActive === false){
      // anagraficaAssistitoDTOs = [];
      //}
      this.showLoadingIndicator = true;
      this.anagraficaAssistitoDownload.anagraficaData = anagraficaAssistitoDTOs;
      if (this.selectedOption !== undefined && this.selectedOption !==null) {
        this.anagraficaAssistitoDownload.selectedOption=this.selectedOption;
      }
      if (this.filterValue !== undefined && this.filterValue !==null) {
        this.anagraficaAssistitoDownload.filterValue=this.filterValue;
      } 
      this.flowConfigurationService.downloadAnagraficaAssistitoXlsx(this.anagraficaAssistitoDownload)
      .then(result => {
        if (result.size > 0) {
          this.header.visible = false;
          this.header.label = "";
          this.activityManager.getCurrentPage().setPageMainObject(this.header);
            var file = new Blob([result], { type: 'application/zip' });
            var fileURL = URL.createObjectURL(file);
            var anchor = document.createElement("a");
            anchor.download = "AnagraficaAssistito"; 
            anchor.href = fileURL;
            anchor.click();   
            this.download_ = false;     
          } else {
            this.activityManager.engApplication.notifyMessage('Nessun file presente');
            this.download_ = false;
          }
          this.showLoadingIndicator = false;
      })
      .catch(e => {
        this.showLoadingIndicator = false;
        this.activityManager.engApplication.notifyMessage('Errore in fase di caricamento delle colonne');
        console.log("Error:: "+e);
      });

      
    }

 

onChangeSelect(){
  console.log("Column changed::")
  this.retriveAnagraficaAssistito(pageCount,this.maxItemPerPage);
}

filterData(filter) : Promise<any>{
  //this.endPage = 0;
  this.showLoadingIndicator=true;
  this.flowConfigurationService.getAnagraficaAssistitoFilter(filter).then(response => {
    if (response.success) {
      if (response.opTargetObject.error){              
      } else {
        this.isFilterActive = true;
        this.anagraficaAssistitoPagination = response.opTargetObject;
        this.anagraficaAssistitoDTOs= this.anagraficaAssistitoPagination.anagraficaData; 
        this.anagraficaAssistitoDTOs.forEach((a) => {
          if(a.sesso =='M') a.sessoDescrizione = 'Maschio';
          else if(a.sesso =='F') a.sessoDescrizione = 'Femmina';
          if(a.abilitazione ==0) a.abilitazioneDescrizione = 'No';
          else if(a.abilitazione ==1) a.abilitazioneDescrizione = 'Si';
        });
        this.dataSource = new MatTableDataSource(this.anagraficaAssistitoDTOs)

        this.endPage = this.anagraficaAssistitoPagination.allPages;
        console.log("EndInFilter::: " +this.endPage);
        this.dataSource = new MatTableDataSource(this.anagraficaAssistitoDTOs);
      }
      this.showLoadingIndicator=false;
    }
    else {
      this.showLoadingIndicator=false;
      let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore');
      this.activityManager.engApplication.notifyMessage(errorMessage);
    }
  }).catch((err) => {
    console.log("Error:: " + err);
    this.showLoadingIndicator=false;
    let errorMessage: string = this.activityManager.engApplication.i18nInstant('!i18n# Errore Inaspettato');
    this.activityManager.engApplication.notifyMessage(errorMessage);
  });

  return Promise.resolve();
}

startSearch(selectedOption: string, selectedText: any) : Promise<any>{
   
  this.filterValue = selectedText;
  console.log("FilterValue:: "+this.filterValue);
  pageCount = 0;
  this.firstResultDisplay = pageCount + 1;
  //this.endPage = 0;
  let filter={
    selectedOption : this.validateSelectedOption(selectedOption),
    filterValue : this.validateFilter(this.filterValue,selectedOption),
    pageNo : pageCount,
    pageSize: this.maxItemPerPage
  }
  if(this.filterValue!= '' ){ 
    console.log("MAxfilterSearch:: "+this.maxItemPerPage)
    this.isFilterActive = true;   
    this.filterData(filter);
}else{
  console.log("FilterLL:: "+pageCount+" "+this.maxItemPerPage)
  this.isFilterActive = false; 
  this.retriveAnagraficaAssistito(pageCount,this.maxItemPerPage);
}
  return Promise.resolve();
}

validateSelectedOption(selectedOption : string):string{
  if(selectedOption === 'Data Nascita'){
    selectedOption = 'datanascita'
  }else if(selectedOption === 'Nome'){
    selectedOption = 'nome'
  }else if(selectedOption === 'Cognome'){
    selectedOption = 'cognome'
  }else if(selectedOption === 'Comune Nascita'){
    selectedOption = 'comunenascita'
  }else if(selectedOption === 'Sesso'){
    selectedOption = 'sesso'
  }else if(selectedOption === 'Codice Fiscale'){
    selectedOption = 'codiceFiscale'
  }else if(selectedOption === 'Codice Paziente'){
    selectedOption = 'codicePaziente'
  }else if(selectedOption === 'Comune Residenza'){
    selectedOption = 'comuneResidenza'
  }else if(selectedOption === 'Asl Residenza'){
    selectedOption = 'aslResidenza'
  }else if(selectedOption === 'Nazionalita'){
    selectedOption = 'nazionalita'
  }else if(selectedOption === 'Abilitazione'){
    selectedOption = 'abilitazione'
  }
  return selectedOption;
}

clearInput(){
  this.selectedText = '';
}

validateFilter(filterValue: String,selectedOption: String) : String{
  if(selectedOption === "Abilitazione") {
    if(filterValue.toLowerCase().includes("s") || filterValue.toLowerCase().includes("i")){
      filterValue = '1';
    }else if(filterValue.toLowerCase().includes("n") || filterValue.toLowerCase().includes("o")){
      filterValue = '0';
    }else{
      filterValue = '-1';
    }
  } else if (selectedOption === "Sesso") {
    if(filterValue.toLowerCase() === "maschio" || filterValue.toLowerCase() === "m"){
      filterValue = 'M';
    }else if(filterValue.toLowerCase() === "femmina" || filterValue.toLowerCase() === "f"){
      filterValue = 'F';
    }
  }
  
  return filterValue;
}

resetSearch(): void {
  // Reset dei campi filtro
  this.selectedOption = 'Nome'; 
  this.selectedText = '';
  this.filterValue = '';
  
  // Reset stato filtro + ordinamento
  this.isFilterActive = false;
  this.sortField = '';
  this.sortDir = 'ASC';

  // Reset paginazione
  pageCount = 0;
  this.firstResultDisplay = 1;

  // Ricarico tutti i dati senza filtri
  this.retriveAnagraficaAssistito(pageCount, this.maxItemPerPage);
}

}


