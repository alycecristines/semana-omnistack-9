const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://omnistack:omnistack@omnistack-shard-00-00-p1690.gcp.mongodb.net:27017,omnistack-shard-00-01-p1690.gcp.mongodb.net:27017,omnistack-shard-00-02-p1690.gcp.mongodb.net:27017/admin?ssl=true&replicaSet=omnistack-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//GET (buscar), POST (criar), PUT(alterar), DELETE(deletar)

//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

app.use(express.json());
app.use(routes);


app.listen(3334);