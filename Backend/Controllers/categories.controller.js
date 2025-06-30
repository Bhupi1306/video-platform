import { Category } from "../Models/category.model.js"

const getCategories = async(req,res) => {
    try {
        const categories = await Category.find()
        return res.status(200).json({message:"Got the categories", success: true, categories})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong", success: false, error})
    }
}

const addOrEditCategory = async(req,res) => {
    try {
        const {id, category} = req.body
        if(!category)
        if(!id || !category){
            return res.status(400).json({message:"Both Id and Category is required", success: false})
        }
        
        const existingCategory = await Category.findOne({id})
        if(existingCategory) 
            {
                const newCategory = await Category.findOneAndUpdate(
                    {id},
                    {$set: {name:category}},
                    {new:true})
                
                if(newCategory) return res.status(200).json({message: "Category Edited successfully", success: true})
                    else return res.status(500).json({message: "Something went wrong", success:false})
            }
            
        const newCategory = new Category({id,name: category})
        const savedCategory = await newCategory.save()
    
        if(savedCategory)
        {
            return res.status(201).json({message:"New Category added", success: true})
        }
        else{
            return res.status(500).json({message: "Something went wrong", success: false})
        }
    } catch (error) {
        return res.status(500).json({message: "Something went wrongs", success: false, error})
    }
}

const deleteCategory = async(req,res) => {
    try {
        const {id} = req.body
        if(!id) return res.status(400).json({message: "Id is required", success: false})

        const deletedCategory = await Category.findOneAndDelete({id})
        if(deletedCategory) return res.status(200).json({message: "Category deleted successfully", success: true})
        else return res.status(500).json({message: "Something went wrong", success:false})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong", success:false, error})
    }
}


export{
    addOrEditCategory,
    deleteCategory,
    getCategories
}