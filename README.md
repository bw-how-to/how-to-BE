How-To BackEnd API
--------------------------------------------

API Deployed at
---------------------------------------------
- https://dashboard.heroku.com/apps/bw-how-to

Endpoints
----------------------------------------------
Auth Endpoints

| Table    |  Method   |  Endppoint |        Description         |
|----------|:---------:|-----------:|----------------------------:
| Users    |  Post     | /register  |Creates a new user profile, returns the username , id, type and a jsonwebtoken in the body of the response|
| Users    |  Post     | /login     |Uses the username and passowrd sent up to verify the user, if they match, returns the username , id, type and a jsonwebtoken in the body of the response                          |