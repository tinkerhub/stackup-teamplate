// document.getElementById("deleteButtonMain").addEventListener("click",()=>{
//     alert("hi")
   

// })
document.getElementById("popUpCancelButton").addEventListener("click",()=>{
    document.getElementById("deletePopUp").style.display="none";
})

function showPopup(data){
     
    // let idForDelete = document.getElementById("deleteButtonMain").value
    
    document.getElementById("deleteButton").value=data.value
    document.getElementById("deletePopUp").style.display="flex";

}

function popuplogoutadmin(){ 
    let logoutpopup = document.getElementById('logout')
    logoutpopup.className='flex justify-center items-center fixed inset-0 z-50 px-6 bg-[rgba(0,0,0,0.2)]'


}