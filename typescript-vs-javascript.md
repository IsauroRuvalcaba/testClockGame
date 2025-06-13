# TypeScript vs JavaScript: Side-by-Side Comparison

TypeScript is a superset of JavaScript that adds static typing. Here's how they compare:

## 1. Basic Variable Declaration

**JavaScript:**
```javascript
// Variables can hold any type
let age = 30;
age = "thirty"; // No error, JavaScript allows type switching

// No explicit type annotations
const name = "John";
const isActive = true;
const scores = [85, 90, 78];
const user = { id: 1, name: "John" };
```

**TypeScript:**
```typescript
// Variables with explicit types
let age: number = 30;
// age = "thirty"; // Error: Type 'string' is not assignable to type 'number'

// Type annotations (though often unnecessary due to inference)
const name: string = "John";
const isActive: boolean = true;
const scores: number[] = [85, 90, 78];
const user: { id: number; name: string } = { id: 1, name: "John" };
```

## 2. Functions with Parameters

**JavaScript:**
```javascript
// No parameter type checking
function greet(name) {
  return `Hello, ${name}!`;
}

greet("John"); // Works fine
greet(123);    // Also works, but might cause issues later
greet();       // Works, but name will be undefined

// No return type checking
function add(a, b) {
  return a + b;
}

add(5, 3);     // Returns 8
add("5", "3"); // Returns "53" (string concatenation)
```

**TypeScript:**
```typescript
// Type-checked parameters and return type
function greet(name: string): string {
  return `Hello, ${name}!`;
}

greet("John"); // Works fine
// greet(123);    // Error: Argument of type 'number' is not assignable to parameter of type 'string'
// greet();       // Error: Expected 1 argument, but got 0

// Explicit parameter and return types
function add(a: number, b: number): number {
  return a + b;
}

add(5, 3);     // Returns 8
// add("5", "3"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

## 3. Optional Parameters and Default Values

**JavaScript:**
```javascript
// Default parameters
function createUser(name, age, isAdmin) {
  return {
    name: name || "Anonymous",
    age: age || 0,
    isAdmin: isAdmin || false
  };
}

// Have to check for undefined values manually
function updateUser(id, userData) {
  const user = getUser(id);
  
  if (userData.name !== undefined) user.name = userData.name;
  if (userData.age !== undefined) user.age = userData.age;
  
  return user;
}
```

**TypeScript:**
```typescript
// Optional parameters (?) and default values
function createUser(name: string = "Anonymous", age: number = 0, isAdmin: boolean = false) {
  return {
    name,
    age,
    isAdmin
  };
}

// Type for partial updates with optional properties
interface UserUpdate {
  name?: string;
  age?: number;
}

function updateUser(id: number, userData: UserUpdate) {
  const user = getUser(id);
  
  // TypeScript knows these properties might be undefined
  if (userData.name !== undefined) user.name = userData.name;
  if (userData.age !== undefined) user.age = userData.age;
  
  return user;
}
```

## 4. Custom Types and Interfaces

**JavaScript:**
```javascript
// No built-in way to define custom types
// Have to rely on JSDoc comments for documentation
/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 */

/**
 * Creates a user
 * @param {string} name
 * @param {string} email
 * @returns {User}
 */
function createUser(name, email) {
  return {
    id: generateId(),
    name: name,
    email: email
  };
}

// No enforcement of property access
const user = createUser("John", "john@example.com");
console.log(user.phone); // undefined, no warning
```

**TypeScript:**
```typescript
// Interface defines a contract for object shapes
interface User {
  id: number;
  name: string;
  email: string;
}

// Type alias - another way to define types
type UserId = number;

function createUser(name: string, email: string): User {
  return {
    id: generateId(),
    name,
    email
  };
}

