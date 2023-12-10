/*jslint beta*/
/*global
    libByName
    message
    objectManager
    objMan
*/

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
    obj.set("Code", decodeURIComponent(objCode()));
    obj.link("Type", objType);
    obj.link("HasTypes", obj);
    obj.link("HasTypes", objType);
    obj.link("CreateTypes", obj);

    objType.set("Name", "ObjType");
    objType.set("DisplayName", "ObjType");
    objType.set("Id", objMan.id());
    objType.set("Code", decodeURIComponent(objTypeCode()));
    objType.link("Type", objType);
    objType.link("HasTypes", obj);
    objType.link("HasTypes", objType);
    objType.link("CreateTypes", obj);
    objType.link("CreateTypes", objType);
}

function init() {
    createObjAndObjType();
}

function objCode() {
    return "%2F*jslint%20beta*%2F%0D%0A%2F*global%0D%0A%20%20%20%20lib%0D%0A%20%20%20%20libByName%0D%0A%20%20%20%20objMan%0D%0A*%2F%0D%0A%0D%0A(function%20()%20%7B%0D%0A%20%20%20%20return%20function%20(e)%20%7B%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20afterCreate()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20afterSave()%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20afterDelete()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20name(name())%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20afterSave()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20syncEntries()%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20checkMissingEntries()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20hasTypesNames().forEach(checkMissingEntry)%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20checkMissingEntry(libName)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(objMan.getEntry(libName,%20id())%20%3D%3D%3D%20undefined)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20createMissingEntry(libName)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20createMissingEntry(libName)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20newEntry%20%3D%20objMan.createEntry(libName)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20newEntry.set(%22Id%22,%20id())%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20hasTypes()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20loadLinked(%22hasTypes%22,%20%22objType%22)%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20hasTypesNames()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20hasTypes().map((x)%20%3D%3E%20x.name())%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20id()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20e.field(%22Id%22)%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20loadLinked(fieldName,%20typeName)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20e.field(fieldName).map((x)%20%3D%3E%20objMan.load(x,%20typeName))%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20name(newVal)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(newVal%20!%3D%3D%20undefined)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20e.set(%22Name%22,%20newVal)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20e.field(%22Name%22)%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20show()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(e.show%20!%3D%3D%20undefined)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20e.show()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20syncEntries()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20checkMissingEntries()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20hasTypes().forEach(syncEntry)%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20syncEntry(syncType)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20entryFields%20%3D%20typeFields()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20entryToSync%20%3D%20objMan.getEntry(syncType.name(),%20id())%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20fieldsToSync%20%3D%20libByName(syncType.name()).fields()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20fieldsToSync.forEach(syncField)%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20function%20checkValue(fieldName)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(entryToSync.field(fieldName)%20!%3D%3D%20e.field(fieldName))%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20entryToSync.set(fieldName,%20e.field(fieldName))%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20function%20syncField(fieldName)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(entryFields.includes(fieldName))%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20checkValue(fieldName)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20type()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20loadLinked(%22Type%22,%20%22objType%22)%5B0%5D%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20typeFields(libName)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20currentLib%20%3D%20(%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20libName%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3F%20libByName(libName)%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%20lib()%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20)%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20currentLib.fields()%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20return%20Object.freeze(%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22afterCreate%22%3A%20afterCreate,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22afterDelete%22%3A%20afterDelete,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22afterSave%22%3A%20afterSave,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22id%22%3A%20id,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20name,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22show%22%3A%20show,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20type%0D%0A%20%20%20%20%20%20%20%20%7D)%3B%0D%0A%20%20%20%20%7D%3B%0D%0A%7D())%3B%0D%0A"; //jslint-ignore-line
}

function objTypeCode() {
    return "%2F*jslint%20beta*%2F%0D%0A%2F*global%0D%0A%20%20%20%20objMan%0D%0A*%2F%0D%0A%0D%0A(function%20()%20%7B%0D%0A%20%20%20%20return%20function%20(e)%20%7B%0D%0A%20%20%20%20%20%20%20%20const%20obj%20%3D%20objMan.load(e,%20%22obj%22)%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20return%20Object.freeze(%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22afterCreate%22%3A%20obj.afterCreate,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22afterDelete%22%3A%20obj.afterDelete,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22afterSave%22%3A%20obj.afterSave,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22id%22%3A%20obj.id,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20obj.name,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22show%22%3A%20obj.show,%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20obj.type%0D%0A%20%20%20%20%20%20%20%20%7D)%3B%0D%0A%20%20%20%20%7D%3B%0D%0A%7D())%3B%0D%0A"; //jslint-ignore-line
}
