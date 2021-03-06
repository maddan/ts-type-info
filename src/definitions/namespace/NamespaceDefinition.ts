﻿import {ExportableDefinitions, ModuleMemberDefinitions} from "./../../definitions";
import {MainFactory} from "./../../factories";
import {ClassStructure, EnumStructure, FunctionStructure, InterfaceStructure, TypeAliasStructure, NamespaceStructure, VariableStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {NamespaceWriter, ModuledWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {ModuledDefinition, NamedDefinition, ExportableDefinition, AmbientableDefinition, BaseDefinition, DefinitionType, OrderableDefinition} from "./../base";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";
import {NamespaceDeclarationType} from "./NamespaceDeclarationType";

export class NamespaceDefinition extends BaseDefinition
        implements NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition, OrderableDefinition {
    declarationType: NamespaceDeclarationType;

    constructor() {
        super(DefinitionType.Namespace);
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const flags = WriteFlags.Default;
        const namespaceWriter = new NamespaceWriter(writer, new ModuledWriter(writer));
        namespaceWriter.write(this, flags);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // ModuledDefinition
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    typeAliases: TypeAliasDefinition[];
    getExports: () => ExportableDefinitions[];
    addClass: (structure: ClassStructure) => ClassDefinition;
    addEnum: (structure: EnumStructure) => EnumDefinition;
    addFunction: (structure: FunctionStructure) => FunctionDefinition;
    addInterface: (structure: InterfaceStructure) => InterfaceDefinition;
    addNamespace: (structure: NamespaceStructure) => NamespaceDefinition;
    addTypeAlias: (structure: TypeAliasStructure) => TypeAliasDefinition;
    addVariable: (structure: VariableStructure) => VariableDefinition;
    getClass: (nameOrSearchFunction: string | ((classDef: ClassDefinition) => boolean)) => ClassDefinition;
    getEnum: (nameOrSearchFunction: string | ((enumDef: EnumDefinition) => boolean)) => EnumDefinition;
    getFunction: (nameOrSearchFunction: string | ((functionDef: FunctionDefinition) => boolean)) => FunctionDefinition;
    getInterface: (nameOrSearchFunction: string | ((interfaceDef: InterfaceDefinition) => boolean)) => InterfaceDefinition;
    getNamespace: (nameOrSearchFunction: string | ((namespaceDef: NamespaceDefinition) => boolean)) => NamespaceDefinition;
    getTypeAlias: (nameOrSearchFunction: string | ((typeAliasDef: TypeAliasDefinition) => boolean)) => TypeAliasDefinition;
    getVariable: (nameOrSearchFunction: string | ((variableDef: VariableDefinition) => boolean)) => VariableDefinition;
    directlyContains: (def: ModuleMemberDefinitions) => boolean;
    getNamespacesToDefinition: (searchDef: ModuleMemberDefinitions) => NamespaceDefinition[];
    getMembers: () => ModuleMemberDefinitions[];
    setOrderOfMember: (order: number, member: ModuleMemberDefinitions) => this;
    // OrderableDefinition
    order: number;
}

applyMixins(NamespaceDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, ModuledDefinition, AmbientableDefinition, OrderableDefinition]);
