import {
  createVerificationForm,
  getVerificationForms,
  getVerificationFormById,
  updateVerificationForm,
  deleteVerificationForm,
} from "../services/verificationFormService.js";

export const addVerificationForm = async (req, res) => {
  try {
    const verificationFormData = req.body;
    const newForm = await createVerificationForm(verificationFormData);
    res.status(201).json(newForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchVerificationForms = async (req, res) => {
  try {
    const forms = await getVerificationForms();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchVerificationFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await getVerificationFormById(id);
    if (!form) {
      return res.status(404).json({ error: "Verification form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyVerificationForm = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedForm = await updateVerificationForm(id, updates);
    if (!updatedForm) {
      return res.status(404).json({ error: "Verification form not found" });
    }
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeVerificationForm = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteVerificationForm(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
