function generateSuccess(result){
    return {status : 'ok', result}
}

function generateErrors(error){
    return {status : 'err', error}
}

function generateResult(error,result){
    return error ? generateErrors(error) : generateSuccess(result);
}


module.exports = {
    generateErrors,
    generateResult,
    generateSuccess,
}
