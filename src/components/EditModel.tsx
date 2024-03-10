import styles from "./EditModel.module.css";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCreateTodoInput, TTodoCreateOutput } from "../data/Todotype";

export function EditModel({
  isModelOpen,
  setIsModelOpen,
  title,
  description,
  id,
}) {
  const qc = useQueryClient();
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
    onSuccess: (data) => {
      console.log("the data is update fetch", data);
      qc.invalidateQueries({
        queryKey: ["api/v1/todos/"],
      });
    },
  });
  const handleUpdata = async () => {
    await updateMutation.mutateAsync({
      title: title,
      description: description,
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
              onChange={(e) => {
                const value = e.target.value;
                console.log("vale..", value);
              }}
            />
            <label htmlFor="">Description:</label>
            <input
              type="text"
              id="description"
              className="description"
              placeholder="Description"
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
