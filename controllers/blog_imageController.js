import { 
  createBlog_image, 
  getBlog_image,
  getBlog_imageById,
  updateBlog_image,
  deleteBlog_image
} from "../services/blog_imageService.js";

export const addBlog_image = async (req, res) => {
  try {
    const blog_imageData = req.body;
    const newBlog_image = await createBlog_image(blog_imageData);
    res.status(201).json(newBlog_image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchBlog_images = async (req, res) => {
  try {
    const blogs = await getBlog_image();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchBlog_imageById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await getBlog_imageById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog image not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyBlog_image = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedBlog = await updateBlog_image(id, updates);
    if (!updatedBlog || updatedBlog.length === 0) {
      return res.status(404).json({ error: "Blog image not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeBlog_image = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await deleteBlog_image(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};