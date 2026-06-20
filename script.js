let index = 0;
let pIndex = 0;

const gameArea =
document.getElementById("gameArea");

function showQuiz(){
index=0;
loadQuestion();
}

function loadQuestion(){

const item = words[index];

let options =
[ item.answer ];

while(options.length<4){

let random =
meanings[
Math.floor(
Math.random()*meanings.length
)
];

if(!options.includes(random)){
options.push(random);
}
}

options.sort(()=>Math.random()-0.5);

gameArea.innerHTML=`

<div class="card">

<h2>Choose the Correct Meaning</h2>

<div class="word">
${item.word}
</div>

<div id="options"></div>

<div id="result"></div>

</div>

`;

let optionBox =
document.getElementById("options");

options.forEach(op=>{

let btn =
document.createElement("button");

btn.className="option";

btn.innerText=op;

btn.onclick=()=>checkAnswer(op);

optionBox.appendChild(btn);

});

}

function checkAnswer(choice){

let result =
document.getElementById("result");

if(choice===words[index].answer){

let text =
praises[
Math.floor(
Math.random()*praises.length
)
];

result.innerHTML=
`<div class="result success">${text}</div>
<button class="nextBtn"
onclick="nextQuestion()">
Next
</button>`;

}else{

let text =
comforts[
Math.floor(
Math.random()*comforts.length
)
];

result.innerHTML=
`<div class="result fail">${text}</div>`;

}

}

function nextQuestion(){

index++;

if(index>=words.length){

gameArea.innerHTML=`

<div class="card">

<h2>
🏆 Congratulations!
</h2>

<p>
You completed the Meaning Challenge!
</p>

</div>

`;

return;
}

loadQuestion();

}

function showPronunciation(){

pIndex=0;

loadPronunciation();

}

function loadPronunciation(){

let item =
words[pIndex];

gameArea.innerHTML=`

<div class="card">

<h2>Pronunciation Challenge</h2>

<div class="word">
${item.word}
</div>

<h3>
${ipa[item.word]}
</h3>

<div class="mic"
onclick="startSpeech()">
🎤
</div>

<div id="speechResult"></div>

</div>

`;

}

function startSpeech(){

const recognition =
new webkitSpeechRecognition();

recognition.lang="en-US";

recognition.start();

recognition.onresult=
function(event){

let speech =
event.results[0][0]
.transcript
.toLowerCase();

let answer =
words[pIndex].word
.toLowerCase();

let score = 0;

if(
speech===answer
){
score=100;
}
else if(
speech.includes(answer)
){
score=85;
}
else{
score=
Math.floor(
Math.random()*60
);
}

showScore(score);

};

}

function showScore(score){

let color =
score>=70
?
"green"
:
"red";

let html=
`

<div class="percent ${color}">
${score}%
</div>

`;

if(score>=70){

let text =
praises[
Math.floor(
Math.random()*praises.length
)
];

html +=

`
<div class="result success">
${text}
</div>

<button
class="nextBtn"
onclick="nextPronunciation()">
Next Word
</button>
`;

}
else{

html +=

`
<div class="result fail">
Try Again!
</div>
`;

}

document.getElementById(
"speechResult"
).innerHTML=html;

}

function nextPronunciation(){

pIndex++;

if(
pIndex>=words.length
){

gameArea.innerHTML=`

<div class="card">

<h2>
🎉 You Completed
The Pronunciation Challenge!
</h2>

<p>
You mastered all
7 vocabulary words!
</p>

</div>

`;

return;
}

loadPronunciation();

}
