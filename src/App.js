import React, { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import blueCandy from './img/blue-candy.png'
import greenCandy from './img/green-candy.png'
import redCandy from './img/red-candy.png'
import yellowCandy from './img/yellow-candy.png'
import purpleCandy from './img/purple-candy.png'
import orangeCandy from './img/orange-candy.png'
import blank from './img/blank.png'

const width = 8;
const candyColors = [blueCandy, greenCandy, redCandy, yellowCandy, orangeCandy, purpleCandy, blank];

function App() {
  const [cCArrangement, setcCArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay,setScoreDisplay] = useState(0)

  const checkForFourColumns = () => {

    for(let i=0; i <= 39; i++){
        const fourcolumns= [i, i + width, i + width*2,  i + width*3]
        const decidedColor=cCArrangement[i]
        const isBlank= cCArrangement[i] === blank
        
        if(fourcolumns.every(square=> cCArrangement[square]===decidedColor) && !isBlank){
          setScoreDisplay((score) => score + 4 )
            fourcolumns.forEach(square =>cCArrangement[square] = blank);
            return true;
        }
    }
  }
  const checkForFourRows = () => {

    for(let i=0; i < 64; i++){
        const fourRows= [i, i + width, i + 2,  i + 3]
        const decidedColor=cCArrangement[i]
        const notValid =[5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 63, 64]
        const isBlank= cCArrangement[i] === blank

        if(notValid.includes(i))continue
        
        if(fourRows.every(square=> cCArrangement[square]===decidedColor) && !isBlank){
          setScoreDisplay((score) => score + 4 )
            fourRows.forEach(square =>cCArrangement[square] = blank);
            return true;
        }
    }
  }

  const checkForThreeColumns = () => {

    for(let i=0; i <= 47; i++){
        const threecolumns= [i, i + width, i + width*2]
        const decidedColor=cCArrangement[i]
        const isBlank= cCArrangement[i] === blank
        
        if(threecolumns.every(square=> cCArrangement[square]===decidedColor) && !isBlank){
          setScoreDisplay((score) => score + 3)
            threecolumns.forEach(square =>cCArrangement[square] = blank);
            return true;
        }
    }
  }

  const checkForThreeRows = () => {

    for(let i=0; i < 64; i++){
        const threeRows= [i, i + 1, i + 2]
        const decidedColor=cCArrangement[i]
        const notValid =[6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
        const isBlank= cCArrangement[i] === blank

        if(notValid.includes(i))continue
        
        if(threeRows.every(square=> cCArrangement[square]===decidedColor) && !isBlank){
          setScoreDisplay((score) => score + 3)
            threeRows.forEach(square =>cCArrangement[square] = blank);
            return true;
        }
    }
  }

  const moveIntoSquareBelow = () =>{
    for(let i=0; i <= 55; i++){
        const firstColumn =[0,1,2,3,4,5,6,7];
         const isFirstColumn= firstColumn.includes(i)

        if(isFirstColumn && cCArrangement[i] === blank){
            let randomNum = Math.floor(Math.random() * candyColors.length);
            cCArrangement[i]=candyColors[randomNum]
        }

        if((cCArrangement[i + width] )=== blank){
            cCArrangement[i + width] =cCArrangement[i];
            cCArrangement[i] = blank
        }
    }
  }

  const dragStart = (e) =>{
    setSquareBeingDragged(e.target)
    // console.log(e.target)
    // console.log('drag start')
  }
  const dragDrop = (e) =>{
    setSquareBeingReplaced(e.target)
    // console.log(e.target)
    // console.log('drag drop')
  }
  const dragEnd = (e) =>{
    // console.log('drag end')

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId =parseInt(squareBeingReplaced.getAttribute('data-id'))

    cCArrangement[squareBeingDraggedId] =squareBeingReplaced.getAttribute('src')
    cCArrangement[squareBeingReplacedId] =squareBeingDragged.getAttribute('src')

    const validMoves = [
        squareBeingDraggedId - 1,
        squareBeingDraggedId - width,
        squareBeingDraggedId + 1,
        squareBeingDraggedId + width,
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isFourColumns= checkForFourColumns()
    const isThreeColumns= checkForThreeColumns()
    const isFourRows= checkForFourRows()
    const isThreeRows= checkForThreeRows()

    if(squareBeingReplacedId && validMove && (isFourColumns || isFourRows || isThreeColumns || isThreeRows)){
        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
    }else{
        cCArrangement[squareBeingDraggedId]=squareBeingDragged.getAttribute('src')
        cCArrangement[squareBeingReplacedId]=squareBeingReplaced.getAttribute('src')
        setcCArrangement([...cCArrangement])
    }

    // console.log('squareBeingDraggedId',squareBeingDraggedId)
    // console.log('squareBeingReplacedId',squareBeingReplacedId)
  }

  const createBoard = () => {
    const randomCandyArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomCandyArrangement.push(randomColor);
    }
    setcCArrangement(randomCandyArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(()=>{
    const timer= setInterval(()=>{
        checkForFourColumns();
        checkForFourRows();
        checkForThreeColumns();
        checkForThreeRows();
        moveIntoSquareBelow();
        setcCArrangement([...cCArrangement])
    }, 150)

    return () =>clearInterval(timer)

  },[checkForFourColumns, checkForFourRows, checkForThreeColumns, checkForThreeRows, moveIntoSquareBelow, cCArrangement])

//   console.log(cCArrangement);
console.log(scoreDisplay)

  return (
    <div className="app">
      <div className="game">
        {cCArrangement.map((candyColors, index) => (
            <img 
            key={index}
          src={candyColors}
            alt={candyColors}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay}/>
    </div>
  );
}

export default App;
