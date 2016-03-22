function test () {


    this.require = [];


    this.helloWorld = function (db, out, next) {

        console.log('hello world');
        db[out] = 'Hello World !';
        next(db);

    };

    this.makeTextElement = function (db, out, next) {

        var html = document.createElement('p');
        html.style.setProperty('padding','10%');
        html.style.setProperty('margin-bottom','10px');
        html.style.setProperty('background-color','#F5F5F5');
        db[out] = html;
        next(db);

    };

    this.displayString = function (db, input, HTMLelement, target, next) {

        db[HTMLelement].innerHTML = db[input];
        db[target].appendChild(db[HTMLelement]);
        next(db);

    };

    this.sayHello = function (db, name, next) {

        console.log('hello '+db[name]);
        next(db);

    };

    this.askMyName = function(db, name, next) {

            db[name] = window.prompt('What is your name?', 'Walter');
            next(db);

    };

    this.setMyIdentity = function(db, name, lastname, age, profession, next) {

            console.log('ok, '+db[name]+' tell me more about you!');
            db[lastname] = window.prompt('What is your last name?', 'White');
            db[age] = window.prompt('How old are you?', '50');
            db[profession] = window.prompt('What is yout profession?', 'Chimist');
            next();

    };

    this.displayIdentity = function(db, name, lastname, age, profession, HTMLelement, next) {

        var element = document.createElement('div');

        var ename = document.createElement('p');
        var elastname = document.createElement('p');
        var eage = document.createElement('p');
        var eprofession = document.createElement('p');

        ename.innerHTML = 'Name : '+db[name];
        elastname.innerHTML = 'LastName : '+db[lastname];
        eage.innerHTML = 'Age : '+db[age];
        eprofession.innerHTML = 'Profession : '+db[profession];

        element.appendChild(ename);
        element.appendChild(elastname);
        element.appendChild(eage);
        element.appendChild(eprofession);

        var verif = document.createElement('form');
        var submit = document.createElement('button');

        verif.appendChild(submit);
        element.appendChild(verif);

        HTMLelement = document.body; //hooked for test
        HTMLelement.appendChild(element);

        next();

        
    },

    this.askNum = function(next) {

        var result = window.prompt('Give me a value');
        next(parseInt(result,10));
    };

    this.isValid = function(expression, isNumber, symbol, expression2, isNumber2, next) {

        if (isNumber === true ) expression = parseInt(expression,10); 
        if (isNumber2 === true ) expression2 = parseInt(expression,10); 

        var result;
        switch (symbol) {

            case '===' :
                result = (expression === expression2) ? true : false;
            break;

            case '==' :
                result = (expression == expression2) ? true : false;
            break;

            case '>' :
                result = (expression > expression2) ? true : false;
            break;

            case '<' :
                result = (expression < expression2) ? true : false;
            break;

            case '>=' :
                result = (expression >= expression2) ? true : false;
            break;

            case '<=' :
                result = (expression <= expression2) ? true : false;
            break;

            default:
            break;

        }
            next(result);
    };

    this.addition = function(db, list, total, next) {

        var load = Coffeemaker.core.load;
        load.invoke('core/utilities', function(utils) {

        list = db[list];

            var count = 0;
            utils.loop.array(list, function(a,b,c,endLoop) {

                count += b;
                if (endLoop === true) {
                    db[total] = count;
                    next(db);
                }

            });

        });

    };

    this.substraction = function(first, second, next) {

        var result = first - second;
        next(result);

    };

    this.requireTest = function(utils, next) {

        var result = utils.check.isArray(thing);
        next(result);
        
    };

    this.pass = function(name, next) {

            next(name);

    };



}
