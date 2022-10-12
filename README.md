# Assignment 2

This is my documentation for Assignment 2 for Software Frameworks.

## Git

The git repository contains the project along with a README file containing instructions on how to run it. Below is a link to access the repository as it has been set to public for easy access.
Link: https://github.com/NotoriousBDN/SFAssignment2.git

### Version Control

During the development after every function or quality of life improvement was successfully implemented, I would commit the work to git. This was so that work was being frequently saved as well in case something needs to be reverted to have clear markers on where the project should be restored.

## Data Structures

Initially I had two JSON files from the first part of the assignment. I used the same schema they used but add them to two different databases using mongoDB. Because of this all previous functions that used JSON have been rewritten to now use mongoDB. 
<br>
It was setup as a database called ‘users’: this contains two collections, ‘users’ and ‘groups’.
The ‘users’ collection contains a user’s id, username, email role and password. Unlike the previous assignment, I included a password as user authentication is one of the requirements for the task.
The ‘groups’ collection contains the group name, an array of all rooms and an array of all users.
There is no relationship between the two databases.

## REST API

This are the same methods as part 1 but they have been changed from read and writing to a JSON file to instead use mongoDB.


### User Authenticate

Description: Will check if the username exists, if it does they will be logged in.
Route: getUser
Method: POST
Parameters: username: string, password: string
Return value: if works: {id: number, username: string, email: string, role: number, ok: true}
If it failed: {“ok”: false}
Technical Explanation: Route receives both the username and password. Will search the ‘users’ collections for an entry where the username and password match. If it is successful it will return the user’s information along with ‘ok’: true, if not ‘ok’:false.
