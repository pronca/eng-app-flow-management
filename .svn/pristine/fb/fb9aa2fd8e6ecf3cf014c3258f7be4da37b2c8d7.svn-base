import {Injectable} from '@angular/core';

import {
    ActivityManager,
    ColumnModelType,
    EngApplication,
    ItemRenderer,
    ItemRenderingValueCategory,
    ItemRenderingValueType
} from "eng-app";

/**
 * Renderers used in Flow Configuration Module
 */

@Injectable()
export class FlowConfigurationRenderers {

    icona: string = null;

    constructor(
        private engApplication: EngApplication,
        private activityManager: ActivityManager
    ) {
    }

    flowConfigFieldStyleRender(): ItemRenderer {
        return new ItemRenderer((item, context) => {
            return [{
                category: ItemRenderingValueCategory.GLOBAL_ITEM_STYLE,
                value: 'flow-conf-field-search-item'
            }];
        });
    }

    flowItemStyleRender(): ItemRenderer {
        return new ItemRenderer((item, context) => {
            return [{
                category: ItemRenderingValueCategory.GLOBAL_ITEM_STYLE,
                value: 'flow-search-item'
            }];
        });
    }

    dataSourceItemStyleRender(): ItemRenderer {
        return new ItemRenderer((item, context) => {
            return [{
                category: ItemRenderingValueCategory.GLOBAL_ITEM_STYLE,
                value: 'datasource-search-item'
            }];
        });
    }

    driverItemStyleRender(): ItemRenderer {
        return new ItemRenderer((item, context) => {
            return [{
                category: ItemRenderingValueCategory.GLOBAL_ITEM_STYLE,
                value: 'driver-search-item'
            }];
        });
    }

    versionItemStyleRender(): ItemRenderer {
        return new ItemRenderer((item, context) => {
            return [{
                category: ItemRenderingValueCategory.GLOBAL_ITEM_STYLE,
                value: 'version-search-item'
            }];
        });
    }

    anagraficaItemStyleRender(): ItemRenderer {
        return new ItemRenderer((item, context) => {
            return [{
                category: ItemRenderingValueCategory.GLOBAL_ITEM_STYLE,
                value: 'anagrafica-search-item'
            }];
        });
    }

    flowViewItemStyleRender(): ItemRenderer {
        return new ItemRenderer((item, context) => {
            return [{
                category: ItemRenderingValueCategory.GLOBAL_ITEM_STYLE,
                value: 'flow-view-search-item'
            }];
        });
    }

    flowExtractItemStyleRender(): ItemRenderer {
        return new ItemRenderer((item, context) => {
            return [{
                category: ItemRenderingValueCategory.GLOBAL_ITEM_STYLE,
                value: 'flow-extract-search-item'
            }];
        });
    }
    
      
    

    flowOutputItemStyleRender(): ItemRenderer {
        return new ItemRenderer((item, context) => {
            return [{
                category: ItemRenderingValueCategory.GLOBAL_ITEM_STYLE,
                value: 'flow-output-search-item'
            }];
        });
    }

    jobTalendItemStyleRender(): ItemRenderer {
        return new ItemRenderer((item, context) => {
            return [{
                category: ItemRenderingValueCategory.GLOBAL_ITEM_STYLE,
                value: 'jobTalend-search-item'
            }];
        });
    }



    flowStatusValue(label: string, property: string): ItemRenderer {
        return new ItemRenderer((item, itemRenderContext) => {
            if (item[property] == true) {
                return [{
                    type: ItemRenderingValueType.LABELED_VALUE,
                    label: "STATUS",
                    value: "ATTIVO"
                }];
            } else {
                return [{
                    type: ItemRenderingValueType.LABELED_VALUE,
                    label: "STATUS",
                    value: "DISATTIVO"
                }];
            }
        });

    }


    
    flowDataSourceDriverValue(label: string, property: string): ItemRenderer {
        return new ItemRenderer((item, itemRenderContext) => {
                return [{
                    type: ItemRenderingValueType.LABELED_VALUE,
                    label: label,
                    value: item[property].name
                }];
        });
    }


    flowValue(label: string, property: string): ItemRenderer {
        return new ItemRenderer((item, itemRenderContext) => {
            return [{
                type: ItemRenderingValueType.LABELED_VALUE,
                label: label,
                value: item[property].name
            }];
        });
    }

    flowVersionValue(label: string, property: string): ItemRenderer {
        return new ItemRenderer((item, itemRenderContext) => {
                return [{
                    type: ItemRenderingValueType.LABELED_VALUE,
                    label: label,
                    value: item[property].name
                }];
        });
    }

