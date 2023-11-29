
const EValidationSchema = {
    title: {
        isLength: {
            errorMessage: 'not be empty'
        },
        notEmpty: {
            errorMessage: 'title should not be empty'
        }
    },
    amount: {
        isNumeric: {
            options: { no_symbols: false },
            errorMessage: 'enter amount'
        },
        notEmpty: {
            errorMessage: 'amount should not be empty'
        }
    },
    date: {
        notEmpty: {
            errorMessage: ' date not be empty'
        }
    },
    categoryId: {
        notEmpty: {
            errorMessage: 'not be empty'
        }
    }
}
module.exports = EValidationSchema