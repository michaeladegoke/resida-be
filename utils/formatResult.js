// formatResult.js

/**
 * Formats the Joi validation result.
 * 
 * @param {Object} validationResult - The result object from Joi's validate method.
 * @returns {Object} - Formatted result with error message if validation fails.
 */
const formatResult = (validationResult) => {
    if (validationResult.error) {
        // Extract the error messages from the Joi error details
        const errorMessage = validationResult.error.details.map(detail => detail.message).join(', ');

        return {
            error: true,
            message: errorMessage,
        };
    }

    return {
        error: false,
        value: validationResult.value,
    };
};

module.exports = {
    formatResult,
};
