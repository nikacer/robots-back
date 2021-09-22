const cron = require('node-cron')
const axios = require('axios')
const LocalStorage = require('node-localstorage').LocalStorage

localStorage = new LocalStorage('./noticias')

//https://crontab.guru/#30_1_1-3_*_*
const init = () => {
    cron.schedule('*/5 * * * *', () => {
        consulta()
    })
}

const consulta = () => {
    const options = {
        method: 'POST',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list',
        params: { region: 'ES', snippetCount: '28' },
        headers: {
            'content-type': 'text/plain',
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            'x-rapidapi-key': 'da7e8cba64msh170f03efe32d447p15c708jsn3b3b127a38c9'
        },
        data: 'fiscalía general'
    };

    axios.request(options).then(function ({ data: { data: { main: { stream, nextPage, pagination } } } }) {
        //localStorage.setItem('yahoo', JSON.stringify(stream))
        console.log('\x1b[36m', 'Nuevas Nticias', '\x1b[0m');
    }).catch(function (error) {
        console.error(error);
    });
}

module.exports = {
    init
}