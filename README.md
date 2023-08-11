# OAuth2 based ETA Prediction for data scientists
**This is reference implementation for the users with "developer" role who can follow the code to develop newer versions**

This is React.js app that allows the data scientists to get the ETA data posted by users on a histogram. This app gets the data from API hosted by the [Privacy Guardian](https://github.com/nytron88/eta-prediction-privacy-guardian-oauth2). The app requested data from 2 instances of the Privacy Guardian: R_SEVER and X_R_SERVER. The UI refreshes itself automatically at regular intervals to update the histogram.

The app is integrated with [Auth0](https://auth0.com) for authnetication and authorization. The typical flow is:
![image](https://github.com/nytron88/eta-prediction-scientist-oauth2/assets/79620454/7bf2b9ca-247f-4133-a53e-d3dcd7939a55)

## Prerequsities

 - NPM
 - React.js

## Installation
1. Checkout the code and change into the project directory:
   
   ```
   git clone https://github.com/nytron88/eta-prediction-scientist-oauth2.git
   
   cd eta-prediction-scientist-oauth2
   ```
2. Install the required packages

   ```
   npm install
   ```
3. Run the app in web browser

   ```
   npm start
   ```
4. Once the app is started, it asks the user to either sign up or log in. ***When a user signs up first time, s/he is assigned the default role of "user" meaning that s/he can post ETA data. If they want elevated role like "developer" or "scientist", they need to write an email to
   tenant admin to have approproate role assigned.***
   <img width="1201" alt="image" src="https://github.com/nytron88/eta-prediction-scientist-oauth2/assets/79620454/7f9aeb4a-ba25-4ada-9691-9caa4484bc08">
   <img width="398" alt="image" src="https://github.com/nytron88/eta-prediction-scientist-oauth2/assets/79620454/287ecccb-9a54-4ce4-9c2d-6d7902b0cb7f">


   
## Configuration
1. The .env file contains the below properties:

   ```
   REACT_APP_AUTH0_DOMAIN=REDACTED
   REACT_APP_AUTH0_CLIENT_ID=REDACTED
   REACT_APP_AUTH0_CALLBACK_URL=http://localhost:8981/callback
   REACT_APP_API_SERVER_1_URL=http://localhost:8181
   REACT_APP_API_SERVER_2_URL=http://localhost:8281
   REACT_APP_AUTH0_AUDIENCE=https://token-management-api
   ```
   **REACT_APP_AUTH0_DOMAIN**: The Auth0 tenant's domain

   **REACT_APP_AUTH0_CLIENT_ID**: The application's client id in Auth0 tenant

   **REACT_APP_API_SERVER_1_URL**: Privacy Guardian's instance 1 URL

   **REACT_APP_API_SERVER_2_URL**: Privacy Guardian's instance 2 URL

   **REACT_APP_AUTH0_AUDIENCE**: The Token Management API configured in Auth0 tenant
   

