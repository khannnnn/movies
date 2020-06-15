function Get(url){
    return fetch(url,{
        method: "GET",
        headers: {
            Authorization: "AuthStr"
        }
    }).then((res=>{
        res.json().then((data)=>{
            console.log("response", data)
        })
    }))
}

export default Get;