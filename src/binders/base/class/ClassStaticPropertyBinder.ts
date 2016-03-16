﻿import {ClassStaticPropertyDefinition} from "./../../../definitions";
import {AbstractableBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseClassPropertyBinder} from "./base";

export abstract class ClassStaticPropertyBinder implements IBaseBinder {
    constructor(private baseClassPropertyBinder: BaseClassPropertyBinder) {
    }

    bind(def: ClassStaticPropertyDefinition) {
        this.baseClassPropertyBinder.bind(def);
    }
}
