

from django.http import HttpResponse
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.shortcuts import render,redirect
from .models import Task
from django.urls import reverse
from .forms import TaskForm
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from . models import User
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
def indexReg(request):
    return render(request,'register.html')

def delete(request,idd):
    x=Task.objects.get(id=idd)
    x.delete()
    task_data=Task.objects.all()
    return redirect('index') 

def update(request, id):
    form = TaskForm(instance=Task.objects.get(id=id))
    if request.POST:
        print(request.POST)
        task=request.POST.get('task')
        details=request.POST.get('details')
        form = TaskForm(request.POST, instance=Task.objects.get(id=id))
        if form.is_valid():
            form.save()
            return redirect('index')
        else:
            print(form.errors)

    return render(request,'update.html',{'form': form})

def print1(request): 
    task_data=Task.objects.all()
    if request.POST:
        print(request.POST)
        task=request.POST.get('task')
        details=request.POST.get('details')
        task_obj=Task.objects.create(task=task,details=details)
    print(task_data)
    return render(request,'user.html',{'tasks':task_data})
def register(request):
    if request.method=="POST":
        name=request.POST['name']
        email=request.POST['mail']
        password=request.POST['password']
        myuser= User.objects.create_user(name,email,password)
        myuser.save()
        return redirect('login')
        
    return render(request, 'login.html')


