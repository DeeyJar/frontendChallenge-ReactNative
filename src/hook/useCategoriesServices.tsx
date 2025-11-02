import { useState } from "react";
import { ICategories } from "../modal/dto/ICategories";
import { API_URL } from "../config/api";

export const useCategoriesServices = () => {
    const [categories, setCategories] = useState<ICategories[]>([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    return {
        categories,
        fetchCategories
    }
}