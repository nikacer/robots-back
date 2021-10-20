const { userObtain } = require('../services/users')
const BenefitsModel = require('../models/benefits.model')

const benefits = async (req, res) => {
    const response = await BenefitsModel.findAll({})
    return res.status(200).send(response)
}

const obtenerUsuarios = async (req, res) => {
    try {
        const response = await userObtain(req.body)
        if (!response) throw { err: 'vacio', response: {} }
        res.status(200).send({ response })
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { benefits, obtenerUsuarios }