var NamedDefinition = (function () {
    function NamedDefinition() {
    }
    NamedDefinition.prototype.fillName = function (symbol) {
        this.name = symbol.getName();
    };
    return NamedDefinition;
})();
exports.NamedDefinition = NamedDefinition;

//# sourceMappingURL=named-definition.js.map
