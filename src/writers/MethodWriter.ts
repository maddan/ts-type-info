﻿import {MethodDefinitions, ClassMethodDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {CallSignatureWriter} from "./CallSignatureWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {ParametersWriter} from "./ParametersWriter";
import {ScopeWriter} from "./ScopeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";
import {FunctionReturnTypeWriter} from "./FunctionReturnTypeWriter";

export class MethodWriter extends BaseDefinitionWriter<MethodDefinitions> {
    private callSignatureWriter = new CallSignatureWriter(this.writer);
    private typeParametersWriter = new TypeParametersWriter(this.writer);
    private parametersWriter = new ParametersWriter(this.writer);
    private scopeWriter = new ScopeWriter(this.writer);
    private functionBodyWriter = new FunctionBodyWriter(this.writer);
    private functionReturnTypeWriter = new FunctionReturnTypeWriter(this.writer);

    protected writeDefault(def: MethodDefinitions, flags: WriteFlags) {
        def.overloadSignatures.forEach(s => {
            this.writeStartOfFunctionHeader(def, flags);
            this.callSignatureWriter.write(s, flags);
        });
        this.writeImplementation(def, flags);
    }

    private writeImplementation(def: MethodDefinitions, flags: WriteFlags) {
        const showImplementation = def.overloadSignatures.length === 0 || (flags & WriteFlags.HideFunctionImplementations) === 0;

        if (showImplementation) {
            this.writeStartOfFunctionHeader(def, flags);
            this.typeParametersWriter.write(def.typeParameters, flags);
            this.parametersWriter.write(def.parameters, flags);
            this.functionReturnTypeWriter.write(def, flags);
            this.functionBodyWriter.write(def, flags);
        }
    }

    private writeStartOfFunctionHeader(def: MethodDefinitions, flags: WriteFlags) {
        this.scopeWriter.write((def as ClassMethodDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writeStatic(def);
        this.writeAbstract(def as ClassMethodDefinition);
        this.writeAsyncKeyword(def as ClassMethodDefinition);
        this.writer.conditionalWrite(def.isGenerator, "*");
        this.writer.write(def.name);
    }

    private writeStatic(def: MethodDefinitions) {
        if (def.isClassStaticMethodDefinition()) {
            this.writer.write("static ");
        }
    }

    private writeAbstract(def: ClassMethodDefinition) {
        if (def.isAbstract) {
            this.writer.write("abstract ");
        }
    }
}
