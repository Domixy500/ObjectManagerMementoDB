/*jslint beta*/
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
