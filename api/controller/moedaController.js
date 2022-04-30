
const sendJsonResponse = require('../custom_modules/sendJsonResponse');
const Moeda = require('../models/Moeda');
const moedaRepository = require('../repository/moedaRepository');

class moedaController {

    constructor() { }

    /**
     * retornar todos as moedas 
     * http://localhost:5000/api/moedas/
     * @param {object} req
     * @param {object} res
     * @returns {Moeda[]}
     */
    doListMoedas(req, res) {
        const repo = new moedaRepository();
        repo.allMoedas()
            .then(response => {
            sendJsonResponse(res, 200, response)
            }).catch((error) => {
                sendJsonResponse(res, 500, error.message)
            });
    }    

        /**
     * Criar nova moeda
     * $ http://localhost:5000/api/moedas/register 
     * @param {string} req.body.moedaOrigem
     * @param {string} req.body.moedaConvercao
     * @param {string} req.body.valorMoeda
     * @param {string} req.body.valorMoedaConvertida
     * @param {Number} req.body.valorMoedaInteiro
     * @param {object} req
     * @param {object} res
     * @returns {Moeda}
     */
         doCreateMoeda(req, res) {
            const newMoeda = new Moeda({
                moedaOrigem: req.body.moedaOrigem,
                moedaConvercao : req.body.moedaConvercao,
                valorMoeda : req.body.valorMoeda,
                valorMoedaInteiro : req.body.valorMoedaInteiro,
                valorMoedaConvertida :req.body.valorMoedaConvertida
            });
            
            const repo = new moedaRepository();
            
            repo.save(newMoeda, mayHaveError => {
                var _returnStatusCode = 501;
                var _returnContent = { message: '' };
    
                if(!mayHaveError) {
                    _returnStatusCode = 200;
                    _returnContent = newMoeda;
                } else {
                        _returnContent.message = String(mayHaveError);
                }
                sendJsonResponse(res, _returnStatusCode, _returnContent);
            });
         
        }

/**
     * atualizar moeda
     * $ http://localhost:5000/api/moedas/id
     * @param {object} req
     * @param {object} res
     * @returns {Moeda}
     */
        doUpdateMoeda(req, res) {
            const repo = new moedaRepository();
            repo.update(req.params.id , req.body )
                    .then(response => {
                    sendJsonResponse(res, 200, response)
                }).catch((error) => {
                    sendJsonResponse(res, 500, error.message)
                });
        }

        /**
     * atualizar moeda
     * $ http://localhost:5000/api/moedas/id
     * @param {object} req
     * @param {object} res
     * @returns {Moeda}
     */
         doDeleteMoeda(req, res) {
            const repo = new moedaRepository();
             repo.delete(req.params.id).then(response => {
                sendJsonResponse(res, 200, response)
            }).catch((error) => {
                sendJsonResponse(res, 500, error.message)
            });
        }
}

module.exports = moedaController;