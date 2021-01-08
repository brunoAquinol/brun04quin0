// Aqui são importados os Hooks do React para manipulação de estados
import React, {useState} from 'react';

// É importado o axios para realizar as requisições GET no site https://swapi.dev/api/
import axios from 'axios';

//importando componente que renderiza os Personagens
import Characters from '../../components/Characters/Characters'

// Importação da estilização da página
import './Movies.css';

function Movies({films}){

    //São declarados os estados (characters e movieIndex) e seus manipuladores (setCharacters e setMovieIndex ) 
    //e terão seus valores iniciais declarados com a Hook useState

    //O estado characters armazenará as informações referentes aos personagens de um determinado filme feitas
    // na requisição em getCharacters()
    const[characters, setCharacters] = useState([]);

    //O estado movieIndex armazenará o índice do filme que deseja ter as informações de seus personagens enviado para getCharacters()
    const[movieIndex, setMovieIndex] = useState('');

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

    return(
        <div>
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
                        {
                            //Abaixo o componente Characters é declarado enviando os states characters e movieIndex
                            //e o índice index, do map, referente do filme clicado no button para os props (characters, index, movieIndex)
                            // do componente
                        }
                        <Characters 
                            characters={characters} 
                            index={index} 
                            movieIndex={movieIndex}
                        />
                    </div>
                ))
            }
        </div>        
    )
}

export default Movies;