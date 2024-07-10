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
    const {matricula} = req.params;
    try {
        const aluno = alunos.content[matricula];
        res.status(200).json(aluno);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
});
// POST
router.post('/',function(req,res,next){
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;
    alunos.content[matricula] = {
        ...novoAluno,
        matricula:Number(matricula)
    }
    const response = {
        msg: "Aluno criado com sucesso!",
        aluno: alunos.content[matricula]
    }
    try {
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
})
// PUT 
router.put('/:matricula', function (req, res, next) {
    const {matricula} = req.params.matricula;
    const novoAluno = req.body;
    alunos.content[matricula] = {...novoAluno,matricula:Number(matricula)};
    const response = {
        msg: "Aluno editado com sucesso!",
        aluno: alunos.content[matricula]
    }
    try {
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }

});
// DELETE
router.delete('/:matricula', function (req, res, next) {
    const {matricula} = req.params.matricula;
    delete alunos.content[matricula]
    const response = {
        msg: "Aluno excluido!",
        matricula
    }
    res.status(200).json(response)
});
// EXPORTAÇÃO
module.exports = router;