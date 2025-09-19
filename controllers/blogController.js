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

    const newBlog = await createBlog(blogData);
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchBlogs = async (req, res) => {
  try {
    const blogs = await getBlog();
    res.status(200).json(blogs);
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