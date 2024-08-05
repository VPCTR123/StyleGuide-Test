Helllooo! Here is where I will list relevant changes until proper documentation exists.


7/29/24
Menu class will be merged with card class since they basically do the same thing and have the same sizes.

relevant classes:
card 
car-(size)  
    same as menu sizes
car-shadow
    adds drop shadow on card like menus had
car-border
    adds border to cards like how they used to look


























































thesis regarding multilayer components:
outline:
a component that may be labeled as primary or secondary that has
several layers of divs ideally would be labeled once at the top
level of its primary / secondary / etc state.
problem:
css does not have a "any child" selector that would not also
be overridden by higher level parents using that same property.

visualization:

card primary
    input wrapper secondary
        text  element
        input element 
        error message element
    end
end

ideally this is the only level of identifiers you would need,
however, the input would not appear as secondary but primary because
the element tag would be targeted by the primary card as it has
higher priority.

using direct child combinator ">" would nearly work, however in
cases with wrappers, the combinator becomes obsolete.

example:

card primary
    input wrapper secondary
        text  element
        flex div
            input element 
            icon element
        end
        error message element
    end
end

Therefor, the best solution is to identify each element with its color
state individually.

example:

card primary
    input wrapper secondary
        text  element
        flex div secondary
            input secondary 
            icon element
        end
        error message element
    end
end

This can be handled easily with angular by injecting the theme once 
at the top level and spreading it using a variable.

example

radio button component - var:primary 

html

radio-button var:primary 
    card section var:primary 
        radio button var:primary 
        radio button var:primary 
    end
end

