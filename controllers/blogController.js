import { 
  createBlog, 
  getBlog,
  getBlogById,
  updateBlog,
  deleteBlog
} from "../services/blogService.js";

export const addBlog = async (req, res) => {
  try {
    const blogData = req.body;
    const userId = req.user.userData.id;
    
    blogData.user_id = userId;
    // Set timestamp to current time in Thailand timezone
    const now = new Date();
    const thailandOffset = 7 * 60; // minutes offset
    const localTime = new Date(now.getTime() + thailandOffset * 60 * 1000);
    blogData.timestamp = localTime.toISOString();

    const newBlog = await createBlog(blogData);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'timestamp';
    const sortOrder = req.query.sortOrder || 'desc';

    if (page < 1) {
      return res.status(400).json({ error: "Page must be greater than 0" });
    }
    
    if (limit < 1 || limit > 100) {
      return res.status(400).json({ error: "Limit must be between 1 and 100" });
    }

    const allowedSortFields = ['timestamp', 'title', 'id'];
    const allowedSortOrders = ['asc', 'desc'];
    
    if (!allowedSortFields.includes(sortBy)) {
      return res.status(400).json({ error: `Invalid sortBy field. Allowed: ${allowedSortFields.join(', ')}` });
    }
    
    if (!allowedSortOrders.includes(sortOrder)) {
      return res.status(400).json({ error: `Invalid sortOrder. Allowed: ${allowedSortOrders.join(', ')}` });
    }

    const result = await getBlog(page, limit, sortBy, sortOrder);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await getBlogById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedBlog = await updateBlog(id, updates);
    if (!updatedBlog || updatedBlog.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await deleteBlog(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};