/***************************************************************
 * Diese Controller erstellt die Methode zur Erstellung eines Geräts,
 * Löschen, usw. * 
 * @getDevices gibt bei einer Anfrage alle Gerätenamen zurück
 * @getOneDevices gibt bei einer Anfrage einen Gerätenamen  zurück
 * @joinDevices .......... 
 * @addDevices hier wird ein neuer Gerätname hinzugefügt
 * @updateDevices hier wird ein vorhandener Gerätname aktualisiert
 * @deleteCourse damit  wird ein vorhandener Gerätename gelöscht
 ****************************************************************/
import DevicesSchema from "../model/devicesSchema.js";

const getDevices = async (req, res) => {
    const devices = await DevicesSchema.find();
    res.status(200).send(devices);
}

const getOneDevice = async (req, res) => {
    const deviceId = req.params.deviceId;
    const findOneDevice = await DevicesSchema.findById(deviceId);
    res.send(findOneDevice);
}


const addDevice = async (req, res) => {
    const newDevice = new DevicesSchema(req.body);
    await newDevice.save();
    res.send("new device is added");
}

const updateDevice = async (req, res) => {
    const deviceId = req.params.deviceId;
    await DevicesSchema.updateOne({ _id: deviceId }, req.body);
    res.send("device is updated!");
}

const deleteDevice = async (req, res) => {
    const deviceId = req.params.deviceId;
    await DevicesSchema.findByIdAndRemove(deviceId);
    res.send("device is deleted!");
}

export {
    getDevices, getOneDevice, addDevice, updateDevice, deleteDevice
};