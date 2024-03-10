import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "./Navbar";
import styles from "./TodoUI.module.css";
import { useState } from "react";
import { TCreateTodoInput, TTodoCreateOutput } from "../data/Todotype";
import { GetTodo } from "./GetTodo";

// creating a todos and posting the data into a backend
export function TodoUI() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodoMutation = useMutation<
    TTodoCreateOutput,
    Error,
    TCreateTodoInput
  >({
    mutationFn: async (body) => {
      const resp = await fetch("http://localhost:8080/api/v1/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: body.title,
          description: body.description,
        }),
      });
      const data = await resp.json();

      return data;
    },
    onSuccess: (data) => {
      console.log("data...", data);
      qc.invalidateQueries({
        queryKey: ["/api/v1/todos/"],
      });
      setTitle("");
      setDescription("");
    },
  });

  const handleTodo = async () => {
    console.log("data..", title, description);

    await addTodoMutation.mutateAsync({
      title: title,
      description: description,
    });
  };

  return (
    <div className={styles.fullContainer}>
      <Navbar />
      <div className={styles.formcontainer}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleTodo();
          }}
        >
          <div className={styles.formbody}>
            <input
              type="text"
              id="title"
              className="title"
              placeholder="Enter your Title"
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
              }}
            />

            <input
              id="description"
              className="description"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                const value = e.target.value;
                setDescription(value);
              }}
            />
            <button type="submit" className={styles.addBtn}>
              Add
            </button>
          </div>
          <hr />

          <GetTodo />
        </form>
      </div>
    </div>
  );
}
