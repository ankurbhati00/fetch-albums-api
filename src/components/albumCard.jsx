import style from "./styles/albumCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { updateAlbum } from "../redux/reducers/album.reducer";
import { useDispatch } from "react-redux";

export function AlbumCard({ data, handleDelete }) {
  const [title, setTitle] = useState(data.title);
  const albumNameRef = useRef();
  const dispatch = useDispatch();

  //edit album name
  const handleAlbumName = () => {
    albumNameRef.current.focus();
  };

  //changed text
  const saveTitle = () => {
    const updatetedTitle = albumNameRef.current.value;
      setTitle(updatetedTitle);
      //update title on db
      dispatch(updateAlbum({...data,title:updatetedTitle}))
      console.log(updatetedTitle)
  };

  return (
    <div className={style.container}>
      {title !== data.title ? (
        <div className={style.save_cancel_container}>
          <button id={style.save_btn} onClick={saveTitle}>Save </button>
          <button id={style.cancel_btn} onClick={() => setTitle(data.title)}>
            Cancel
          </button>
        </div>
      ) : undefined}
      <div className={style.action_buttons_container}>
        <FontAwesomeIcon
          onClick={() => handleDelete(data.id)}
          className={style.action_buttons}
          icon={faTrashCan}
        />
        <FontAwesomeIcon
          onClick={handleAlbumName}
          className={style.action_buttons}
          icon={faPen}
        />
      </div>
      <img
        className={style.image}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAk4sQpyzK0kflOMIyZkNm7nfSc2e5uTH_jg&usqp=CAU"
      ></img>
      <textarea
        value={title}
        ref={albumNameRef}
        onChange={(e) => setTitle(e.target.value)}
        className={style.album_name}
      >
        {/* {title} */}
      </textarea>
    </div>
  );
}
