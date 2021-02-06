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
        span.classList.add('fade');
        char++
        if (char === splitText.length) {
            complete();
            return;
        }
    }

    function complete() {
        clearInterval(timer);
        timer = null;
        const span =  Array.from(btnRef.querySelectorAll('.btn-text'));
        const spanSplit = span.map(item => item.innerHTML);
        btnRef.innerHTML = spanSplit.join('');
    }
}





