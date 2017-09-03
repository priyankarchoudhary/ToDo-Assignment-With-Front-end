console.log("In script file Loading");
const RESPONSE_DONE =4;
const STATUS_OK = 200;
//const TODOS_LIST_ACTIVE = "todos_list_active"
const TODO_LIST_ID = "todo_list_div";
const TODOS_LIST_DELETED = "todos_list_delete"
const TODOS_LIST_COMPLETE = "todos_list_complete"
const NEW_TODO_INPUT_ID = "new_todo_input_id"

window.onload = getTodoAJAX();
//----------------------getTodoAJAX()------------------------------------------
function getTodoAJAX() {

    var xhr=new XMLHttpRequest();
    xhr.open("GET",'/api/todos',true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            //is statuscode is OK

            if(xhr.status ==STATUS_OK)
            {
                AddActive(TODO_LIST_ID,xhr.responseText);
                AddComplete(TODOS_LIST_COMPLETE,xhr.responseText);
                AddDelete(TODOS_LIST_DELETED,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}
//------------------------------AddActive(id,todo_data_json)--------------------------------------
function AddActive(id,todo_data_json)
{
    var todos = JSON.parse(todo_data_json);
    var parent = document.getElementById(id);
   // console.log(parent);
    //console.log(todos);
    parent.innerHTML=""
    if(parent)
    {
        Object.keys(todos).forEach
        (
            function (key)
            {
                if(todos[key].status =="ACTIVE")
                {
                    console.log(todos[key])
                    var todo_element = CreateElement(key,todos[key])
                    parent.appendChild(todo_element);

                }
            }//end of function
        )//end of foreach loop
    }//end of if
}// end of AddActive() Function
//-------------------------------AddComplete(id,todo_data_json)-----------------------------------
function AddComplete(id,todo_data_json)
{
    var todos=JSON.parse(todo_data_json);
    var parent=document.getElementById(id);
    console.log(parent);
    parent.innerHTML="";
    if(parent)
    {
        Object.keys(todos).forEach(
            function(key){
                if(todos[key].status=="COMPLETE")
                {
                    var todo_element = CreateElement(key, todos[key]);
                    parent.appendChild(todo_element);
                    AddActive(TODO_LIST_ID, todo_data_json); // for refresing purpose
                }// end of if statement
            }//end of foreach loop
        );//end of foreach loop

    } // end of if(parent)
}// end of function AddComplete(argument1, argument2);
//---------------------------AddDelete(id,todo_data_json)------------------------------------------
function AddDelete(id,todo_data_json)
{
    var todos=JSON.parse(todo_data_json);
    var parent=document.getElementById(id);
    console.log(parent);
    parent.innerHTML="";
    if(parent)
    {
        Object.keys(todos).forEach(
            function(key){
                if(todos[key].status=="DELETED")
                {
                    var todo_element = CreateElement(key, todos[key]);
                    parent.appendChild(todo_element);
                    AddActive(TODO_LIST_ID, todo_data_json); // for refresing purpose
                    AddComplete(TODOS_LIST_COMPLETE, todo_data_json);
                }// end of if statement
            }//end of foreach loop
        );//end of foreach loop
    } // end of if(parent)
}// end of function AddComplete(argument1, argument2);

//-----------------------------CreateElement(id,todo_object)-------------------------------------
function CreateElement(id,todo_object)
{
    var main_element = document.createElement("div");
    main_element.setAttribute("class","item");

    var element = document.createElement("div");
    element.setAttribute("class","item-main");

    if(todo_object.status=="ACTIVE")
    {
        var complete = document.createElement("input");
        complete.setAttribute("type", "checkbox");
        complete.setAttribute('class','complete');
        complete.setAttribute("onclick", 'CompleteAJAX(' + id + ')');
        complete.setAttribute("id", 'del' + id);
        element.appendChild(complete);
    }
    if (todo_object.status == 'COMPLETE')
    {
        var complete = document.createElement("input");
        complete.setAttribute("type", "checkbox");
        complete.setAttribute('checked','true');
        complete.setAttribute('disabled','disabled');

        element.appendChild(complete);

    }

    var todo_element = document.createElement("span");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("id",id);
    todo_element.setAttribute("class","item todostatus"+todo_object.status);
    element.appendChild(todo_element);

    main_element.appendChild(element);

    if (todo_object.status != 'DELETED')
    {
        var del = document.createElement("IMG");
        del.setAttribute('src','./images/wong.png');
        del.setAttribute('height','12');
        del.setAttribute('width','12');
        del.setAttribute('class','delete delete-img');
        del.setAttribute("onclick", 'DeleteAJAX(' + id + ')');
        main_element.appendChild(del);

    }

    return  main_element;
}
//----------------------------CompleteAJAX(id)-------------------------------------------
function CompleteAJAX(id)
{
    var xhr=new XMLHttpRequest();
    xhr.open("PUT",'/api/todos/'+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="todo_status=COMPLETE";
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status ==STATUS_OK)
            {
                AddComplete(TODOS_LIST_COMPLETE,xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
//-----------------------------DeleteAJAX(id)-----------------------------------------
function DeleteAJAX(id)
{
    var xhr=new XMLHttpRequest();
    xhr.open("DELETE",'/api/todos/'+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="todo_status=COMPLETE";
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status ==STATUS_OK)
            {
                AddDelete(TODOS_LIST_DELETED,xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
//-----------------------------AddTodoAJAX()-----------------------------------------
function AddTodoAJAX(){
    var title=document.getElementById(NEW_TODO_INPUT_ID).value;
    console.log(title);
    var xhr= new XMLHttpRequest();
    xhr.open("POST",'/api/todos',true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="todo_title="+encodeURI(title);

    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            //is statuscode is OK

            if(xhr.status ==STATUS_OK)
            {
                AddActive(TODO_LIST_ID,xhr.responseText);

            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}