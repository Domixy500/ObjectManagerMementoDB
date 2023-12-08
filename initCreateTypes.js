/*jslint beta*/
/*global
    libByName
    message
    objectManager
    objMan
*/

const objCode = `/*jslint beta*/
/*global
    lib
    libByName
    objMan
*/

(function () {
    return function (e) {

        function afterCreate() {
            afterSave();
        }

        function afterDelete() {
            name(name());
        }

        function afterSave() {
            syncEntries();
        }

        function checkMissingEntries() {
            hasTypesNames().forEach(checkMissingEntry);
        }

        function checkMissingEntry(libName) {
            // const exists = libByName(libName).entries().find(
            //     (x) => x.field("id") === id()
            // ) !== undefined;
            if (objMan.getEntry(libName, id()) === undefined) {
                createMissingEntry(libName);
            }
        }

        function createMissingEntry(libName) {
            const newEntry = objMan.createEntry(libName);
            newEntry.set("Id", id());
        }

        function hasTypes() {
            return loadLinked("hasTypes", "objType");
        }

        function hasTypesNames() {
            return hasTypes().map((x) => x.name());
        }

        function id() {
            return e.field("Id");
        }

        function loadLinked(fieldName, typeName) {
            return e.field(fieldName).map((x) => objMan.load(x, typeName));
        }

        function name(newVal) {
            if (newVal !== undefined) {
                e.set("Name", newVal);
            }
            return e.field("Name");
        }

        function show() {
            if (e.show !== undefined) {
                e.show();
            }
        }

        function syncEntries() {
            checkMissingEntries();
            hasTypes().forEach(syncEntry);
        }

        function syncEntry(syncType) {
            const entryFields = typeFields();
            const entryToSync = objMan.getEntry(syncType.name(), id());
            const fieldsToSync = libByName(syncType.name()).fields();
            fieldsToSync.forEach(syncField);

            function checkValue(fieldName) {
                if (entryToSync.field(fieldName) !== e.field(fieldName)) {
                    entryToSync.set(fieldName, e.field(fieldName));
                }
            }

            function syncField(fieldName) {
                if (entryFields.includes(fieldName)) {
                    checkValue(fieldName);
                }
            }
        }

        function type() {
            return loadLinked("Type", "objType")[0];
        }

        function typeFields(libName) {
            const currentLib = (
                libName
                ? libByName(libName)
                : lib()
            );

            return currentLib.fields();
        }

        return Object.freeze({
            "afterCreate": afterCreate,
            "afterDelete": afterDelete,
            "afterSave": afterSave,
            "id": id,
            "name": name,
            "show": show,
            "type": type
        });
    };
}());
`;
const objTypeCode = `/*jslint beta*/
/*global
    objMan
*/

(function () {
    return function (e) {
        const obj = objMan.load(e, "obj");

        return Object.freeze({
            "afterCreate": obj.afterCreate,
            "afterDelete": obj.afterDelete,
            "afterSave": obj.afterSave,
            "id": obj.id,
            "name": obj.name,
            "show": obj.show,
            "type": obj.type
        });
    };
}());
`;

const objTypes = libByName("ObjType");
if (objTypes.entries().length === 0) {
    init();
} else {
    message("Init can not be executed!\nThere are already entries in libray 'ObjType'"); //jslint-ignore-line
}

function createEntry(libName) {
    return objMan.createEntry(libName);
}

function createObjAndObjType() {
    const obj = createEntry("ObjType");
    const objType = createEntry("ObjType");
    obj.set("Name", "Obj");
    obj.set("DisplayName", "Obj");
    obj.set("Id", objMan.id());
    obj.set("Code", objCode);
    obj.link("Type", objType);
    obj.link("HasTypes", obj);
    obj.link("HasTypes", objType);
    obj.link("CreateTypes", obj);

    objType.set("Name", "ObjType");
    objType.set("DisplayName", "ObjType");
    objType.set("Id", objMan.id());
    objType.set("Code", objTypeCode);
    objType.link("Type", objType);
    objType.link("HasTypes", obj);
    objType.link("HasTypes", objType);
    objType.link("CreateTypes", obj);
    objType.link("CreateTypes", objType);
}

function init() {
    createObjAndObjType();
}
