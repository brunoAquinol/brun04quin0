import React from 'react';

// Importação da estilização da página
import './Characters.css';

function Characters({characters, index, movieIndex}){

    return(
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
                    index === movieIndex ? characters.map(character =>(
                    <div className="character" key={character.url}>
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
      
    )
}

export default Characters;