import CodeBlockWriter from "code-block-writer";
import {Scope} from "./../Scope";
import {applyMixins} from "./../../../utils";
import {DecoratorDefinition} from "./../../../definitions";
import {DecoratableDefinition, DefinitionType, BaseFunctionDefinition} from "./../../base";
import {ClassDefinition} from "./../ClassDefinition";
import {ScopedDefinition} from "./ScopedDefinition";

export class BaseClassMethodDefinition<ParameterType>
        extends BaseFunctionDefinition<ClassDefinition, ParameterType>
        implements DecoratableDefinition, ScopedDefinition {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    // ScopeDefinition
    scope: Scope;
}

applyMixins(BaseClassMethodDefinition, BaseFunctionDefinition, [DecoratableDefinition, ScopedDefinition]);
