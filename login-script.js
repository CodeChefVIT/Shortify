window.onload = function(){
    document.querySelector('.allPaper').classList.add('anim');
    setTimeout(function(){document.querySelector('.paper').style.display="none"},1200);
    document.querySelector('#login').addEventListener("click",(e)=>{
        e.preventDefault();
        document.querySelector(".login-form").style.transition = "opacity 0s ease 0s";
        setTimeout(()=>{document.querySelector('.login-form').style.opacity = "1";},0)
        document.querySelector(".allPaper").style.animation="cardFlipB 2s ease forwards";
        
    })
    document.querySelector('#signup').addEventListener("click",(e)=>{
        e.preventDefault();
         document.querySelector(".allPaper").style.animation="cardFlip 2s ease forwards";
         setTimeout(()=>{document.querySelector('.login-form').style.opacity="0";},700)
        })
    }
    for(let i=0;i<2;i++)
    document.querySelectorAll(".exit")[i].addEventListener("click",()=>{
        console.log("exit")
        window.history.go(-1);
    })