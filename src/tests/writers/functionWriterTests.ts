﻿import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {FunctionDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {functionWriterTestCode} from "./testCode";

function getFunctionAsString(i: FunctionDefinition) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new FunctionWriter(codeBlockWriter);

    writer.write(i, WriteFlags.Default);

    return codeBlockWriter.toString();
}

describe("FunctionWriter", () => {
    const file = getInfoFromString(functionWriterTestCode);

    describe("write()", () => {
        describe("myFunction", () => {
            it("should contain the function written out", () => {
                const expected = `function myFunction(str: string) {\n}\n`;
                assert.equal(getFunctionAsString(file.functions[0]), expected);
            });
        });

        describe("myFunction2", () => {
            it("should contain the function written out", () => {
                const expected = `function myFunction2<T extends string, U>(str: T, num: U) {\n}\n`;
                assert.equal(getFunctionAsString(file.functions[1]), expected);
            });
        });
    });
});
