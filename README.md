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
<br>
The ‘users’ collection contains a user’s id, username, email role and password. Unlike the previous assignment, I included a password as user authentication is one of the requirements for the task.
<br>
The ‘groups’ collection contains the group name, an array of all rooms and an array of all users.
<br>
There is no relationship between the two databases.

## REST API

This are the same methods as part 1 but they have been changed from read and writing to a JSON file to instead use mongoDB.


### User Authenticate

Description: Will check if the username exists, if it does they will be logged in.
<br>
Route: getUser
<br>
Method: POST
<br>
Parameters: username: string, password: string
<br>
Return value: if works: {id: number, username: string, email: string, role: number, ok: true}
<br>
If it failed: {“ok”: false}
<br>
Technical Explanation: Route receives both the username and password. Will search the ‘users’ collections for an entry where the username and password match. If it is successful it will return the user’s information along with ‘ok’: true, if not ‘ok’:false.

### Get User Groups

Description: Will retrieve all groups and rooms a user is in
<br>
Route: getGroup
<br>
Method: POST
<br>
Parameters: username: string
<br>
Return Value: if works: {group: string, rooms: array, userList: array}
<br>
It if failed: []
<br>
Technical Explanation: Uses the successfully checked username to see what groups they are in. Will list all groups and their associated rooms that the user is in. This done through the mongoDB find command.

### Create a User

Description: Will create a user
<br>
Route: createUser
<br>
Method: POST
<br>
Parameters: {username: string, id: number, email: string, role: number, password: string}
<br>
Return Value: If it works: {“ok”: true}
<br>
If it failed: {“ok”: false}
<br>
Technical Explanation: Will create a user with the provided values. Will not work if username or id are already taken, or the role is greater than the user generating the request. Will insert the successfully created user into the ‘users’ collection.

### Update a User

Description: Will delete a user
<br>
Route: deleteUser
<br>
Method: POST
<br>
Parameters: {username: string}
<br>
Return Value: If it works: {“ok”: true}
<br>
If it failed: {“ok”: false}
<br>
Technical Explanation: Will find a user with the same value as the string and using the username as a query delete their entry from the ‘users’ collection.

### Delete a User

Description: Will delete a user
<br>
Route: deleteUser
<br>
Method: POST
<br>
Parameters: {username: string}
<br>
Return Value: If it works: {“ok”: true}
<br>
If it failed: {“ok”: false}
<br>
Technical Explanation: Will find a user with the same value as the string and using the username as a query delete their entry from the ‘users’ collection.

### Create a Group

Description: Creates a new group
<br>
Route: createGroup
<br>
Method: POST
<br>
Parameters: {groupname: string}
<br>
Return Value: If it works: {groupname: string}
<br>
If it failed: {“ok”: failed}
<br>
Technical Explanation: Will check if the group name is taken, if not will insert into the ‘groups’ collections along with an empty array for rooms and userList.

### Create a Room
Description: Create a new room
<br>
Route: createRoom
<br>
Method: POST
<br>
Parameters: {groupname: string, rommname: string}
<br>
Return Value: It worked: {“roomAdded”: true}
<br>
If it failed: {“emptyField”: true}
<br>
Technical Explanation: Will check if a group exists with that name. Will check that the room name is not already taken. If not will append a new room to the room list for the given group. Will update the rooms value with the new array in the ‘groups’ collection.

### Add a User to Group
Description: Add a user to a group
<br>
Route: addUserGroup
<br>
Method: POST
<br>
Parameters: {groupname: string, username: string}
<br>
Return Value: If it worked: {“userAdded”: true}
<br>
If it failed: {“emptyField”: true}
<br>
Technical Explanation: Will use the groupname to check if the group exists. If it does it will check the user is not already apart of it, if not will append to the userList. Will update the userList value with the new array in the ‘groups’ collection.

### Delete a Group

Description: Delete a group
<br>
Route: deleteGroup
<br>
Method: POST
<br>
Parameters: {groupname: string}
<br>
Return Value: If it works: {“ok”: true}
<br>
If it failed: {“ok”: false}
<br>
Technical Explanation: Will find a group with the same name as the specified one. Will use a query to delete from the ‘groups’ collection.

### Delete a Room

Description: Delete a room
<br>
Route: deleteRoom
<br>
Method: POST
<br>
Parameters: {groupname: string, roomname: string}
<br>
Return Value: If it works: {“ok”: true}
<br>
If it failed: {“ok”: false}
<br>
Technical Explanation: Will check that both the group and room exist. Will splice the room out of the roomList array. Will then update the entry in the ‘groups’ collection.

### Remove a User from Group

Description: Remove a user from a group
<br>
Route: removeUserGroup
<br>
Method: POST
<br>
Parameters: {groupname: string, username: string}
<br>
Return Value: If it works: {“ok”: true}
<br>
If it failed: {“ok”: false}
<br>
Technical Explanation: Will check to see if group exists and user is a member. Will then splice user from userList array. Will then update the entry in the ‘groups’ collection.


























