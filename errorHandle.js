function errorHandle(res, error){
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }

    if(error) console.log(error)    // ← 有傳 error 才印

    res.writeHead(400,headers)
    res.write(JSON.stringify({
        "status":"false",
        "message":"欄位未填寫正確，或無此 todo id"
    }))
    res.end();
}

module.exports = errorHandle;