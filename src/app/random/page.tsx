'use client'
import { getCocktailRandom } from "@/lib/api/random";
import { Drinks } from "@/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";



const Estarandom = () => {

    const [drink, setDrink] = useState<Drinks|null>(null);
    const [ingredinets, setIngredients] = useState<string[]|null>(null)
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getCocktailRandom()
        .then((res) => {            
            setDrink(res)
            console.log
        }
        )
        .catch((e:AxiosError)=> {
            setError(e.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }, []);

    return (
        <div>
            <h1>{drink?.drinks.at(0)?.strDrink}</h1>
            {!drink && loading && <h1>Loading...</h1>}
            {drink &&
            (<>
                <img src={drink.drinks.at(0)?.strDrinkThumb}></img>
                <div>Name:{drink.drinks.at(0)?.strGlass}</div>
                <div>Alcoholic:{drink.drinks.at(0)?.strAlcoholic} </div>
                <div>Instructions:{drink.drinks.at(0)?.strInstructions} </div>
                <div>category:{drink.drinks.at(0)?.strCategory}</div>
            </>
            )}
            {error && <h1>{error}</h1>}

        </div>
    )
}

export default Estarandom