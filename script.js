let Count = document.getElementById('count');
//spans
let spans = document.querySelector('.spans');
//Question
let ContentQuis = document.querySelector('.Question');
///AllAnswer
let AllAnswer = document.querySelector('.AllAnswer');
/// Buttonsubmit  
let Buttonsubmit = document.querySelector('.submit-button');
/// Call Name Input
let ALlInput = document.getElementsByName("Questions")

//index Qusestion
let indexChange = 0;
//how much Ansure true
let AllrightAnswer = 0;
///////////////////////////////////////////  All Function  //////////////////////////////////////////////////////////////////////
function QuertionCountFun(num) {
    Count.innerHTML = num;
    for (var i = 1; i <= num; i++) {
        if (i === 1) {
            let sp = document.createElement("span");
            sp.className = 'on';
            spans.appendChild(sp);
        } else {
            spans.appendChild(document.createElement("span"));
        }
    }
}
function Question(Ques, num) {
    // console.log(Ques);
    // console.log(num);
    // console.log(Ques["Title"]);
    let newQuestion = document.createElement('h4');
    newQuestion.textContent = Ques["Title"];
    ContentQuis.appendChild(newQuestion);
    for (var i = 1; i <= 4; i++) {
        let div = document.createElement('div');
        div.className = "Answer";
        let radio = document.createElement('input');
        radio.type = "radio";
        radio.name = "Questions";
        radio.id = `Answer_${i}`;
        radio.dataset.answer = Ques[`answer_${i}`];
        //    console.log(Ques[`answer_${i}`]);
        let TheLabel = document.createElement("label");
        TheLabel.htmlFor = `Answer_${i}`;
        let theLabelText = document.createTextNode(Ques[`answer_${i}`])
        TheLabel.appendChild(theLabelText);
        div.appendChild(radio);
        div.appendChild(TheLabel);
        AllAnswer.appendChild(div);
    }
}

function switchAsnwer(RightInswer, num) {
    console.log(RightInswer, num)
    for (let i = 0; i < ALlInput.length; i++) {
        if (ALlInput[i].checked) {
             console.log(RightInswer+"=="+ALlInput[i].dataset.answer);
            if (ALlInput[i].dataset.answer === RightInswer) {
                console.log("good your reponse is right");
                // alert("good your reponse is right")
                AllrightAnswer++;
                break;
            }
            break;
        }
    }
}

function ColorSpan() {
    let ALLSpan = document.querySelectorAll('.spans span');
    let myAllspanARRy = Array.from(ALLSpan);
    myAllspanARRy[indexChange].className = 'on';
}




GetData();





function GetData() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            // console.log(this.responseText);
            let myData = JSON.parse(this.responseText)
            QuertionCountFun(myData.length);
            Question(myData[indexChange], myData.length);
            // console.log(myData.length)
            //  console.log(indexChange)
            Buttonsubmit.onclick = () => {

                if (myData.length - 1 >= indexChange) {
                   // console.log(ALlInput);
                    switchAsnwer(myData[indexChange]["right_answer"], myData.length);
                    //     alert(AllrightAnswer);
                    ContentQuis.innerHTML = "";
                    AllAnswer.innerHTML = "";indexChange++;
                    if(myData.length===indexChange){
                        console.log("end question")
                }else{
                    Question(myData[indexChange], myData.length);
                    ColorSpan();
                    Buttonsubmit.innerHTML="Show result"
                }
                   // indexChange++;
                    console.log(AllrightAnswer)
                }
                else {
                    AllAnswer.innerHTML=`<h2 style="padding: 100px;"><span style="color: #5e17bb; padding: 100px;">${AllrightAnswer}/${myData.length}</span></h2> `
                    Buttonsubmit.remove();
                    spans.remove();
                }
            }
        }
    }
    request.open("GET", "Data.json", true)
    request.send();
}
// console.log(ALlInput);
//                 switchAsnwer(myData[indexChange]["right_answer"], myData.length);
//            //     alert(AllrightAnswer);
//                 indexChange++;
//                 ContentQuis.innerHTML = "";
//                 AllAnswer.innerHTML = "";
