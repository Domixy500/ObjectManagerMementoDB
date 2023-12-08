/*jslint beta, eval*/
/*global
    libByName
*/

function objectManager() {
    const types = loadTypes();

    function createEntry(libName) {
        const entryLib = libByName(libName);
        return entryLib.create({});
    }

    function firstLetterLowerCase(stringVariable) {
        const firstLetter = stringVariable.charAt(0).toLowerCase();
        return firstLetter + stringVariable.slice(1);
    }

    function getEntry(libName, id) {
        return libByName(libName).entries().find(
            (x) => x.field("id") === id
        );
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

    function load(currentEntry, type) {
        const typeName = type || currentEntry.field("Type")[0].field("Name");
        return types[firstLetterLowerCase(typeName)](currentEntry);
    }

    function loadTypes() {
        const objTypes = {};
        const typeEntries = libByName("ObjType").entries();
        typeEntries.forEach(loadObjectType);

        function loadObjectType(typeEntry) {
            const code = typeEntry.field("Code");
            const name = firstLetterLowerCase(typeEntry.field("Name"));
            objTypes[name] = eval(code);
        }

        return objTypes;
    }

    return Object.freeze({
        "createEntry": createEntry,
        "getEntry": getEntry,
        "id": id,
        "load": load
    });
}
