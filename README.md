# Tunnel.js

# Motivations
Here in Plasticpanda we design and develop web applications. Sometimes we use frameworks like React, Angular or Polymer.js but for small applications the required boilerplate code is simply too much. Frameworks offer some usefull mechanisms like Two Way Binding. The purpose of Tunnel.js is to offer a simple interface that allows developer to create two ways bindings between DOM elements and Javascript variables.


# Usage
Simply add Observe.js and Tunnel.js to your project
```Html
<script type="text/javascript" src="path/to/observe.js"></script>
<script type="text/javascript" src="path/to/tunnel.js"></script>
```
AMD support will come soon!


# Variables
Tunnel.js uses tunnels-variables. Developers can instance these variables in the following way:
```Javascript
var stringVar = tunnel.var('string');
var intVar = tunnel.var(1);
var floatVar = tunnel.var(1.2);
```

These variables support operators like any other javascript variable:
```Javascript
console.log(intVar + intVar); //2
console.log(stringVar + intVar); // 'string2'
```

moreover developers can obtain the value using the value property
```Javascript
console.log(stringVar.value); // 'string'
```

# Bindings
At the current stage tunnel.js supports the following DOM elements: input text (or text like: number, email...), textarea, checkboxes and radios

## textInputBinding
This method allows to bind a variable to the value of an input-text (or text-like) or textarea

```Javascript
tunnel.textInputBinding(textInputSelector, variable, callBkFn)
```
Parameters:
* **textInputSelector**: a css selector
* **variable**: a tunnel.js variable
* **callBkFn(optional)**: an optional function that is called every time the value changes

### Usage
```Javascript
var varText = tunnel.var('initial text');
tunnel.textInputBindingAll('.inputText', varText);
```

### Note
While ```textInputBinding``` binds the variable with the very first element retrieved using the textInputSelector, ```textInputBindingAll``` binds the variable with every item retrieved using the selector. Behind the scenes ```textInputBinding``` uses the ```document.querySelector``` method, while ```textInputBindingAll``` uses ```document.querySelectorAll```



## checkboxBinding
This method allows to bind a variable to a set of checkboxes

```Javascript
tunnel.checkboxBinding(checkboxName, variable, callBkFn)
```
Parameters:

* **checkboxName**: the name of the checkboxes
* **variable**: a tunnel.js variable
* **callBkFn(optional)**: an optional function that is called every time the value changes

### Usage
```Javascript
var varChecks = tunnel.var();
tunnel.checkboxBinding('check', varChecks);
```

### Note
* if the passed tunnel.js variable contains an object-like value the method will merge the old content with the items that are connected to checkboxes otherwise the variable will be erased.

* Suppose that we have four checkboxes with the following values: o,t,tr,fo (o and t are checked). The variable will contain an object with four entries: 
```json
{
    "o":true,
    "t":true,
    "tr":false,
    "fo":false
}
```

## radioBinding
This method allows to bind a variable to a set of radios

```Javascript
tunnel.radioBinding(radioName, variable, callBkFn)
```
Parameters:

* **radioName**: the name of the radio
* **variable**: a tunnel.js variable
* **callBkFn(optional)**: an optional function that is called every time the value changes

### Note
* if the passed tunnel.js variable contains an object-like value the method will merge the old content with the items that are connected to radios otherwise the variable will be erased.

* Suppose that we have four radios with the following values: o,t,tr,fo (o is checked). The variable will contain an object with four entries: 
```json
{
    "o":true,
    "t":false,
    "tr":false,
    "fo":false
}
```

### Usage
```Javascript
var varRadios = tunnel.var();
tunnel.radioBinding('radio', varRadios);
```


## domBinding
This method allows to bind a variable to the value (innerHTML) of a DOM element. The connectio is one-way.

```Javascript
tunnel.domBinding(domSelector, variable, transformFn, callBkFn)
```
Parameters:

* **domSelector**: a css selector
* **variable**: a tunnel.js variable
* **transformFn(optional)**: an optional function that is called every tunnel.js updates the DOM element. It is used to transform the variable content in something else
* **callBkFn(optional)**: an optional function that is called every time the value changes

### Usage
```Javascript
var users
  , source = ".." // a valid handlebars template
  , template = Handlebars.compile(source)
  ;
  
users = tunnel.var([
    {
      'username': 'myUser',
      'first_name': 'my',
      'last_name': 'user'
    }
]);  
  
tunnel.domBinding('#usersList', users, function(users) {
   return template(users);
});
```



# Behind the scenes
Tunnel.js uses DOM events and the [Polymer Observe.js library](https://raw.github.com/Polymer/observe-js)



# Todo
* test! (maybe with a framework that automates tests across different browsers)
* AMD Support
