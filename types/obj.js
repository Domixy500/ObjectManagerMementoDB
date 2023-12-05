/*jslint beta*/
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
