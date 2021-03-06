﻿import * as assert from "assert";
import {renameDefinitionInText} from "./../../../utils/renameDefinitionAs/renameDefinitionInText";

describe("renameDefinitionInText()", () => {
    it("should rename the name outside type parameters", () => {
        const result = renameDefinitionInText("MyClass<any, MyOtherClass>", "MyClass", "MyNewName");
        assert.equal(result, "MyNewName<any, MyOtherClass>");
    });

    it("should rename the name inside type parameters", () => {
        const result = renameDefinitionInText("MyClass<any, MyOtherClass>", "MyOtherClass", "MyNewName");
        assert.equal(result, "MyClass<any, MyNewName>");
    });

    it("should rename at beginning of string", () => {
        const result = renameDefinitionInText("MyClass1 | MyClass2", "MyClass1", "MyNewName");
        assert.equal(result, "MyNewName | MyClass2");
    });

    it("should rename at end of string", () => {
        const result = renameDefinitionInText("MyClass1 | MyClass2", "MyClass2", "MyNewName");
        assert.equal(result, "MyClass1 | MyNewName");
    });

    it("should rename in intersection and union type", () => {
        const result = renameDefinitionInText("(MyClass1 & MyClass2) | MyClass2", "MyClass2", "MyNewName");
        assert.equal(result, "(MyClass1 & MyNewName) | MyNewName");
    });

    it("should not rename a definition when it doesn't match exactly on the left", () => {
        const result = renameDefinitionInText("MyTestClass", "TestClass", "NewTestClass");
        assert.equal(result, "MyTestClass");
    });

    it("should not rename a definition when it doesn't match exactly on the right", () => {
        const result = renameDefinitionInText("MyTestClass", "MyTest", "NewMyTest");
        assert.equal(result, "MyTestClass");
    });

    it("should rename a namespace when it matches exactly", () => {
        const result = renameDefinitionInText("MyNamespace.MyClass", "MyNamespace.MyClass", "MyNamespace.MyNewName");
        assert.equal(result, "MyNamespace.MyNewName");
    });

    it("should rename a namespace when it matches from the left", () => {
        const result = renameDefinitionInText("MyNamespace.MyOtherNamespace.MyClass", "MyNamespace.MyOtherNamespace", "MyNamespace.MyNewNamespace");
        assert.equal(result, "MyNamespace.MyNewNamespace.MyClass");
    });

    it("should NOT rename a namespace when it matches from the right", () => {
        const result = renameDefinitionInText("MyNamespace.MyOtherNamespace.MyClass", "MyOtherNamespace.MyClass", "MyOtherNamespace.MyNewClass");
        assert.equal(result, "MyNamespace.MyOtherNamespace.MyClass");
    });

    it("should NOT rename in single quotes", () => {
        const result = renameDefinitionInText(`'MyNamespace'`, "MyNamespace", "MyNewNamespace");
        assert.equal(result, `'MyNamespace'`);
    });

    it("should NOT rename in double quotes", () => {
        const result = renameDefinitionInText(`"MyNamespace"`, "MyNamespace", "MyNewNamespace");
        assert.equal(result, `"MyNamespace"`);
    });

    it("should NOT rename in back tick quotes", () => {
        const result = renameDefinitionInText("`MyNamespace`", "MyNamespace", "MyNewNamespace");
        assert.equal(result, "`MyNamespace`");
    });

    it("should rename in back tick quotes' ${}", () => {
        const result = renameDefinitionInText("`MyNamespace${MyNamespace}MyNamespace`", "MyNamespace", "MyNewNamespace");
        assert.equal(result, "`MyNamespace${MyNewNamespace}MyNamespace`");
    });

    it("should handle backslashes in single quotes", () => {
        const result = renameDefinitionInText(`"MyNamespace\\"MyNamespace"`, "MyNamespace", "MyNewNamespace");
        assert.equal(result, `"MyNamespace\\"MyNamespace"`);
    });

    it("should handle backslashes in double quotes", () => {
        const result = renameDefinitionInText(`'MyNamespace\\'MyNamespace'`, "MyNamespace", "MyNewNamespace");
        assert.equal(result, `'MyNamespace\\'MyNamespace'`);
    });
});
