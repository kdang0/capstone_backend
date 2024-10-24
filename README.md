# Capstone Backend
* Premise: 
    * Create assignments, send assignments to students in your class, grade students' submissions from that assignment... repeat :)
* CRUD Routes (Assignment):
    * /assignment GET all assignments
    * /assignment/:id GET specific assignment
    * /assignment POST creates an assignment and implements an index TTL to expire after two years
    * /assignment/:id PATCH updates an assignment
    * /assignment/submission/:id PATCH adds a submission onto an assignment
    * /assignment/access POST creates an access point for the given student
    * /assignment/:id DELETE deletes an assignment
* CRUD Routes (Class):
    * /class GET all classes
    * /class/:id GET a class
    * /class POST create a class
    * /class DELETE delete a class
    * /class/access POST creates an access point for the given student
    * /class/:id PATCH updates a class
* CRUD Routes (User):
    * /user/:id GET a user
    * /user POST create a user
    * /user/:id PATCH update a user
    * /user/:id DELETE delete a user 