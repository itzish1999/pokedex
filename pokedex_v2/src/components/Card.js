import React from "react";


const Card = ({ pokemonImage, pokemonName, pokemonAbilities, pokemonMoves, pokemonExperience }) => {
    return (
        <div className="card">
            <div className="card-top">
                <p className="name">{pokemonName}</p>
                <img src={pokemonImage} />
            </div>
            <div className="card-body">
                <p>Abilities: {pokemonAbilities} </p>
                <p>Moves: {pokemonMoves}</p>
            </div>
            <div className="card-bottom">
                <p>Experience: {pokemonExperience}</p>
            </div>

        </div>
    )
}

export default Card;