window.onload = function(){
    document.querySelector('.allPaper').classList.add('anim');
    setTimeout(function(){document.querySelector('.paper').style.display="none"},1200);
    document.querySelector('#login').addEventListener("click",(e)=>{
        e.preventDefault();
        document.querySelector(".allPaper").style.animation="cardFlipB 2s ease forwards";
        setTimeout(()=>{document.querySelector('.login-form').style.display="block";},700)
    })
    document.querySelector('#signup').addEventListener("click",(e)=>{
        e.preventDefault();
         console.log("click");
         document.querySelector(".allPaper").style.animation="cardFlip 2s ease forwards";
         setTimeout(()=>{document.querySelector('.login-form').style.display="none";},700)
        })
    // document.querySelector('#signup').addEventListener("click",()=>{document.querySelector(".allPaper").style.animation="cardFlip 2s ease forwards"})
}