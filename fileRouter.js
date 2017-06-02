const express = require('express');
const router = express.Router()
const fs = require('fs');


router.get('/', (req, res) => {
    const blogPostTitle = req.query.title;
    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          res.send(err)
        }
        var dataOnFile = data;
        var parsedData = JSON.parse(dataOnFile);
        var matchedPost = parsedData.filter(posts => {
            return posts.title === blogPostTitle;
        })
        res.send(matchedPost)
    })
})

router.post('/', (req, res) => {
    const blog = req.body;
    console.log(req.body)
    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.send(err);
        }
        var dataOnFile = data
        var parsedData = JSON.parse(dataOnFile)
        const matchingBlog = parsedData.find(datum => {
            return datum.title && datum.title === blog.title;
        })
        if (!matchingBlog) {
            parsedData.push(blog)
        }
        const newBlogData = JSON.stringify(parsedData);
        fs.writeFile('./database.json', newBlogData, (err) => {
            res.send('file written');
        })
        console.log(parsedData, typeof parsedData)
  })
})

router.delete('/', (req, res) => {
    const postToDelete = req.body.title;
    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        var dataOnFile = data;
        var parsedData = JSON.parse(dataOnFile);
        const updatedData = parsedData.filter(posts => {
            return posts.title !== postToDelete
      })

        const newBlogData = JSON.stringify(updatedData)
        fs.writeFile('./database.json', newBlogData, (err) => {
            if (err) {
                console.log(err)
                res.send(err)
            }
            console.log(`deleting post ${postToDelete}`)
            res.send("file deleted")
        })
    })
});

router.put('/', (req, res) => {
    const titleOfPostToUpdate = req.query.title;

    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          res.send(err);
        }
        const parsedData = JSON.parse(data);
        let postToUpdate = parsedData.find(posts => {
            return posts.title === titleOfPostToUpdate;
        })

        const updatedPost = Object.assign({}, postToUpdate, req.body)
        const newDatabase = parsedData.filter(posts => {
            return posts.title !== titleOfPostToUpdate;
        });


        newDatabase.push(updatedPost)
        const updatedData = JSON.stringify(newDatabase)

        fs.writeFile('./database.json', updatedData, (err) => {
            res.send(`updated post '${updatedPost.title}'`)
            console.log(updated)
        })
    })
});

module.exports = router
