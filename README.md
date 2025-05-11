# What are iterators, iterables, and generators
## Quick summary
- Iterator - an object with the next property which is a function which returns `{ value: T, done: boolean }`. Get next value by calling `.next()`
- Iterable - objects with have implemented the \[Symbol.iterator\]() method which returns iterator. Use for-loop to iterate over the values.
- Generator - a function which yields a single value each time it is called. It is an abstraction over iterable & iterator. You only specify the return values by defining yield <value>; yield <value2>; (even multiple times), \[Symbol.iterator\]() and next() methods are implemented automatically. Basic syntax `function* generateLines() { yield 'line1' }`

## ChatGPT convo
[Generator vs Iterator](https://chatgpt.com/share/6820bcb4-62f4-800c-8a5f-b709dd1f029c)

## How to iterate an iterable object
- the object needs to have \[Symbol.iterator\]() method (iterator method) and return an object with next property which is a function that returns `{ value: T, done: boolean }`
- or the object needs to have *\[Symbol.iterator\]() method (generator method) and return values using yield keyword - yield 1; yield 2; yield 3;

# Generators
- return iterators (meaning the object with next property which is a function returning `{ value: T, done: boolean }`)
- you can call the next value by calling the `.next()` function 
- you can iterate them with a for-loop immediately - it returns the value
- all you have to say is yield and what value it should return, you can yield multiple values yield 1; yield 2; yield 3;