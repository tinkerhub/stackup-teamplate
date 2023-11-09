var phoneOld ;
var emailOld;
var status1 = ""
function validate(mode){
    if(mode==='edit'){
        var editform = document.getElementById('editform')
        var name1 = document.getElementById("edit-name");
        var phone = document.getElementById("edit-phone");
        var email = document.getElementById("edit-email");
        var place = document.getElementById("edit-place");
        var name_error=document.getElementById("edit-name-error");
        var email_error=document.getElementById("edit-email-error");
        var phone_error=document.getElementById("edit-phone-error");
        var place_error=document.getElementById("edit-place-error");
        
        
        var category_error=document.getElementById("edit-category-error");
        var category=document.getElementById("edit-category");
        var code=document.getElementById("edit-code");
    
        var contact_id=document.getElementById("contact_id").value;
    
        var email_regex=/^([a-z0-9\.-]+)@([a-z]{2,15})\.([a-z]{2,15})$/;
        var email_result=email_regex.test(email.value);
    
        editform.addEventListener('submit',function(event){
            event.preventDefault();
        })
    }else{
        var addform = document.getElementById('addform')
        var name1 = document.getElementById("name");
        var phone = document.getElementById("phone");
        var email = document.getElementById("email");
        var place = document.getElementById("place");
        var name_error=document.getElementById("name-error");
        var email_error=document.getElementById("email-error");
        var phone_error=document.getElementById("phone-error");
        var place_error=document.getElementById("place-error");
        
        
        var category_error=document.getElementById("category-error");
        var category=document.getElementById("category");
        var code=document.getElementById("code");
    
        var contact_id=document.getElementById("contact_id").value;
    
        var email_regex=/^([a-z0-9\.-]+)@([a-z]{2,15})\.([a-z]{2,15})$/;
        var email_result=email_regex.test(email.value);
    
        addform.addEventListener('submit',function(event){
            event.preventDefault();
        })        
    }      
    
    function errorr(){
        place.style.outline="none";
        place_error.style.display="none";
        email.style.outline="none";
        email_error.style.display="none";
        name1.style.outline="none";
        name_error.style.display="none";
        phone.style.outline="none";
        phone_error.style.display="none";
        category_error.style.display="none";
    }
    if(name1.value.trim()==''){
        errorr();
        name_error.style.display="block";
        name_error.textContent="Name should not be empty!"
    }else if(name1.value.length>17){
        errorr();
        name_error.style.display="block";
        name_error.textContent="Maximum 17 characters allowed !";
    }else if(phone.value.trim()==''){
        errorr();
        phone_error.style.display="block";
        phone_error.textContent="Phone Number should not be empty!";       
    }else if(phone.value.length>15){
        errorr();
        phone_error.style.display="block";
        phone_error.textContent="Enter Phone Number in valid format!";
    }else if(email.value.trim()==''){
        errorr();
        email_error.style.display="block";
        email_error.textContent="Email should not be empty!";       
    }else if(email.value.length>30){
        errorr();
        email_error.style.display="block";
        email_error.textContent="Email ID too long!";        
    }else if(!email_result){
        errorr();
        email_error.style.display="block";
        email_error.textContent="Email ID not valid!";       
    }else if(place.value.trim()==''){
        errorr();
        place_error.style.display="block";
        place_error.textContent="Place should not be empty!";
    }else if(place.value.length>20){
        errorr();
        place_error.style.display="block";
        place_error.textContent="Place length is too long!";
    }else if(category.selectedIndex===0){
        errorr()
        category_error.style.display="block";
        category_error.textContent="Please select a category!";
    }else{
        errorr();
        var userData = {
            status1:'',
            contact_id:contact_id,
            name:name1.value,
            phone:phone.value,
            email:email.value,
            place:place.value,
            category:category.value,
            code:code.value
          }
          if(mode==='edit'){
            checkedit(userData);
          }else{
            checknew(userData);
          }
        
    }

}

