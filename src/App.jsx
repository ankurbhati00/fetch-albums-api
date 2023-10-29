import style from "./App.module.css";
import { AlbumCard } from "./components/albumCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AlbumModal } from "./components/albumModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { albumSelectors, fetchData } from "./redux/reducers/album.reducer";
import { deleteAlbum } from "./redux/reducers/album.reducer";
function App() {
  const albums = useSelector(albumSelectors.selectAll);
  const dispatch = useDispatch();
  //fetch data by createAsyncThunk
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  //delete album
  const handleDelete = (id) => {
    dispatch(deleteAlbum(id));
  };

  

  return (
    <>
      <nav className={style.nav}>
        Albums
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </nav>
      {/* take album name from user */}
      <AlbumModal  />
      <div className={style.albumcard_container}>
        {albums.map((e) => (
          <AlbumCard key={e.id} data={e} handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}

export default App;
