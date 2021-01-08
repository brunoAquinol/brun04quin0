// Aqui são importados os Hooks do React para manipulação de estados e de efeito na inicialização
import { useEffect, useState } from 'react';

// É importado o axios para realizar as requisições GET no site https://swapi.dev/api/
import axios from 'axios';

//É importado o componente que renderiza os Filmes e Personagens
import Movies from '../../components/Movies/Movies'

// Importação da estilização da página
import './App.css';

function App() {

  //É declarado o estado films e seu manipulador setFilms e terá seu valore inicial declarado com a Hook useState
  
  //O estado films será responsável em armazenar as informações de todos os filmes adquiridos na requisição em loadFilmes()
  const[films, setFilms] = useState([]);


  //useEffect é chamado para sincronizar as respostas da requição a modificação do estado FILMS logo após a renderização da página
  //Sempre que a págian for atualizada, ela carregará automaticamente as informações dentro do estado FILMS
  useEffect(() => {

    //Uma função assíncrona para fazer as requisições para o estado FILMS
    async function loadFilms(){
      
      //Declaração de um objeto auxiliar vazio
      const auxFilms = []

      //Aqui realiza múltiplas requisições usando axios.all com a expressão await que faz com que a variável response espere o término
      // da excução de axios.all com todas as Promises resultantes 
      const response = await axios.all([
        axios.get(`https://swapi.dev/api/films/1/`),
        axios.get(`https://swapi.dev/api/films/2/`),
        axios.get(`https://swapi.dev/api/films/3/`),
        axios.get(`https://swapi.dev/api/films/4/`),
        axios.get(`https://swapi.dev/api/films/5/`),
        axios.get(`https://swapi.dev/api/films/6/`),])
      
      //Após a finalização da expressão anterior, é percorrido cada resultado de axios.all, salvo em response, por meio do forEach
      //onde o resultado em element.data dentro do objeto element, de response, é salvo dentro do objeto auxFilms por meio do 
      //método push que element.data junto com os valores que ja estão dentro de auxFilms 
      response.forEach(element => {
        auxFilms.push(element.data)
      });

      //Depois de todos os valores salvos em auxFilms, utilizamso o método setFilms para salvar esse objeto no estado FILMS
      setFilms(auxFilms)
    }

    //Chamamos a função para ser executada
    loadFilms()

  },[])

  
  return (

    <div className="App">
      <header className="App-header">
        <h1>STAR WARS API</h1>
        <h2>DESAFIO MERCADOU</h2>
        <p className="author"> Autor: BRUNO AQUINO DE OLIVEIRA</p>   
      </header>
      {
        //Abaixo o componente Movies é declarado enviando o state films para o prop films do componente
      }
      <Movies films={films}/>  
    </div>
  );
}

export default App;