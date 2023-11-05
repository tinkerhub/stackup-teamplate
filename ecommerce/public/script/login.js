const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const signInShowPassword = document.getElementById('signInCheckbox');
const signInPassword = document.querySelector('.signInPassword');

signInShowPassword.addEventListener('click', () =>{
	if(signInPassword.type === "password"){
		signInPassword.type ="text";
	}
	else{
	signInPassword.type ="password";
	}
});

const signUpShowPassword = document.getElementById('signUpCheckbox');
const signUpPassword = document.querySelector('.signUpPassword');
const signUpPasswordConfirm = document.querySelector('.signUpPasswordConfirm');

signUpShowPassword.addEventListener('click', () =>{
	if(signUpPassword.type === "password" || signUpPasswordConfirm.type === "password"){
		signUpPassword.type ="text";
		signUpPasswordConfirm.type ="text";
	}
	else{
	signUpPassword.type ="password";
	signUpPasswordConfirm.type ="password";
	}
});

const signInClick = document.getElementById('signInClick');
const signInEmail = document.querySelector('.signInEmail');
const signInError = document.querySelector('.signInError');

signInClick.addEventListener('click', () => {
	if(signInEmail.value === "" || signInPassword.value === "" ){
		signInEmail.style.border = "1px solid #FF4B2B";
		signInPassword.style.border = "1px solid #FF4B2B";
		signUpError.style.display = 'block';
	}
});


const createClick = document.getElementById('createClick');
const signUpName = document.querySelector('.signUpName');
const signUpEmail = document.querySelector('.signUpEmail');
const signUpError = document.querySelector('.signUpError');

createClick.addEventListener('click', () => {
	if(signUpName.value === "" || signUpEmail.value === "" || signUpPassword.value === "" || signUpPasswordConfirm.value === ""){
		signUpError.style.display = 'block';
		signUpName.style.border = "1px solid #FF4B2B";
		signUpPassword.style.border = "1px solid #FF4B2B";
		signUpEmail.style.border = "1px solid #FF4B2B";
		signUpPasswordConfirm.style.border = "1px solid #FF4B2B";
	}
	else if(signUpPassword.value !== signUpPasswordConfirm.value){
		signUpError.style.display = 'block';
		signUpError.innerHTML = "passwords don't match"
		signUpPassword.style.border = "1px solid #FF4B2B";
		signUpPasswordConfirm.style.border = "1px solid #FF4B2B";
	}
});






  $(document).ready(function() {
    
    $('#createClick').click(function(event) {
      event.preventDefault(); 
      
      const signUpData = {
        Name: $('.signUpName').val(),
        Email: $('.signUpEmail').val(),
        Password: $('.signUpPassword').val()
      };


 
      $.ajax({
        type: 'POST', 
        url: '/signup', 
        data: signUpData,
        success: function(response) {
         
          if (response.success) {
            window.location.href = '/'; 
          } else{
            
            $('.signUpError').text(response.err);
            $('.signUpError').show();
          }
        },
        error: function(error) {
          console.error('Error:', error);
        },
      });
    });

    
    $('#signInClick').click(function(event) {
      event.preventDefault(); 
      
      const signInData = {
        Email: $('.signInEmail').val(),
        Password: $('.signInPassword').val(),
      };
      

      
      $.ajax({
        type: 'POST', 
        url: '/signin', 
        data: signInData,
        success: function(response) {
          
          if (response.success) {
            window.location.href = '/'; 
          } else{
            
            $('.signInError').text(response.err);
            $('.signInError').show();
          }
        },
        error: function(error) {
          console.error('Error:', error);
        },
      });
    });
  });

