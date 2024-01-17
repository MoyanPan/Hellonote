# Hello-Note - Test Document

## Register, Login, Third-Party Login and refresh test cases

### Register:

| Use cases                  | Input                                 | Result                                                 |
|----------------------------|---------------------------------------|--------------------------------------------------------|
| Register as new user       | Firstname, Lastname, Email , Password | Successful register and redirect to Home page          |
| Register as existing user  | Firstname, Lastname, Email , Password | Email already been registered, re-enter email          |
| Missing variable           | Any three variables                   | Please fill all the fields, enter the missing variable |                 
| invalid email address      | Firstname, Lastname, Email , Password | Invalid email, re-enter the correct email format       |

### Login:

| Use cases                | Input           | Result                                              |
|--------------------------|-----------------|-----------------------------------------------------|
| Normal login             | Email ,Password | Successful Login and redirect to Home page          |
| Missing email            | Password        | Please enter a correct email address!, re-enter     |
| Wrong password           | Email ,Password | Please enter a correct password!, re-enter          |
| Invalid email            | Email ,Password | Nothing happened                                    |
| Captial letters email    | Email ,Password | Nothing happened                                    |
| Captial letters password | Email ,Password | Nothing happened                                    |

### Third-Party:

| Use cases    | Input             | Result                                     |
|--------------|-------------------|--------------------------------------------|
| Github login | Click Github Sign | Successful Login and redirect to Home page |
| Github login | Fail to login     | Unsuccessful Login, do it again            |
| Google login | Click Google Sign | Successful Login and redirect to Home page |
| Google login | Fail to login     | Unsuccessful Login, do it again            |


###  Home page:

| Use cases              | Input                | Result                                                    |
|------------------------|----------------------|-----------------------------------------------------------|
| Total note count       |                      | The number is incorrect                                   |
| Graphic displayed none |                      | Nothing displayed with different modified & created date  |
| Logout button          | click logout button  | Nothing displayed with different modified & created date  |
| Logo icon              | click logo icon      | redirected to home page successfully                      |

###  Note page:

| Use cases           | Input                                            | Result                                                         |
|---------------------|--------------------------------------------------|----------------------------------------------------------------|
|Create new note      | note title, choose a existing folder, new folder | Create a new note in existing folder, new folder has not create|
|Create new note      | note title                                       | create a new note, folder undefined                            |
|Create new note      | existing folder                                  | create a new note with title(undefined)                        |
|Rename to ""         | No input                                         | message reminds the folder/note cannot be empty                |
|Rename a folder/note | A string                                         | successfully renamed to the new name                           |
|Delete a folder/note | No input                                         | successfully deleted the note/folder                           |


###  Add note page:

| Use cases                   | Input                | Result                                                         |
|-----------------------------|----------------------|----------------------------------------------------------------|
| Empty note content          | No input             | Can not save the note without anything content                 |
| Close and open a new note   | No input             | The content of the previous note displays in the current note  |
| Open a note without folder  | No input             | The folder at the top left corner dispalys undefined           |
| system code compile         | Thread               | Error instead of display error message in output               |
| Javascript                  | Sleep()              | compiler stops when call functions realted to thread           |

