import { useQuery } from "@tanstack/react-query";
import { TGetTodoOutput } from "../data/Todotype";
import { useParams } from "react-router-dom";

export function GetId() {
  const { id } = useParams();
  console.log("this is the Id", id);
  const { data, isLoading, isError, error } = useQuery<TGetTodoOutput>({
    queryKey: ["/api/v1/todos/", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/api/v1/todos/${id}`, {
        method: "GET",
        headers: {
          "content-Text": "application/json",
        },
      });
      const data = response.json();
      console.log("the get data by id", data);
      return data;
    },
  });
  if (isLoading) {
    return <p>Loading ......</p>;
  }
  if (isError) {
    return console.log("something is error", error);
  }
  return (
    <div
      style={{
        color: "white",
      }}
    >
      <h3> Title: {data?.data.title}</h3>
      <p>Id: {data?.data._id}</p>
      <p> Description: {data?.data.description}</p>
      <p>CreatedAt{data?.data.createdAt}</p>
    </div>
  );
}
