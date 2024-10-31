# Capstone Backend
## Premise: 
* Create assignments, send assignments to students in your class, grade students' submissions from that assignment... repeat :)
### Installation
1. Clone the repo 
    ```sh
    git clone https://github.com/kdang0/capstone_backend.git
    ```
2. Install NPM packages
    ```sh
    npm i
    ```
3. Enter your MONGODB connection string in `.env`
    ```js
    const MONGO_URI = 'Enter your MONGODB connection string'
    ```
4. Change git remote url to avoid accidental pushes to base project
    ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
    ```
## Routes 
### CRUD Routes (Assignment):
```
/assignment GET all assignments
```
```
/assignment/:id GET specific assignment
```
```
/assignment/class/:id GET all assignments based on class
```

```
/assignment/tutor/:id GET all assignments based on tutor
```

```
/assignment/student/:id GET all assignments based on student
```

```
/assignment POST creates an assignment and implements an index TTL to expire after two years
```
```
/assignment/:id PATCH updates an assignment
```
```
/assignment/submit PATCH adds a submission onto an assignment
```
```
/assignment/access/:id POST adds access to assignment 
```

```
/assignment/access POST creates an access point for the given student
```
```
/assignment/:id DELETE deletes an assignment
```
### CRUD Routes (Class):
```
/class GET all classes
```
```
/class/:id GET a class
```
```
/class/tutor/:id GET classes by specific tutor 
```
```
/class/student/:id GET classes by specific student
```

```
/class POST create a class
```
```
/class DELETE delete a class
```
```
/class/access POST creates an access point for the given student
```
```
/class/:id PATCH updates a class
```
### CRUD Routes (User):
```
/user/:id GET a user
```
```
/user/students/:id GET all students enrolled in tutor's class(es)
```
```
/user POST create a user
```
```
/user/:id PATCH update a user
```
```
/user/:id DELETE delete a user 
```
### Authentication Routes:
```
/login authenticates user using passport middleware
```

```
/delete destroys session store for that user
```

```
/login-success sends authenticated user information on success authentication
```

```
/login-failure sends invalid username/password message to frontend on unsuccessful authentication
```

```
/profile checks if user is currently authenticated if so, then send user information to frontend
```
### 3RD PARTY API USED:
* https://docs.zenquotes.io/zenquotes-documentation/#call-today

```
/quote retrieves quote from 3RD party API 
```
## Acknowledgements
* https://javascript.plainenglish.io/session-authentication-with-node-js-express-passport-and-mongodb-ffd1eea4521c
* https://www.youtube.com/watch?v=-RCnNyD0L-s
* https://www.passportjs.org/concepts/authentication/middleware/
* https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize 
* https://www.npmjs.com/package/connect-mongo#example-application 