/*jslint beta*/
/*global
    libByName
    message
    objectManager
    objMan
*/

const objTypes = libByName("ObjType");
if (objTypes.entries().length === 2) {
    syncTypes();
} else {
    message("Init can not be executed!\nThere are not exactly 2 entries in libray 'ObjType'"); //jslint-ignore-line
}

function syncTypes() {
    objTypes.entries().forEach(objTypeAfterSave);

    function objTypeAfterSave(e) {
        objMan.load(e, "objType").afterSave();
    }
}
