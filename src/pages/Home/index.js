import { useEffect, useState } from "react";
import api from "../../service/api";
import { Link } from "react-router-dom";
import './home.css';

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get('movie/now_playing',{
                params:{
                    api_key:'d6c319b615dfe7bf9a2939314c9cd34e',
                    language:'pt-BR',
                    page:1,
                }
            })

            // console.log(respose.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);
        }

        loadFilmes();
    },[])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filme...</h2>
            </div>
        )
    }
    return (
      <div className="container">
        <div className="lista_filme">
            {filmes.map((filme)=>{
                return(
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}/>
                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                    </article>
                )
            })}

        </div>
      </div>
    );
  }
  
  export default Home;