'use client';
import { api } from "../lib/api/axios";
import { Drinks } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {

  const [drinks, setDrink] = useState<Drinks|null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const [name, setName] = useState<string|null>(null)
  const [finalName, setFinalName] = useState<string|null>(null)
  const [error, setError] = useState<string|null>(null)

  const router = useRouter();

  const fetchDeLaAPI = async (name: string|null) => {
    setLoading(true);
    await api
    .get<Drinks>(`/search.php?s=${name}`)
    .then((respuesta) => {
      setDrink(respuesta.data)
    })
    .catch((e) => {setError(`Error al obtener los datos: ${e}`)})
    .finally(() => setLoading(false));    
  }

  useEffect(() => {
    fetchDeLaAPI(finalName)
  }, [finalName])  

  return (
    <div className="mainContainer">
      <h1>{finalName}</h1>
      <br/>
      <div>
        <input
            onChange={(e) => {
            setName(e.target.value);
          }}
        />
        
        <button
          onClick={() => {
            setFinalName(name);
          }}
        >
          Search
        </button>
        <button onClick={() => {
          router.push(`/random`);
        }}>
          Pulse aqui cosita mia:
        </button>
      </div>
      {loading && <h2>Loading...</h2>}
      <div>
        {drinks?.drinks && !loading && drinks?.drinks.map((dri) => {
        return (
          <div key={dri.idDrink}  className="card">
            <button onClick={()=>{
              router.push(`/drinks/${dri.idDrink}`);
            }}>{dri.strDrinkThumb && <img src={dri.strDrinkThumb}/>}</button>
              <h1>Nombre: {dri.strDrink}</h1>
          </div>
        )})}
      </div>
    </div>
  );
}


export default Home;