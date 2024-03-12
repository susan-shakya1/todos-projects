import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TTodoCreateOutput } from "../data/Todotype";
import { useParams } from "react-router-dom";
import styles from "./GetId.module.css";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { useState } from "react";
// import { MdDescription } from "react-icons/md";

// type TTodosUpdate = {
//   id: string;
//   description: string;
//   createdAt: string;
//   title: string;
// };
type TCreateDescription = {
  description: string;
};
export function GetId() {
  const [isEditOpen, setisEditOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] =
    useState<TCreateDescription>();

  const qc = useQueryClient();

  const { id } = useParams();
  console.log("this is the Id", id);

  const { data, isLoading, isError, error } = useQuery({
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

  // seting a description value

  const updateMutation = useMutation<
    TTodoCreateOutput,
    Error,
    TCreateDescription
  >({
    mutationFn: async (body) => {
      const resp = await fetch(`http://localhost:8080/api/v1/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // title: body.title,
          description: body.description,
        }),
      });
      const data = await resp.json();

      return data;
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["/api/v1/todos/", id],
      });
    },
  });
  // handling a submit form
  const handleDescriptionFrom = async () => {
    await updateMutation.mutateAsync({
      description: selectedDescription || "",
    });
  };

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
          <hr className={styles.hrLines} />
          <div className={styles.descriptionWrapper}>
            {" "}
            {isEditOpen ? (
              <form
                className={styles.formToEdit}
                onSubmit={(e) => {
                  e.preventDefault();
                  setisEditOpen(false);
                  handleDescriptionFrom();
                }}
              >
                <textarea
                  name="description"
                  id="description"
                  className={styles.textareaEdit}
                  value={selectedDescription}
                  onChange={(e) => {
                    const values = e.target.value;
                    setSelectedDescription(values);
                  }}
                ></textarea>
                <div>
                  {" "}
                  <button type="submit" className={styles.updateBtn}>
                    update
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className={styles.description}> {data?.data.description}</p>
                <FaCreditCard
                  className={styles.editDescription}
                  onClick={(e) => {
                    e.preventDefault();
                    setisEditOpen(true);
                    setSelectedDescription(data?.data.description);
                  }}
                />
              </div>
            )}
          </div>
          <div className={styles.wrapperOfP}>
            <p>CreatedAT: {data?.data.createdAt}</p>
            <p>
              {data?.data.isComplete ? (
                <span className={styles.Completed}>Task completed</span>
              ) : (
                <span className={styles.progress}>On progress.....</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
