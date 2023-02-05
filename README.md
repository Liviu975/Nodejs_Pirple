# Nodejs_Pirple
Create a Vanilla Node.js app

## The main application

    The application consists in a RESTful API got monitoring the uptime. 
    This app is ment to improve the Node.js skills. In addition to that there will be used some built-in Node.js modules, but no NPM packages. We will use just Twilio just as an external SMS packacge. Every document that is created or sent will be stores on filesystem in JSON format, allthough in a real app a DB is a much better option.

### App working flow

        An uptime monitor allows users to enter URLs they want monitored and receive alerts when those resources are down or back up.
        To make the app closer to a production product, it will have features like user sign-in, sign-up and changing some settings.
        There will be email and SMS alerts.

        The app will have some basic characteristics:
        1. The API listens to a PORT and accepts basic HTTP requests (GET, POST, PUT, DELETE, HEAD);
        2. The API will allows a client to connect, and create a new user, delete the user and edit the user;
        3. The API allows the user to sign-in which gives them a token for requests;
        4. The API will allow the user to sign-out which invalidates their token;
        5. The API allows the signed-in user to use the token to create a new check (a task for the system to check if it is up or down)
        6. The API allows a signed-in user to edit or delete any of their checks (the number of checks that a user can create is limited);
        7. The API performs checks in the background using workers at appropiate times and send alerts to the users when a check changes the status (from up to down or down to up)