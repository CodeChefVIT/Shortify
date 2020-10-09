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
window.onload = ()=>{
    document.querySelector(".exit").addEventListener("click",()=>{
        console.log("exit")
        window.location.href="./login.html";
    })
}
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
document.querySelector(".login-form .submit-btn button").addEventListener("click",(e)=>{
    e.preventDefault();
    let inputs= document.querySelectorAll(".login-form form input");
    let data={
        "email":inputs[0].value,
        "newpass":inputs[1].value
    }
    console.log(data);
    validForm = ValidateForm(data.email,data.newpass)
    if(validForm=="")
        loginFn(data);
    else{
        errBox(validForm);
    }
});

const loginFn = (data)=>{
    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        let respData = JSON.parse(this.responseText)
            if(xhr.status==200){
                console.log(respData);
                document.querySelector('.login-form').innerHTML="<h1>Reset Successful!</h1> <a href='./login.html'>login</a>";
                document.querySelector('.login-form').classList.add('success');
            }
            else{
                console.log(respData.err);
                errBox(respData.err);
            }
        }
    });
    xhr.open("POST", "https://shortify-api.herokuapp.com/forgot/password");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = false;
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(JSON.stringify(data));
}