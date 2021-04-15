var fs = require('fs');

var DATABASE = "./database.json";


function init()
{
	if(!fs.existsSync(DATABASE))
    {
		console.log("Initialising database.\n Creating `database.json` file");
		setData([]);	
	}
}


function getData()
{
	var contents = fs.readFileSync(DATABASE);
	var data = JSON.parse(contents);

	return data;
}


function setData(data)
{
	var dataString = JSON.stringify(data);

	fs.writeFileSync(DATABASE,dataString);
}


function help() 
{
    const help = `
    --------------------------- (HELP) ----------------------------

    $ node index.js add "title" "body"  ---> Add a new todo
    $ node index.js ls                  ---> Show remaining todos
    $ node index.js delete <id>         ---> Delete a todo
    $ node index.js check  <id>         ---> Complete a todo
    $ node index.js help                ---> Show help

    ---------------------------------------------------------------`;
    console.log(help);
}


function add(task, body) 
{
	var data = getData();

    if (body == undefined)
        body = " ";
  
    if (task !== undefined)
    {
        data.push({ title:task, body:body, completed:false });
        setData(data);

	    list();
    }  
    else
    {
        console.log("\x1b[91mYou've to add at least a Title!\n");
    }  
	

	
}


function check(task) 
{
	var data = getData();
   
	data[task].completed = !data[task].completed;

	setData(data);

	list();
}


function edit(task, title, body) 
{
	var data = getData();

    if (title == undefined)
        title = " "

    if (body == undefined)
        body = " "    

    data[task].title = title;
    data[task].body = body;

	setData(data);

	list();
}


function del(task)
{
	var data = getData();

	data.splice(task, task + 1);

	setData(data);

	list();
}


function list() 
{	
	var data = getData();
	
	if(data.length > 0)
    {
		console.log("\n\x1b[32m\x1b[40m\x1b[1m                Todo List                      \x1b[24m\x1b[49m\x1b[0m\n");  //   \x1b[0m
		data.forEach(function (task,index)
        {
			console.log("\x1b[97m[" + (index+1)+ "]  \x1b[93mTitle: \x1b[0m" + task.title + "   \x1b[93mBody: \x1b[0m" + task.body + " " + " " + (task.completed ? "\x1b[32m✓\x1b[93m" : " ") );
		});
	}
    else
    {
		console.log("\x1b[91mNo tasks added!!");
	}
    console.log("\n")

}


function ls_checked() 
{	
	var data = getData();
	
	if(data.length > 0)
    {
		console.log("\n\x1b[93m\x1b[4mTodo list:\x1b[24m\n");
		data.forEach(function (task,index)
        {
            if(task.completed == true)
			    console.log("(" + (index+1)+ ")", task.title + " " + task.body + " " + " " + (task.completed ? "\x1b[92m✓\x1b[93m" : " ") );
		});
	}
    else
    {
		console.log("\x1b[91mNo tasks added!!");
	}
    console.log("\n")
}


function ls_unchecked() 
{	
	var data = getData();
	
	if(data.length > 0)
    {
		console.log("\n\x1b[93m\x1b[4mTodo list:\x1b[24m\n");
		data.forEach(function (task,index)
        {
            if(task.completed == false)
			    console.log("(" + (index + 1) + ")", task.title + " " + task.body);
		});
	}
    else
    {
		console.log("\x1b[91mNo tasks added!!");
	}
    console.log("\n")
}


var command   = process.argv[2];
var argument1 = process.argv[3];
var argument2 = process.argv[4];
var argument3 = process.argv[5];


init();

switch(command)
{
	case "add":
		add(argument1, argument2);
		break;
	case "check":
		check(argument1-1);
		break;
	case "delete":
		del(argument1-1);
		break;
    case "edit":
        edit(argument1-1, argument2, argument3);
        break;    
	case "help":
		help();
		break;
	case 'ls':
		list();
		break;
    case 'ls_checked':
        ls_checked();
        break;    
    case 'ls_unchecked':
        ls_unchecked();
        break;     
	default:
		console.log("\x1b[91mCommand not found!!\x1b[0m");
		help();
		break;
}