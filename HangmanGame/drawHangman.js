'use strict'

const letterArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const guessWords = ["RACECAR","FIGHT","NERO","PALINDROME"];
var letterGuessArray = [];
var correctLetterArray = [];
var blankFilledArray = [];

const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');


const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const halfwayCanvas = canvasWidth/2;
const quarterCanvas = canvasWidth/4;

const letterRows = 6;
const letterColumns = 5;

var wrongGuessCount = 0;
var filledInLetters = 0;

var happyWord = guessWords[Math.floor(Math.random()*guessWords.length)];

ctx.font = "20px sans-serif";

function Init()
{
    var xStart = 0;
    var xEnd = 500;
    var yStart = 0;
    var yEnd = 500;

    ctx.beginPath();
    ctx.moveTo(halfwayCanvas, yStart);
    ctx.lineTo(halfwayCanvas, canvasHeight/2);
    
    ctx.moveTo(xStart, canvasHeight/2);
    ctx.lineTo(xEnd, canvasHeight/2);
    
    ctx.moveTo(100,100);
    ctx.lineTo(100,225);

    ctx.moveTo(75,225);
    ctx.lineTo(125,225);
			
    ctx.moveTo(100,100);
    ctx.lineTo(150,100);
			
    ctx.moveTo(150,100);
    ctx.lineTo(150,125);
    ctx.stroke();
}

function DisplayLetters()
{
    var xColumnSpot = (halfwayCanvas/letterColumns)/2;
    var yColumnSpot = Math.floor(halfwayCanvas/letterRows)/2;
    var letterCounter = 0;

    ctx.fillStyle = "blue";

    for(let rowSpot = 0; rowSpot < letterRows; rowSpot++)
    {
        for(let columnSpot = 0; columnSpot < letterColumns; columnSpot++)
        {
            let textWidth = ctx.measureText(letterArray[letterCounter])
            if(letterCounter < letterArray.length)
            {
                if(letterArray[letterCounter] != 'Z')
                {
                    ctx.fillText(letterArray[letterCounter],
                        (halfwayCanvas + xColumnSpot + (columnSpot*xColumnSpot)*2) - textWidth.width/2 , 
                        (yColumnSpot*1.3 + (rowSpot*yColumnSpot*2)));
                }
                else
                {
                    ctx.fillText(letterArray[letterCounter],
                        (halfwayCanvas + xColumnSpot*5 + (columnSpot*xColumnSpot)*2) - textWidth.width/2 ,
                        yColumnSpot*1.3 + (rowSpot*yColumnSpot*2));
                }
            }

            letterCounter++;
        }
    }
}

function DrawBlanks()
{
    let amountOfBlanks = happyWord.length;
    let yColumnSpot = canvasHeight - Math.floor((canvasHeight/4));
    let widestBlankSpace = CalculateBlankWidth();
    let xColumnSpot = Math.floor(canvasWidth/amountOfBlanks)*.5;

    for(let i = 0; i < amountOfBlanks; i++)
    {
        ctx.beginPath();
        ctx.moveTo((xColumnSpot - widestBlankSpace), yColumnSpot);
        ctx.lineTo((xColumnSpot + widestBlankSpace), yColumnSpot);
        ctx.stroke();

        xColumnSpot = xColumnSpot + Math.floor(canvasWidth/amountOfBlanks);
    }
}

function DoGuess()
{
    var letter = document.getElementById('Guess').value;
    var message = "";

    if(letter.toUpperCase() >= 'A' && letter.toUpperCase() <= 'Z')
    {
        message += "You guessed the letter " + letter;
        if(happyWord.includes(letter.toUpperCase()))
        {
            message += "\n Good job! You guessed a correct letter!";
        }
        else
        {
            message += "\n You did not guess a correct letter, try again!";
            wrongGuessCount++;
        }
        letterGuessArray.push(letter.toUpperCase());
    }
    else
    {
        message = "Please enter a letter (a-z) not " + letter;
    }
    alert(message);

    RedrawBoard(letter.toUpperCase(), wrongGuessCount);
    document.getElementById('Guess').value = "";
}

function RedrawBoard(letter, wrongGuessCount)
{
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    Init();
    DisplayUpdatedLetters(letter);
    DrawBlanksAndCorrectLettersGuessed(letter);
    DrawHangMan(wrongGuessCount);
    CheckWinCondition();
}

function CalculateBlankWidth()
{
        var maxWidth = 0;
        var letterWidth = 0;

        for(let letterCount = 0; letterCount < happyWord.length; letterCount++)
        {
            letterWidth = ctx.measureText(happyWord.charAt(letterCount)).width;

            if(letterWidth > maxWidth)
            {
                maxWidth = letterWidth;
            }
        }

        return Math.floor(maxWidth * 1.3);
}

function DrawHangMan(wrongGuessCount)
{
    if(wrongGuessCount == 1)
    {
        DrawHangManHead();
    }
    
    if(wrongGuessCount == 2)
    {
        DrawHangManHead();
        DrawHangManBody();
    }
    
    if(wrongGuessCount == 3)
    {
        DrawHangManHead();
        DrawHangManBody();
        DrawHangManLeftArm();
    }
    
    if(wrongGuessCount == 4)
    {
        DrawHangManHead();
        DrawHangManBody();
        DrawHangManLeftArm();
        DrawHangManRightArm();
    }
    
    if(wrongGuessCount == 5)
    {
        DrawHangManHead();
        DrawHangManBody();
        DrawHangManLeftArm();
        DrawHangManRightArm();
        DrawHangManLeftLeg();
    }
    
    if(wrongGuessCount == 6)
    {
        DrawHangManHead();
        DrawHangManBody();
        DrawHangManLeftArm();
        DrawHangManRightArm();
        DrawHangManLeftLeg();
        DrawHangManRightLeg();
    }
}

