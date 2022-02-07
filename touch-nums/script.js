'use strict';
var gNextNum = 1,
    elNextNum;
var gSize;
var gNums;
var elBoard;
var gInterval;
var gCounter;
var secs, elSecs;
var mins, elMins, elMilis;
var gIsGameOn = false;
var form;
var elTimeSpans;
var elH4;
var elGreet;

function init() {
    loadElements();
    form.addEventListener('submit', (e) => handleSubmit(e), false);
}

function loadElements() {
    form = document.querySelector('form');
    elGreet = document.querySelector('.greet');
    elMilis = document.querySelector('.milis');
    elSecs = document.querySelector('.secs');
    elMins = document.querySelector('.mins');
    elNextNum = document.querySelector('h4 span');
    elH4 = document.querySelector('.game-container h4');
    elBoard = document.querySelector('.board');
}

function newGame() {
    resetGame();
    if (gSize) {
        elH4.style.visibility = 'visible';
        elNextNum.innerText = gNextNum;
        elBoard.innerHTML = renderBoard();
    }
}

function handleSubmit(e) {
    e.preventDefault();
    var data = new FormData(form);
    for (const entry of data) {
        gSize = parseInt(entry[1]);
    }
    newGame();
}
function resetGame() {
    gNums = numRange(1, gSize * gSize, 1);
    clearInterval(gInterval);
    secs = 0;
    gNextNum = 1;
    mins = 0;
    elSecs.innerText = '00';
    elMins.innerText = '00';
    elMilis.innerText = '000';
    elGreet.style.visibility = 'hidden';
}

function renderBoard() {
    var strHtml = '';
    for (var i = 0; i < gSize; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < gSize; j++) {
            strHtml += `<td class="cell" onclick="clickCell(this, ${i}, ${j})" data-i="${i}" data-j="${j}">${parseInt(
                gNums.splice(rand(0, gNums.length), 1)
            )}</td>`;
        }
        strHtml += '</tr>';
    }
    return strHtml;
}

function clickCell(elCell) {
    if (gNextNum === gSize * gSize) clearInterval(gInterval);
    if (parseInt(elCell.innerText) === gNextNum) {
        elCell.classList.add('completed');
        gNextNum++;
        elNextNum.innerText = gNextNum;
        if (gNextNum === 2) {
            startCounter();
            gIsGameOn = true;
        }
        if (gNextNum === gSize ** 2 + 1) {
            elH4.style.visibility = 'hidden';
            elGreet.style.visibility = 'visible';
        }
    }
}
function startCounter() {
    gCounter = 0;
    gInterval = setInterval(stopWatch, 10);
}
function stopWatch() {
    gCounter += 0.01;
    if (gCounter < 1) {
        elMilis.innerText = (gCounter * 1000).toFixed();
    } else if (gCounter >= 1) {
        secs++;
        elMilis.innerText = '000';
        gCounter = 0;
        elSecs.innerText = '0' + secs;
    }
    if (secs > 9) elSecs.innerText = secs;
    if (secs > 59) {
        mins++;
        elMins.innerText = '0' + mins;
        secs = 0;
        elSecs.innerText = '00';
    }
}

function numRange(start, finish, step) {
    var nums = [];
    for (var i = start; i <= finish; i += step) {
        nums.push(i);
    }
    return nums;
}

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
