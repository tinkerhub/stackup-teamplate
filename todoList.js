const listContainer=document.getElementsByClassName("tasks");
    function add_task()
    {
       var tk=document.querySelector("#taskbox").value;
       if(tk === '')
          alert("No task Entered");
       else
       {
       alert(`Task added is ${tk}! `);
       let li=document.createElement("li");
       
       li.innerHTML=tk;
       
       document.querySelector(".tasks").append(li);
       let span=document.createElement("span");
       span.innerHTML="x"
       li.append(span);
       document.querySelector("#taskbox").value=""; //clear input box
       saveTask();
       }
    }  
    document.addEventListener('DOMContentLoaded' , function()
    {
       listContainer[0].addEventListener("click" , function(e)
    {
        
          if(e.target.tagName === "LI")
          {
        
            e.target.classList.toggle("checked");
            saveTask();
          }
          else if(e.target.tagName === "SPAN")
          {
             e.target.parentElement.remove();
             saveTask();
          }

    }, false);
 
    });
    function saveTask()
    {
        localStorage.setItem("Tasks",listContainer[0].innerHTML);

    }
    function savedTask()
    {
        listContainer[0].innerHTML= localStorage.getItem("Tasks");
    }
    savedTask();
