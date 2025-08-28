import{
    createPayment,
    getPayment,
    getPaymentById,
    updatePayment,
    deletePayment

} from "../services/paymentService.js";

export const addPayment = async (req, res) => {
    try {
        const paymentData = req.body;
        const newPayment = await createPayment(paymentData);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const fetchPayments = async (req, res) => {
    try {
        const payments = await getPayment();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await getPaymentById(id);
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const modifyPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedPayment = await updatePayment(id, updates);
        if (!updatedPayment || updatedPayment.length === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const removePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deletePayment(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

