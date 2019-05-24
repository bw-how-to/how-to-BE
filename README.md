How-To BackEnd API
--------------------------------------------

API Deployed at
---------------------------------------------
- https://dashboard.heroku.com/apps/bw-how-to

Endpoints
----------------------------------------------
Auth Endpoints

| Table    |  Method   |  Endpoint | required fields ||  Description  |
|----------|:---------:|----------:|-----------------:|--------------:|
| Users    |  Post     | /register||username, password, type |Creates a new user profile, returns the username , id, type and a jsonwebtoken in the body of the response|
| Users    |  Post     |/login||username, password|Uses the username and passowrd sent up to verify the user, if they match, returns the username , id, type and a jsonwebtoken in the body of the response|