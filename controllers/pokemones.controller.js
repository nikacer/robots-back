const seguridad = require('../services/seguridad')
const pokemon = require('../models/pokemon.model')
const uuid = require('uuid');
const mysqlService = require("../services/db")
const pokemonModel = require('../models/pokemon.relacional.model')
const pokemonValidator = require('../validaciones/pokemon.validator')
const pdf = require("pdf-creator-node");
const fs = require("fs");


const mysql = new mysqlService();

const listar = (req, res) => {
    return res.status(200).send('listado')
}

const nuevoToken = (req, res) => {
    return res.status(200).send({ token: seguridad.crearToken() })
}

const verificarToken = (req, res) => {
    return res.status(200).send('ok')
}

const agregarpokemon = (req, res) => {
    const { nombre, peso, familia } = req.body
    const schemaPokemon = new pokemon({ nombre, peso, familia, uuid: uuid.v4() })
    schemaPokemon.save(err => {
        if (err) return res.status(500).send({ err: ' algo fallo: ' + err })
        return res.status(200).send({ ok: true })
    })
}

const sequelize = async (req, res) => {
    try {
        const valid = pokemonValidator.validate(req.body)
        if (valid.error) throw valid.error
        const pokemon = await pokemonModel.create(req.body)
        return res.status(200).send(pokemon)
    } catch (err) {
        return res.status(500).send({ err })
    }
}

const listarPokemones = (req, res) => {
    pokemon.find({}, (err, pokemones) => {
        if (err) return res.status(500).send({ err: ' algo fallo: ' + err })
        return res.status(200).send({ pokemones: pokemones.map(({ nombre, uuid, peso, familia }) => ({ nombre, uuid, peso, familia })) })
    })
}

const listarPokemonesDos = (req, res) => {
    mysql.consultar('select * from pokemones')
    return res.status(200).send({ ok: true })
}

const retornoPDF = (req, res) => {
    var html = fs.readFileSync("./template/pdf.html", "utf8");
    const options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };

    var users = [
        {
            name: "Shyam",
            age: "26",
        },
        {
            name: "Navjot",
            age: "26",
        },
        {
            name: "Vitthal",
            age: "26",
        },
    ];
    const document = {
        html: html,
        data: {
            users,
        },
        path: "./file/users.pdf",
        type: "",
    };

    pdf.create(document, options)
        .then((response) => {
            return res.status(200).send({ response })
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).send({ error })
        });
}

module.exports = {
    listar,
    nuevoToken,
    verificarToken,
    agregarpokemon,
    listarPokemones,
    listarPokemonesDos,
    sequelize,
    retornoPDF
}