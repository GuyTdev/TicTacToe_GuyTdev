const PLAYER_X='X';
const PLAYER_0='0';
let move = 0;
let current_player=PLAYER_X;
let winCombos=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
let boardsArrays= [];
boardsArrays.push(Array(9).fill(""));
console.log("boardsArrays starts=>",boardsArrays);
let newRecord=9;
//This is my tic tac toe data structure:
//   2D array, each array represent a specific move status board.
// let boardsArrays=[
//     ["","","","","","","","",""],//move0
//     ["","","","","","","","",""],//move1
//     ["","","","","","","","",""],//move2
//     ["","","","","","","","",""],//move3
//     ["","","","","","","","",""],//move4
//     ["","","","","","","","",""],//move5
//     ["","","","","","","","",""],//move6
//     ["","","","","","","","",""],//move7
//     ["","","","","","","","",""],//move8
//     ["","","","","","","","",""],//move9
// ]

    /**
     *    9 boxes of game board represented as an array of 9 cells.
     *     10 possibly move are represented as an array of 10 cells(move 0 is represented by an array of 9 cells which each of them is "").
     *
     *
     *       -----board array------------------------
     *      | box1 | box2 | box3 |
     *      ++++++++++++++++++++++
     *      | box4 | box5 | box6 |
     *      ++++++++++++++++++++++
     *      | box7 | box8 | box9 |
     *      ++++++++++++++++++++++
     * 
     * 
     *      -boardsArrays[0]------------------------
     *      | "" | "" | "" |
     *      ++++++++++++++++
     *      | "" | "" | "" |             move 0
     *      ++++++++++++++++
     *      | "" | "" | "" |
     *      ++++++++++++++++
     * 
     *      -boardsArrays[1]------------------------
     *      | "" | "X" | ""|
     *      ++++++++++++++++
     *      | "" | "" | "" |             move 1
     *      ++++++++++++++++
     *      | "" | "" | "" |
     *      ++++++++++++++++
     * 
     *      -boardsArrays[2]------------------------
     *      | "" | "X" | ""|
     *      ++++++++++++++++
     *      | "" | "" | "" |             move 2
     *      ++++++++++++++++
     *      | "" | "" | "" |
     *      ++++++++++++++++
     *      -boardsArrays[3]------------------------
     *                .                    .
     *                .                    .
     *                .                    .
     *                .                    .
     *                .                    .
     *                .                    .
     *                .                    .
     *                .                    .
     *                .                    .
     *              
     *      -boardsArrays[9]------------------------
     *      | "X" | "0" | "X" |
     *      +++++++++++++++++++
     *      | "0" | "0" | "X" |          Move 9
     *      +++++++++++++++++++
     *      | "X" | "0" | "0" |
     *      +++++++++++++++++++
     */
// const showStatus = (text) =>{
//     let status = document.getElementById("text_status");
//     status.innerHTML(text);
// }
    
const checkWinner = (currentBoardArray) => {
    winCombos.forEach(combo=>{
        if(current_player == currentBoardArray[combo[0]-1] && current_player == currentBoardArray[combo[1]-1] && current_player == currentBoardArray[combo[2]-1] ){
            console.log("winner combo", combo);
            if (newRecord > move) {
                newRecord=move;
                window.alert(`you have set a new minimal record of ${newRecord} moves`)
            }
            winnerDisplay(combo);
            // showStatus(`player ${current_player} wins`);
            return true;
        }
    })
    return false;
}
const showNextTurn = (boxid) =>{
    let over_box = document.getElementById(boxid);
    if (over_box.disabled ==false &&  over_box.value =="" )
        over_box.value = current_player;
}
const hideValueFromBox = (boxid) =>{
    let over_box = document.getElementById(boxid);
    if (over_box.disabled==false &&  (over_box.value =="X" || over_box.value =="0" ))
        over_box.value = "";
}

const winnerDisplay = (combo) =>{
    window.alert(`player ${current_player} wins with combo ${combo}`)
    console.log(`change ${combo} background to gray and text color to green`);
    reset();
}
const tieDisplay = () =>{
    console.log("move",move);
    console.log("boardsArrays",boardsArrays);
    window.alert(`Its a Tie`);
    // showStatus(`Its a Tie`);
    reset();
}
const reset = () => {
    move=0;
    boardsArrays= [];
    boardsArrays.push(Array(9).fill(""));

// [

    // ["","","","","","","","",""],//move0
    // ["","","","","","","","",""],//move1
    // ["","","","","","","","",""],//move2
    // ["","","","","","","","",""],//move3
    // ["","","","","","","","",""],//move4
    // ["","","","","","","","",""],//move5
    // ["","","","","","","","",""],//move6
    // ["","","","","","","","",""],//move7
    // ["","","","","","","","",""],//move8
    // ["","","","","","","","",""],//move9
    
// ]
    

    displayBoard(boardsArrays[move]);
}

const saveMove = () =>{
    console.log(`boardsArrays to save=>`,boardsArrays);
    sessionStorage.setItem("boardsArraysTosave",JSON.stringify(boardsArrays));
    sessionStorage.setItem("moveToSave",move);
}
const loadMove= () =>{
    let loadedBoardsArrays = JSON.parse(sessionStorage.getItem("boardsArraysTosave"));
    let loadedMove = sessionStorage.getItem("moveToSave");
    console.log("savedBoardsArrays=>", loadedBoardsArrays);
    console.log("loadedMove=>", loadedMove);
    boardsArrays = loadedBoardsArrays;
    move=loadedMove;
    displayBoard(loadedBoardsArrays[loadedMove]);
}

