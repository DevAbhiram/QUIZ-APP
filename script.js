const quizData = [
    {
        question: "What will be the output of the following code?\n\nint x = 3;\nSystem.out.println(x-- + \" \" + --x);",
        options: ["3 1", "3 2", "2 1", "2 2"],
        answer: "3 1"
    },
    {
        question: "Which of these is the correct way to compare two strings for equality in Java?",
        options: ["str1 == str2", "str1.equals(str2)", "str1.compareTo(str2) == 1", "str1.equalsIgnoreCase(str2) && str1 == str2"],
        answer: "str1.equals(str2)"
    },
    {
        question: "What does the following loop print?\n\nfor(int i = 1; i <= 5; i *= 2) {\n  System.out.print(i + \" \");\n}",
        options: ["1 2 3 4 5", "1 2 4", "1 2 4 8", "2 4 8"],
        answer: "1 2 4"
    },
    {
        question: "Given int[] arr = {1,2,3,4}; what is the value of arr[arr.length - 2]?",
        options: ["2", "3", "4", "0"],
        answer: "3"
    },
    {
        question: "Which keyword is used to inherit a class in Java?",
        options: ["implements", "extends", "inherits", "super"],
        answer: "extends"
    },
    {
        question: "What will be the result of this expression?\n\nboolean b = (5 > 3) && (2 < 1);\nSystem.out.println(b);",
        options: ["true", "false", "Compile-time error", "Runtime exception"],
        answer: "false"
    },
    {
        question: "What exception is thrown when you divide an integer by zero in Java?",
        options: ["ArithmeticException", "NullPointerException", "IllegalArgumentException", "NumberFormatException"],
        answer: "ArithmeticException"
    },
    {
        question: "Which of these methods can be used to sort an array of integers in Java?",
        options: ["Arrays.sort()", "Collections.sort()", "List.sort()", "Math.sort()"],
        answer: "Arrays.sort()"
    },
    {
        question: "What access modifier makes a member visible only within its own class?",
        options: ["public", "protected", "private", "default"],
        answer: "private"
    },
    {
        question: "What will this code print?\n\nString s = null;\nSystem.out.println(s + \"test\");",
        options: ["nulltest", "test", "NullPointerException", "Compilation error"],
        answer: "nulltest"
    }
];

let score = 0, currindx = 0;
let timer, timeLeft = 45;
let nextbtn = document.querySelector('#nxt');

function stquiz() {
    document.querySelector(".container").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    showquestions();
}

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
    document.querySelector('.opt1').innerText = `A) ${qobj.options[0]}`;
    document.querySelector('.opt2').innerText = `B) ${qobj.options[1]}`;
    document.querySelector('.opt3').innerText = `C) ${qobj.options[2]}`;
    document.querySelector('.opt4').innerText = `D) ${qobj.options[3]}`;

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
    const userAnswer = selectedOption.innerText.split(") ")[1];
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
    const userAnswer = selectedOption ? selectedOption.innerText.split(") ")[1] : null;
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
