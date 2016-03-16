﻿import {ClassMethodParameterDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseClassMethodParameterBinder} from "./base";

export abstract class ClassMethodParameterBinder implements IBaseBinder {
    constructor(private baseClassMethodParameterBinder: BaseClassMethodParameterBinder) {
    }

    bind(def: ClassMethodParameterDefinition) {
        this.baseClassMethodParameterBinder.bind(def);
    }
}
