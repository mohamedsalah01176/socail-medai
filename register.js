import "./node_modules/axios/dist/axios.js"


let btnRegister=document.querySelector("#btnRegister")
let name=document.querySelector("#name")
let email=document.querySelector("#email")
let password=document.querySelector("#password")
let username=document.querySelector("#userName")
let image=document.querySelector("#image")
let alertsuccess=document.querySelector("#alertsuccess")
let alertfail=document.querySelector("#alertfail")
let textAlert=document.querySelector("#textAlert")
let existAlert=document.querySelectorAll("#existAlert")


function regiter(e){
    e.preventDefault();
    let formData=new FormData()
    formData.append("username",username.value)
    formData.append("password",password.value)
    formData.append("image",image.files[0])
    formData.append("name",name.value)
    formData.append("email",email.value)
    
    console.log(image.files[0])
        axios.post("https://tarmeezacademy.com/api/v1/register",formData)
        .then(async(res)=>{
            console.log(res)
            if(res.status ===200){
                alertsuccess.style.visibility="visible"
                await new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        window.location.href="login.html"
                    },1500)
                })
            }
            
        }).catch((error)=>{
            if(error.response.status === 422){
                alertfail.style.visibility="visible"
                textAlert.innerHTML=error.response.data.message
            }
        })

}


btnRegister.addEventListener("click",function(e){
    regiter(e)
})

existAlert[0].addEventListener("click",function(){
    alertfail.style.visibility="hidden"
    
})
existAlert[1].addEventListener("click",function(){
    alertsuccess.style.visibility="hidden"
    
})