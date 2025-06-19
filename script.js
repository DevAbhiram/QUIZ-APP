import { quizData } from './quizdata.js';
document.addEventListener("DOMContentLoaded", () => {
    let score = 0, currindx = 0;
    let timer, timeLeft = 45;
    const stbtn = document.querySelector('.stbtn');
    stbtn.addEventListener('click',()=>{
        document.querySelector(".container").style.display = "none";
        document.getElementById("quiz-section").style.display = "block";
        showquestions();
    });
    let nextbtn = document.querySelector('#nxt');
    function startTimer() {
        timeLeft = 45;
        document.getElementById('timer').innerText = `0:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').innerText = `0:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                autoNext();
            }
        }, 1000);
    }
    function showquestions() {
        clearInterval(timer);
        startTimer();
        const qobj = quizData[currindx];
        document.querySelector('.question').innerText = `Q${currindx + 1}. ${qobj.question}`;
        let opts = document.querySelectorAll('.opt');
        opts[0].innerText = `A) ${qobj.options[0]}`;
        opts[0].setAttribute('data-answer', qobj.options[0]);
        opts[1].innerText = `B) ${qobj.options[1]}`;
        opts[1].setAttribute('data-answer', qobj.options[1]);
        opts[2].innerText = `C) ${qobj.options[2]}`;
        opts[2].setAttribute('data-answer', qobj.options[2]);
        opts[3].innerText = `D) ${qobj.options[3]}`;
        opts[3].setAttribute('data-answer', qobj.options[3]);
        const allOptions = document.querySelectorAll('.opt');
        allOptions.forEach(opt => {
            opt.classList.remove('selected');
            opt.style.backgroundColor = '#f9f9f9';

            // Fresh event listener for each option
            opt.onclick = () => {
                allOptions.forEach(o => {
                    o.style.backgroundColor = '#f9f9f9';
                    o.classList.remove('selected');
                });
                opt.style.backgroundColor = '#dff0d8';
                opt.classList.add('selected');
            };
        });
    }
    nextbtn.addEventListener('click', () => {
        const selectedOption = document.querySelector('.opt.selected');
        if (!selectedOption) {
            alert("Please select an option before moving to the next question.");
            return;
        }
        clearInterval(timer);
        const userAnswer = selectedOption.dataset.answer;
        const correctAnswer = quizData[currindx].answer;
        if (userAnswer === correctAnswer) {
            score++;
        }
        currindx++;
        if (currindx < quizData.length) {
            showquestions();
            if (currindx === quizData.length - 1) {
                nextbtn.innerText = "Submit";
            }
        } else {
            alert(`Quiz finished! Your score is ${score}/${quizData.length}`);
            resetQuiz();
        }
    });
    function autoNext() {
        const selectedOption = document.querySelector('.opt.selected');
        clearInterval(timer);
        const userAnswer = selectedOption ? selectedOption.dataset.answer : null;
        const correctAnswer = quizData[currindx].answer;
        if (userAnswer === correctAnswer) {
            score++;
        }
        currindx++;
        if (currindx < quizData.length) {
            showquestions();
            if (currindx === quizData.length - 1) {
                nextbtn.innerText = "Submit";
            }
        } else {
            alert(`Quiz finished! Your score is ${score}/${quizData.length}`);
            resetQuiz();
        }
    }
    function resetQuiz() {
        currindx = 0;
        score = 0;
        nextbtn.innerText = "Next";
        document.querySelector(".container").style.display = "block";
        document.getElementById("quiz-section").style.display = "none";
        clearInterval(timer);
    }
});

