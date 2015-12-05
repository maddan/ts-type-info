import * as assert from "assert";
import {IScopedDefinition} from "./../../definitions/base/scoped-definition";
import {Scope} from "./../../scope";

export function runScopedDefinitionTests(definition: IScopedDefinition, scope: Scope) {
    it(`should have a scope ${Scope[scope]}`, () => {
        assert.equal(definition.scope, scope);
    });
}