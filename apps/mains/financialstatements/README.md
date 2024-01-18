Financial Statements data-entry app

Data-entry features require:
- To be similar to the Statement Panel examples but with a more elaborated design

Security sequences will be studied more carefully at the development of Services Management package. Hence, there will be some security slacks in this package, especially the user password-reset sequence.  

Security on this package will require:
- User must have correct username/password authentication to access the app
- The app will maintain user identity using a JWT access token
- Protected API calls require JWT access token
- Protected API calls use the access token to access **only** data belong to the user
- User can reset password from a non-secured page. This is for **development** conveniency only. Development for a more appropriate security sequence is left to the development of the Services Management package


FastAPI
- docker-compose build the **fastapi** container from the Dockerfile inside **./apps/mains/financialstatements/fastapi**  
- SECRET_KEY must be generated locally and copied into the enviroment file **.env.secret**, in the same location with the **docker-compose.yaml**.
- Command to generate the SECRET_KEY hex is _**openssl rand -hex 32**_. Run command in WSL if you are on a Window.
- The **.env.secret** file is ignored by Git.
- Use URL ./user/{username}/resetpassword to reset a user password. See http://localhost:8005/user/docs 