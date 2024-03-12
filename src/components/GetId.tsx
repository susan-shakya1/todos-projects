import { useQuery } from "@tanstack/react-query";
import { TGetTodoOutput } from "../data/Todotype";
import { useParams } from "react-router-dom";
import styles from "./GetId.module.css";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { useState } from "react";

type TTodosUpdate = {
  id: string;
  description: string;
  createdAt: string;
  title: string;
};

export function GetId() {
  const [isEditOpen, setisEditOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] =
    useState<TTodosUpdate | null>();

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

  const handleTextarea = (value: string) => {
    setSelectedDescription((preval) => {
      if (preval) {
        return {
          ...preval,
          description: value,
        };
      } else {
        return preval;
      }
    });
  };

  const handleDescriptionFrom = () => {
    if (selectedDescription?.id === data?.data._id) {
      return selectedDescription;
    } else {
      data?.data.description;
    }
  };
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
                  value={data?.data.description}
                  onChange={(e) => {
                    const value = e.target.value;
                    console.log("this is the selected value", value);
                    handleTextarea(value);
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
              <p className={styles.description}> {data?.data.description}</p>
            )}
            <FaCreditCard
              className={styles.editDescription}
              onClick={(e) => {
                e.preventDefault();
                setisEditOpen(true);
                setSelectedDescription({
                  id: data?.data._id,
                  title: data?.data.title,
                  description: data?.data.description,
                  createdAt: data?.data.createdAt,
                });
              }}
            />
          </div>
          <div className={styles.wrapperOfP}>
            <p>CreatedAT: {data?.data.createdAt}</p>
            <p>
              {data?.data.isComplete ? " Task Completed" : " On progress....."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
