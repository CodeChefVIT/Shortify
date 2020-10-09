let userId = null
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
const fetchUrls = ()=>{
  console.log(userToken);
var data ={
    "id":userId
};    
console.log(data)
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://shortify-api.herokuapp.com/user/allUrls/"+userId);
xhr.setRequestHeader("Authorization", "JWT "+userToken);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();
xhr.onload=function()
{
  if(this.status==200)
  {
    var data=JSON.parse(this.responseText)
    console.log(data);
    if(data.data.length<=0){
      document.querySelector('.search-container').style.display="none";
      document.querySelector('.allurl-container').innerHTML="<img src='no-uls.png'><h1>No shortened links !</h1><a class='btn-login' href='./index.html#third'>Shorten</a>"
    }
    else{
      for(let i=0;i<data.data.length;i++){
        htmlString='<div class="url-container"><div class="url-upper"><span class="old-url">'+data.data[i].oldUrl+'</span><i class="fas fa-times"></i></div><div class="url-lower"><span class="new-url">'+data.data[i].link+'</span><div class="clicks"><span class="clicks-head">CLICKS</span><span class="">'+data.data[i].clicks+'</span></div><i class="far fa-copy"></i></div></div>'
        document.querySelector('.allurl-container').innerHTML+=htmlString
      }
      expand();
      copyLink();
      search(data.data);
    }
  }
  else{
    var data=JSON.parse(this.responseText)
    console.log(data);
  }
}
}
const local = ()=>{
  let user=JSON.parse(localStorage.getItem('userInfo'))
  
  let loginLi = document.querySelector(".login");
  console.log(user)
  if(user){
    
      userId=user._id
      userToken=JSON.parse(localStorage.getItem('userToken'))
      loginLi.innerHTML='<a href="#">'+user.name+'</a><ul><li><a href="./allUrl.html">My URLs</a></li><li class="login-drop">Logout</li></ul>';
      fetchUrls(); 
      document.querySelector(".login-drop").addEventListener("click",()=>{
          localStorage.removeItem('userInfo');
          localStorage.removeItem('userToken');
          local();
          window.location.href = "./index.html";
      });
  }
  else{
    document.querySelector('.search-container').style.display="none";
      loginLi.innerHTML='<a href="./login.html">Login</a>'
      document.querySelector('.allurl-container').innerHTML='<img src="not-loggedin.png"><h1>User Not Logged In</h1><a class="btn-login" href="./login.html">Login</a>';
  }

}
local();
navbar();
const expand = ()=>{
  const cross = document.querySelectorAll(".url-upper i");
  console.log(cross)
  for(let i=0; i<cross.length;i++){
    cross[i].addEventListener("click",()=>{
      for(let j=0; j<cross.length;j++)
      if(j==i){
        document.querySelectorAll(".url-container")[j].classList.toggle("url-active");
      }
      else{
        document.querySelectorAll(".url-container")[j].classList.remove("url-active");
      }
  })
}
}
const copyLink = ()=>{
  const icon = document.querySelectorAll(".url-lower i");
  const texts = document.querySelectorAll(".new-url");
  console.log(icon)
  for(let i=0; i<icon.length;i++){
    icon[i].addEventListener("click",()=>{
      navigator.clipboard.writeText(texts[i].innerHTML);
      document.querySelector('.copied').style.animation = "";
      setTimeout(()=>{document.querySelector('.copied').style.animation = "copyIn 5s ease";},1) 
  })
}
}
const search = (data)=>{
  input = document.querySelector('.search-container input');
  input.addEventListener("keyup",()=>{
  var urls = document.querySelectorAll('.url-container');
    for( var i=0; i<data.length; i++){
      if(data[i].oldUrl.toLowerCase().includes(input.value.toLowerCase())){
        if(urls[i].style.animation!=""){
          urls[i].style.animation = "urlShow 0.5s ease";
    }
  }
    else{
      urls[i].style.animation = "urlHide 0.5s ease forwards";
      urls[i].classList.remove("url-active");
    }
  }
  });
}

const searchAnimation = ()=>{
  let cont = document.querySelector('.search-container'); 
  let span = document.querySelector('.search-container span');
  let searchModal = document.querySelector('.searchModal')
  let input = document.querySelector('.search-container input');
cont.onclick = function(e) { 
    var x = e.pageX - this.offsetLeft; 
    var y = e.pageY - this.offsetTop; 
    
    span.style.top = y + "px";
    span.style.left = x + "px";
    span.style.animation = "searchBack 1s ease forwards";
    input.focus();
    searchModal.style.display = "block";
}
searchModal.addEventListener("click",()=>{
  if(input.value=="")
    span.style.animation = "";
    searchModal.style.display="none";
})
}
searchAnimation();
