import "./node_modules/axios/dist/axios.js"

let home=document.querySelector("#home")
let login=document.querySelector("#login")
let register=document.querySelector("#register")
let logout=document.querySelector("#logout")
let conPost=document.querySelector("#conPost")



let cookie=document.cookie.split(',')
let token=cookie[0]
let userNameCooke=cookie[1]
let passwordCookie=cookie[2]
let posts;





if(token.slice(7).length ==0){
    logout.style.display="none"
    login.style.display="block"
    register.style.display="block"
}else{
    logout.style.display="block"
    login.style.display="none"
    register.style.display="none"
}




logout.addEventListener("click",(e)=>{
    e.preventDefault()
    let data={
        "username":userNameCooke,
        "password":passwordCookie.slice(0,11)
    }
    let config={headers:{
        Authorization:`Bearer ${token.slice(7)}`
    }}
    axios.post("https://tarmeezacademy.com/api/v1/logout",data,config).then((res)=>{
        if (res.status === 200   ){
            document.cookie="token=; "
            window.location.href="login.html"
        }
    })
    
})


function showPosts(array){
    console.log(array)
    conPost.innerHTML=array.map((item,index)=>{
        console.log(String(item.author.profile_image).slice(17) === ""  )
        return(`
        <div  class="w-[300px] md:w-[500px] lg:w-[700px] bg-white min-h-[500px] mx-auto p-3 mt-0 ">
            <div class="flex items-center gap-3 border-b border-[#ccc] py-1">
                <img src=${String(item.author.profile_image).slice(17) === "" ?"./R.png":item.author.profile_image} alt="post" class="w-[40px] rounded-full"/>
                <h5 class=" font-medium">${item.author.username}</h5>
            </div>
            <div class=" my-2">
                <img src=${String(item.image).slice(17) === "" ?"./sIaRmaFSMfrw8QJIBAa8mA-article.png":item.image}  alt="image" class="h-[350px] w-[96%] mx-auto ">
                <p class="text-sm text-[#ccc] ml-3">${item.created_at}</p>
            </div>
            <div class="border-b border-[#ccc]">
                <h1 class="text-2xl mb-1 font-semibold">${item.title}</h1>
                <p>${item.body}</p>
            </div>
            <div class="my-2">
                <p class="flex items-center gap-2"><i class="fa-solid fa-pen"></i>(${item.comments_count}) Comments</p>
            </div>
        </div>
            `
        )
        

    })
}

async function getPosts(){
    let config={headers:{
        Authorization:`Bearer ${token.slice(7)}`
        }
    }
    await axios.get("https://tarmeezacademy.com/api/v1/posts?limit=50",config).then((res)=>{showPosts(res.data.data) 
    })
}
getPosts()



