const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://omnistack:omnistack@omnistack-shard-00-00-azme9.mongodb.net:27017,omnistack-shard-00-01-azme9.mongodb.net:27017,omnistack-shard-00-02-azme9.mongodb.net:27017/test?ssl=true&replicaSet=omnistack-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//GET (buscar), POST (criar), PUT(alterar), DELETE(deletar)

//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);