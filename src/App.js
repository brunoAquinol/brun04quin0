// Aqui são importados os Hooks do React para manipulação de estados e de efeito na inicialização
import { useEffect, useState } from 'react';

// É importado o axios para realizar as requisições GET no site https://swapi.dev/api/
import axios from 'axios';

// Importação da estilização da página
import './App.css';

function App() {

  //São declarados os estados (films, characters e movieIndex) e seus manipuladores (setFilms,setCharacters,setCharacters)
  //e terão seus valores iniciais declarados com a Hook useState
  
  //O estado films será responsável em armazenar as informações de todos os filmes adquiridos na requisição em loadFilmes()
  const[films, setFilms] = useState([]);

  //O estado characters armazenará as informações referentes aos personagens de um determinado filme feitas na requisição em getCharacters()
  const[characters, setCharacters] = useState([]);

  //O estado movieIndex armazenará o índice do filme que deseja ter as informações de seus personagens enviado para getCharacters()
  const[movieIndex, setMovieIndex] = useState('');


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

  //Foi criado uma função assíncrona chamada getCharacters para realizar a requisição das urls enviadas como parâmetro em charactersUrl
  //e o index do filme que possui as urls dos personagens enviados como parâmetro pelo charactersUrl
  async function getCharacters(charactersUrl, index) {

    //Inicialização de objetos para manipulaçao durante o código
    const auxCharacters = [], axiosGetCharact = [];

    //Realiza as requisições dos links passados em charactersUrl que é mapeado e cada link é requisitado separadamente em axios.get
    //O método .then() de uma Promise retorna um Promise, então Promise.all pega todos esses resultados esperando que todos eles sejam resolvidos
    // O await está fora do loop para que cada solicitção não esperar a anterior terminar e executa-lás em paralelo
    await Promise.all(charactersUrl.map(element =>
      axios.get(element).then(response => {

        //Para cada link  de charactersUrl feita a requisição, o .then() salva sua resposta dentro de axiosGetCharact através do push()
        axiosGetCharact.push(response);
      })
    ));

    //No loop for é percorrido até o tamanho total do axiosGetCharact para salvar a propriedade .data de axiosGetCharact no índice i dentro de auxCharacters
    //pelo método push() 
    for(var i = 0; i < axiosGetCharact.length; i++){
      auxCharacters.push(axiosGetCharact[i].data);
    }

    //Salva o index do filme, passado como parâmetro da função, para o estado movieIndex para ser avaliado na renderização dos personagens de acordo
    //com o index do filme
    setMovieIndex(index)

    //Salva o objeto de personagens de auxCharacters para o estado characters
    setCharacters(auxCharacters)
  }
  
  return (

    <div className="App">
      <header className="App-header">
        <h1>STAR WARS API</h1>
        <h2>DESAFIO MERCADOU</h2>
        <p className="author"> Autor: BRUNO AQUINO DE OLIVEIRA</p>
          
          {/*Aqui, o estado FILMS é mapeado, já que ele já possui os valores renderizados automáticamente no inicio na função loadFilms()
            dentro de useEffect, e para cada objeto dentro de films, ele capta suas propriedades requeridas no desafio: 
            (title, director, episode_id, release_date, e characters) 
          */

          /*Ao clicar em BUTTON é disparada uma ação para a função getCharacters() enviando os parâmentros film.characters e index
            do filme que está sendo mapeado naquele instante para que os valores dos personagens e do índice salvos daquele filme sejam 
            salvos no estado characters e movieIndex.

            Para otimização da página, esse método foi escolhido para evitar que todas as informçaões sejam carregadas de uma vez podendo
            pesar na renderização. Então o usuário veria apenas as informações dos filmes escolhidos por ele.
            
          */
          films.map((film, index) =>(  
            <div key={index} className="movie">
              <div className="movieText">
                <h1>FILME</h1>
                <h2>{film.title}</h2>
                <p>Diretor: {film.director}</p>
                <p>Produtor: {film.producer}</p>
                <p>Número do Filme: {film.episode_id}</p>
                <p>Data de Lançamento: {film.release_date}</p>
                <br/>
                <button onClick={() => getCharacters(film.characters, index)}>MOSTRAR PERSONAGENS</button>
                {null}
              </div>
              <div>
                { 
                  <div className="characters">
                      {
                        /*Após clicar o button e a função ser disparada, em <div className="characters"> há uma avaliação com o 
                          operador ternário para saber se o índice do filme mapeado no momento de clicar no botão é o mesmo do salvo 
                          em movieIndex através do método getCharacters(). 
                          
                          Caso seja verdade o estado dos personagens CHARACTERS  será mapeado para ser renderizada suas propriedades de 
                          personagens pedidas no desafio: (name, height, mass, hair_color, eye_color, birth_year e gender). Caso contrário 
                          o null resulta em renderizar nada na tela.

                          Dessa forma, evita-se que ao clicar no botão de um filme, os personagens aparecerão apenas na área daquele filme 
                          clicado evitando que a informação se repita para os outros filmes.
                        */
                        index == movieIndex ? characters.map(character =>(
                          <div className="character">
                            <h3>{character.name}</h3>
                            <p><strong>Altura:</strong> {character.height} cm</p>
                            <p><strong>Massa:</strong> {character.mass} kg</p>
                            <p><strong>Cor do Cabelo:</strong> {character.hair_color}</p>
                            <p><strong>Cor da Pele:</strong> {character.skin_color}</p>
                            <p><strong>Cor dos Olhos:</strong> {character.eye_color}</p>
                            <p><strong>Data de Nascimento:</strong> {character.birth_year}</p>
                            <p><strong>Gênero:</strong> {character.gender}</p>
                          </div>
                        )) : null

                      }
                  </div>     
                  }
              </div>
            </div>
            ))
          }        
      </header>
    </div>
  );
}

export default App;