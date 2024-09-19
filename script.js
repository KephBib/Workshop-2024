document.addEventListener('DOMContentLoaded', () => {
    hideComputerPV();
    setupKeyboardNavigation();
});

function action(type) {
    if (type === 'passer') {
        disableButtons();
        endPlayerTurn();
    } else if (type === 'infos') {
        disableButtons();
        showComputerPV();
        alert(`Votre adversaire possède ${document.getElementById('pv2').textContent} PV.`);
        endPlayerTurn();
    }
}

function attack(target, damage) {
    const pvElement = document.getElementById(`pv${target === 'computer' ? 2 : 1}`);
    let pv = parseInt(pvElement.textContent.split(': ')[1]);
    pvElement.textContent = `PV: ${Math.max(0, pv - damage)}`;
    
    if (pv - damage <= 0) {
        disableButtons();
        endGame(target);
    }
}

function computerAttack() {
    attack('player1', 1);
    endPlayerTurn(); // Ensure the turn ends after the computer attacks
}

function computerPass() {
    endPlayerTurn();
}

function disableButtons() {
    document.querySelectorAll('button').forEach(button => button.disabled = true);
}

function enableButtons() {
    document.querySelectorAll('button').forEach(button => button.disabled = false);
}

function endGame(loser) {
    const resultText = loser === 'computer' ? 'Vous avez gagné !' : 'Noob.exe a perdu...';
    let resultElement = document.getElementById('result');
    hideActions();
    if (!resultElement) {
        resultElement = document.createElement('h1');
        resultElement.id = 'result';
        document.body.appendChild(resultElement);
    }
    resultElement.textContent = resultText;
    document.querySelectorAll('button').forEach(button => button.disabled = true);
}

function htmlAction() {
    showQuestion('Le langage de balisage utilisé pour créer des pages web est le');
}

function javaAction() {
    showQuestion('Le langage de programmation utilisé pour créer des applications est le');
}

function pythonAction() {
    showQuestion('Le langage de programmation utilisé pour créer des scripts est le');
}

function cppAction() {
    showQuestion('Le langage de programmation utilisé pour créer des logiciels est le');
}

function toggleVisibility(selector, show) {
    document.querySelector(selector).classList.toggle('hidden', !show);
}

function toggleTurn() {
    const player1 = document.getElementById('player1');
    const computer = document.getElementById('computer');
    player1.classList.toggle('turn');
    computer.classList.toggle('turn');
    
    if (computer.classList.contains('turn')) {
        setTimeout(() => {
            if (shouldComputerAttack()) {
                computerAttack();
            } else {
                computerPass();
            }
            enableButtons();
        }, 1000);
    }
}

function shouldComputerAttack() {
    return Math.random() < 0.8;
}

function hideComputerPV() {
    document.getElementById('pv2').style.visibility = 'hidden';
}

function showComputerPV() {
    document.getElementById('pv2').style.visibility = 'visible';
}

function endPlayerTurn() {
    hideQuestion();
    toggleTurn();
}

function hideQuestion() {
    toggleVisibility('#question', false);
    document.getElementById('submitAnswer').classList.add('hidden');
}

function endGame(loser) {
    const resultText = loser === 'computer' ? 'Le dangereux adversaire est vaincu !' : 'Noob.exe a perdu...';
    let resultElement = document.getElementById('result');
    disableButtons();
    if (!resultElement) {
        resultElement = document.createElement('h1');
        resultElement.id = 'result';
        document.body.appendChild(resultElement);
    }
    resultElement.textContent = resultText;
}

function setupKeyboardNavigation() {
    const buttons = document.querySelectorAll('button');
    let currentIndex = 0;

    buttons[currentIndex].focus();

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowRight':
                currentIndex = (currentIndex + 1) % buttons.length;
                buttons[currentIndex].focus();
                break;
            case 'ArrowLeft':
                currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                buttons[currentIndex].focus();
                break;
            case 'Enter':
                buttons[currentIndex].click();
                break;
        }
    });
}

function showQuestion(questionText) {
    toggleVisibility('#actions', false);
    toggleVisibility('#question', true);
    document.querySelector('#question p').innerHTML = `${questionText} <input type="text" id="answer">`;
    document.getElementById('submitAnswer').classList.remove('hidden');
}

function submitAnswer() {
    const answer = document.getElementById('answer').value.toLowerCase();
    if (!answer) {
        alert('Veuillez entrer une réponse.');
        return;
    }
    switch (answer) {
        case 'html':
            attack('computer', 1);
            break;
        case 'python':
            attack('computer', 2);
            break;
        case 'java':
            attack('computer', 3);
            break;
        case 'cpp':
            attack('computer', 4);
            break;
        default:
            alert('Réponse incorrecte. Réessayez.');
            return;
    }
    hideQuestion();
    toggleTurn();
}
