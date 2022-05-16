import React, { useState } from 'react'
import styled from 'styled-components'
import {NewGameModal} from './NewGameModal'
import {Player} from './Player'
import { getRandomColor } from '../data/getColor'

// Create a context to hold global settings
export const SettingsContext = React.createContext();

const StyledApp = styled.div`
`
export function App() {
  
  const [playerCount, setPlayerCount] = useState(0)
  const [startingLifeTotal, setStartingLifeTotal] = useState(40)
  const [newGameOpen, setNewGameOpen] = useState(true)
  
  const addPlayers = (numOfPlayers) => {
    let playersArr = []
    let chosenColors = []

    const getNewPlayerColor = () => {
      let newColor = getRandomColor();
      // If newColor has already been chosen, execute a recursive call to select another
      if(chosenColors.includes(newColor[0])) {
        return getNewPlayerColor();
      }
      // colour has not been selected before so push it to the list and return it
      chosenColors.push(newColor[0]);
      return newColor;
    }

    for(let i = 1; i <= numOfPlayers; i++) {
      
      playersArr.push(
        <Player
        startingLifeTotal={startingLifeTotal} 
        defaultPlayerName={`Player ${i}`}
        playerNo={i}
        playerColors={getNewPlayerColor()}
        key={`player${i}`} 
        />
        )
      }
    return playersArr;
  }

  return (
    <StyledApp>
      <SettingsContext.Provider value={{
        playerCount, setPlayerCount, startingLifeTotal, setStartingLifeTotal, newGameOpen, setNewGameOpen
      }}>
        <NewGameModal/>
      </SettingsContext.Provider>
      <main className="playerArea">
        {addPlayers(playerCount)}
      </main>
    </StyledApp>
  );
}
