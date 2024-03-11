import { useQuery } from "@tanstack/react-query";
import { TGetTodoOutput } from "../data/Todotype";
import { useParams } from "react-router-dom";
import styles from "./GetId.module.css";
import { Navbar } from "./Navbar";

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
    <>
      <Navbar />
      <div
        style={{
          color: "white",
        }}
        className={styles.mainContainer}
      >
        <div className={styles.container}>
          {/* <h3> Title: {data?.data.title}</h3>
        <p>Id: {data?.data._id}</p>
        <p> Description: {data?.data.description}</p>
        <p>CreatedAt{data?.data.createdAt}</p> */}
          <div className={styles.Title}>
            <p>Title: </p>
            <p>Id: </p>
            <p>Description: </p>
            <p>Created At: </p>
            <p>IsCompleted: </p>
          </div>
          <div className={styles.body}>
            <p> {data?.data.title}</p>
            <p> {data?.data._id}</p>
            <p> {data?.data.description}</p>
            <p>{data?.data.createdAt}</p>
            <p>{data?.data.isComplete ? "true" : "false"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
