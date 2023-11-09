from django.http import HttpResponseRedirect
from django.shortcuts import render,redirect
from .models import Task
from django.urls import reverse
from .forms import TaskForm

def print1(request): 
    task_data=Task.objects.all()
    if request.POST:
        print(request.POST)
        task=request.POST.get('task')
        details=request.POST.get('details')
        task_obj=Task.objects.create(task=task,details=details)
    print(task_data)
    return render(request,'user.html',{'tasks':task_data})

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


# def update(request,idd):
#     y=Task.objects.filter(id=idd)
#     context = { 'lists':y 
#     }
#     if request.method=="POST":
#         y= Task.objects.get(id=idd)
#         y.task = request.POST.get('title')
#         y.details = request.POST.get('details')
#         y.save()
#         return print1(request)

