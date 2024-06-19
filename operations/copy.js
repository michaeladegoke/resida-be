function formatResult(validationResult) {
    if (validationResult.error) {
        // Handle validation errors
        const errorMessages = validationResult.error.details.map(detail => detail.message);
        return {
            success: false,
            message: errorMessages.join(', '), // Combine error messages
        };
    } else {
        // Validation succeeded
        return {
            success: true,
            message: 'Validation passed successfully!',
        };
    }
}

//DB_URI = "mongodb+srv://adegokeolujidemic:mich2024@passnow.wwlx3gh.mongodb.net/"