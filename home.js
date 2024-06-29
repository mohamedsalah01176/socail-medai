import "./node_modules/axios/dist/axios.js"

let home=document.querySelector("#home")
let login=document.querySelector("#login")
let register=document.querySelector("#register")
let portfolio=document.querySelector("#portfolio")
let logout=document.querySelector("#logout")
let conPost=document.querySelector("#conPost")

let commentExist=document.querySelector(".commentExist")
let commentCon=document.querySelector(".commentCon")
let commentInput=document.querySelector(".commentInput")
let commentCreate=document.querySelector(".commentCreate")
let commentList=document.querySelector("#commentList")
let alertsuccess=document.querySelector("#alertsuccess")
let alertfail=document.querySelector("#alertfail")
let suctextAlert=document.querySelector("#alertsuccess #textAlert")
let failtextAlert=document.querySelector("#alertfail #textAlert")
let existAlert=document.querySelectorAll("#existAlert")

let inputTitle=document.querySelectorAll(".inputTitle")
let inputDes=document.querySelectorAll(".inputDes")
let inputimg=document.querySelectorAll(".inputimg")
let btnPost=document.querySelectorAll(".btnPost")
let conCreatePost=document.querySelectorAll(".conCreatePost")
let btnCreatePost=document.querySelectorAll(".btnCreatePost")
let createPostExist=document.querySelectorAll(".createPostExist")



let cookie=document.cookie.split(',')
let token=cookie[0]
let userNameCooke=cookie[1]
let passwordCookie=cookie[2]

let posts=[];
let postId;
let sucstatus;
let errstatus;
let message;




if(token.slice(7).length ==0){
    logout.style.display="none"
    login.style.display="block"
    register.style.display="block"
    portfolio.style.display="none"
}else{
    logout.style.display="block"
    login.style.display="none"
    register.style.display="none"
    portfolio.style.display="block"
}




logout.addEventListener("click",(e)=>{
    e.preventDefault()
    let data={
        "username":userNameCooke,
        "password":passwordCookie
    }
    let config={headers:{
        Authorization:`Bearer ${token.slice(6)}`
    }}
    axios.post("https://tarmeezacademy.com/api/v1/logout",data,config).then((res)=>{
        if (res.status === 200   ){
            document.cookie="token=; "
            window.location.href="login.html"
        }
    })
    
})


