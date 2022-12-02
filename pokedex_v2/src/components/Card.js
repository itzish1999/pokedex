import React, { useState } from "react";


const Card = ({ pokemonImage, pokemonName, pokemonForms, pokemonAbilities, pokemonMoves, pokemonExperience }) => {
    const [isClicked, setIsCliked] = useState(false);

    const handleClick = value => () => {
        console.log(value);
        setIsCliked(true)
    }

    return (
        <div className="card">
            <div className="card-top">
                <p className="name"><b>{pokemonName}</b></p>
                <img src={pokemonImage} />
            </div>
            <div className="card-body">
                <p><b>Species:</b> {pokemonForms}</p>
                <p><b>Abilities:</b> {pokemonAbilities} </p>
                <button onClick={handleClick(pokemonMoves)}><b>See Moves:</b></button>
                <button onClick={() => setIsCliked(false)}><b>Close Moves</b></button>
                <div>{isClicked && (
                    <>
                        <p><b>Moves:</b> {pokemonMoves}</p>
                    </>
                )}
                </div>
            </div>
            <div className="card-bottom">
                <p><b>Experience:</b> {pokemonExperience}</p>
            </div>

        </div>
    )
}

export default Card;