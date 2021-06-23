'use strict'

var playerName;
var winningScore = 0;
var losingScore = 0;

function Process()
{
    playerName = document.getElementById('name').value;
    alert("Player: " + playerName + "\n" + "Wins: " + winningScore + "\n" + "Losses: " + losingScore);
}