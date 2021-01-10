
# Discount Coupon Microservice API

#### Discount Coupon Microservice by Rafael Bordignon written in Typescript

##### - Presentation Layer
```
The Presentation layer are includes as "Activitys", "Fragments".
They are a "Protocols", "Helpers", "Eerror handling", "Controllers" and others.
The Presentation Layer will communicate with its "Controllers" and thus, a "Controllers" will communicate with a domain layer for certain actions to be performed.
A "Controller" will never communicate directly with a data layer.
```
##### - Domain Layer
```
The Domain layer must contain all the use cases of the application.
The use cases aim to be mediators between their “Controllers” and “Repositorys”.
If necessary to add new functionality, all you have to do is add a new use case and all its code have beean decoupled from the other use cases. The creation of a new use case is precisely to avoid that when adding new feature the code dont breaks.
```
##### - Data Layer
```
The data layer must contain your entire business rule(Services). Abstracting it from all the code.
The creation of a new use case is precisely to avoid that when adding new feature the code dont breaks.
```
##### - Infra Layer
```
The Infra layer  must contain all functions and methods for manage data base. 
They are includs "Helpers", "Error Logs", "Methods", "Functions(Update,delete and creat)"  this is all for reposytories manage
```

##### - Main Layer
```
The main layer is the only layer that covers the entire code. The Main is responsible for link all  implements and functions. Inside the Main we have the: 

## Adapters 
To adjust the routes received by the express for example.

## Config
Where you can configure the app and env ports, middleware and the route generator.

## Decorator
Where we handle errors by logging them into the database.

## Factories
Here we have all the functions, classes and methods to execute our code.

## Middlewares
Here we can create our middleware to use on routes.

## Routes
As the name says here we create all the routes that we will use.

## Server
Here we start and configure our app.
```
##### - Utils Layer
```
The Utils layer, as the name implies, is a utility layer. In it include all the methods or functions that we can use in more than one place in the code (These methods are used for only one function). Examples: Validators, Authenticators,
Slugs among others.
```