function showPosts(array){
    conPost.innerHTML=array.map((item,index)=>{
        return(`
        <div key=${index}  class=" bg-white min-h-[500px] relative  w-full p-3 mt-0 ">
        ${userNameCooke === item.author.username?`<i data-id='${item.id}' class="curdExist fa-solid fa-xmark absolute top-3 right-3 text-2xl hover:text-red-500 hover:rotate-180 transition-all duration-500 cursor-pointer"></i>`:""}
                
        <div class="flex items-center gap-3 border-b border-[#ccc] py-1">
            <a href='./portfolio.html' class='flex items-center gap-3'>
                <img src=${String(item.author.profile_image).slice(17) === "" ?"./R.png":item.author.profile_image} alt="post" class="w-[50px] h-[50px] rounded-full"/>
                <h5 class=" font-medium">${item.author.username}</h5>
            </a>
        </div>
            <div class=" my-2">
                <img src=${String(item.image).slice(17) === "" ?"./sIaRmaFSMfrw8QJIBAa8mA-article.png":item.image}  alt="image" class="h-[350px] w-[96%] mx-auto ">
                <p class="text-sm text-[#ccc] ml-3">${item.created_at}</p>
            </div>
            <div class="border-b border-[#ccc]">
                <h1 class="text-2xl mb-1 font-semibold">${item.title}</h1>
                <p>${item.body}</p>
            </div>
            <button data-id='${item.id}' class="commentBtn my-2 focus:outline-none">
            <p class="flex items-center gap-2 border-none outline-none"><i class="fa-solid fa-pen"></i>(${item.comments_count}) Comments</p>
            </button>
        </div>
            `
        )
        
        
    }).join("")

    document.querySelectorAll(".commentBtn").forEach((item)=>{
        item.addEventListener("click",function(){
            commentCon.style.display="flex"
            postId=this.getAttribute('data-id')
            getComment(postId)
        })
    })


    document.querySelectorAll('.curdExist').forEach((item)=>{
        item.addEventListener('click',function(){
            postId=this.getAttribute('data-id')
            let header={
                headers:{
        Authorization:`Bearer ${token.slice(6)}`
                }
            }
            axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`,header).then((res)=>window.location.reload())
        })
    })
    
}

async function getPosts(){
    let config={headers:{
        Authorization:`Bearer ${token.slice(6)}`
        }
    }
    await axios.get("https://tarmeezacademy.com/api/v1/posts?limit=50",config).then((res)=>{
        showPosts(res.data.data)
    })
}
getPosts()


async function getComment(id){
    let config={headers:{
        Authorization:`Bearer ${token.slice(6)}`
    
    }}
    await axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`,config).then((res)=>{
        
        commentList.innerHTML=res.data.data.comments.map((item,index)=>{
            return(
                `
                <div class='bg-[#eee] p-2 rounded-lg'>
                <div class='flex items-center gap-1'>
                    <img src='${String(item.author.profile_image).slice(17) === "" ?"./R.png":item.author.profile_image}' alt="image" class='w-[50px] h-[50px] rounded-full'/>
                    <h3>${item.author.username}</h3>
                </div>
                <div class='flex justify-between items-center '>
                    <p class='text-blue-500 text-lg' >${item.body}</p>
                    <p class='text-sm text-[#777]'>${item.author.updated_at.slice(0,17)}</p>
                </div>
                </div>
                `
            )
        }).join("")
    })
}


async function createComment(id){
    let config={headers:{
        Authorization:`Bearer ${token.slice(6)}`
        }
    }
    let data={
        body:commentInput.value
    }
    
    await axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,data,config).then((res)=>{ 
        getComment(postId)
        if(res.status === 201){
            alertsuccess.style.visibility="visible"
            suctextAlert.innerHTML="create new comment"

        }
    }).catch((err)=>{
        
        if(err.response.status === 422){
            alertfail.style.visibility="visible"
            failtextAlert.innerHTML=err.response.data.message
        }
        if(err.response.status === 401){
            alertfail.style.visibility="visible"
            failtextAlert.innerHTML="you should login" 
        }
    })
    
}

existAlert[0].addEventListener('click',function(){
    alertfail.style.visibility="hidden"
})
existAlert[1].addEventListener('click',function(){
    alertsuccess.style.visibility="hidden"
})
commentCreate.addEventListener('click',function(){
        createComment(postId)
        commentInput.value=""
    
})
commentExist.addEventListener("click",function(){
    commentCon.style.display="none"
})



function createPost(){
    let formData=new FormData()
    formData.append("title",inputTitle[0].value)
    formData.append("body",inputDes[0].value)
    formData.append("image",inputimg[0].files[0])
    
    let config={
        headers:{
            Authorization:`Bearer ${token.slice(6)}`
        }
    }
    axios.post("https://tarmeezacademy.com/api/v1/posts",formData,config).then((res)=>{
        sucstatus=res.status
    }).catch((err)=>{
        errstatus=err.response.status
        message=err.response.data.message
        if(err.response.status === 401){
            alertfail.style.visibility="visible"
            failtextAlert.innerHTML="you should login" 
        }

    })
}

btnPost[0].addEventListener('click',function(){
    createPost()
    if(sucstatus === 201){
        conCreatePost[0].style.display="none"
        alertsuccess.style.visibility="visible"
        suctextAlert.innerHTML="create new post"
        window.location.reload()
    }
    
    if(errstatus === 422){
        alertfail.style.visibility="visible"
        failtextAlert.innerHTML=message
    }

})
btnCreatePost[0].addEventListener('click',function(){
    conCreatePost[0].style.display="flex"

})

createPostExist[0].addEventListener('click',function(){
    conCreatePost[0].style.display="none"
})