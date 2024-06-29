import "./node_modules/axios/dist/axios.js"

let btnLogin=document.querySelector("#btnLogin")

let password=document.querySelector("#password")
let username=document.querySelector("#userName")
let alertfail=document.querySelector("#alertfail")
let existAlert=document.querySelectorAll("#existAlert")
let texttAlert=document.querySelector("#textAlert")
let alertsuccess=document.querySelector("#alertsuccess")





username.addEventListener("keyup",function(){
    username=document.querySelector("#userName").value
})
password.addEventListener("keyup",function(){
    password=document.querySelector("#password").value
})


async function handelLogin(e){
    e.preventDefault()
    let data={
        username,
        password,
    }

        await axios.post("https://tarmeezacademy.com/api/v1/login",data).then(async(res)=>{
            console.log(res)
            document.cookie=`token=${res.data.token},${username},${password},${res.data.user.id}`
            // document.cookie=`id=${res.data.user.id}`
            
            
            if(res.status === 200){
                alertsuccess.style.visibility="visible"
                await new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        window.location.href="home.html"
                    },1500)
                })
            }

        }).catch((err)=>{
            console.log(err)
            if(err.response.status === 422){
                alertfail.style.visibility="visible"
                texttAlert.innerHTML=err.response.data.message
            }
        })
    


}

existAlert[0].addEventListener('click',function(){
    alertfail.style.visibility="hidden"
})
existAlert[1].addEventListener('click',function(){
    alertsuccess.style.visibility="hidden"
})


btnLogin.addEventListener("click",function(e){
    handelLogin(e)
})