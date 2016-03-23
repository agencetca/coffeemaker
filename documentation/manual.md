<!DOCTYPE HTML>
<meta charset="UTF-8"> 

Coffeemaker.io
====================

Your personal platform kit
---------------------

### Introduction

> __Coffeemaker is still in early stage.
> It will be released as soon as possible under the artistic open-source licence.
> Currently, it's 100% owned by TCA, it is not publicly available, keep it at your own discretion__
>

Today, is is hard to develop your own platform alone, since there 
is a bunch of technical things to know before even thinking about 
starting. However, a great a number of peoples has no IT skills, 
but ideas. Coffeemaker aims to facilitate them to transform that 
into a real, working, efficient Web realization. On a side, the
reader should know that Coffeemaker is going with Paar (Platform 
as a Robot), another piece of code coming from a larger concept that 
make things "robot-ready". At this time, tough, Paar is not yet 
available for release.

###Installation and Requirements

<s>If you own a debian based linux system, you can install [Marvin](http://marv.in),
a friendly robot that will propose you to start a coffeemaker project. </s>

####Here is a basic process that 'll work : 

- install nginx
- git clone the source package 
>    `git clone ssh://guest@yousuckless.tk:/~/coffeemaker`
- configure nginx to serve the source package
- make you a coffee (because it's nice)
- open your browser at the nginx listening port, you should see the user interface

*Note : no interface at this time, just test-examples*

*Note : You might be able to use the sources without a webserver (untested).*

###Filesystem

+ coffeemaker.js : the core library
+ core <--- deprecated soon
+ repo : the repository for sequences and actions
    - compoz : starting repo, given for free
        - actions : little functions that execute small things (should be KISS-based)
        - methods : functions aggregation
        - process : methods aggregation
        - rationales : process aggregation
    - your own repo : as it sounds, could be a compoz fork
+ static : static files location
    - images
    - lib : external libraries that can not be handle by coffeemaker
        - jquery (example)

###How it works

1) you load something, an action, a process, or method or whatever

2) coffeemaker looks on the server side and tries to get a file called "require.json" 

3) if it get it, it parses it and downloads thing associated with

4) then your request is transfered to the builder ("core/system")

5) the builder loop on things that had been downloaded and compact them into a sequence

*Note : each entry in the sequence is an order for core/system/exec to execute an action*

6 ) the first action of the sequence is launched

7) things do what you tell them to do

####Make sequences

*Note : at his time the system is nor flex nor strong, so follow carefully the instructions*

1) create a folder in /repo, this is YOUR repo

2) create file like component.js or component.json (you are free for the name)

3) configure the file (instructions are on next paragraphe)

- If it is component.JS it will be an  action
- If it is component.JSON it could be a method, process or rationale

4) load your component. They ALWAYS need a callback at the end, even empty (sorry for that)
*See next sections for more details on loading*

5) it should work...

####Make an action

1) Go in YOUR repo, create a file like "component.js"

2) Edit the file like this:

*Note : an action ALWAYS receive an object as first argument, it is the "DB"*

*Note : an action ALWAYS receive a function as last argument, it called next*

*Do not forget to include DB and next as first and last arguments*

*Optional arguments go on the middle*

*You also MUST launch next() when your action is done (otherwise the whole set stops*

*It is still unclear if you always need to send the DB as a next argument... you should do it for the moment.*

Make a function following this pattern

        my function() {
            this.action1 = function(db, thing, thing2, next)  {
                //do awesome stuff
                next(db)
            };

            this.action2 = function(db, next) {
                //do awesome stuff
                next(db)
            }
        }
Create a file require.json at the root of YOUR repo
Edit it like :

        {
            require : [
                component.js 
            ]

        }   

Launch it (see section further)


####Make a method

1) Go in your repo, create a file like "component.json"

*Note you will need an action file. You can use component.js previously created or another lib like compoz/actions/someThing*

2) Edit the file like this:

*Note : args1 or args2 in the example below are NOT values. They are references to the attribute of an object that travels through all the actions in the set.*

