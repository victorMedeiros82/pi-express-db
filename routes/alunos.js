// IMPORTAÇÃO
var express = require('express');
var router = express.Router();
let alunos = require('../tests/mocks/alunos.json');

// GET
router.get('/', function(req, res, next) {
    const data = {
        title: 'Alunos',
        alunos: alunos.content
    }
    res.render('all_students',data);
});
router.get('/new', function(req, res, next) {
    parametro = "create"
    const data= {metodo:"POST",parametro, title: 'Novo Aluno',buttonText:'Adicionar Aluno'}
    res.render('form',data);
});
router.get('/:matricula', function(req,res,next){
    const{matricula} = req.params;
    const aluno = alunos.content[matricula];
    res.render('details_student',{title:'Detalhes do Aluno',aluno})
})
router.get('/edit/:matricula', function(req, res, next) {
    const{matricula} = req.params;
    const aluno = alunos.content[matricula];
    const parametro = matricula;
    res.render('form',{metodo: "PUT",parametro, title: 'Editar Aluno',buttonText:'Salvar Alterações',aluno});
});
// POST
router.post('/create',function(req,res,next){
    let novoAluno = req.body
    let matricula = novoAluno.matricula
    alunos.content[matricula] = {
        ...novoAluno,
        matricula:Number(matricula)
    }
    res.redirect('/alunos')
})
// PUT 
router.put('/:matricula', function (req, res, next) {
    // const{body,method} = req
    const {matricula} = req.params;
    const novoAluno = req.body;
    alunos.content[matricula] = {
        ...novoAluno,
        matricula:Number(matricula)};
    res.redirect('/alunos')
    // res.send({body,method,msg:'Alterar o aluno'} );
});
// DELETE
router.delete('/:matricula', function (req, res, next) {
    const {matricula} = req.params;
    delete alunos.content[matricula]
    res.redirect('/alunos')
});
// EXPORTAÇÃO
module.exports = router;