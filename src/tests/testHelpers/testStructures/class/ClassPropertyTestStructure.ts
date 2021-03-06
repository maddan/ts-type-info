import {BaseClassPropertyTestStructure} from "./base";

export interface ClassPropertyTestStructure extends BaseClassPropertyTestStructure {
    isAccessor?: boolean;
    isReadonly?: boolean;
    hasOnWriteGetBody?: boolean;
    hasOnWriteSetBody?: boolean;
}
