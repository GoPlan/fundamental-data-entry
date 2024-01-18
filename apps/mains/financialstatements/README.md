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

