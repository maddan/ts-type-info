﻿import {TsSignature} from "./../../../compiler";
import {BaseParameterDefinitionConstructor, BaseParameterDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {ParameteredBinder} from "./../../base";
import {TsParameterBinderByNodeConstructor} from "./TsParameteredBinderByNode";

export class TsParameteredBinderBySignature<ParameterType extends BaseParameterDefinition> extends ParameteredBinder<ParameterType> {
    constructor(
        private factory: TsFactory,
        private signature: TsSignature,
        private paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        private paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super();
    }

    getParameters() {
        return this.signature.getParameters().map(param => {
            const paramDefinition = new this.paramDefinition();
            const paramBinder = new this.paramBinder(this.factory, param.getOnlyNode());

            paramBinder.bind(paramDefinition);

            return paramDefinition;
        });
    }
}
