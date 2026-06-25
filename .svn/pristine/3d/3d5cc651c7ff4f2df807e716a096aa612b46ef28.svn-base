import {Injectable} from '@angular/core';

import {EngApplication, FieldType, FilterModelElement} from "eng-app";


import {FlowConfigurationService} from "./flow-configuration.service";

/**
 * Service which holds all filter model
 * elements presented in Flow Manager Module.
 */
@Injectable()
export class FlowConfigurationFilters {
    formFlowListSearchDataProvider(): FilterModelElement {
        throw new Error("Method not implemented.");
    }

    constructor(private engApplication: EngApplication,
                private flowConfigurationService: FlowConfigurationService
    ) {}

    // Flow Configuration filters
    flowNameFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.TEXT_FIELD,
            label: 'DS_LABEL_NAME',
            prefixIcon: 'search',
            filterName: 'name'
        });
    }

    // DataSource filters
    dataSourceNameFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.TEXT_FIELD,
            label: 'DS_LABEL_NAME',
            prefixIcon: 'search',
            filterName: 'dataSourceNameLike'
        });
    }

    // Driver filters
    driverNameFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.TEXT_FIELD,
            label: 'DR_LABEL_NAME',
            prefixIcon: 'search',
            filterName: 'driverNameLike'
        });
    }

    // Version filters 1
    versionNameFilterModelElementOne(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.TEXT_FIELD,
            label: 'DR_LABEL_NAME',
            prefixIcon: 'search',
            filterName: 'versionLike',
            
        });
    }
    // Version filters 2
    versionNameFilterModelElementTwo(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.SELECT_FIELD,
            fieldConfigs: {
                valueSet :"flow-value-set@local",
                //defaultValue: "Pronto_Soccorso"
            },
            label: 'DR_LABEL_NAME',
            prefixIcon: 'search',
            filterName: 'id'
        });
    }

    // Anagrafica filters
    anagraficaNameFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.TEXT_FIELD,
            label: 'DS_LABEL_NAME',
            prefixIcon: 'search',
            filterName: 'id'
        });
    }

    anagraficaNameFilterModelElementTwo(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.SELECT_FIELD,
            fieldConfigs: {
                valueSet :"typeTab-value-set@local",
            },
            label: 'AN_TYPE',
            prefixIcon: 'search',
            filterName: 'type'
        });
    }

  /*  flowExtractNameFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.TEXT_FIELD,
            label: 'FLUSSO',
            prefixIcon: 'search',
            filterName: 'flow'
        });
    }*/

    
    flowExtractFlowsFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.SELECT_FIELD,
            fieldConfigs: {
                valueSet :"fm/FlowDTO@global",
            },
            label: 'FLUSSO',
            prefixIcon: 'search',
            filterName: 'flow',
        });
    }

    flowExtractDateFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.DATE_FIELD,
            label: 'DAL',
            prefixIcon: 'search',
            filterName: 'requestDateFrom'
        });
    }

    flowExtractDate2FilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.DATE_FIELD,
            label: 'AL',
            prefixIcon: 'search',
            filterName: 'requestDateTo'
        });
    }

    flowExtractVersionFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.SELECT_FIELD,
            fieldConfigs: {
                valueSet :"fm/VersionDTO@global",
            },
            label: 'VERSIONE',
            prefixIcon: 'search',
            filterName: 'version',
        });
    }

    flowExtractDateEndFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.DATE_FIELD,
            label: 'FINE ESTRAZIONE',
            prefixIcon: 'search',
            filterName: 'endExtractionDate',
        });
    }

    talendNameFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.TEXT_FIELD,
            label: 'DS_LABEL_NAME',
            prefixIcon: 'search',
            filterName: 'description'
        });
    }

    flowExtractStatusFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.SELECT_FIELD,
            fieldConfigs: {
                valueSet :"StateDTO@global",
            },
            label: 'STATUS',
            prefixIcon: 'search',
            filterName: 'state'
        });
    }

    flowExtractStatus2FilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.SELECT_FIELD,
            fieldConfigs: {
                valueSet :"State2DTO@global",
            },
            label: 'STATUS',
            prefixIcon: 'search',
            filterName: 'state'
        });
    }


    /**
     * FlowConfigurationFilter filters
     */
    flowConfigurationFilterNameFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.TEXT_FIELD,
            label: 'DS_LABEL_NAME',
            prefixIcon: 'search',
            filterName: 'nameFlowConfFilter'
        });
    }
    
    flowConfigurationFilterTypeFilterModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.SELECT_FIELD,
            fieldConfigs: {
                valueSet: "confFilterType-value-set@local",
            },
            label: 'CONF_TYPE',
            prefixIcon: 'search',
            filterName: 'type',
        });
    }

    flowConfigurationFilterFlowModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.SELECT_FIELD,
            fieldConfigs: {
                valueSet: "fm/FlowDTO@global",
            },
            label: 'FLUSSO',
            prefixIcon: 'search',
            filterName: 'flowName',
        });
    }

    flowConfigurationFilterVersionModelElement(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.SELECT_FIELD,
            fieldConfigs: {
                valueSet: "fm/VersionDTO@global",
            },
            label: 'VERSIONE',
            prefixIcon: 'search',
            filterName: 'version',
        });
    }

    flowConfigurationFilterStatus(): FilterModelElement {
        return new FilterModelElement({
            fieldType: FieldType.SELECT_FIELD,
            fieldConfigs: {
                valueSet :"status-value-set@local",
            },
            label: 'DS_LABEL_STATUS',
            prefixIcon: 'search',
            filterName: 'status'
        });
    }

}