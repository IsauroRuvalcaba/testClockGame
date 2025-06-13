# TypeScript vs JavaScript: Side-by-Side Comparison

TypeScript is a superset of JavaScript that adds static typing. Here's how they compare, with the **TypeScript-specific parts highlighted in bold**:

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
let age = 30;            // Inferred as number
let typedAge: number = 30;  // ← TS: Explicit type annotation
// age = "thirty"; // ← TS: Error: Type 'string' is not assignable to type 'number'

// Type annotations (though often unnecessary due to inference)
const name = "John";                               // Inferred as string
const name2: string = "John";                      // ← TS: Explicit type annotation
const isActive: boolean = true;                    // ← TS: Type annotation
const scores: number[] = [85, 90, 78];             // ← TS: Array type annotation
const user: { id: number; name: string } = { id: 1, name: "John" };  // ← TS: Object type annotation
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
function greet(name: string): string {  // ← TS: Parameter and return type annotations
  return `Hello, ${name}!`;
}

greet("John"); // Works fine
// greet(123);    // ← TS: Error: Argument of type 'number' is not assignable to parameter of type 'string'
// greet();       // ← TS: Error: Expected 1 argument, but got 0

// Explicit parameter and return types
function add(a: number, b: number): number {  // ← TS: Parameter and return type annotations
  return a + b;
}

add(5, 3);     // Returns 8
// add("5", "3"); // ← TS: Error: Argument of type 'string' is not assignable to parameter of type 'number'
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
function createUser(
  name: string = "Anonymous",  // ← TS: Type annotation with default value
  age: number = 0,             // ← TS: Type annotation with default value
  isAdmin: boolean = false     // ← TS: Type annotation with default value
) {
  return { name, age, isAdmin };
}

// Type for partial updates with optional properties
interface UserUpdate {         // ← TS: Interface declaration
  name?: string;               // ← TS: Optional property with type
  age?: number;                // ← TS: Optional property with type
}

function updateUser(id: number, userData: UserUpdate) {  // ← TS: Parameter type annotations
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
interface User {              // ← TS: Interface declaration
  id: number;                 // ← TS: Property with type
  name: string;               // ← TS: Property with type
  email: string;              // ← TS: Property with type
}

// Type alias - another way to define types
type UserId = number;         // ← TS: Type alias

function createUser(name: string, email: string): User {  // ← TS: Parameter and return type annotations
  return {
    id: generateId(),
    name,
    email
  };
}

const user = createUser("John", "john@example.com");
// console.log(user.phone); // ← TS: Error: Property 'phone' does not exist on type 'User'
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
function printId(id: string | number) {  // ← TS: Union type annotation
  if (typeof id === "string") {
    // TypeScript knows id is a string in this block (type narrowing)
    console.log(id.toUpperCase());
  } else {
    // TypeScript knows id is a number in this block (type narrowing)
    console.log(id);
  }
}

printId(101);     // 101
printId("202");   // "202"
// printId(true);    // ← TS: Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'
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
const numbers: number[] = [1, 2, 3];                     // ← TS: Array type annotation
const strings: Array<string> = ["one", "two", "three"];  // ← TS: Generic array type
// const mixed: (number | string | boolean | object)[] = [1, "two", true, { four: 4 }];  // ← TS: Union type in array

// Generic function - type safety with flexibility
function getFirstItem<T>(array: T[]): T | undefined {  // ← TS: Generic type parameter, array type, and return type
  return array[0];
}

const first = getFirstItem([1, 2, 3]);         // TypeScript infers return type as number
const firstString = getFirstItem(["a", "b"]);  // TypeScript infers return type as string
const empty = getFirstItem([]);                // TypeScript knows this might be undefined
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
  private age: number;           // ← TS: Private property with type
  public name: string;           // ← TS: Public property with type
  
  constructor(name: string, age: number) {  // ← TS: Parameter type annotations
    this.name = name;
    this.age = age;
  }
  
  private privateMethod(): void {  // ← TS: Private method with return type
    console.log("This is actually private");
  }
  
  public greet(): string {  // ← TS: Public method with return type
    return `Hello, my name is ${this.name} and I am ${this.age} years old`;
  }
}

