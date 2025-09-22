import {
    createPackageDetail,
    getPackageDetails,
    getPackageDetailById,
    deletePackageDetail,
    updatePackageDetail,
    
} from "../services/packageDetailServices.js";

export const addPackageDetail = async (req, res) => {
    try {
        const packageDetailData = req.body;
        const newDetail = await createPackageDetail(packageDetailData);
        res.status(201).json(newDetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }  
};

export const fetchPackageDetails = async (req, res) => {
    try {
        const details = await getPackageDetails();
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchPackageDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await getPackageDetailById(id);
        if (!detail) {
            return res.status(404).json({ error: "Package detail not found" });
        }
        res.status(200).json(detail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const removePackageDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deletePackageDetail(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const modifyPackageDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedDetail = await updatePackageDetail(id, updates);
        if (!updatedDetail) {
            return res.status(404).json({ error: "Package detail not found" });
        }
        res.status(200).json(updatedDetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
