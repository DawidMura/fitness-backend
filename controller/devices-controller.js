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
import MemberSchema from "../model/memberSchema.js";

const getDevices = async (req, res) => {
    const devices = await DevicesSchema.find();
    res.status(200).send(devices);
}

const getOneDevice = async (req, res) => {
    const deviceId = req.params.deviceId;
    const findOneDevice = await DevicesSchema.findById(deviceId);
    res.send(findOneDevice);
}

const bookDevices = async (req, res, next) => {
    const memberId = req.body.memberId;
    try {
        const currentMember = await MemberSchema.findById(memberId);
        currentMember.device_ids.push(req.body.deviceId);
        await currentMember.save();

    }
    catch (error) {
        console.error(error.message);
        return res.send(error.message);
    }
    next();
}

const addMemberToDevice = async (req, res) => {
    const memberId = req.body.memberId;
    const deviceId = req.body.deviceId;
    try {
        const selectedDevice = await DevicesSchema.findById({ _id: deviceId })
        if (selectedDevice.memberQuantity === 1) {
            return res.send("We have no more devices for you. Please try again later");
        }

        if (!selectedDevice.memberQuantity) {
            selectedDevice.memberQuantity = 1;
        }

        selectedDevice.save();

        res.json({ selectedDevice });

    }
    catch (error) {
        console.error(error)
    }

}

const showDevicesInfo = async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const devices = await MemberSchema.find({ _id: memberId })
            .populate("device_ids")
            .select("device_name complete -_id")
        res.json({ devices });
    }
    catch (error) {
        console.error(error);
    }
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
    getDevices, getOneDevice, addDevice, updateDevice, deleteDevice, bookDevices, showDevicesInfo, addMemberToDevice
};