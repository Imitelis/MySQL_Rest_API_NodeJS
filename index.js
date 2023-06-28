const express = require('express');
const mysql = require('mysql2/promise');

// Create connection
const dbConfig = {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'postsdb'
};

// Create app
const app = express();

// Create DB
async function createDatabase() {
    try {
      const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password
      });
  
      // Create the database
      await connection.query(`CREATE DATABASE ${dbConfig.database}`);
  
      console.log('Database created');
  
      // Close the connection
      connection.end();
    } catch (error) {
      console.error('Error creating the database:', error.message);
    }
  }
  
// Call the function to create the database
createDatabase();

// Connect DB
async function connectToDatabase() {
    try {
      const connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database');
  
      // Perform database operations or other tasks here
  
      // Close the connection when done
      connection.end();
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    }
  }

// Call the function to establish the connection
connectToDatabase();

// Connect DB route
app.get('/connectdb', (req, res) => {
    connectToDatabase((error, message) => {
      if (error) {
        res.status(500).send('Error creating the database');
      } else {
        res.send(message);
      }
    });
});

// Create posttable
async function createPostsTable() {
    try {
        const connection = await mysql.createConnection({
          host: dbConfig.host,
          user: dbConfig.user,
          password: dbConfig.password
        });
    
        // Create the posttable
        await connection.query(`USE ${dbConfig.database}`)
        await connection.query('CREATE TABLE posts (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))');
    
        console.log('Posts table created');
    
        // Close the connection
        connection.end();
      } catch (error) {
        console.error('Error creating the posts:', error.message);
      }
  }

// Call the function to create table
// createPostsTable();

// Insert Post 1
async function insertFirstPost() {
    try {
        const connection = await mysql.createConnection({
          host: dbConfig.host,
          user: dbConfig.user,
          password: dbConfig.password
        });

        let firstPost = {title: 'Post one', body: 'This is text'}
    
        // Connect the database
        await connection.query(`USE ${dbConfig.database}`)
        
        // Insert the firstPost object into the "posts" table
        await connection.query('INSERT INTO posts SET ?', firstPost);
    
        console.log('First Post added to table');
    
        // Close the connection
        connection.end();
      } catch (error) {
        console.error('Error adding the post:', error.message);
      }
  }

// Call the function to insert first post
// insertFirstPost();

// Better turn it into a practical function
async function insertPost(postObj) {
    try {
        const connection = await mysql.createConnection({
          host: dbConfig.host,
          user: dbConfig.user,
          password: dbConfig.password
        });

        await connection.query(`USE ${dbConfig.database}`)
        await connection.query('INSERT INTO posts SET ?', postObj);
        console.log(`New post ${postObj.title} added to table`);
        connection.end();
      } catch (error) {
        console.error('Error adding the post:', error.message);
      }
  }

let secondPost = {title: 'Secondary post', body: 'more contextual text'}
// Much better, call the function now
// insertPost(secondPost)

// Get all posts route
app.get('/posts', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
          });

          await connection.query(`USE ${dbConfig.database}`)
          const data = await connection.query(`SELECT * FROM posts`)
          res.json(data[0])
          console.log('Posts were successfully got');
    } catch (error) {
        console.error('Error getting the posts:', error.message);
    }
});

// Get one post route
app.get('/posts/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
          });

          await connection.query(`USE ${dbConfig.database}`)
          const data = await connection.query(`SELECT * FROM posts WHERE id = ${req.params.id}`)
          res.json(data[0])
          console.log('Post was successfully got');
    } catch (error) {
        console.error(`Error getting the post ${req.params.id}:`, error.message);
    }
});

// Update one post route
app.get('/updatepost/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
          });

          let newTitle = 'Newest title'
          await connection.query(`USE ${dbConfig.database}`)
          const data = await connection.query(`UPDATE posts SET title = ? WHERE id = ?`, [newTitle, req.params.id]);
          res.json(data[0].info)
          console.log(`Post ${req.params.id} was successfully updated`);
    } catch (error) {
        console.error(`Error updating the post ${req.params.id}:`, error.message);
    }
});

// Delete one post route
app.get('/deletepost/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
          });

          await connection.query(`USE ${dbConfig.database}`)
          const data = await connection.query(`DELETE FROM posts WHERE id = ?`, [req.params.id]);
          res.json(data[0])
          console.log(`Post ${req.params.id} was successfully deleted`);
    } catch (error) {
        console.error(`Error updating the post ${req.params.id}:`, error.message);
    }
});

app.listen('3000', () => {
    console.log('Server started on port 3000')
})