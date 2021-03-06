import {TypeDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {TypedStructure} from "./../../../structures";
import {TypedBinder} from "./../../base";
import {StructureTypeBinder} from "./../expression";

export class StructureTypedBinder extends TypedBinder {
    constructor(private factory: StructureFactory, private structure: TypedStructure) {
        super();
    }

    getType() {
        const def = new TypeDefinition();
        const binder = new StructureTypeBinder(this.factory, this.structure.type || "any");
        binder.bind(def);
        return def;
    }
}
