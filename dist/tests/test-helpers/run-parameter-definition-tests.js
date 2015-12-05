var assert = require("assert");
var run_named_definition_tests_1 = require("./run-named-definition-tests");
var run_typed_definition_tests_1 = require("./run-typed-definition-tests");
function runParameterDefinitionTests(definition, param) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("parameter " + param.name, function () {
        run_named_definition_tests_1.runNamedDefinitionTests(definition, param.name);
        run_typed_definition_tests_1.runTypedDefinitionTests(definition, param.type);
        it("should be " + (!param.isRequired ? "required" : "not required"), function () {
            assert.equal(definition.isRequired, param.isRequired);
        });
    });
}
exports.runParameterDefinitionTests = runParameterDefinitionTests;

//# sourceMappingURL=run-parameter-definition-tests.js.map
