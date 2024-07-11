const answer = "APPLE";
let index = 0;
let attempts = 0;
let timer;
function displayGameOver() {
  const div = document.createElement("div");
  div.innerText = "게임이 종료됐습니다.";
  div.style =
    "display:flex; justify-content:center; align-items:center;position:absolute; top:40vh; left:10vw; background-color:tomato; width:200px; height:100px;";
  document.body.appendChild(div);
}

function gameover() {
  window.removeEventListener("keydown", handleKeydown);
  displayGameOver();
  clearInterval(timer);
}

function nextLine() {
  if (attempts === 5) gameover();
  index = 0;
  attempts++;
}
function handdleBackspaceKey() {
  if (index > 0) {
    const preBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index - 1}']`
    );
    preBlock.innerText = "";
  }
  if (index !== 0) index--;
}

function handdleEnterKey() {
  let 맞은개수 = 0;
  for (let i = 0; i < 5; i++) {
    const block = document.querySelector(
      `.board-block[data-index='${attempts}${i}']`
    );
    if (block.innerText === answer[i]) {
      block.style.background = "#6AAA64";
      맞은개수++;
    } else if (answer.includes(block.innerText))
      block.style.background = "#c9b458";
    else {
      block.style.background = "#787c7e";
    }
    block.style.color = "white";
  }
  if (맞은개수 === 5) gameover();
  else nextLine();
}

function handleKeydown(event) {
  const key = event.key.toUpperCase();
  const keyCode = event.keyCode;
  const thisBlock = document.querySelector(
    `.board-block[data-index='${attempts}${index}']`
  );
  if (event.key === "Backspace") handdleBackspaceKey(thisBlock);
  else if (index === 5) {
    if (event.key === "Enter") handdleEnterKey();
    else return;
  } else if (65 <= keyCode && keyCode <= 90) {
    thisBlock.innerText = key;
    index++;
  }
}
function startTimer() {
  const 시작시간 = new Date();
  function setTime() {
    const 현재시간 = new Date();
    const 흐른시간 = new Date(현재시간 - 시작시간);
    const 분 = 흐른시간.getMinutes().toString().padStart(2, "0");
    const 초 = 흐른시간.getSeconds().toString().padStart(2, "0");
    const timeDiv = document.querySelector(".timer");
    timeDiv.innerText = `${분}:${초}`;
  }
  timer = setInterval(setTime, 1000);
}

function appStart() {
  window.addEventListener("keydown", handleKeydown);
}
startTimer();
appStart();
