const ValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: ' name filed should not be empty'
        }
    }
}
module.exports = ValidationSchema