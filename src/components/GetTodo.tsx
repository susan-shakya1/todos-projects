import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TGetAllTodosOutput } from "../data/Todotype";
import styles from "./GetTodo.module.css";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { EditModel } from "./EditModel";
export function GetTodo() {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const qc = useQueryClient();
  const { data, isLoading, isError, error } = useQuery<
    TGetAllTodosOutput,
    Error
  >({
    queryKey: ["/api/v1/todos/"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/api/v1/todos", {
        method: "GET",
        headers: {
          "content-Text": "applications/json",
        },
      });
      const data = await response.json();
      return data;
    },
  });
  console.log(data, "the data........");

  // fetching a delete api
  const deleteTodos = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`http://localhost:8080/api/v1/todos/${id}`, {
        method: "DELETE",
        headers: {
          "content-Text": "applications/json",
        },
      });
      const data = await res.json();

      return data;
    },
    onSuccess: (data) => {
      console.log("checking ........", data);
      qc.invalidateQueries({
        queryKey: [`/api/v1/todos/`],
      });
    },
  });

  if (isLoading) {
    return <p>Loading......</p>;
  }
  if (isError) {
    return <p>Loading todos errors: {error.message || ""}</p>;
  }

  const handleDeleteBtn = async (id: string) => {
    console.log("the checking a dekete", id);
    await deleteTodos.mutateAsync(id);
  };
  return (
    <div className={styles.todoMain}>
      {data?.data.map((todo) => (
        <div key={todo._id} className={styles.todosContainer}>
          <div className={styles.todoBox}>
            <Link to={`/todos/${todo._id}`} className={styles.titlelink}>
              <h4>
                <span>Title:-</span> {todo.title}
              </h4>
            </Link>
            <p>
              <span>Description:-</span>
              {todo.description}
            </p>
            <p>
              {" "}
              <span>CreatedAt:-</span> {todo.createdAt}
            </p>
          </div>
          <div className={styles.buttons}>
            <MdDelete
              className={styles.btn1}
              onClick={() => {
                console.log("checking delete btn working.......");
                handleDeleteBtn(todo._id);
              }}
            />

            <MdEdit
              className={styles.btn2}
              onClick={() => {
                setIsModelOpen(true);
              }}
            />
          </div>
        </div>
      ))}
      <EditModel isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} />
    </div>
  );
}
