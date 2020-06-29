new fullpage('#fullpage', {
	//options here
	autoScrolling:true,
    scrollHorizontally: true,
    navigation:true,
    navigationTooltips: ['Home', 'know more','card'],
    anchors:['first', 'second','third']
	
});
fullpage_api.setAllowScrolling(true);

document.querySelector("#effect").addEventListener("click",function(){
    document.querySelector(".paper-upper").classList.toggle('effect');
    // document.querySelector(".paper-upper-front").style.boxShadow='inset rgba(0,0,0,0.3) 0px 50px 100px 0';
    // document.querySelector(".paper-lower").style.boxShadow='inset rgba(0,0,0,0.3) 0px 50px 100px 0';
    // document.querySelector(".paper-upper-back").style.boxShadow='0px 0px 0px white';
})