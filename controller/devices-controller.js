import DevicesSchema from "../model/devicesSchema.js";

const getDevices = async (req, res) => {
    const devices = await DevicesSchema.find();
    res.status(200).send(devices);
}

const getOneDevice = async (req, res) => {
    const _id = req.params.id;
    const findOneDevice = await DevicesSchema.findById(_id);
    res.json(findOneDevice);
}


const addDevice = async (req, res) => {
    const newDevice = new DevicesSchema(req.body);
    await newDevice.save();
    res.json("new device is added");
}

const updateDevice = async (req, res) => {
    const _id = req.params.id;
    await DevicesSchema.updateOne({ _id }, req.body);
    res.json("device is updated!");
}

const deleteDevice = async (req, res) => {
    const _id = req.params.id;
    await DevicesSchema.findByIdAndRemove(_id);
    res.send("device is deleted!");
}

export {
    getDevices, getOneDevice, addDevice, updateDevice, deleteDevice
};