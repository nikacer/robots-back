const cors = require('./cors')

process.env.LISTA_BLANCA = 'localhost'

req = (host = 'localhost') => ({
    header: () => host
})
callback = (err, options) => {
    result = { err, options }
}

result = ''

describe('test cors middleware', () => {
    it('host correcto', () => {
        cors(req(), callback)
        expect(result.err).toBe(null)
        expect(result.options.origin).toBe(true)
    })
    it('host incorrecto', () => {
        cors(req('www.google.com'), callback)
        expect(result.options.origin).toBe(false)
        expect(result.err).not.toBe(null)

    })
})