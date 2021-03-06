﻿import {BaseClassMethodDefinition, BaseClassMethodParameterDefinition} from "./../../../../definitions";
import {AsyncableBinder, DecoratableBinder, BaseFunctionBinder, FunctionBodyWriteableBinder} from "./../../base";
import {ScopedBinder} from "./ScopedBinder";

export abstract class BaseClassMethodBinder<ParameterType extends BaseClassMethodParameterDefinition> {
    constructor(
        private baseFunctionBinder: BaseFunctionBinder<ParameterType>,
        private decoratableBinder: DecoratableBinder,
        private scopedBinder: ScopedBinder,
        private asyncableBinder: AsyncableBinder,
        private functionBodyWriteableBinder: FunctionBodyWriteableBinder
    ) {
    }

    bind(def: BaseClassMethodDefinition<ParameterType, any>) {
        this.baseFunctionBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.scopedBinder.bind(def);
        this.asyncableBinder.bind(def);
        this.functionBodyWriteableBinder.bind(def);
    }
}
