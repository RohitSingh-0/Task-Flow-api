# Development Journal

## Session 1 - Project Initialization & TypeScript Fundamentals

# Objective

Today I did not start writing backend code
Instead, I focused on understanding how a Node.js + TypeScript project is initialized and why each step is necessary before development begins
The goal was to understand the reasoning behind the setup rather than memorizing commands

# Questions I Asked

## 1. Why do we need `npm init -y`?

### My Initial Understanding

I knew that it creates a `package.json` file, but I did not understand why it is required before installing packages.

### What I Learned

`package.json` is the configuration file for npm.

It stores:

* Project metadata
* Project version
* Scripts
* Dependencies
* Development dependencies

When packages are installed, npm records them inside `package.json`
Without this file, npm would not know how to manage the project properly

## 2. What happens when I install Express?

### My Initial Understanding

I knew that Express gets installed but I was not sure where the information is stored.

### What I Learned

When I run:

`npm install express`

Two things happen:

1. The Express source code is downloaded into the `node_modules` folder.
2. Express is recorded inside `package.json` under `dependencies`.

This allows any developer to clone the project and install all required packages simply by running:

`npm install`

## 3. Why do we need `tsconfig.json`?

### My Initial Understanding

I knew that TypeScript requires configuration, but I did not understand what exactly it configures.

### What I Learned

`tsconfig.json` tells the TypeScript compiler how to compile the project.

It contains settings such as:

* Source directory
* Output directory
* JavaScript target version
* Module system
* Strict mode

Without this file, TypeScript would not know how the project should be compiled.

## 4. Why do we keep `src` and `dist` separate?

### My Initial Understanding

I thought the separation simply keeps the project organized.

### What I Learned

`src` contains the original TypeScript source code
`dist` contains the compiled JavaScript code
Keeping them separate makes the project cleaner and easier to maintain
The production server executes JavaScript files from `dist`, not TypeScript files from `src`.

## 5. Why do we have both `package.json` and `tsconfig.json`?

### My Initial Understanding

I thought both files were configuration files, but I was confused about why two separate files were needed.

### What I Learned

Each tool has its own responsibility.

`package.json`

Responsible for npm.

Stores:

* Dependencies
* Scripts
* Project information
* Version

`tsconfig.json`

Responsible for the TypeScript compiler.

Stores:

* Compiler configuration
* Output directory
* Target JavaScript version
* TypeScript rules

This follows the software engineering principle of **Separation of Concerns**.

Each tool manages only its own configuration.

# Dependencies vs DevDependencies

This was the biggest concept I learned today.

## DevDependencies

Packages that are only required while developing the application.

Examples:

* TypeScript
* Nodemon
* Concurrently
* @types/node
* @types/express

Reason:

These packages help developers write and build the project but are not needed when the compiled JavaScript application runs.

## Dependencies

Packages that the application needs while running.

Examples:

* Express
* Dotenv
* Mongoose
* bcrypt
* jsonwebtoken

Reason:

Without these packages, the application cannot function in production.

# Mistakes I Made

## Mistake 1

I thought Express should be installed as a devDependency.

### Correction

Express is required while the application is running
Therefore, it is a dependency.

## Mistake 2

I confused dependencies with devDependencies.

### Correction

The correct way to think is:
If the application needs the package at runtime → Dependency
If only the developer needs the package during development → DevDependency

## Mistake 3

I assumed TypeScript automatically knows where to place compiled files.

### Correction

The output directory is configured inside `tsconfig.json`
TypeScript simply follows the configuration provided by the developer

# Engineering Principles I Learned

* Understand the purpose before running a command
* Build the project one milestone at a time
* Keep configuration files focused on one responsibility.
* Separate source code from compiled code
* Install packages based on whether they are needed during development or runtime
* Ask "Why?" before asking "Which command?"

# Today's Milestone

Completed:

* GitHub repository created
* Initial project planning completed
* README created
* Node project initialized.
* Understood the purpose of `package.json`.
* Understood the purpose of `tsconfig.json`.
* Learned the difference between dependencies and devDependencies

No backend code was written today
The focus was entirely on understanding the project setup.

# Next Session Goal

* Install TypeScript packages
* Generate `tsconfig.json`
* Understand every important TypeScript configuration
* Create the initial `src` structure
* Prepare the project for the Express server
