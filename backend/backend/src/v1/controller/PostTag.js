const PostTag = require("../modal/PostTag");
let Validator = require("validatorjs");

exports.AddPostTag = async (req, res) => {
  
  try{
    const newPostTag = new PostTag({
        key: req.body.key,
        value: req.body.value
    });
    await newPostTag.save();

    res.json({ message: 'PostTag stored successfully',status:true,data:newPostTag });
} catch(err){
    res.status(500).json({ message: 'Internal server error' });
}
};

exports.ListPostTag = async (req, res) => {
 
    try {
        const page = parseInt(req.query.page) || 1; // Default page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit 10
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
    
        // Find documents with pagination
        const items = await PostTag.find().skip(skip).limit(limit);
    
        // Count total documents
        const totalCount = await PostTag.countDocuments();
    
        return res.status(200).send({
            status: true,
            message: "PostTag listed successfully",
            data: items,
            pagination: {
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalItems: totalCount
            }
        });
    } catch (err) {
        // Catch and handle errors
        console.error("Error:", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.DeletePostTag = async (req, res) => {
    try {
        const item = await PostTag.findById(req.params.itemId);
        if(!item) {
            return res.status(404).json({ message: 'PostTag not found' });
        }
        // Add logic to check ownership or permissions
        await PostTag.findByIdAndDelete(req.params.itemId);
        res.json({ message: 'PostTag deleted successfully',status:true });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.UpdatePostTag = async (req, res) => {
    try {
        const item = await PostTag.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'PostTag not found' });
        }
        // Add logic to check ownership or permissions
        await PostTag.findByIdAndUpdate(req.params.itemId, {
            key: req.body.key,
            value: req.body.value
        });
        res.json({ message: 'PostTag updated successfully',status:true });
    } catch(err){
        res.status(500).json({ message: 'Internal server error' });
    }
};