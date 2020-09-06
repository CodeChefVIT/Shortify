let userId = JSON.parse(localStorage.getItem('userInfo'))._id
let userToken = JSON.parse(localStorage.getItem('userToken'))
window.onload = ()=>{
  document.querySelector('nav h1').style.animation=`startLink 0.7s ease forwards`
        document.querySelectorAll('nav>ul>li').forEach((link,index)=>{
                link.style.animation = `startLink 0.5s ease forwards ${index/7 + 0.2}s`
        });
}
const navbar = ()=>{
  const navLinks = document.querySelectorAll('nav ul li')
  document.querySelector('.hamburger').addEventListener('click',()=>{
    console.log('clicked')
  document.querySelector('nav ul').classList.toggle('nv-active')
  document.querySelector('.hamburger').classList.toggle('ham-active');
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
      });
  }
  else{
      loginLi.innerHTML='<a href="./login.html">Login</a>'
  }

}
local();
navbar();

console.log(userToken);
var data ={
    id:userId
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
  }
  else{
    var data=JSON.parse(this.responseText)
    console.log(data);
  }
}
document.querySelector(".url-upper i").addEventListener("click",()=>{
  document.querySelector(".url-container").classList.toggle("url-active");
})