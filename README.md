# MySQL Rest API NodeJS

## Requirements
phpmyadmin and mysql.service properly installed and configured in your computer, then the "package.json" file node modules

## Instructions
To make it work in your machine:
  1.  Clone the folder with "git clone https://github.com/Imitelis/MySQL_Rest_API_NodeJS.git"
  2.  Open the "/MySQL_Rest_API_NodeJS" folder in terminal and run "npm install"
  3.  With VS Code go to "/MySQL_Rest_API_NodeJS" folder, configure your username and password in the "index.js" file
  4.  Create the database by calling the function 'createDatabase()' and within the same folder in terminal running "npm run start"
  5.  Similarly, connect the database by calling 'connectToDatabase()' and create some posts
  6.  Visit the api routes by going ot 'localhost:3000/posts', 'localhost:3000/posts/2', 'localhost:3000/updatepost/1'
