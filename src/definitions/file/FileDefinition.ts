import * as path from "path";
import {ExportableDefinitions, ModuleMemberDefinitions} from "./../../definitions";
import {MainFactory, StructureFactory} from "./../../factories";
import {ClassStructure, EnumStructure, FunctionStructure, ImportStructure, InterfaceStructure, NamespaceStructure, ReExportStructure, TypeAliasStructure,
    VariableStructure} from "./../../structures";
import {applyMixins, DefinitionUtils, validateImportStructure, FileUtils, StringUtils} from "./../../utils";
import {FileWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {writeDefinition} from "./../../writeDefinition";
import {ModuledDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expression";
import {NamespaceDefinition} from "./../namespace";
import {ClassDefinition} from "./../class";
import {InterfaceDefinition} from "./../interface";
import {EnumDefinition} from "./../enum";
import {FunctionDefinition} from "./../function";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";
import {ReExportDefinition} from "./ReExportDefinition";
import {ImportDefinition} from "./ImportDefinition";

export class FileDefinition extends BaseDefinition implements ModuledDefinition {
    fileName: string;
    imports: ImportDefinition[] = [];
    reExports: ReExportDefinition[] = [];
    defaultExportExpression: ExpressionDefinition;

    constructor() {
        super(DefinitionType.File);
    }

    addImport(structure: ImportStructure) {
        validateImportStructure(structure);
        const def = new StructureFactory().getImport(structure);
        this.imports.push(def);
        return def;
    }

    addReExport(structure: ReExportStructure) {
        const def = new StructureFactory().getReExport(structure);
        this.reExports.push(def);
        return def;
    }

    getModuleSpecifierToFile(file: FileDefinition) {
        if (StringUtils.isNullOrWhiteSpace(file.fileName) || StringUtils.isNullOrWhiteSpace(this.fileName)) {
            throw new Error("The files being compared must both have a fileName.");
        }

        const fileNameFrom = FileUtils.standardizeSlashes(this.fileName);
        const fileNameTo = FileUtils.standardizeSlashes(file.fileName);
        const relativePath = path.relative(path.dirname(fileNameFrom), path.dirname(fileNameTo));
        const fullPath = path.join(relativePath, path.basename(fileNameTo));
        const fullPathWithoutExtension = fullPath.replace(/\.[^/.]+$/, "");

        return "./" + FileUtils.standardizeSlashes(fullPathWithoutExtension);
    }

    getImport(searchFunction: (importDef: ImportDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.imports, searchFunction);
    }

    getReExport(searchFunction: (reExportDef: ReExportDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.reExports, searchFunction);
    }

    getExports(): ExportableDefinitions[] {
        const exports = ModuledDefinition.prototype.getExports.call(this) as ExportableDefinitions[];
        this.reExports.forEach(reExport => {
            reExport.getExports().forEach(def => {
                if (exports.indexOf(def) === -1) {
                    exports.push(def);
                }
            });
        });
        return exports;
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const fileWriter = new FileWriter(writer);
        fileWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    writeExportsAsDefinitionFile(options: { imports: { defaultImport: string; moduleSpecifier: string }[]; writeOptions?: WriteOptions; }) {
        console.warn("writeExportsAsDefinitionFile(...) is not supported. It has not been tested.");

        const writer = MainFactory.createWriter(options.writeOptions);

        if (options && options.imports) {
            // todo: should use an ImportWriter to write this
            options.imports.forEach(importStructure => {
                writer.writeLine(`import ${importStructure.defaultImport} from "${importStructure.moduleSpecifier}";`);
            });

            writer.newLine();
        }

        const writeFlags = WriteFlags.HideFunctionBodies | WriteFlags.HideExpressions | WriteFlags.HidePrivateMembers | WriteFlags.HideProtectedMembers |
            WriteFlags.HideFunctionImplementations;

        this.getExports().forEach((exportDef) => {
            writeDefinition(exportDef, writer, writeFlags);
            writer.newLine();
        });

        return writer.toString();
    }

    // ModuledDefinition
    namespaces: NamespaceDefinition[];
    classes: ClassDefinition[];
    interfaces: InterfaceDefinition[];
    enums: EnumDefinition[];
    functions: FunctionDefinition[];
    variables: VariableDefinition[];
    typeAliases: TypeAliasDefinition[];
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
}

applyMixins(FileDefinition, BaseDefinition, [ModuledDefinition]);
