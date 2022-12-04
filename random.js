const readline = require('readline')

var user_input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

game();
var randomWord = '';
function game() {
    userGuess = "";
    count = 1;
    randomWord = randomString(4).split('');
    //console.log(randomWord);
    gameLoop();
}

var userGuess = '';
var count = 1;
function gameLoop() {
    user_input.question('Guess 4 Letters! (A-Z) : ', word => {
        userGuess = word.toUpperCase().split('');
        //console.log(userGuess);
        checkChars();
        checkPosition();
    })
}

var chars
function randomString(length) {
    var result = '';
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charsLenght = chars.length;
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charsLenght));
    }
    return result;
}

function checkChars() {
    var correctIndex = [5, 5, 5, 5];
    var k = 0;
    var correctChar = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (j === correctIndex[0] || j === correctIndex[1] || j === correctIndex[2] || j === correctIndex[3]) {
                continue;
            }
            if (userGuess[i] === randomWord[j]) {
                correctChar += 1;
                correctIndex[k] = j;
                k++;
                break;
            }
        }
    }
    console.log('Correct ' + correctChar + ' Letter');
}

function checkPosition() {
    var correct = 0;
    for (var i = 0; i < 4; i++) {
        if (userGuess[i] === randomWord[i]) {
            correct++;
        }
    }
    console.log('Correct ' + correct + ' Position')
    if (correct !== 4) {
        count++;
        gameLoop();
    }
    else {
        user_input.question('Enter Your Name : ', name => {
            console.log(name + ' Correct In ' + count + ' Times');
            user_input.question('Do You Want To Play New Game Y/N : ', ans => {
                if (ans === 'Y') {
                    game();
                }
                else {
                    process.exit();
                }
            })
        })
    }
}
