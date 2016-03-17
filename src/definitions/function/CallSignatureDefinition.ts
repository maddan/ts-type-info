import {applyMixins, ArrayExt} from "./../../utils";
import {TypeParameteredDefinition, BaseDefinition, DefinitionType, ReturnTypedDefinition, ParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {TypeExpression} from "./../expressions";
import {CallSignatureParameterDefinition} from "./CallSignatureParameterDefinition";

export class CallSignatureDefinition
        extends BaseDefinition
        implements TypeParameteredDefinition, ParameteredDefinition<CallSignatureParameterDefinition>, ReturnTypedDefinition {
    minArgumentCount: number;

    constructor() {
        super(DefinitionType.CallSignature);
    }

    // ParameteredDefinition
    parameters: ArrayExt<CallSignatureParameterDefinition>;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
}

applyMixins(CallSignatureDefinition, BaseDefinition, [TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);