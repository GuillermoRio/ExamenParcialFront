'use client'
import { getCocktailById } from "@/lib/api/cocktail";
import { Drinks } from "@/types";
import { AxiosError } from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";



const EstaRecibeID = () => {

    const { id } = useParams(); //Lo hace cliente

    const [drink, setDrink] = useState<Drinks|null>(null);
    const [ingredinets, setIngredients] = useState<string[]|null>(null)
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getCocktailById(Number(id))
        .then((res) => {            
            setDrink(res)
        }
        )
        .catch((e:AxiosError)=> {
            setError(e.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [id]);

    return (
        <div>
            <h1>{drink?.drinks.at(0)?.strDrink}</h1>
            {!drink && loading && <h1>Loading...</h1>}
            {drink &&
            (<>
                <img src={drink.drinks.at(0)?.strDrinkThumb}></img>
                <div>Name:{drink.drinks.at(0)?.strGlass}</div>
                <div>Alcoholic:{drink.drinks.at(0)?.strAlcoholic} </div>
                <div>Instructions:{drink.drinks.at(0)?.strInstructions}</div>
            </>
            )}
            {error && <h1>{error}</h1>}

        </div>
    )
}

export default EstaRecibeID