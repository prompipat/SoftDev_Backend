import { 
  createOrder, 
  getOrder,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../services/orderService.js";

export const addOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const userId = req.user.userData.id;

    orderData.user_id = userId;
    const newOrder = await createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchOrders = async (req, res) => {
  try {
    const orders = await getOrder();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedOrder = await updateOrder(id, updates);
    if (!updatedOrder || updatedOrder.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await deleteOrder(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};