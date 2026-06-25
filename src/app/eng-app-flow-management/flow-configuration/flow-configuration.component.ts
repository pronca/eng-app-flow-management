import {Injectable} from "@angular/core";

import {CommonRenderers, EngApplication,} from "eng-app";

import {FlowConfigurationService} from "./flow-configuration.service";
import {FlowConfigurationFilters} from "./flow-configuration.filters";

import {FlowConfigurationRenderers} from "./flow-configuration.renderers";


@Injectable()
export class FlowConfigurationComponent {

    constructor(
        public engApplication: EngApplication,
        public commonRenderers: CommonRenderers,
        public flowRenderers: FlowConfigurationRenderers,
        public flowConfigurationService: FlowConfigurationService,
        public flowConfigurationFilters: FlowConfigurationFilters) {
    }


    configureComponents(): void {
    }
}