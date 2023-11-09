from django.http import HttpResponse
from django.shortcuts import render
<<<<<<< HEAD

def index(request):
    return render(request,'home.html')
=======
from django.contrib.auth.models import User
from django.shortcuts import redirect


def index(request):
    return render(request,'register.html')

def register(request):
    if request.method=="POST":
        name=request.POST['name']
        email=request.POST['mail']
        password=request.POST['password']

        myuser= User.objects.create_user(name,email,password)
        myuser.save()
        return redirect('login')
        
    return render(request, 'login.html')
    
def login(request):
    return render(request,register.html)

    



>>>>>>> c807127078a290645a377f5f80b80b8c9dba23fe