async function checknew(userData) {
   
        try {
        
            const response = await fetch('http://localhost:4000/checkdatanew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
                
            });
            
            if (response.ok) {
                const data = await response.json();
                
                var error = document.getElementById('exist-error');
                if(data.message==='exist'){
                    error.className='md:text-center md:ml-12 text-xs text-red-500 mt-2 w-full flex justify-center items-center';
                }else{
                    error.className='md:text-center md:ml-12 text-xs text-red-500 mt-2 hidden w-full flex justify-center items-center';
                    window.location.href='/'
                }
                
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

async function checkedit(userData) {

    if(userData.email ==emailOld && userData.phone ==phoneOld){
        userData.status1=''
        
    }else if(userData.email !==emailOld){
        
        userData.status1='email changed';

                
    }else if(userData.phone !==phoneOld){
       
        userData.status1='phone changed';
            
    }else if(userData.email !==emailOld && userData.phone !==phoneOld){
        
        userData.status1='both changed';
    }
    
    
    try {

        
        const response = await fetch('http://localhost:4000/checkdataedit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
            
        });
        
        if (response.ok) {
            const data = await response.json();
            
            var error = document.getElementById('edit-exist-error');
            if(data.message==='exist'){ 
                error.className='md:text-center md:ml-12 text-xs text-red-500 mt-2 w-full flex justify-center items-center';
            }else{
                error.className='md:text-center md:ml-12 text-xs text-red-500 mt-2 hidden w-full flex justify-center items-center';
                window.location.href='/'
            }
            
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
} 
function popupdeleteContact(){ 
    var deletepopup = document.getElementById('delete')
    var dtbtn = document.getElementById('dtbtn')
    var dt = document.getElementById('dt')
    deletepopup.className='flex justify-center items-center fixed inset-0 z-50 px-6 bg-[rgba(0,0,0,0.2)]'
    dt.value=dtbtn.value

}
async function popupeditContact(cont){ 
    var editpopup = document.getElementById('editp')
    var editbtn = document.getElementById('editbtn')
    var edit = document.getElementById('contact_id')
    editpopup.className='flex fixed inset-0 z-50 items-center justify-center bg-[rgba(0,0,0,0.2)]';
    edit.value=editbtn.value

    try{

        let response = await fetch('/getDetails',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:cont.value})
        })
        if(response.ok){
            
            let data = await response.json();
            let name1 = document.getElementById("edit-name");
            let phone = document.getElementById("edit-phone");
            let email = document.getElementById("edit-email");
            let place = document.getElementById("edit-place");
            let category=document.getElementById("edit-category");
            let code=document.getElementById("edit-code");
            data=data.message
            name1.value=data.name;
            phone.value=data.phone;
            email.value=data.email;
            place.value=data.place;
            category.value=data.category;
            code.value=data.code;
            phoneOld = data.phone
            emailOld = data.email
            status1 = ""
            
        }
    }catch(err){
        console.error('Error creating user:', err);
    }
    
    
    
}    
function popupAddContact(){
    var main = document.getElementById('main')
    main.className='transition ease-in duration-3000 bg-slate-200 h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-50 '
    main.style.backgroundColor='rgba(0, 0, 0, 0.2)'
}
function closeAdd(){
    var main = document.getElementById('main')
    main.className='bg-slate-200 h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-50 hidden'
    main.style.backgroundColor='rgba(0, 0, 0, 0.2)'
    
}
function closeEdit(){
    var main = document.getElementById('editp')
    main.className='flex fixed inset-0 z-50 items-center justify-center bg-[rgba(0,0,0,0.2)] hidden';
}
var list = Array.from(document.querySelectorAll("[id*='popup']"))
var listNew = document.querySelectorAll("[id*='popup']")
var idlist = list.map((item)=>item.id);
var elem = document.getElementById("filter");
var btn = document.getElementById("btn");
var svgbtn = document.getElementById("svgbtn");
var bdy = document.getElementById("body");
(document.body || document.documentElement).addEventListener('click', function (event) {
// If the element on which the click event occurs is not the dropdown, then hide it
    
    let optionClassHidden = "hidden absolute right-0 bg-white shadow-lg shadow-slate-200";
    let optionClassShow = "absolute right-0 bg-white shadow-lg shadow-slate-200";
    
    if(idlist.includes(`${event.target.id}popup`)){
        if(document.getElementById(`${event.target.id}popup`).className===optionClassShow){
            document.getElementById(`${event.target.id}popup`).className=optionClassHidden
        }else{
            listNew.forEach((item)=>{
                item.className=optionClassHidden
            })
            document.getElementById(`${event.target.id}popup`).className=optionClassShow
        }

    }else{
        listNew.forEach((item)=>{
            item.className=optionClassHidden
        }) 
    }
              
    }, false); 