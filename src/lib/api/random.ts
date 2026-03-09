import { Drinks } from "@/types"
import { api } from "./axios"




export const getCocktailRandom = async () => {

    const response = await api.get<Drinks>(`/random.php`)
    return response.data
}

