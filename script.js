new fullpage('#fullpage', {
	//options here
	autoScrolling:true,
    scrollHorizontally: true,
    navigation:true,
    fadingEffect: true,
    fitToSectionDelay: 1000,
    navigationTooltips: ['Home', 'Uses','card'],
    anchors:['first', 'second','third'],
    scrollingSpeed:1000,
    onLeave: (origin,destination,direction)=>{
        const navLink = document.querySelectorAll("nav ul li");
        for(let i=0;i<navLink.length;i++) navLink[i].classList.remove('nav-active');
        navLink[destination.index].classList.add('nav-active');
        if(destination.index===2){
            document.querySelector(".paper-upper").classList.remove('effect');
        }
        if(destination.index===1){
            document.querySelector('.bar-graph').classList.add('bg-active');
            document.querySelectorAll('.cont')[0].classList.add('cont-active');
            document.querySelectorAll('.cont')[1].classList.add('cont-active');
            document.querySelector('.manage').classList.add('ma-active');

            (setTimeout(()=>{document.querySelector('#knowMore .arrow').classList.add('ar-active');},500));
        }
        if(origin.index===1){
            document.querySelector('.bar-graph').classList.remove('bg-active');
            document.querySelectorAll('.cont')[0].classList.remove('cont-active');
            document.querySelectorAll('.cont')[1].classList.remove('cont-active');
            document.querySelector('.manage').classList.remove('ma-active');
            document.querySelector('#knowMore .arrow').classList.remove('ar-active');
        }
        if(origin.index===2){
            document.querySelector(".paper-upper").classList.add('effect');
        }
    },
    afterRender:()=>{
        document.querySelector('#home h1 .head-h1').style.animation=`start 0.7s ease forwards`;
        document.querySelector('#home h1 .home-head').style.animation=`start 0.7s ease forwards 0.5s`;
        document.querySelector('#home button').style.animation=`start 0.7s ease forwards 0.8s`;
        document.querySelector('.cranes').classList.add('crane-start');
        document.querySelector('nav h1').style.animation=`startLink 0.7s ease forwards`
        document.querySelectorAll('nav ul li').forEach((link,index)=>{
                link.style.animation = `startLink 0.5s ease forwards ${index/7 + 0.2}s`
        });
        document.querySelector('.arrow').classList.add('ar-active');
    }
	
});
fullpage_api.setAllowScrolling(true);
let ctc = null;
document.querySelector(".card-submit").addEventListener("click",function(){
    document.querySelector(".paper-upper").classList.toggle('effect');
    if(document.querySelector(".card-submit").innerHTML=="Try again"){
        setTimeout(()=>{
            document.querySelector(".card-text").innerHTML="Enter your link here!";
            document.querySelector(".paper-lower input").value = "";
            document.querySelector(".paper-lower input").readOnly = false;
            // document.querySelector(".paper-lower input").getAttribute('onclick')="";
            ctc=null;
            document.querySelector(".card-submit").innerHTML="Submit";
            document.querySelector(".paper-upper").classList.toggle('effect');
        },1000)
    }
    else{
        setTimeout(()=>{
            document.querySelector(".card-text").innerHTML="Click on the link to copy";
            document.querySelector(".paper-lower input").value = "<shortened link here>";
            document.querySelector(".paper-lower input").readOnly = true;
            document.querySelector(".paper-lower input").value = "<shortened link here>";
            // document.querySelector(".paper-lower input").getAttribute('onclick')= copyfn();
            ctc = document.querySelector('.c-to-c');
            document.querySelector(".card-submit").innerHTML="Try again";
            document.querySelector(".paper-upper").classList.toggle('effect');
        },1000)
    }
});
const copyfn=()=>{
    var copyText = document.querySelector(".paper-lower input");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}
document.querySelector('.cranes').addEventListener('mouseover',()=>{
    console.log('k')
    document.querySelector('.crane-start').style.animation='craneMove 1s ease infinite';
    document.querySelector('.wing').style.animation='wingMove 1s ease infinite'
})
document.querySelector('.cranes').addEventListener('mouseout',()=>{
    document.querySelector('.crane-start').style.animation='';
    document.querySelector('.wing').style.animation=''
})
const navbar = ()=>{
    const navLinks = document.querySelectorAll('nav ul li')
    document.querySelector('.hamburger').addEventListener('click',()=>{
    document.querySelector('nav ul').classList.toggle('nv-active')
    navLinks.forEach((link,index)=>{
        if(link.style.animation.includes('slideLink')){
            link.style.animation =''
        }
        else{
            link.style.animation = `slideLink 0.5s ease forwards ${index/7 + 0.5}s`
        }
    });
});
};
navbar();