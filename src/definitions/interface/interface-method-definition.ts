﻿import * as ts from "typescript";
import {BaseFunctionDefinition} from "./../function";
import {InterfaceDefinition} from "./interface-definition";
import {InterfaceMethodParameterDefinition} from "./interface-method-parameter-definition";
import {TypeChecker} from "./../../utils";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceDefinition, InterfaceMethodParameterDefinition> {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        super(typeChecker, symbol, InterfaceMethodParameterDefinition);
    }
}
