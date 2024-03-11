import styles from "./EditModel.module.css";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCreateTodoInput, TTodoCreateOutput } from "../data/Todotype";
import { useEffect, useState } from "react";

// update the todo
export function EditModel({
  isModelOpen,
  setIsModelOpen,
  title,
  description,
  id,
}: {
  isModelOpen: boolean;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  id: string;
}) {
  const [titleState, setTitleState] = useState(title);
  const [descriptionState, setDescriptionState] = useState(description);
  const qc = useQueryClient();

  useEffect(() => {
    setTitleState(title);
    setDescriptionState(description);
  }, [title, description]);

  const updateMutation = useMutation<
    TTodoCreateOutput,
    Error,
    TCreateTodoInput
  >({
    mutationFn: async (body) => {
      const resp = await fetch(`http://localhost:8080/api/v1/todos/${id}`, {
        method: "PATCH",
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

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["/api/v1/todos/"],
      });
    },
  });

  // handleUpdate funciton
  const handleUpdata = async () => {
    await updateMutation.mutateAsync({
      title: titleState,
      description: descriptionState,
    });
  };

  return (
    <>
      {isModelOpen ? (
        <div className={styles.editBody}>
          <form>
            <label htmlFor="">Title:</label>
            <input
              type="text"
              id="title"
              className="title"
              placeholder="Enter your Title"
              value={titleState}
              onChange={(e) => {
                const value = e.target.value;
                setTitleState(value);
              }}
            />
            <label htmlFor="">Description:</label>
            <input
              type="text"
              id="description"
              className="description"
              placeholder="Description"
              value={descriptionState}
              onChange={(e) => {
                const value = e.target.value;
                setDescriptionState(value);
              }}
            />
            <IoClose
              className={styles.closeBtn}
              onClick={() => {
                setIsModelOpen(false);
              }}
            />
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("this is tyher update .....btn");
                  handleUpdata();
                  setIsModelOpen(false);
                }}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