*Note : See the section "Launch a method" for more details*


    {

        name : "name of the method",
        payload : [

            ["MyRepo/action1", "arg1, "arg2"],
            [ "Compoz/actions/someThing", "args1" ],
            [ "otherRepo/someThing" ]] 

        ]

    }

Create a file require.json at the root of your repo

Edit it like :

        {
            require : [
                component.jaons 
            ]

        }   

Launch it (see section further)

        
####Make a process
It is exactly the same as making a method but you aggregate methods

####Make a rationale
It is exactly the same as making a method or process but you aggregate process

####Launch an action
Go on your controller file (could be in index.html or a dedicated javascript script you import in the headers)

Create an empty object, like : 

`myObject = {};`

you might put arguments into the object, like : 

`myObject.arg1 = 'myValue'`
`myObject.arg2 = 'myValue2'`

And then you can give the object to the loader and load your action :

    load.action('myRepo/myAction', myObject, ["arg1", "arg2"], function (a) {

        //final code
        console.log(a);

    }

*Note : at the moment a argument array is required, even empty*

*Note 2 : at the moment a callback is required, even doing nothing*

*Note 3 : you receive an object in the callback, see "Concepts" and "Launch an action"*

####Launch a method

*Note : Unlike "actions", "methods" don't accept arguments in the loader. If you try, it'll fail.*

It is exactly the same idea as action
    load.process('myRepo/myMethod....
No arguments

####Launch a process
It is exactly the same idea as method
    load.process('myRepo/myProcess....
No arguments

####Launch a rationale
It is exactly the same idea as method and process
    load.rationale('myRepo/myRat....
No arguments


###Concepts

__DB__ : The object you gave to a loader. It will travel through all the actions/methods/process/rationales in a set. You get it as unique argument on your outgoing callback. If you dont give an object the system fails (currently no dummy object is created).

__next__ : is the following callback that has to be executed in a set of actions. It is an internal functionnality but you need to know it if you make actions (see "Make actions" for details)


###API

> __window["Coffeemaker"]__
>


> *Side Note : load/methods,process,rationales and system/methods,process,rationales works exactly the same and should be merged asap*
>


+ config

+ info

+ documentation : loads the manual

+ tutorial : not available at this point
    
+ logs :
    + network
        + success
        + failures
    + tasks
        + queued
        + success
        + failures
        + ETA : time for the current set of tasks to finish
        + total : total tasks in the current set of tasks
+ core : 

    + load : 
        + engine : used to set or get  nested attributes in the Coffeemaker window object 
        + handle : 
            + activity : simple counter that follows the requests and subrequests. It is used by transmitter to determine the moment it can launch the final callback (next)
            + loaded : used by transmitter to keep track of already loaded packages (and avoir repeated ajax requests)
            + transmitter : used the GET transmission to retrieve package. First it always look at require.json. Then it loops on the first array (required['.']) and download things that are listed (must be in the same folder)
        + invoke : use engine to get things quickly like core methods but, soon, actions, methods (etc) and also HTML components
        + action : load js files that contains vanilla javascript function that aim to do "the little as possible"
        + method : load JSON files that contains sequences of actions that have to be executed in the right order
        + process : load JSON files that contains sequences of methods that have to be executed in the right order
        + rationale : load JSON files that contains sequences of process that have to be executed in the right order

    + system : will be renamed as "build" at a point 
        + exec : function that currently execute all the actions, should execute everything else (todo)
        + action  : use exec to build actions
        + method : use exec and action to build methods
        + process : use exec, action and method to build process
        + rationale : use exec, action, method and process to build rationales

    + transmission
        + ajax
            + GET : GET requests launcher

    + toolchain : JSON2HTML compilation system, is not workable in the current package, will be reimplemented asap

    + ui : used by toolchain, incomplete and not used at this point

    + storage : make objects in memory with setters and getters, but it is never used yet

    + monitor : monitoring area
        + log : 
            + exception : exception handler, sould be moved in fault at a point
            + network : handle the transmission, currently GET
            + task : task manager. Works, but the display of tasks is temporarily broken

    + import : put script on HEAD, but will be deprecated soon

    + fault : error and exception manager
        + error : specific error manager
            + typeError : only handled specific error at the time of writing

###UML

**Todo**







