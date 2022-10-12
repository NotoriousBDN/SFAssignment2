# Assignment 2

This is my documentation for Assignment 2 for Software Frameworks.

## Git

The git repository contains the project along with a README file containing instructions on how to run it. Below is a link to access the repository as it has been set to public for easy access.
Link: https://github.com/NotoriousBDN/SFAssignment2.git

### Version Control

During the development after every function or quality of life improvement was successfully implemented, I would commit the work to git. This was so that work was being frequently saved as well in case something needs to be reverted to have clear markers on where the project should be restored.

## Data Structures

Initially I had two JSON files from the first part of the assignment. I used the same schema they used but add them to two different databases using mongoDB. Because of this all previous functions that used JSON have been rewritten to now use mongoDB. 
It was setup as a database called ‘users’: this contains two collections, ‘users’ and ‘groups’.
The ‘users’ collection contains a user’s id, username, email role and password. Unlike the previous assignment, I included a password as user authentication is one of the requirements for the task.
The ‘groups’ collection contains the group name, an array of all rooms and an array of all users.
There is no relationship between the two databases.

## REST API

This are the same methods as part 1 but they have been changed from read and writing to a JSON file to instead use mongoDB.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