function DrawHangManHead()
{
    ctx.beginPath();
    ctx.arc(150,135,10,0,Math.PI*2);
    ctx.stroke();
}

function DrawHangManBody()
{
    ctx.beginPath();
    ctx.moveTo(150,145);
    ctx.lineTo(150,175);
    ctx.stroke();
}

function DrawHangManLeftArm()
{
    ctx.beginPath();
    ctx.moveTo(130,160);
    ctx.lineTo(150,160);
    ctx.stroke();
}

function DrawHangManRightArm()
{
    ctx.beginPath();
    ctx.moveTo(150,160);
    ctx.lineTo(170,160);
    ctx.stroke();
}

function DrawHangManLeftLeg()
{
    ctx.beginPath();
    ctx.moveTo(150,175);
    ctx.lineTo(135,200);
    ctx.stroke();
}

function DrawHangManRightLeg()
{
    ctx.beginPath();
    ctx.moveTo(150,175);
    ctx.lineTo(165,200);
    ctx.stroke();
}

function FillCorrectLetterArray()
{
    var currentLetter;

    for(let i = 0; i < happyWord.length; i++)
    {
        currentLetter = happyWord.charAt(i);
        if(currentLetter != correctLetterArray[i])
        {
            correctLetterArray.push(currentLetter);
        }
    }
}

function DisplayUpdatedLetters(letter)
{
    let xColumnSpot = (halfwayCanvas / letterColumns) / 2;
    let yColumnSpot = Math.floor(halfwayCanvas / letterRows) / 2;
    let letterCounter = 0;

    ctx.fillStyle = "blue";

    for(let rowSpot = 0; rowSpot < letterRows; rowSpot++)
    {
        for(let columnSpot = 0; columnSpot < letterColumns; columnSpot++)
        {
            let textWidth = ctx.measureText(letterArray[letterCounter]);
            
            if(letterCounter < letterArray.length)
            {
                if(letterArray[letterCounter] != 'Z')
                {
                    if(letterGuessArray.includes(letter.toUpperCase()) &&
                    correctLetterArray.includes(letterArray[letterCounter]) &&
                    letterGuessArray.includes(letterArray[letterCounter]))
                    {
                        ctx.fillStyle = "green";
                    }
                    
                    else if(letterGuessArray.includes(letter.toUpperCase()) &&
                    letterGuessArray.includes(letterArray[letterCounter]))
                    {
                        ctx.fillStyle = "red";
                    }
                    
                    else
                    {
                        ctx.fillStyle = "blue";
                    }
                    
                    ctx.fillText(letterArray[letterCounter],
                        (halfwayCanvas + xColumnSpot + (columnSpot*xColumnSpot)*2) - textWidth.width/2 , 
                        (yColumnSpot*1.3 + (rowSpot*yColumnSpot*2)));
                }
                else
                {
                    if(letterGuessArray.includes(letter.toUpperCase()) &&
                    correctLetterArray.includes(letterArray[letterCounter]) &&
                    letterGuessArray.includes(letterArray[letterCounter]))
                    {
                        ctx.fillStyle = "green";
                    }
                    
                    else if(letterGuessArray.includes(letter.toUpperCase()) &&
                    letterGuessArray.includes(letterArray[letterCounter]))
                    {
                        ctx.fillStyle = "red";
                    }
                    
                    else
                    {
                        ctx.fillStyle = "blue";
                    }
                    
                    ctx.fillText(letterArray[letterCounter],
                        (halfwayCanvas + xColumnSpot*5 + (columnSpot*xColumnSpot)*2) - textWidth.width/2 ,
                        yColumnSpot*1.3 + (rowSpot*yColumnSpot*2));
                }
            }
            letterCounter++;
        }
    }
}

function DrawBlanksAndCorrectLettersGuessed(letter)
{
    DrawBlanks();

    ctx.fillStyle = "black";

    let amountOfLetters = happyWord.length;
    let amountOfGuesses = letterGuessArray.length;
    let xColumnSpot = Math.floor(canvasWidth / amountOfLetters) * .5;
    let yColumnSpot = canvasHeight - Math.floor(canvasHeight / 4);

    for(let i = 0; i < amountOfGuesses; i++)
    {
            CheckPositionAndLetter(letterGuessArray[i], xColumnSpot, yColumnSpot);
    }
    let letterOccurences = countOccurences(correctLetterArray, letter);
    for(let j = 0; j < letterOccurences; j++)
    {
        blankFilledArray.push(letter);
    }

}

function CheckPositionAndLetter(letter, xPosition, yPosition)
{
    let amountOfLetters = happyWord.length;
    let amountOfGuesses = letterGuessArray.length;
    let reducedArray = correctLetterArray;
    

    for(let j = 0; j < amountOfLetters; j++)
    {
        if(letter == correctLetterArray[j])
        {
            ctx.fillText(letter, xPosition, yPosition);
        }
        xPosition += Math.floor(canvasWidth/amountOfLetters);
    }
}

function CheckWinCondition()
{
    if(wrongGuessCount == 6)
    {
        losingScore++;
        Process();
    }
    else if(blankFilledArray.length == correctLetterArray.length)
    {
        winningScore++;
        Process();
    }
}

const countOccurences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

Init();
DisplayLetters();
DrawBlanks();
FillCorrectLetterArray();

function Reset()
{
    happyWord = guessWords[Math.floor(Math.random()*guessWords.length)];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blankFilledArray = [];
    letterGuessArray = [];
    correctLetterArray = [];
    wrongGuessCount = 0;
    Init();
    DisplayLetters();
    DrawBlanks();
    FillCorrectLetterArray();
}