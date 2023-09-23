import React, {useState} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

// Import components
import GridLine from "./components/GridLine";
import GridBox from "./components/GridBox";
import WinnerLine from "./components/WinnerLine";
import GameInfo from "./components/GameInfo";

// Import background image
import space from './space.hdr'

// Import styles
import './App.css'

function App() {
  const positions = [
    [-1.2, 2.4, 0],
    [1.2, 2.4, 0],
    [3.6, 2.4, 0],
    [-1.2, 0, 0],
    [1.2, 0, 0],
    [3.6, 0, 0],
    [-1.2, -2.4, 0],
    [1.2, -2.4, 0],
    [3.6, -2.4, 0],
  ];

  function findWinner(gameboard) {
    let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      let [a, b, c] = winningCombinations[i];
      
      if ( gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
        return [gameboard[a], winningCombinations[i]];
      } 
    }
    return [null, null];
  }

  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
  const [nextTurn, setNextTurn] = useState(true);
  const [winner, positionIndices] = findWinner(gameBoard);

  function handleClick(i) {
    const boardCopy = [...gameBoard];

    if (winner || boardCopy[i]) {
      return;
    }

    boardCopy[i] = nextTurn ? "Sphere" : "Cube";
    setGameBoard(boardCopy);
    setNextTurn(prevNextTurn => !prevNextTurn);
  };

  function resetGameBoard() {
    setGameBoard(Array(9).fill(null));
  };

  return (
    <>
      <Canvas
        camera={{
          fov: 50,
          position: [-10, -5, -15],
          rotation:[Math.PI, 0, 0]
        }}
      >
        <OrbitControls maxDistance={40} enableDamping />

        {/* add lighting */}
        <ambientLight />
        <pointLight
          position={[-150, 300, -300]}
          intensity={0.9}
        />

        <Environment background={true} files={space}/>

        {/* create grid */}
        <GridLine position={[2.5, 0, 0]} />
        <GridLine position={[0, 0, 0]} />
        <GridLine position={[1.2, -1.2, 0]} rotation={[0, 0, Math.PI / 2]} />
        <GridLine position={[1.2, 1.2, 0]} rotation={[0, 0, Math.PI / 2]} />
      
        {positions.map((gridBox, idx) => {
          return (
            <GridBox
              key={idx}
              shape={gameBoard[idx]}
              position={gridBox}
              handleClick={() => handleClick(idx)}
              winner={winner}
            />
          )
        })}

        {/* Render the winner */}
        {winner ? <WinnerLine  positions={positions} positionIndices={positionIndices}/> : null}
      </Canvas>

      <GameInfo
        gameBoard={gameBoard}
        nextTurn={nextTurn}
        winner={winner}
        resetGameBoard={resetGameBoard}
      />
    </>
  )
};

export default React.memo(App);