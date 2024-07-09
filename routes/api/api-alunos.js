// IMPORTAÇÃO
var express = require('express');
var router = express.Router();
let alunos = require('../../tests/mocks/alunos.json');

router.get('/', function(req,res,next){
    try {
        res.status(200).json(alunos);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
})
router.get('/:matricula', function(req, res, next) {
    const{matricula} = req.params;
    const aluno = alunos.content[matricula];

    res.json({aluno});
});
// POST
router.post('/',function(req,res,next){
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