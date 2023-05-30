let timer = 0
let timerSpan = document.querySelector(".timerSpan")
let queEle = document.querySelector(".que");
let ansEle = document.querySelector(".ans");
let nxtBtn = document.querySelector(".nxtBtn");
let queIndex = 0;
let points = 0;
let userName = document.querySelector(".userName");
let timeStart = false

function enterButtonEvent() {
    if (document.querySelector(".userName").value) {
        alert(`${document.querySelector(".userName").value}, Registration is Successfully`)
    } else {
        alert("Please Enter Your Name First")
    }
}
setInterval(function startTimer() {
    if (timeStart) {
        if (queIndex < cat.length) {
            timer++
            timerSpan.innerHTML = timer
        }
        else {
            timer = 0
        }
    }
}, 1000)

function instructPage() {
    document.querySelector(".welcome").style.display = "none"
    document.querySelector(".cat").style.display = "none"
    document.querySelector(".instructions").style.display = "block"
}

document.querySelector(".cat1").addEventListener("click", function () {
    document.querySelector(".catName").innerHTML = document.querySelector(".cat1").innerHTML

    cat = quetions.queCat1
    if (userName.value == "") {
        alert("Please Enter Your Name First")
    } else {
        instructPage()
    }

})
document.querySelector(".cat2").addEventListener("click", function () {
    document.querySelector(".catName").innerHTML = document.querySelector(".cat2").innerHTML

    cat = quetions.queCat2

    if (userName.value == "") {
        alert("Please Enter Your Name First")
    } else {
        instructPage()
    }
})

document.querySelector(".cat3").addEventListener("click", function () {
    document.querySelector(".catName").innerHTML = document.querySelector(".cat3").innerHTML

    cat = quetions.queCat3

    if (userName.value == "") {
        alert("Please Enter Your Name First")
    } else {
        instructPage()
    }
})

document.querySelector(".cat4").addEventListener("click", function () {
    document.querySelector(".catName").innerHTML = document.querySelector(".cat4").innerHTML

    cat = quetions.queCat4

    if (userName.value == "") {
        alert("Please Enter Your Name First")
    } else {
        instructPage()
    }
})
function goHome() {
    document.querySelector(".welcome").style.display = "flex"
    document.querySelector(".queNumShow").style.display = "none"
    quizStart()
}
function quizStart() {
    document.querySelector(".goHomeBtn").style.display = "none"

    userName = document.querySelector(".userName");
    document.querySelector(".cat").style.display = "flex";
    document.querySelector(".queAndAns").style.display = "none";
    document.querySelector(".instructions").style.display = "none";
    queIndex = 0;
    points = 0;
    document.querySelector(".points").innerHTML = "Score: 0"
    cat = 0;
    nxtBtn.innerHTML = "Next"
    queReset()

}
function queStart() {
    timeStart = true
    document.querySelector(".goHomeBtn").style.display = "none"
    userName = document.querySelector(".userName");
    document.querySelector(".welcome").style.display = "none"
    
    document.querySelector(".instructions").style.display = "none"
    document.querySelector(".queAndAns").style.display = "flex"
    queReset()
    let queCurrent = cat[queIndex];
    let queNumber = queIndex + 1;
    document.querySelector(".queNumShow").style.display = "block"
    document.querySelector(".queNumShow").style.backgroundColor = "black"
    document.querySelector(".queNumShow").innerHTML = "Q." + queNumber
    queEle.innerHTML = queCurrent.quetion;

    
    queCurrent.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.ans;
        button.classList.add("answers");
        ansEle.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function queReset() {
    nxtBtn.style.display = "none"
    while (ansEle.firstChild) {
        ansEle.removeChild(ansEle.firstChild)
    }

}
function selectAnswer(e) {
    let selectedans = e.target;
    let isCorrect = selectedans.dataset.correct === "true"
    if (isCorrect) {
        selectedans.classList.add("correct")
        points += 10
        document.querySelector(".points").innerHTML = "Score: " + points
    }
    else {
        selectedans.classList.add("incorrect")
    }
    Array.from(ansEle.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nxtBtn.style.display = "block"
}

function showReslut() {
    queReset()
    queEle.innerHTML = "<b>Your Performance Analysis</b>"
    ansEle.innerHTML = `<div class="result">
                        <div class="resultItem"><span class="usernNameSpan">${userName.value}
                        </span>Your Score is <span class="imp">${points}</span> out of 100</div>
                        <div class="resultItem">Time taken: <span class="imp">${timer}</span> seconds</div>
                        <div class="resultItem">Total Questions: <span class="imp">${cat.length}</span></div>
                        <div class="resultItem">Questions Attempted: <span class="imp">${cat.length}</span></div>
                        <div class="resultItem">Right Answers: <span class="imp">${eval(points / cat.length)}</span></div>
                        <div class="resultItem">Wrong Answers: <span class="imp">${eval(10 - points / cat.length)}</span></div>
                        <div class="resultItem">Score Percentage: <span class="imp">${Math.floor(eval(((points / cat.length) / cat.length) * 100))}%</span></div>

                        </div`
    nxtBtn.innerHTML = "Start Again"
    nxtBtn.style.display = "block"
    document.querySelector(".goHomeBtn").style.display = "block"
    document.querySelector(".queNumShow").style.display = "none"
}
function nxtBtnWork() {
    queIndex++
    if (queIndex < cat.length) {
        queStart()
    } else {
        showReslut()
    }
}
nxtBtn.addEventListener("click", () => {
    if (queIndex < cat.length) {
        nxtBtnWork()
    }
    else {
        quizStart()
        timeStart = false
        document.querySelector(".queNumShow").style.display = "none"
    }
})
document.querySelector(".goHomeBtn").addEventListener("click", function () {
    timeStart = false
    goHome()
})