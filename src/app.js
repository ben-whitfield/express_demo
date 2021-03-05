const express = require('express')
const logResReq = require('./middleware/logResReq')
const axios = require('axios');

const app = express()
const port = 3000

app.use(express.static('src/static'))
// app.use(logResReq)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/test', function (req, res) {
    res.send('Test')
})

app.get('/testSearch/:query?', function(req, res){
    const query = req.params.query;
    query ? res.send(query) : res.send('No search term')
});

app.get('/rawSearch/:query?', function(req, res){
    const query = req.params.query;
    const iblSearchUrl = `https://ibl.api.bbci.co.uk/ibl/v1/new-search?q=${query}&availability=available&rights=tv`;
    console.log(iblSearchUrl)
    axios.get(iblSearchUrl)
        .then(function (response) {
            res.send(response.data.new_search.results)
        })
        .catch(function (error) {
            res.send(error)
        })
        .then(function () {
            console.log('COMPLETE')
        });
});

app.get('/search/:query?', function(req, res){
    const query = req.params.query;
    const iblSearchUrl = `https://ibl.api.bbci.co.uk/ibl/v1/new-search?q=${query}&availability=available&rights=tv`;
    console.log(iblSearchUrl)
    axios.get(iblSearchUrl)
        .then(function (response) {
            const recipe = '272x153';
            let output = ``
            response.data.new_search.results.forEach(element => {
                output += `<li><h2>${element.title}</h2><img src="${element.images.standard.replace('{recipe}', recipe)}" /></li>`
            });
            res.send(output)

        })
        .catch(function (error) {
            res.send(error)
        })
        .then(function () {
            console.log('COMPLETE')
        });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})