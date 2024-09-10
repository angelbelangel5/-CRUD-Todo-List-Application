Installation
To get started, follow these steps:

Clone the Repository
git clone https://github.com/angelbelangel5/-CRUD-Todo-List-Application.git

Navigate to the Backend Directory
cd backend


Install Dependencies

Install the required dependencies using npm
npm install



MongoDB Atlas
Create a MongoDB Atlas Cluster

Go to the MongoDB Atlas website and create a new cluster.
Obtain the Connection String

In the Atlas dashboard, navigate to your cluster’s "Connect" section.
Select "Connect Your Application" to get the connection string.


Whitelist Your IP Address
Ensure that your IP address is whitelisted in the network access settings of your MongoDB Atlas cluster.


Create a Database User
Create a database user with appropriate roles and permissions for your database.

Open the .env file and replace the placeholder value for MONGODBURI with your MongoDB Atlas connection string

MONGODBURI="your connection string"




MongoDB Compass
Open MongoDB Compass
Download and install MongoDB Compass if you haven’t already.


Connect to MongoDB Atlas
Use the connection string from MongoDB Atlas to connect via MongoDB Compass.
This will allow you to visualize and manage your MongoDB database.
Run Backend
To start the API server, run:
node index.js
