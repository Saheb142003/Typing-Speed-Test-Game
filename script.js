const content = document.querySelector(".content p");

const input = document.querySelector(".content input");

let letterindex = (mistakes = istyping = 0);

let rstbtn = document.getElementById("btn");

let time;
let maxtime = 60;
let timer = document.querySelector(".timer");
let timeleft = maxtime;

let error = document.querySelector(".mistakes");

let wpm = document.querySelector(".wpm");
let cpm = document.querySelector(".cpm");

const loadpara = () => {
  let rand_para = Math.floor(Math.random() * article.length);
  content.innerHTML = "";

  article[rand_para].split("").forEach((element) => {
    let realpara = `<span>${element}</span>`;
    content.innerHTML += realpara;
  });
  content.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("click", () => {
    input.focus();
  });
  content.addEventListener("click", () => {
    input.focus();
  });
};

loadpara();

input.addEventListener("input", (e) => {
  let char = content.querySelectorAll("span");
  let inputvalue = e.target.value.split("")[letterindex];

  if (!istyping) {
    time = setInterval(timeSetup, 1000);
    istyping = true;
  }

  if (letterindex < char.length - 1) {
    if (inputvalue == null) {
      if (letterindex > 0) {
        letterindex--;
        if (char[letterindex].classList.contains("incorrect")) {
          mistakes--;
        }
        char[letterindex].classList.remove("correct", "incorrect");
      }
    } else {
      // console.log(inputvalue);
      if (char[letterindex].innerText == inputvalue) {
        char[letterindex].classList.add("correct");
      } else {
        char[letterindex].classList.add("incorrect");
        mistakes++;
      }
    }
    letterindex++;
    char.forEach((element) => {
      element.classList.remove("active");
    });
    char[letterindex].classList.add("active");
    error.innerHTML = mistakes;
    cpm.innerText = letterindex - mistakes;
  } else {
    clearInterval(time);
    input.value = "";
  }
});

const timeSetup = () => {
  if (timeleft > 0) {
    timeleft--;
    timer.innerHTML = timeleft;
    let wpmTab = Math.round(
      ((letterindex - mistakes) / 5 / (maxtime - timeleft)) * 60
    );
    wpm.innerText = wpmTab;
  } else {
    clearInterval(time);
    input.value = "";
  }
};

rstbtn.addEventListener("click", () => {
  loadpara();
  clearInterval(time);

  error.innerHTML = "0";
  timeleft = maxtime;
  timer.innerHTML = maxtime;
  cpm.innerText = "0";
  wpm.innerText = "0";
  input.value = "";
  letterindex = mistakes = istyping = 0;
});
