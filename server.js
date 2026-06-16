
//原先寫法
/*var http = require("http");
http.createServer(function(request,response){
    console.log(request)
    response.writeHead(200,{"Content-type":"text/plain"})
    response.write("Hello~")
    response.end()
}).listen(8080);
*/

//(改寫)
//小步測試
console.log("hello")

const http =require("http"); //內建模組
const {v4:uuidv4} =require("uuid");  //用外部NPM
const errHandle = require("./errorHandle");  //自己打的錯誤處理
const todos = []
const requestListener = (req,res) =>{
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }

    let body = "";
    let num = 0
    req.on('data', chunk =>{
        console.log(chunk)
        body += chunk;
        num+=1;
        console.log(num);
    })




    if (req.url =="/todos" && req.method =="GET"){
        res.writeHead(200,headers)
        res.write(JSON.stringify({
            "status":"success",
            "data":todos
        }))
        res.end()
    }else if (req.url =="/todos" && req.method =="POST"){
        req.on("end",()=>{
            try{
                const title = JSON.parse(body).title;
                console.log(title)
                if (title !== undefined){
                    const todo ={
                        "title":title,
                        "id":uuidv4()
                    };
                    todos.push(todo)

                    res.writeHead(200,headers)
                    res.write(JSON.stringify({
                        "status":"success",
                        "data":todos
                    }))
                    res.end();
                }else{
                    errHandle(res)
                }
            }catch(error){
                errHandle(res, error)
            }
                
    });

    }else if (req.url =="/todos" && req.method =="DELETE"){
        todos.length = 0;
        res.writeHead(200,headers)
        res.write(JSON.stringify({
            "status":"success",
            "data":todos,
            "delete":"yes"
        }))
        res.end()
    }else if(req.url.startsWith("/todos/") && req.method =="DELETE"){
        const id =req.url.split("/").pop(); //篩選出最後的uuid
        const index = todos.findIndex(element => element.id ==id)
        // console.log(id, index)
        if(index !==-1){
            //有數值 可刪除
            todos.splice(index,1)
            res.writeHead(200,headers)
            res.write(JSON.stringify({
                "status":"success",
                "data":todos,
            }))
            res.end()
        }else{
            errHandle(res);
        }
        
    }else if(req.url.startsWith("/todos/") && req.method =="PATCH"){
        req.on('end',()=>{
            try{
                const todo = JSON.parse(body).title
                const id  = req.url.split('/').pop();
                const index = todos.findIndex(element => element.id == id)
                if (todo !== undefined && index !== -1){
                    //todo 和 index 都有值
                    todos[index].title = todo
                    res.writeHead(200,headers)
                    res.write(JSON.stringify({
                        "status":"success",
                        "data":todos,
                    }))
                    res.end()   // 要有這個才會res 過去
                }else{
                    errHandle(res);
                }
            }catch{
                errHandle(res);
            }
        })
    }else if((req.method =="OPTIONS")){
        res.writeHead(200,headers);
        res.end();

    }
    else{
        res.writeHead(404,headers)
        res.write(JSON.stringify({
            "status":"false",
            "message":"無此網站路由"
        }))
        res.end()
    }
    
}

const server = http.createServer(requestListener);
// server.listen(3005);
//process.env.PORT 雲服務 會先看支援哪個Port 號
server.listen(process.env.PORT || 3005);