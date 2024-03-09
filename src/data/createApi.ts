
 
 export async function CreateApi(body){
    const response =await fetch("http://localhost:8080/api/v1/todos/",{
        method:'POST',
        headers:{
        "content-Type":"application/json"   
        },
        body: JSON.stringify({
            title: body.title,
            description: body.description,
          }),
    })
    const data = response.json()
    console.log("the data is fetching ", data)
    return data

}