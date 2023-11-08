import {useEffect,useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../service/api';
import './filme-info.css';

function Filme(){
  const{id} = useParams();
  const [filme, setFilme]= useState ({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`,{
        params:{
          api_key:'d6c319b615dfe7bf9a2939314c9cd34e',
          language:'pt-BR',
        }
      })
      .then((response)=>{
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log('Filme não encontrado')
        navigate('/',{replace:true})
        return;
        // redireciona pra pagina inicial caso fiflme nao seja encontrado
      })
    }
    loadFilme();

    return()=>{
      console.log('Componente desmotado')
    }
  },[navigate, id])

  // Funcao para salvar filmes
  function salvarFilme(){
    const minhaLista = localStorage.getItem('@primeflix');

    let filmesSalvos =JSON.parse(minhaLista) || [];

    // Verifica se o filme já esta na lista antes de salvar
    const hasFilme = filmesSalvos.some((filmesSalvos)=> filmesSalvos.id === filme.id)
    if(hasFilme){
      toast.warn('Filme ja esta na sua lista!')
      return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!')
  }

  if(loading){
    return(
      <div className='filme-info'>
        <h1>Carregando filme</h1>
      </div>
    )
  }

  return(
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}/>

      <h2>Sinopse</h2>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className='area-button'>
        <button onClick={salvarFilme}>Salvar</button>
        <button>
        <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
        </button>
      </div>
    </div>
  )
}

export default Filme;