/*jslint beta, eval*/
/*global
    libByName
*/

const objMan = (function () {
    const types = loadTypes();

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
        types
    });
}());