const previousMove = () =>{
    if(move>0){
        move--;
        boardsArrays.pop();
        current_player = current_player==PLAYER_0?PLAYER_X:PLAYER_0;
        console.log(`boardsArrays previuos move`,boardsArrays);
        displayBoard(boardsArrays[move]);
    }

}
const showRec = () =>{
    window.alert(newRecord);
}
const change_board = (pressedId) =>{
    move++;
    // showStatus(`player ${current_player} turn`);
    //1. change relevat view to X or 0
    //2. insert to boardsArrays[move][relevat_box-1] 
    //3. inc move by 1
    let relevant_box = pressedId;
    console.log("relevant_box",relevant_box);
    console.log(`boardsArrays.m[${move-1}]`,boardsArrays[move-1]);
    boardsArrays.push([].concat(boardsArrays[move-1]));
    boardsArrays[move][relevant_box-1]=current_player;
    console.log(`boardsArrays[${move}]`,boardsArrays[move]);
    console.log(`boardsArrays`,boardsArrays);
    displayBoard(boardsArrays[move]);
    if(move>4){
        checkWinner(boardsArrays[move]);
        if(move==9 && checkWinner(boardsArrays[move])==false )  tieDisplay(); 
    }
    current_player = current_player==PLAYER_X? PLAYER_0 : PLAYER_X;
                

}
const displayBoard = (currentBoardArray) =>{
    console.log("currentBoardArray=>",currentBoardArray);
    for (let index = 1; index <= currentBoardArray.length; index++) {
        var btn_box = document.getElementById(index);
        btn_box.value = currentBoardArray[index-1]; //set X or 0
        btn_box.value!=="" ? btn_box.disabled=true : btn_box.disabled=false;//if the box has a 0 or X value then disable that cell; currentBoardArray[index-1]
        
        
    }
}

// Tarnegelet implementation:
    // switch (move) {
    //     case 1:
    //         {
    //             let relevant_box = pressedId;
    //             console.log("relevant_box",relevant_box);
    //             boxesStateArray1[relevant_box-1]=current_player;
    //             console.log("boxesStateArray1",boxesStateArray1);
    //             displayBoard(boxesStateArray1);
    //             current_player=PLAYER_0;
    //             break;
                
    //         }
    //         case 2:
    //         {
                    
    //             let relevant_box = pressedId;
    //             console.log("relevant_box",relevant_box);
    //             boxesStateArray2 = boxesStateArray1;
    //             boxesStateArray2[relevant_box-1]=current_player;
    //             console.log("boxesStateArray2",boxesStateArray2);
    //             displayBoard(boxesStateArray2);
    //             current_player=PLAYER_X;
    //             break;
    //         }
    //         case 3:
    //         {
                    
    //             let relevant_box = pressedId;
    //             console.log("relevant_box",relevant_box);
    //             boxesStateArray3 = boxesStateArray2;
    //             boxesStateArray3[relevant_box-1]=current_player;
    //             console.log("boxesStateArray3",boxesStateArray3);
    //             displayBoard(boxesStateArray3);
    //             current_player=PLAYER_0;
    //             break;
    //         }
    //         case 4:
    //         {
                    
    //             let relevant_box = pressedId;
    //             console.log("relevant_box",relevant_box);
    //             boxesStateArray4 = boxesStateArray3;
    //             boxesStateArray4[relevant_box-1]=current_player;
    //             console.log("boxesStateArray4",boxesStateArray4);
    //             displayBoard(boxesStateArray4);
    //             current_player=PLAYER_X;
    //             break;
    //         }
    //         case 5:
    //         {
                    
    //             let relevant_box = pressedId;
    //             console.log("relevant_box",relevant_box);
    //             boxesStateArray5 = boxesStateArray4;
    //             boxesStateArray5[relevant_box-1]=current_player;
    //             console.log("boxesStateArray5",boxesStateArray5);
    //             displayBoard(boxesStateArray5);  
    //             current_player=PLAYER_0;
    //             break;
    //         }
    //         case 6:
    //         {
                    
    //             let relevant_box = pressedId;
    //             console.log("relevant_box",relevant_box);
    //             boxesStateArray6 = boxesStateArray5;
    //             boxesStateArray6[relevant_box-1]=current_player;
    //             console.log("boxesStateArray6",boxesStateArray6);
    //             displayBoard(boxesStateArray6); 
    //             current_player=PLAYER_X;
    //             break;
    //         }
    //         case 7:
    //         {
                    
    //             let relevant_box = pressedId;
    //             console.log("relevant_box",relevant_box);
    //             boxesStateArray7 = boxesStateArray6;
    //             boxesStateArray7[relevant_box-1]=current_player;
    //             console.log("boxesStateArray7",boxesStateArray7);
    //             displayBoard(boxesStateArray7); 
    //             break;
    //         }
    //         case 8:
    //         {
    //             let relevant_box = pressedId;
    //             console.log("relevant_box",relevant_box);
    //             boxesStateArray8 = boxesStateArray7;
    //             boxesStateArray8[relevant_box-1]=current_player;
    //             console.log("boxesStateArray8",boxesStateArray8);
    //             displayBoard(boxesStateArray8); 
    //             current_player=PLAYER_X;
    //             break;
    //         }
    //         case 9:
    //         {
                    
    //             let relevant_box = pressedId;
    //             console.log("relevant_box",relevant_box);
    //             boxesStateArray9 = boxesStateArray8;
    //             boxesStateArray9[relevant_box-1]=current_player;
    //             console.log("boxesStateArray9",boxesStateArray9);
    //             displayBoard(boxesStateArray9); 
    //             current_player=PLAYER_0;
    //             window.alert("game over")
    //             break;
    //         }
                        
    //     default:
    //         break;
    // }