export async function CreateApi(){
    const response =await fetch("http://localhost:8080/api/v1/todos/",{
        method:'POST',
        headers:{
        "content-Type":"application/json"   
        },
        
    })
    const data = response.json()
    console.log("the data is fetching ", data)
    return data

}