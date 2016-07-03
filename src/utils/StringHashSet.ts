﻿export class StringHashSet {
    private obj: { [uniqueID: string]: boolean; } = {};

    add(key: string) {
        this.obj[key] = true;
    }

    contains(key: string) {
        return this.obj[key] === true;
    }
}
