﻿import {FileDefinition, ModuleMemberDefinitions, ImportDefinition, ImportPartDefinition} from "./../../definitions";
import {DefinitionRenameInfo} from "./DefinitionRenameInfo";
import {RenameInfo} from "./RenameInfo";

export class FileImportsAnalyzer {
    private searchingModuleSpecifier: string;
    private exportDef: ModuleMemberDefinitions;

    constructor(private file: FileDefinition, private renameInfo: DefinitionRenameInfo) {
        this.searchingModuleSpecifier = this.renameInfo.getModuleSpecifierFromFile(this.file);
        this.exportDef = this.renameInfo.getExportDefinitionOfFile();
    }

    getRenameInfosFromFile() {
        const renameInfos: RenameInfo[] = [];

        this.file.imports.forEach(importDef => {
            renameInfos.push(...this.getRenameInfosFromImport(importDef));
        });

        return renameInfos;
    }

    private getRenameInfosFromImport(importDef: ImportDefinition) {
        const renameInfos: RenameInfo[] = [];

        if (importDef.moduleSpecifier === this.searchingModuleSpecifier) {
            renameInfos.push(...this.getRenameInfosFromStarImport(importDef.starImportName));

            importDef.namedImports.forEach(named => {
                renameInfos.push(...this.getRenameInfosFromNamedImport(named));
            });
        }

        return renameInfos;
    }

    private getRenameInfosFromStarImport(starImportName: string): RenameInfo[] {
        if (starImportName == null) {
            return [];
        }
        else {
            return [{
                fullName: starImportName + "." + this.renameInfo.getNameWithNamespaces(this.renameInfo.getOldName()),
                fullReplace: starImportName + "." + this.renameInfo.getNameWithNamespaces(this.renameInfo.getNewName())
            }];
        }
    }

    private getRenameInfosFromNamedImport(named: ImportPartDefinition) {
        const renameInfos: RenameInfo[] = [];

        named.definitions.forEach(def => {
            if (def.name === this.renameInfo.getSearchingForDefinitionName()) {
                const hasAlias = named.importName !== this.renameInfo.getOldName();

                if (hasAlias || this.exportDef.isDefaultExportOfFile) {
                    const shouldHandleAlias = this.renameInfo.hasNamespaces();

                    if (shouldHandleAlias) {
                        renameInfos.push({
                            fullName: this.renameInfo.getNameWithNamespaces(this.renameInfo.getOldName(), named.importName),
                            fullReplace: this.renameInfo.getNameWithNamespaces(this.renameInfo.getNewName(), named.importName)
                        });
                    }
                }
                else {
                    renameInfos.push({
                        fullName: this.renameInfo.getNameWithNamespaces(this.renameInfo.getOldName()),
                        fullReplace: this.renameInfo.getNameWithNamespaces(this.renameInfo.getNewName())
                    });
                }
            }
        });

        return renameInfos;
    }
}