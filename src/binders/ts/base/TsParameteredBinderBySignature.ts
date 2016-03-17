﻿import {TsSignature} from "./../../../wrappers";
import {BaseParameterDefinitionConstructor, BaseParameterDefinition} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {ParameteredBinder} from "./../../base";
import {TsParameterBinderByNodeConstructor} from "./TsParameteredBinderByNode";

export class TsParameteredBinderBySignature<ParameterType extends BaseParameterDefinition<any>> extends ParameteredBinder<ParameterType> {
    constructor(
        private mainFactory: MainFactory,
        private signature: TsSignature,
        private paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        private paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super();
    }

    getParameters() {
        return this.signature.getParameters().map(param => {
            const paramDefinition = new this.paramDefinition();
            const paramBinder = new this.paramBinder(this.mainFactory, param.getOnlyNode());

            paramBinder.bind(paramDefinition);

            return paramDefinition;
        });
    }
}