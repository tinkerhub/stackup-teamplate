from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.shortcuts import render
from django.http import HttpResponse
from . models import User
from django.contrib.auth.models import User
from django.shortcuts import redirect

def index(request):
    return render(request,'home.html')

def login(request):
     if request.method == "POST":  
        print("here")
        unm= request.POST.get('usr')
        pwd= request.POST.get('pwd')

        user = authenticate(username=unm, password=pwd)

        if user is not None:
            print('user found')
            auth_login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Error while logging")
     return render(request,"login.html" )
def register(request):
    if request.method == "POST":
        name=request.POST['name']
        email=request.POST['mail']
        password=request.POST['password']

        myuser=User.objects.create_user(name, email, password)
        myuser.save()

        return redirect('login')
    return render(request,'register.html')

    


     
        
         
     