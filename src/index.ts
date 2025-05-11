// Iterator
// iterator - an object that returns a next() method and implements the logic and holds the state of the iteration
// the function next() returns an iterator
// The object is NOT iterable because it does not have a [Symbol.iterator]() method
class MyIterator {
    private i = 0;
    private limit = 10;
    public next(): IteratorResult<number> {
        const current = this.i;
        this.i++

        if (current < this.limit) {
            return {
                value: current,
                done: false
            }
        }
        return {
            value: this.limit,
            done: true
        }
    }
}

const myIterator = new MyIterator();

let result: IteratorResult<number>
do {
    result = myIterator.next();
    console.log(result.value);
} while (!result.done);

// Iterable and Iterator
// Iterable - an object that has a [Symbol.iterator]() method
// to make the class iterable, we need to implement the @@iterator method
class MyIterableWithIterator {
    private array: number[] = []
    private limit;
    private pointer = 0;

    constructor(startRange: number, endRange: number, step: number, limit = 10) {
        this.array = [];
        for (let i = startRange; i < endRange; i += step) {
            this.array.push(i);
        }
        this.limit = limit;
    }
    
    [Symbol.iterator]() {
        // Return an iterator object with a bound next method
        return {
            next: this.next.bind(this)
        };
    }

    next() {
        const currentPointer = this.pointer;
        this.pointer++;
        return { value: this.array[currentPointer], done: this.pointer >= this.array.length || this.array[currentPointer] > this.limit };
    }
}

const myIterableWithIterator = new MyIterableWithIterator(-10, 20, 2);
console.log(`=======myIterableWithIterator[Symbol.iterator]()============`);
for (const value of myIterableWithIterator) {
    console.log(value);
}

class MyIterableWithGenerator {
    private array: number[] = [];
    private limit: number;
    constructor(startRange: number, endRange: number, step: number, limit = 10) {
        for (let i = startRange; i < endRange; i += step) {
            this.array.push(i);
        }
        this.limit = limit;
    }

    *[Symbol.iterator]() {
        for (const value of this.array) {
            if (value > this.limit) {
                return;
            }
            yield value;
        }
    }
}

const myIterableWithGenerator = new MyIterableWithGenerator(1, 5, 1);
console.log(`=======myIterableWithGenerator[Symbol.iterator]()============`);
for (const value of myIterableWithGenerator) {
    console.log(value);
}

const myIterableWithGenerator2 = new MyIterableWithGenerator(1, 5, 1, 3);
console.log(`=======myIterableWithGenerator2[Symbol.iterator]()============`);
for (const value of myIterableWithGenerator2) {
    console.log(value);
}

const mySimpleIterable: Iterable<number> = {
    *[Symbol.iterator]() {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const limit = 7;
        for (const value of array) {
            if (value > limit) {
                return;
            }
            yield value;
        }
    }
}

console.log(`=======mySimpleIterable*[Symbol.iterator]()============`);
for (const value of mySimpleIterable) {
    console.log(value);
}

// Generator - a function that returns an iterator
// No need to implement [Symbol.iterator]() method, nor the next() method
console.log(`=======myGenerator============`);
function* myGenerator() {
    yield 1; // you just specify the value and the function will return an iterator
    yield 2;
    yield 3;
}

const gen = myGenerator();
console.log(gen.next()); // returns { value: 1, done: false }

for (const value of gen) {
    console.log(value); // returns only the values (not the done property), returns 1, 2, 3
}