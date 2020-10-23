let userId = null
let fjson = {
  data:[
    {
      newurl:"newurlexample1.html",
      oldurl:"oldurlexample1.html"
    },
    {
      newurl:"newurlexample2.html",
      oldurl:"oldurlexample2.html"
    },
    {
      newurl:"newurlexample3.html",
      oldurl:"oldurlexample4.html"
    },
    {
      newurl:"newurlexample4.html",
      oldurl:"oldurlexample4.html"
    },
    {
      newurl:"newurlexample5.html",
      oldurl:"oldurlexample5.html"
    },
  ]
}
let userToken = JSON.parse(localStorage.getItem('userToken'))
window.onload = ()=>{
  document.querySelector('nav h1').style.animation=`startLink 0.7s ease forwards`
        document.querySelectorAll('nav>ul>li').forEach((link,index)=>{
                link.style.animation = `startLink 0.5s ease forwards ${index/7 + 0.2}s`
        });
}
const mobNavToggler = ()=>{
  const navLinks = document.querySelectorAll('nav ul li')
  document.querySelector('nav').classList.toggle('nv-active');
  document.querySelector('nav').classList.remove('nv-active-login');
  document.querySelector('.modal').classList.toggle('modal-active');
  document.querySelector('.hamburger').classList.toggle('ham-active');
  navLinks.forEach((link,index)=>{
      if(link.style.animation.includes('slideLink')){
          link.style.animation =''
      }
      else{
          link.style.animation = `slideLink 0.5s ease forwards ${index/7 + 0.5}s`
      }
  });
}
const mobNavMobile = ()=>{
  document.querySelector('nav.nv-active').classList.toggle('nv-active-login');
}
const navbar = ()=>{
  document.querySelector('.hamburger').addEventListener('click',()=>{
      mobNavToggler();
});
  document.querySelector('.modal').addEventListener('click',()=>{
      mobNavToggler();
});
  document.querySelector('.login').addEventListener('click',()=>{
      mobNavMobile();
  })
};
const local = ()=>{
    let user=JSON.parse(localStorage.getItem('userInfo'))
    let loginLi = document.querySelector(".login");
    console.log(user)
    if(user){
      
        userId=user._id
        userToken=JSON.parse(localStorage.getItem('userToken'))
        loginLi.innerHTML='<a href="#">'+user.name+'</a><ul><li><a href="./allUrl.html">My URLs</a></li><li class="login-drop">Logout</li></ul>';
        document.querySelector(".login-drop").addEventListener("click",()=>{
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userToken');
            local();
            window.location.href = "./index.html";
        });
    }
    else{
        loginLi.innerHTML='<a href="./login.html">Login</a>'
    }
  }
  const copyLink = ()=>{
    const icon = document.querySelectorAll(".cpy-icon");
    const texts = document.querySelectorAll(".link a");
    console.log(icon)
    for(let i=0; i<icon.length;i++){
      icon[i].addEventListener("click",()=>{
        navigator.clipboard.writeText(texts[i].href);
        document.querySelector('.copied').style.animation = "";
        setTimeout(()=>{document.querySelector('.copied').style.animation = "copyIn 5s ease";},1) 
    })
  }
  }
  const appear = ()=>{
    const links = document.getElementsByClassName("link");
    for(var i=0; i<links.length ; i++){
      links[i].style.animation = `link-active 0.7s forwards ease ${i*0.2}s`
    }
  }
  const makeLink = (data)=>{
    cont = document.querySelector(".content");
    for(let i=0;i<data.length;i++){
      cont.innerHTML += '<div class="link"><a href="'+data[i].newurl+'">'+data[i].oldurl+'</a><span class="border"></span><span class="cpy-icon"><i class="far fa-copy"></i></span></div>'
    }
  appear();
  copyLink();
  }
  makeLink(fjson.data);
  local();
  navbar();