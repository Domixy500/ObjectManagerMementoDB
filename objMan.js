/*jslint beta, eval*/
/*global
    libByName
*/

const objMan = (function () {
    const types = loadTypes();

    function createEntry(libName) {
        const entryLib = libByName(libName);
        return entryLib.create({});
    }

    function id() {
        const now = Date.now();

        function checkNow() {
            if (Date.now() !== now) {
                return now;
            } else {
                return checkNow();
            }
        }

        return checkNow();
    }

    function init() {
        if (libByName("ObjType").entries().length === 0) {
            createObjAndObjType();
        }

        function createObjAndObjType() {
            const obj = createEntry("ObjType");
            const objType = createEntry("ObjType");
            obj.set("Name", "Obj");
            obj.set("DisplayName", "Obj");
            obj.set("Id", id());
            obj.set(
                "Code",
                `/*jslint beta*/
/*global*/

(function () {
    return function (e) {
        const trigger = {
            "afterCreate": afterCreate,
            "afterDelete": afterDelete,
            "afterSave": afterSave
        };

        function afterCreate() {
            name(name());
        }

        function afterDelete() {
            name(name());
        }

        function afterSave() {
            name(name());
        }

        function name(newVal) {
            if (newVal !== undefined) {
                e.set("Name", newVal);
            }
            return e.field("Name");
        }

        function show() {
            if (e.show) {
                e.show();
            }
        }

        return Object.freeze({
            "name": name,
            "show": show,
            "trigger": trigger
        });
    };
}());
`
            );
            obj.link("Type", objType);
            obj.link("HasTypes", obj);
            obj.link("HasTypes", objType);
            obj.link("CreateTypes", obj);

            objType.set("Name", "ObjType");
            objType.set("DisplayName", "ObjType");
            objType.set("Id", id());
            objType.set(
                "Code",
                `/*jslint beta*/
/*global*/

(function () {
    return function (e) {
        const trigger = {
            "afterCreate": afterCreate,
            "afterDelete": afterDelete,
            "afterSave": afterSave
        };

        function afterCreate() {
            name(name());
        }

        function afterDelete() {
            name(name());
        }

        function afterSave() {
            name(name());
        }

        function name(newVal) {
            if (newVal !== undefined) {
                e.set("Name", newVal);
            }
            return e.field("Name");
        }

        function show() {
            if (e.show) {
                e.show();
            }
        }

        return Object.freeze({
            "name": name,
            "show": show,
            "trigger": trigger
        });
    };
}());
`
            );
            objType.link("Type", objType);
            objType.link("HasTypes", obj);
            objType.link("HasTypes", objType);
            objType.link("CreateTypes", obj);
            objType.link("CreateTypes", objType);
        }
    }

    function loadTypes() {
        const objTypes = {};
        const typeEntries = libByName("ObjType").entries();
        typeEntries.forEach(loadObjectType);

        function loadObjectType(typeEntry) {
            const code = typeEntry.field("Code");
            const name = typeEntry.field("Name");
            types[name] = eval(code);
        }

        return objTypes;
    }

    return Object.freeze({
        "id": id,
        "init": init,
        "types": types
    });
}());