const person = new Person("John", 30);
console.log(person.name); // "John"
// console.log(person.age); // ← TS: Error: Property 'age' is private
// person.privateMethod(); // ← TS: Error: Property 'privateMethod' is private
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
enum Direction {                // ← TS: Enum declaration
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}

// Or literal union type
type CardinalDirection = "UP" | "DOWN" | "LEFT" | "RIGHT";  // ← TS: Literal union type

function move(direction: Direction): { x: number, y: number } {  // ← TS: Parameter and return type annotations
  switch (direction) {
    case Direction.UP: return { x: 0, y: -1 };
    case Direction.DOWN: return { x: 0, y: 1 };
    case Direction.LEFT: return { x: -1, y: 0 };
    case Direction.RIGHT: return { x: 1, y: 0 };
    default: {
      // TypeScript will warn if not all cases are handled
      const exhaustiveCheck: never = direction;  // ← TS: Exhaustiveness checking with never type
      return { x: 0, y: 0 };
    }
  }
}

move(Direction.UP); // { x: 0, y: -1 }
// move("DIAGONAL"); // ← TS: Error: Argument of type '"DIAGONAL"' is not assignable to parameter of type 'Direction'
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
interface User {          // ← TS: Interface declaration
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number): Promise<User> {  // ← TS: Parameter and Promise return type annotation
  return fetch(`/api/users/${id}`)
    .then(response => response.json());
}

// TypeScript knows the resolved value type
fetchUser(123)
  .then(user => {
    console.log(user.name); // TypeScript knows user has a 'name' property
    // console.log(user.phone); // ← TS: Error: Property 'phone' does not exist on type 'User'
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
const myElement = document.getElementById("app") as HTMLDivElement;  // ← TS: Type assertion

// User-defined type guard
function isArray(obj: any): obj is any[] {  // ← TS: Type predicate for type guard
  return Array.isArray(obj);
}

// Type narrowing with type guard
function getLength(obj: any): number {  // ← TS: Parameter and return type annotations
  if (isArray(obj)) {
    // TypeScript knows obj is an array here
    return obj.length;
  }
  return 0;
}

// More complex type guard
interface Car { make: string; model: string; }      // ← TS: Interface declaration
interface Bicycle { type: string; gears: number; }  // ← TS: Interface declaration

function isCar(vehicle: Car | Bicycle): vehicle is Car {  // ← TS: Type predicate with union type
  return (vehicle as Car).make !== undefined;  // ← TS: Type assertion
}

function printVehicleInfo(vehicle: Car | Bicycle) {  // ← TS: Parameter with union type
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
axios.get<User[]>('/api/users')  // ← TS: Generic type parameter
  .then(response => {
    // TypeScript knows response.data is User[]
    const users = response.data;
    users.forEach(user => console.log(user.name));
  });

// For libraries without built-in types:
// npm install --save-dev @types/library-name  // ← TS: Declaration files from DefinitelyTyped
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
// tsconfig.json provides powerful configuration options  // ← TS: TypeScript-specific config file
{
  "compilerOptions": {                                    // ← TS: Compiler options
    "target": "ES2020",                                   // ← TS: Output JS version
    "module": "ESNext",                                   // ← TS: Module system
    "strict": true,                                       // ← TS: Enable strict type checking
    "esModuleInterop": true,                              // ← TS: Better import compatibility
    "skipLibCheck": true,                               
    "forceConsistentCasingInFileNames": true,            
    "outDir": "./dist",                                   // ← TS: Output directory
    "rootDir": "./src",                                   // ← TS: Source directory
    "declaration": true                                   // ← TS: Generate .d.ts files
  },
  "include": ["src/**/*"],                               // ← TS: Files to include
  "exclude": ["node_modules", "**/*.test.ts"]            // ← TS: Files to exclude
}
```

## TypeScript-Specific Benefits:
- **Static Type Checking**: Catch errors during development instead of at runtime
- **Better Developer Experience**: Autocomplete and IntelliSense based on types
- **Self-Documenting Code**: Types act as built-in documentation
- **Safer Refactoring**: Types help ensure changes don't break existing code
- **Enhanced Code Readability**: Types make code intent clearer
