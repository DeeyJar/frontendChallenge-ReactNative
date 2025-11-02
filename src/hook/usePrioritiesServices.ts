import { useState } from "react";
import { API_URL } from "../config/api";
import { IPriorities } from "../modal/dto/IPriorities";

export const usePrioritiesServices = () => {
    const [priorities, setPriorities] = useState<IPriorities[]>([]);

    const fetchPriorities = async () => {
        try {
            const response = await fetch(`${API_URL}/priorities`);
            const data = await response.json();
            setPriorities(data);
        } catch (error) {
            console.error("Error fetching priorities:", error);
        }
    }

    return {
        priorities,
        fetchPriorities
    }
}