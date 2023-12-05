/*jslint beta, eval*/
/*global
    libByName
*/

const objMan = (function () {
    const types = loadTypes();

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
        message("Init");
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