    flowConfTypeValue(label: string, property: string): ItemRenderer {
        return new ItemRenderer((item, itemRenderContext) => {
            if (item[property] == 1) {
                return [{
                    type: ItemRenderingValueType.LABELED_VALUE,
                    label: "FILTRO_TYPE",
                    value: "Statico"
                }];
            }
            if (item[property] == 0) {
                return [{
                    type: ItemRenderingValueType.LABELED_VALUE,
                    label: "FILTRO_TYPE",
                    value: "Dinamico"
                }];
            }
            if (item[property] == 2) {
                return [{
                    type: ItemRenderingValueType.LABELED_VALUE,
                    label: "FILTRO_TYPE",
                    value: "Standard"
                }];
            }
        });

    }


    /*
         flowStatusValue(status: any): ItemRenderer {
         return new ItemRenderer((item, itemRenderContext) => {
             if(!status){
                 return [{
                     type: 'dunno',
                     label: 'test',
                     value: item['status'][0].value
                 }];
             }else{
                 return [{
                     type: 'dunno',
                     value: item['status'][0].value
                 }];
             }
         });
     }*/

    /**
     * GRID FLOW EXTRACT RENDERERS
     */
    gridItemRenderer(property: string): ItemRenderer {
        return new ItemRenderer((item, itemRendererContext) => {
            return [{
                type: ColumnModelType.BODY_COLUMN,
                value: item[property]
            }];
        })
    }

    flowVersionValueGrid(property: string): ItemRenderer {
        return new ItemRenderer((item, itemRenderContext) => {
            return [{
                type: ColumnModelType.BODY_COLUMN,
                value: item[property].name
            }];
        });
    }

    gridEditItemIconRenderer(): ItemRenderer {
        return new ItemRenderer((item, itemRendererContext) => {
            return [{
                type: ColumnModelType.BODY_COLUMN,
                icon: 'keyboard_arrow_right',
                onClick: (item?: any) => {
                    let startingParams: any = {};
                    startingParams.editItem = item;
                    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
                    this.activityManager.startChildActivityByName("flow-output.edit", startingParams);
                    return Promise.resolve();
                }
            }];
        })
    }

    gridDeleteItemIconRenderer(): ItemRenderer {
        return new ItemRenderer((item, itemRendererContext) => {
            return [{
                type: ColumnModelType.BODY_COLUMN,
                icon: 'delete_forever',
                onClick: (item?: any) => {
                    alert("DELETE");
                    return Promise.resolve();
                }
            }];
        })
    }

    gridLockIconRenderer(): ItemRenderer {
        return new ItemRenderer((item, itemRendererContext) => {
            return [{
                type: ColumnModelType.BODY_COLUMN,
                icon: 'lock_open',
                onClick: (item?: any) => {
                    let startingParams: any = {};
                    startingParams.editItem = item;
                    this.activityManager.getCurrentPage().setPageMainObject(startingParams);
                    this.activityManager.startChildActivityByName("flow-output.edit", startingParams);
                    return Promise.resolve();
                }
            }];
        })
    }

    gridJobTalIconRenderer(): ItemRenderer {
        return new ItemRenderer((item, itemRendererContext) => {
            return [{
                type: ColumnModelType.BODY_COLUMN,
                icon: 'play_circle_outline',
                onClick: (item?: any) => {
                    alert("START JOB");
                    // let startingParams: any = {};
                    // startingParams.editItem = item;
                    // this.activityManager.getCurrentPage().setPageMainObject(startingParams);
                    // this.activityManager.startChildActivityByName("flow-output.edit", startingParams);
                    // return Promise.resolve();
                }
            }];
        })
    }

    gridViewIconRenderer(): ItemRenderer {
        return new ItemRenderer((item, itemRendererContext) => {
            return [{
                type: ColumnModelType.BODY_COLUMN,
                icon: 'list',
                onClick: (item?: any) => {
                    let startingParams: any = {};
                    //passare la configurazione negli starting params
                    alert("VIEW FLUSSO");
                    // startingParams.editItem = item;
                    // this.activityManager.getCurrentPage().setPageMainObject(startingParams);
                    // this.activityManager.startChildActivityByName("flow-view.list", startingParams);
                    return Promise.resolve();
                }
            }];
        })
    }


    gridDownloadXMLItemIconRenderer(): ItemRenderer {
        return new ItemRenderer((item, itemRendererContext) => {
            return [{
                type: ColumnModelType.BODY_COLUMN,
                icon: 'play_for_work',
                onClick: (item?: any) => {
                    let startingParams: any = {};
                    //passare la configurazione negli starting params
                    alert("VIEW FLUSSO");
                    // startingParams.editItem = item;
                    // this.activityManager.getCurrentPage().setPageMainObject(startingParams);
                    // this.activityManager.startChildActivityByName("flow-view.list", startingParams);
                    return Promise.resolve();
                }
            }];
        })
    }

}