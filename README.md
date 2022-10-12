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

## Angular Architecutre

### Components

#### Login Component

This is the default page when launching the website. All the other pages will redirect the user back to login and ask them to login. The user will have to provide a registered username and password to initially login to the website. This will register the user as ‘loggedIn’, this is a localStorage value that is set to true after a successful login. Each component check for the value of it to see if the user has been authenticated. Upon a successful login the user is redirected to the chat component.
<br>
The header has a logout button. Clicking this will redirect the user back to the login page while also clearing the local storage. This is will reset all components back to their initial state of requiring the user to login first.

#### Account Component

This is functionally the same as the previous task. The only difference is that all of the function now use mongoDB instead of JSON. Because of this the layout is identically only the functions have been changed for the backend. Despite this below is a table showcasing which user’s have access to which functions depending on their role.

##### Function	Applies To
Create a Room
<br>
•	Group Assistant
<br>
•	Group Admin
<br>
•	Super Admin
<br>
Add User to a Group
<br>•	Group Assistant
<br>
•	Group Admin
<br>
•	Super Admin
<br>
Remove User from a Group
<br>
•	Group Assistant
<br>
•	Group Admin
<br>
•	Super Admin
<br>
Create a User
<br>
•	Group Admin
<br>
•	Super Admin
<br>
Create a Group
<br>
•	Group Admin
<br>
•	Super Admin
<br>
Delete a Group
<br>
•	Group Admin
<br>
•	Super Admin
<br>
Delete a Room
<br>
•	Group Admin
<br>
•	Super Admin
<br>
Edit a User
<br>
•	Super Admin
<br>
Delete a User
<br>
•	Super Admin

#### Chat Component

The chat component uses socket.io to allow users to send messages to one another. The user is provided with two inputs one for the room and another for their message. By entering a message and clicking send the user emits a message that is viewable to other user’s on the website. While joining a room will allow the user to emit a message in a single chat. Other user’s can only view the message by also being the same chat.
<br>
Additionally, a message is sent when a user joins a room and when they leave.
<br>
A detailed description of how this process work below:

##### Messages

Messages are sent through the send function. It requires the message, username and current room of the user. It will then emit a message to the socket.js file where the username and message are combined to area as an actual message.
<br>
For instance:	Nick: Hi
<br>
If the message is empty nothing will send a console message will appear explaining that their was no message.
<br>
It will then send this back to client in the room specified in the earlier parameter.


##### Retrieving Messages

The getMessage function is called to retrieve messages. It is an observable that will retrieve the data as an array. It will push the current message into the array. This allows for the message log to be shown to the user’s. 
<br>
On the component a simple *ngFor loop is used to iterate through each element of the array.
<br>

On the server side there is also a join room and disconnect function.
<br>
Disconnect is a socket function that triggers when a user is disconnected, this will send a message alerting that the user has left. This is also sent to the array, resulting it also be shown the message logs.
<br>
The joinRoom function sends the name of the room and user who currently joined.
<br>
Example: 	Nick has joined the room: General
<br>
This is also added to the message array resulting in it being displayed when a user joins a new room.

### Services

#### Check-User Service

Holds the variable to store the user’s name.

#### Get-Groups Service

Holds the variable to store the name of groups and their rooms

#### Get-Users Service

Holds the variable to store the user’s in a group. 
<br>
Also stores the variable to see if the user is logged in.

#### Socket Service

A majority of the client side socket code is done through this service, being comprised of numerous functions.
<br>
<br>
Function Name: joinRoom
<br>
Parameters: roomname: string | null, username: string | null
<br>
Description: Will emit a message to the server that will result in all user’s in a room being notified when a user joins.

<br>
<br>
Function Name: getLeftRoom
<br>
Parameters: 
<br>
Description: Will receive a message from the server when a user has disconnected from socket.io
<br>
<br>

Function Name: getJoinRoom
<br>
Parameters: roomname: string | null, username: string | null
<br>
Description: Will receive a message when the server processes the joinRoom function, resulting in that message being pushed to the messages array.
<br>
<br>

Function Name: send
<br>
Parameters: message: string, roomname: string | null, username: string | null
<br>
Description: Will emit a message to the server that contains the message from the input, the roomname from the input and the current user. This is called by pushing the send message button.
<br>
<br>

Function Name: getMessage
<br>
Parameters: 
<br>
Description: Will retrieve the message sent to the client from the send function and push it to the messages array.



























