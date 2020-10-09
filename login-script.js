const errBox = (message)=>{
    const box = document.querySelector(".error-box");
    if(message===""){
        box.innerHTML = "";
        box.classList.remove("err-show");
    }
    else{
        box.innerHTML = message;
        box.classList.add("err-show");
        setTimeout(()=>{box.classList.remove("err-show");},3000)
    }
}
window.onload = function(){
    document.querySelector('.allPaper').classList.add('anim');
    setTimeout(function(){document.querySelector('.paper').style.display="none"},1200);
    document.querySelector('#login').addEventListener("click",(e)=>{
        e.preventDefault();
        errBox("");
        document.querySelector(".login-form").style.transition = "opacity 0s ease 0s";
        setTimeout(()=>{document.querySelector('.login-form').style.opacity = "1";},0)
        document.querySelector(".allPaper").style.animation="cardFlipB 2s ease forwards";
        
    })
    document.querySelector('#signup').addEventListener("click",(e)=>{
        e.preventDefault();
        errBox("");
         document.querySelector(".allPaper").style.animation="cardFlip 2s ease forwards";
         setTimeout(()=>{document.querySelector('.login-form').style.opacity="0";},700)
        })
    }
    for(let i=0;i<2;i++)
    document.querySelectorAll(".exit")[i].addEventListener("click",()=>{
        console.log("exit")
        window.location.href="./index.html";
    })

const ValidateForm = (mail,password,name=".")=> 
    {
        if(password!='' && name!='' && mail!=''){
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
            {
                return ("");
            }
            else{
                return("Invalid Email");
            }
        } 
    return ("All Feilds Required");
}
    document.querySelector(".signup-form .submit-btn button").addEventListener("click",(e)=>{
        e.preventDefault();
        let inputs= document.querySelectorAll(".signup-form form input");
        let validMsg = ValidateForm(inputs[1].value,inputs[2].value,inputs[0].value);
        if(validMsg =="")
        {
            let data={
                "name":inputs[0].value,
                "email":inputs[1].value,
                "password":inputs[2].value
            }
            console.log(data);
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                    console.log(this.responseText);
                    let respData = JSON.parse(this.responseText)
                    if(respData.message=="User already exists"){
                        
                        errBox(respData.message);
                    }
                    else{
                        errBox("");
                       let  data={
                            "email":respData.user.email,
                            "password":inputs[2].value
                        }
                        loginFn(data);
                    }
                }
            });
            xhr.open("POST", "https://shortify-api.herokuapp.com/create");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.withCredentials = false;
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.send(JSON.stringify(data));
        }
        else{
            errBox(validMsg);
        }
});
document.querySelector(".login-form .submit-btn button").addEventListener("click",(e)=>{
    e.preventDefault();
    let inputs= document.querySelectorAll(".login-form form input");
    let data={
        "email":inputs[0].value,
        "password":inputs[1].value
    }
    console.log(data);
    let validMsg = ValidateForm(data.email,data.password)
    console.log(validMsg)
    if(validMsg=="")
        loginFn(data);
    else{
        errBox(validMsg);
    }
});

const loginFn = (data)=>{
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
            let respData = JSON.parse(this.responseText)
            console.log(respData);
            if(respData.err){
                console.log(respData.err);
                errBox(respData.err);
            }
            else{
                localStorage.setItem('userInfo',JSON.stringify(respData.user));
                localStorage.setItem('userToken',JSON.stringify(respData.token))
                errBox("");
                window.location.href="./index.html";
            }

        }
    });
    xhr.open("POST", "https://shortify-api.herokuapp.com/login");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = false;
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(JSON.stringify(data));
}