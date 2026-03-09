import { Cocktail, Drinks } from "@/types"
import { api } from "./axios"




export const getCocktailById = async (id: number) => {

    const response = await api.get<Drinks>(`/lookup.php?i=${id}`)
    
    return response.data
}