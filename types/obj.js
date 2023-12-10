/*jslint beta*/
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
