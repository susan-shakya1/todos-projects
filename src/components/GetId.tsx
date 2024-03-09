import { useQuery } from "@tanstack/react-query";
import { TGetAllTodosOutput } from "../data/Todotype";

export function GetId() {
  const { data, isLoading, isError, error } = useQuery<TGetAllTodosOutput>({
    queryKey: ["/api/v1/todos/"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/api/v1/todos/`, {
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
    <div>
      {data?.data.map((todo) => (
        <div key={todo._id}>
          <h4>{todo.title}</h4>
          <h4>{todo.description}</h4>
        </div>
      ))}
    </div>
  );
}
