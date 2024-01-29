function gameBoard () {
    let gameboard = [[" "," "," "], [" "," "," "], [" "," "," "]];
    const getGameBoard = function () {
        return gameboard
    }
    const updateGameBoard = function (playerId, position) {
        //verify pos        
        if (!validPos(position)) {
            console.log("Make sure both Column and Row are numbers from 0 to 2 (0, 1, 2)")
            return false
        }
        //update board
        if (playerId) {
            gameboard[position.getRow()][position.getCol()] = "O"
        } else {
            gameboard[position.getRow()][position.getCol()] = "X"
        }
        return true
    }
    const validPos = function (pos) {
        //check in bounds of board and check if unoccupied
        return ((pos.getCol() < 3 && pos.getCol() > -1) && (pos.getRow() < 3 && pos.getRow() > -1))
        && (gameboard[pos.getRow()][pos.getCol()] === " ");
    }
    const resetBoard = function () {
        gameboard = [[" "," "," "], [" "," "," "], [" "," "," "]];
    }
    const printBoard = function (gameBoard) {
        console.log('  0   1   2')
        for(let i = 0; i < 3; i++) {
            process.stdout.write(`${i} `)
            for (let j = 0; j < 3; j++) {
                process.stdout.write(`${gameBoard[i][j]}`)
                if (j < 2) {
                    process.stdout.write(` | `);
                }
            }
            if (i < 2) {
                console.log("\n -----------");
            }
        }
        console.log()
    }
    return { getGameBoard, updateGameBoard, resetBoard, printBoard };
}

function player(id, name) {
    const playerId = id; 
    let playerName = name;
    const getplayerId = function () {
        return playerId;
    }
    const getPlayerName = function () {
        return playerName;
    }
    return { getPlayerName, getplayerId };
}

function gameController () {
    let board = gameBoard();
    let players = [];
    let turnCount = 1;
    const getGameBoard = function () {
        return board.getGameBoard();
    }
    const updateGameBoard = function (playerId, position) {
        return board.updateGameBoard(playerId , position);
    }
    const getPlayers = function () {
        return players;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    const addPlayer = function (name) {
        players.push(player(players.length, name));
    }
    const getTurnCount = function () {
        return turnCount;
    }      
    const increaseTurnCount = function () {
        turnCount++;
    }
    const resetGame = function () {
        board.resetBoard();
        players = [];
        turnCount = 1;
    }
    const checkWin = function (position) {
        //check not Diag
        /*
        if minus |row - col| = 1 not on a diag
        0 1 2
        1 0 1
        2 1 0
        */
        const row = position.getRow()
        const col = position.getCol()
        const absPos = Math.abs(row - col)
        
        return (new Set(board.getGameBoard()[row]).size === 1) //check row
        || (new Set([board.getGameBoard()[0][col], board.getGameBoard()[1][col], board.getGameBoard()[2][col]]).size === 1) //check col
        || (absPos === 0 && (new Set([board.getGameBoard()[0][0], board.getGameBoard()[1][1], board.getGameBoard()[2][2]]).size === 1)) //check left -> right diag
        || ((absPos === 2 || (row === 2 && col === 2)) && (new Set([board.getGameBoard()[0][2], board.getGameBoard()[1][1], board.getGameBoard()[2][0]]).size === 1)) //check right -> left diag
    }
    const printBoard = function () {
        board.printBoard(getGameBoard());
    }
    return { getGameBoard, updateGameBoard, getPlayers, addPlayer, getTurnCount, increaseTurnCount, resetGame, checkWin, printBoard };
}

function position (x, y) {
    const row = y;
    const col = x;
    const getRow = function () {
        return row;
    }      
    const getCol = function () {
        return col;
    }     
    return { getRow, getCol };
}


const controller = gameController();
if (typeof window === 'undefined') {
    //if nodejs
    while(true) {
        controller.resetGame()
        //add players
        const prompt = require('prompt-sync')();
        let name = prompt("Add Player 1's Name: ");
        console.log(`Hey there ${name}`);
        controller.addPlayer(name);
        name = prompt("Add Player 2's Name: ");
        console.log(`Hey there ${name}`);
        controller.addPlayer(name);
        //start game
        console.log(`Let the Game Begin`);
        let win = false;
        let playerIndex = 1
        let players = controller.getPlayers()
        while (!win || controller.getTurnCount() === 10) {
            console.log(`Turn ${controller.getTurnCount()}`)
            console.log(`It's ${players[playerIndex].getPlayerName()}'s Turn`)
            controller.printBoard();
            
            // win = true
            let col = parseInt(prompt("Which Column: "));
            let row = parseInt(prompt("Which Row: "));
            if (isNaN(col) || isNaN(row)) {
                console.log("Make sure both Column and Row are numbers from 0 to 2 (0, 1, 2)")
                continue;
            }
            let pos = position(col, row)
            if (controller.updateGameBoard(playerIndex, pos)) {
                win = controller.checkWin(pos);
                if (!win) {
                    controller.increaseTurnCount();
                    playerIndex = controller.getTurnCount() % 2
                }
            }
        }
        console.log(`\n${players[playerIndex].getPlayerName()} Wins!!!`)
        controller.printBoard();
        while (true) {
            console.log("Do you want to play again?")
            let again = prompt("Yes or No: ");
            if (again === "Yes") {
                console.log("\n\n")
                break;
            } else if (again === "No") {
                return;
            } else {
                console.log("input must be either 'Yes' or 'No'");
            }
        }
    }

} else {
    //if webjs
    //add players
    //start game
    console.log("hi");
}
