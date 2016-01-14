var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var interface_method_definition_1 = require("./interface-method-definition");
var interface_new_signature_definition_1 = require("./interface-new-signature-definition");
var InterfaceDefinition = (function () {
    function InterfaceDefinition(typeChecker, symbol, extendsTypeExpressions) {
        this.extendsTypeExpressions = extendsTypeExpressions;
        this.methods = [];
        this.newSignatures = [];
        this.properties = [];
        this.typeParameters = [];
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }
    InterfaceDefinition.prototype.fillMembers = function (typeChecker, symbol) {
        var _this = this;
        this.typeParameters = [];
        Object.keys(symbol.members).map(function (memberName) { return symbol.members[memberName]; }).forEach(function (member) {
            /* istanbul ignore else */
            if (typeChecker.isSymbolProperty(member)) {
                _this.properties.push(new base_1.PropertyDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolInterfaceMethod(member)) {
                _this.methods.push(new interface_method_definition_1.InterfaceMethodDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolTypeParameter(member)) {
                _this.typeParameters.push(new base_1.TypeParameterDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolNewSignature(member)) {
                member.getDeclarations().forEach(function (d) {
                    _this.newSignatures.push(new interface_new_signature_definition_1.InterfaceNewSignatureDefinition(typeChecker, typeChecker.getSignatureFromDeclaration(d)));
                });
            }
            else {
                console.warn("Not implemented interface member: " + member.getName());
            }
        });
    };
    return InterfaceDefinition;
})();
exports.InterfaceDefinition = InterfaceDefinition;
utils_1.applyMixins(InterfaceDefinition, [base_1.NamedDefinition, base_1.ExportableDefinition, base_1.TypeParameteredDefinition]);

//# sourceMappingURL=interface-definition.js.map
