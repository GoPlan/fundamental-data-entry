This example uses an OAuth2 simple username/password authentication, and JWT to enable session on protected pages.

When the FastAPI Image is built, an OpenSSL SECRET_KEY will be created and echo into /etc/environment; hence the FastAPI image needs a rebuild when a new key is needed.

This SECRET_KEY management process is meant for using in this example only. Key management in Production environemnt will depend on the deployment platform and provider. 