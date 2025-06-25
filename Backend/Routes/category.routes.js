import { Router } from "express";
import { addOrEditCategory, deleteCategory, getCategories } from "../Controllers/categories.controller.js";

const categoryRoutes = Router()

categoryRoutes.post('/add', addOrEditCategory)
categoryRoutes.post('/delete', deleteCategory)
categoryRoutes.get('/get',getCategories)

export {categoryRoutes}