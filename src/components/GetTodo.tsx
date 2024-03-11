import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TGetAllTodosOutput, TGetTodoOutput } from "../data/Todotype";
import styles from "./GetTodo.module.css";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { EditModel } from "./EditModel";
import Switch from "@mui/material/Switch";

export function GetTodo() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedId, setSeletedId] = useState("");
  const [checked, setChecked] = useState<boolean>();

  const qc = useQueryClient();
  type TToggleInput = { id: string };

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
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: [`/api/v1/todos/`],
      });
    },
  });

  const handleDeleteBtn = async (id: string) => {
    await deleteTodos.mutateAsync(id);
  };
  const switchMutation = useMutation<TGetTodoOutput, Error, TToggleInput>({
    mutationFn: async (body) => {
      const res = await fetch(
        `http://localhost:8080/api/v1/todos/toggle/status/${body.id}`,
        {
          method: "PATCH",
          headers: {
            accept: "applications/json",
          },
        }
      );
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
  const handleSwitch = async (id: string) => {
    await switchMutation.mutateAsync({ id });
    setChecked(checked);
  };

  if (isLoading) {
    return <p>Loading......</p>;
  }
  if (isError) {
    return <p>Loading todos errors: {error.message || ""}</p>;
  }

  const selectedTodo = data?.data.find((todo) => {
    return todo._id === selectedId;
  });

  console.log("this is the selected todo......", selectedTodo);

  return (
    <div className={styles.todoMain}>
      {data?.data.map((todo) => (
        <div key={todo._id} className={styles.todosContainer}>
          <div className={styles.todoBox}>
            <Link to={`/todos/${todo._id}`} className={styles.titlelink}>
              <h2>
                <span>Title:-</span> {todo.title}
              </h2>
            </Link>
            <p className={styles.description}>
              <span>Description:-</span>
              {todo.description}
            </p>
          </div>

          <div className={styles.buttons}>
            <Switch
              checked={todo.isComplete}
              size="small"
              onChange={(e) => {
                const checked = e.target.checked;

                handleSwitch(todo._id);
                setChecked(checked);
              }}
            />
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
                setSeletedId(todo._id);
              }}
            />
          </div>
        </div>
      ))}
      {selectedId ? (
        <EditModel
          isModelOpen={isModelOpen}
          setIsModelOpen={setIsModelOpen}
          description={selectedTodo?.description || ""}
          title={selectedTodo?.title || ""}
          id={selectedId}
        />
      ) : null}
    </div>
  );
}
