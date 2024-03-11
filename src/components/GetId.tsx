import { useQuery } from "@tanstack/react-query";
import { TGetTodoOutput } from "../data/Todotype";
import { useParams } from "react-router-dom";
import styles from "./GetId.module.css";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";

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
          <Link to="/todos">
            <button className={styles.backBtn}>Go Back</button>
          </Link>

          <h1 className={styles.title}> Title: {data?.data.title}</h1>
          <p className={styles.id}>Id: {data?.data._id}</p>
          <hr />
          <p className={styles.description}> {data?.data.description}</p>
          <div className={styles.wrapperOfP}>
            <p>CreatedAT: {data?.data.createdAt}</p>
            <p>{data?.data.isComplete ? "Completed" : "progress....."}</p>
          </div>
        </div>
      </div>
    </>
  );
}
