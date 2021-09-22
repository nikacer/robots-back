const seguridad = require('../services/seguridad')
const Pokemon = require('../models/pokemon')
const uuid = require('uuid')
const pokemonModel = require('../models/pokemon.relaciona')
const pokemonValidator = require('../validators/pokemon.validator')
const LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./noticias')
const pdf = require("pdf-creator-node");
const fs = require("fs");


const listar = (req, res) => {
    return res.status(200).send('listado')
}

const nuevoToken = (req, res) => {
    return res.status(200).send({ token: seguridad.crearToken() })
}

const verificarToken = (req, res) => {
    return res.status(200).send('ok')
}

const agregarPokemon = (req, res) => {
    const { nombre, peso, familia } = req.body
    const pokemon = new Pokemon({ nombre, peso, familia, uuid: uuid.v4() })
    pokemon.save((err) => {
        if (err) return res.status(500).send(`Se a producido un error: ${err}`);
        return res.status(200).send({ ok: true })
    })
}

const obtenerPokemones = (req, res) => {
    Pokemon.find({}, (err, pok) => {
        if (err) return res.status(500).send(`A ocurrido un error: ${err}`);
        if (!pok) return res.status(404).send([]);
        return res.status(200).send({ pok });
    })
}

const obtenerNoticias = (req, res) => {
    const noticias = localStorage.getItem('yahoo') || "[]"
    return res.status(200).send({ noticias: JSON.parse(noticias) })
}

const sequelize = async (req, res) => {
    try {
        const valid = pokemonValidator.validate(req.body)
        if (valid.error) throw valid.error
        const pokemon = await pokemonModel.create({
            nombre: "Nicolas",
            peso: 30,
            familia: "bajito"
        })
        return res.status(200).send(pokemon)
    } catch (err) {
        return res.status(500).send({ err })
    }
}

const sequelizeAll = async (req, res) => {
    try {
        const pokemon = await pokemonModel.findAll()
        return res.status(200).send(pokemon)
    } catch (err) {
        return res.status(500).send({})
    }
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
            users: users,
        },
        path: "./file/users.pdf",
        type: "",
    };

    pdf
        .create(document, options)
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
    agregarPokemon,
    obtenerPokemones,
    obtenerNoticias,
    sequelize,
    sequelizeAll,
    retornoPDF
}