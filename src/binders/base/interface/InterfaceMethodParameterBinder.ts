﻿import {InterfaceMethodParameterDefinition} from "./../../../definitions";
import {BaseParameterBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export abstract class InterfaceMethodParameterBinder implements IBaseBinder {
    constructor(private baseParameterBinder: BaseParameterBinder) {
    }

    bind(def: InterfaceMethodParameterDefinition) {
        this.baseParameterBinder.bind(def);
    }
}
