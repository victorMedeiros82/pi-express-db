var express = require('express');
var router = express.Router();
let alunos = require('../tests/mocks/alunos.json');

router.get('/', function(req, res, next) {
    const data = {
        title: 'Alunos',
        alunos: alunos.content
    }
    res.render('all_students',data);
});

router.get('/new', function(req, res, next) {
    res.render('form',{title: 'Novo Aluno',buttonText:'Adicionar Aluno'});
});

router.post('/', function (req, res, next) {
    const{body,method} = req
    
    res.send({body,method});
});

router.post('/create',function(req,res,next){
    let novoAluno = req.body
    let matricula = novoAluno.matricula
    alunos.content[matricula] = {
        ...novoAluno,
        matricula:Number(matricula)
    }
    res.redirect('/alunos')
})


router.get('/:matricula', function(req,res,next){
    const{matricula} = req.params;
    const aluno = alunos.content[matricula];
    res.render('details_student',{title:'Detalhes do Aluno',aluno})
})


router.get('/edit/:matricula', function(req, res, next) {
    const{matricula} = req.params;
    const aluno = alunos.content[matricula];
    res.render('form',{title: 'Editar Aluno',buttonText:'Salvar Alterações',aluno});
});

router.put('/', function (req, res, next) {
    const{body,method} = req
    
    res.send({body,method,msg:'Alterar o aluno'} );
});
router.delete('/', function (req, res, next) {
    const{body,method} = req
    
    res.send({body,method,msg:'Vai remover aluno'});
});


module.exports = router;