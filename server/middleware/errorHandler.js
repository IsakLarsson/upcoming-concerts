export const errorHandling = (err, req, res, next) => {
    console.log('ERROR DETECTED')
    const statusCode = res.statusCode ? res.statusCode : 500
    console.error(process.env.NODE_ENV == 'development' ? err.stack : '')
    res.status(statusCode).json({
        errorMessage: err.message
            ? err.message
            : "Oops, seems I've encountered an error!",
    })
}
