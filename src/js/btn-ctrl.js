export function checkWatchedBtn() {
  const addToListBtnRef = document.querySelector('.btn-watched');
    if (isIDAlreadyInList('watched', addToListBtnRef.dataset.action)) {
        changeBtnText('watched', 'remove');
        disableButton('favorite');
    }
    else {
        changeBtnText('watched', 'add');
        enableButton('favorite');
    }
}


export function checkFavoriteBtn() {
    console.log('Im here to check favorite btn');
  const addToListBtnRef = document.querySelector('.btn-favorite');
  if (isIDAlreadyInList('favorite', addToListBtnRef.dataset.action))
  {
      changeBtnText('favorite', 'remove');
      disableButton('watched');
  }
  else {
      changeBtnText('favorite', 'add');
      enableButton('watched');
  }
}

function getList(list) {
    const reqList = localStorage.getItem(list);
    const parse = JSON.parse(reqList);
    if (parse === null) return;
    return parse;
}

// Проверить объект уже в списке
function isIDAlreadyInList(list, id) {
    const data = getList(list);
    if (data !== null && data.id.indexOf(id) !== -1) return true;
   return false;
}

export function disableButton(button) {
    const btnRef = getBtnRef(button);
    btnRef.classList.add('inactive');
    btnRef.disabled = true;
}

export function enableButton(button) {
    const btnRef = getBtnRef(button);
    btnRef.classList.remove('inactive');
    btnRef.disabled = false;
}


function getBtnRef(button) {
    if (button === 'favorite') return document.querySelector('.btn-favorite');
    else if (button === 'watched') return document.querySelector('.btn-watched');
}


export function changeBtnText(list, mode) {
    if (list === 'watched') {
        const refWatchedBtn = document.querySelector('.btn-watched');
        if (mode === 'remove') refWatchedBtn.innerHTML = `REMOVE FROM WATCHED`;
        else if (mode === 'add') refWatchedBtn.innerHTML = `ADD TO WATCHED`;   
        textAnimation(refWatchedBtn);
    } else if (list === 'favorite'){
        const refWatchedBtn = document.querySelector('.btn-favorite');
        if (mode === 'remove') refWatchedBtn.innerHTML = `REMOVE FROM QUEUE`;
        else if (mode === 'add') refWatchedBtn.innerHTML = `ADD TO QUEUE`;
        textAnimation(refWatchedBtn);
    }    
}


function textAnimation(btnRef) {   
    const strText = btnRef.textContent;
    const splitText = strText.split("");
    btnRef.textContent = "";
    for (let i = 0; i < splitText.length; i++) {
        btnRef.innerHTML += `<span class="btn-text">${splitText[i]}</span>`;
    }
    let char = 0;
    let timer = setInterval(onTick, 50);
    
    function onTick() {
        const span = btnRef.querySelectorAll('.btn-text')[char];
        if (span) {
            span.classList.add('fade');
            char++
            if (char === splitText.length) {
                complete();
                return;
            }
        } else return;
        
    }

    function complete() {
        clearInterval(timer);
        timer = null;
        const span =  Array.from(btnRef.querySelectorAll('.btn-text'));
        const spanSplit = span.map(item => item.innerHTML);
        btnRef.innerHTML = spanSplit.join('');
    }
}


