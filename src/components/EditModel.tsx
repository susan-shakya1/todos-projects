import styles from "./EditModel.module.css";
import { IoClose } from "react-icons/io5";

export function EditModel({ isModelOpen, setIsModelOpen }) {
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
              <button>Update</button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