const user = createUser("John", "john@example.com");
// console.log(user.phone); // Error: Property 'phone' does not exist on type 'User'
```

## 5. Unions and Type Narrowing

**JavaScript:**
```javascript
// No way to express "either type A or type B"
function printId(id) {
  // Have to check types at runtime
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

printId(101);     // 101
printId("202");   // "202"
printId(true);    // true (might be unintended)
```

**TypeScript:**
```typescript
// Union type with |
function printId(id: string | number) {
  if (typeof id === "string") {
    // TypeScript knows id is a string in this block
    console.log(id.toUpperCase());
  } else {
    // TypeScript knows id is a number in this block
    console.log(id);
  }
}

printId(101);     // 101
printId("202");   // "202"
// printId(true);    // Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'
```

## 6. Arrays and Generics

**JavaScript:**
```javascript
// Arrays can mix any types
const mixed = [1, "two", true, { four: 4 }];

// No way to ensure array operations are type-safe
function getFirstItem(array) {
  return array[0];
}

const first = getFirstItem([1, 2, 3]); // 1
const empty = getFirstItem([]); // undefined, no warning
```

**TypeScript:**
```typescript
// Typed arrays
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ["one", "two", "three"];
// const mixed: (number | string | boolean | object)[] = [1, "two", true, { four: 4 }];

// Generic function - type safety with flexibility
function getFirstItem<T>(array: T[]): T | undefined {
  return array[0];
}

const first = getFirstItem([1, 2, 3]); // TypeScript infers return type as number
const firstString = getFirstItem(["a", "b", "c"]); // TypeScript infers return type as string
const empty = getFirstItem([]); // TypeScript knows this might be undefined
```

## 7. Classes and Access Modifiers

**JavaScript:**
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // No native way to make properties/methods private
  _privateMethod() {
    console.log("This is supposed to be private");
  }
  
  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

const person = new Person("John", 30);
console.log(person.name); // "John"
person._privateMethod(); // Works, even though by convention it shouldn't be called
```

**TypeScript:**
```typescript
class Person {
  // Access modifiers: public, private, protected
  private age: number;
  public name: string;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  private privateMethod(): void {
    console.log("This is actually private");
  }
  
  public greet(): string {
    return `Hello, my name is ${this.name} and I am ${this.age} years old`;
  }
}

const person = new Person("John", 30);
console.log(person.name); // "John"
// console.log(person.age); // Error: Property 'age' is private
// person.privateMethod(); // Error: Property 'privateMethod' is private
```

## 8. Enums and Literal Types

**JavaScript:**
```javascript
// Objects as pseudo-enums
const Direction = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
};

function move(direction) {
  switch (direction) {
    case Direction.UP: return { x: 0, y: -1 };
    case Direction.DOWN: return { x: 0, y: 1 };
    case Direction.LEFT: return { x: -1, y: 0 };
    case Direction.RIGHT: return { x: 1, y: 0 };
    default: return { x: 0, y: 0 };
  }
}

move(Direction.UP); // { x: 0, y: -1 }
move("DIAGONAL"); // { x: 0, y: 0 } - no type checking
```

**TypeScript:**
```typescript
// Enum type
enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}

// Or literal union type
type CardinalDirection = "UP" | "DOWN" | "LEFT" | "RIGHT";

function move(direction: Direction): { x: number, y: number } {
  switch (direction) {
    case Direction.UP: return { x: 0, y: -1 };
    case Direction.DOWN: return { x: 0, y: 1 };
    case Direction.LEFT: return { x: -1, y: 0 };
    case Direction.RIGHT: return { x: 1, y: 0 };
    default: {
      // TypeScript will warn if not all cases are handled
      const exhaustiveCheck: never = direction;
      return { x: 0, y: 0 };
    }
  }
}

move(Direction.UP); // { x: 0, y: -1 }
// move("DIAGONAL"); // Error: Argument of type '"DIAGONAL"' is not assignable to parameter of type 'Direction'
```

## 9. Async Functions and Promises

**JavaScript:**
```javascript
// Promises with no type information
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json());
}

// No way to know what properties the user has
fetchUser(123)
  .then(user => {
    console.log(user.name); // Might not exist
  });
```

**TypeScript:**
```typescript
// Typed Promise response
interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`)
    .then(response => response.json());
}

// TypeScript knows the resolved value type
fetchUser(123)
  .then(user => {
    console.log(user.name); // TypeScript knows user has a 'name' property
    // console.log(user.phone); // Error: Property 'phone' does not exist on type 'User'
  });
```

## 10. Type Assertions and Type Guards

**JavaScript:**
```javascript
// No way to tell the compiler about types
function getLength(obj) {
  // Have to check at runtime
  if (obj && typeof obj === "object" && "length" in obj) {
    return obj.length;
  }
  return 0;
}

getLength([1, 2, 3]); // 3
getLength("string");  // Might error, as strings have length too
getLength({});        // 0
```

**TypeScript:**
```typescript
// Type assertion (telling TypeScript what the type is)
const myElement = document.getElementById("app") as HTMLDivElement;

// User-defined type guard
function isArray(obj: any): obj is any[] {
  return Array.isArray(obj);
}

// Type narrowing with type guard
function getLength(obj: any): number {
  if (isArray(obj)) {
    // TypeScript knows obj is an array here
    return obj.length;
  }
  return 0;
}

// More complex type guard
interface Car { make: string; model: string; }
interface Bicycle { type: string; gears: number; }

function isCar(vehicle: Car | Bicycle): vehicle is Car {
  return (vehicle as Car).make !== undefined;
}

function printVehicleInfo(vehicle: Car | Bicycle) {
  if (isCar(vehicle)) {
    // TypeScript knows vehicle is a Car here
    console.log(`Car: ${vehicle.make} ${vehicle.model}`);
  } else {
    // TypeScript knows vehicle is a Bicycle here
    console.log(`Bicycle: ${vehicle.type} with ${vehicle.gears} gears`);
  }
}
```

## 11. Working with External Libraries and Declaration Files

**JavaScript:**
```javascript
// No way to know what properties a library provides
import axios from 'axios';

// Have to read documentation or guess
axios.get('/api/data')
  .then(response => {
    // What's in response? We don't know for sure
    console.log(response.data);
  });
```

**TypeScript:**
```typescript
// Type definitions provide code completion and validation
import axios from 'axios';

// TypeScript knows the structure of AxiosResponse
axios.get<User[]>('/api/users')
  .then(response => {
    // TypeScript knows response.data is User[]
    const users = response.data;
    users.forEach(user => console.log(user.name));
  });

// For libraries without built-in types:
// npm install --save-dev @types/library-name
```

## 12. Configuration and Project Setup

**JavaScript:**
```javascript
// Just use Node.js or a bundler directly
// No standard configuration for type checking

// Use ESLint for linting
// .eslintrc.js
module.exports = {
  "rules": {
    "no-undef": "error",
    "no-unused-vars": "warn"
  }
};
```

**TypeScript:**
```typescript
// tsconfig.json provides powerful configuration options
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

TypeScript brings many benefits that JavaScript doesn't have:
- Catch errors during development instead of at runtime
- Better developer experience with autocomplete and IntelliSense
- Self-documenting code with types
- Safer refactoring
- Enhanced code readability
