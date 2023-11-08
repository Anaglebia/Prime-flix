import './favoritos.css';
import {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


// funcao de salvar e favoritos
function Favoritos(){
    const [filme, setFilme] = useState([]);

    useEffect(()=>{
        const minhaLista =  localStorage.getItem('@primeflix')
        setFilme(JSON.parse(minhaLista) || []) 
    },[])

    // funcao exluir dos favoritos

    function excluirFilme(id){
      let filtroFilme = filme.filter((item)=>{
        return(item.id !== id)
      })
      setFilme(filtroFilme);
      localStorage.setItem("@primeflix", JSON.stringify(filtroFilme))
      toast.success('Filme removido com sucesso!')
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filme.length === 0 && <span>Voce não possui nehum filme salvo! :( </span>}
            <ul>
                {filme.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhe</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}   
            </ul>
        </div>
    )
}

export default Favoritos;