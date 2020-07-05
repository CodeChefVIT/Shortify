const yup = require('yup')

const schema = yup.object().shape({
    shortit: yup.string().trim().matches(/[a-z0-9_\-]/i),
    url: yup.string().trim().url().required()
})

module.exports = schema 