123abcd123

# Tips

* Always use === when comparing
* auto reload tests: jasmine-node spec/1-function-expression-function-declaration.js --autotest --watch --matchall --color --verbose

# Objects

Names are *always* strings!

Operators do not need brackets when calling for example typeof

Find difference between function and operator in javascript
http://cs.stackexchange.com/questions/6067/what-is-the-difference-between-operator-and-function


Default operator || not logical OR! With boolean types works like logical OR but
otherwise works as default operator and can be used to set defaults for example:
  address = person.address || 'N/A'

Becareful with fasley values as 0 would return the default and not 0.

Guard operator && not logical AND

student && student.address && student.address.postcode

Any nulls or falsey values would short curcit and not cause runtime error otherwise
we'd get the student address postcode if all values existed & are not falsey.

Enumeration - for in - loop through properties in object can loop in any order

## this

### Method invocation
When invoking a method on an object this is set to the object. To discover what
this is simply look to the left of the . so:

student.getname = function() {
  return this.firstname + " " + this.lastName;
}

this === student

### Function invocation
When invoking a function directly this is set to the global window so:

myName()

this === window // global oject

### Gotcha

You can take a method off an object and invoke it as a function and mess up this
for example:

var myName = student.getName();
myName() == "undefined undefined";

this has changed from student to the global window, even though its declared as
a method we're taking it off the object and invoking it as a function.

### Constructor invocation
When calling a constructor with new this is set to the object being returned
and the new object is returned even without a return

If you forget the new when calling the constructor bad things will happen
this will be the global window and undefined will be returned as the object


### Call/Apply invocation

Use these methods to explicity set this!


