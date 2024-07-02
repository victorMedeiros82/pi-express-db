var express = require('express');
var router = express.Router();
let alunos = require('../tests/mocks/alunos.json');

router.get('/', function(req, res, next) {
    const data = {
        title: 'Alunos',
        alunos: alunos.content
    }
    res.render('read',data);
});

router.get('/new', function(req, res, next) {
    res.render('form',{title: 'Novo Aluno'});
});

router.get('/edit/:id', function(req, res, next) {
    res.render('form',{title: 'Editar Aluno'});
});

module.exports = router;