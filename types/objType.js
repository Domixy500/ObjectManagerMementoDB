/*jslint beta*/
/*global
    arg
    objMan
*/

(function () {
    return function (e) {
        const obj = objMan.load(e, "obj");

        function copy() {
            const newEntry = obj.copy();
            newEntry.set("Name", arg("Name"));
            newEntry.link("CreateTypes", newEntry);
            objMan.load(newEntry).afterSave();

            return newEntry;
        }

        return Object.freeze({
            "afterCreate": obj.afterCreate,
            "afterDelete": obj.afterDelete,
            "afterSave": obj.afterSave,
            "copy": copy,
            "id": obj.id,
            "name": obj.name,
            "show": obj.show,
            "type": obj.type
        });
    };
}());
