import { useRef, useState } from "react";
import { albumSelectors, saveAlbum } from "../redux/reducers/album.reducer";
import { useDispatch, useSelector } from "react-redux";


export function AlbumModal() {
  const [albumTitle, setAlbumTitle] = useState();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const value = useSelector(albumSelectors.selectTotal);

  //get input data and set to state
  const handleInputTitle = () => {
    setAlbumTitle(inputRef.current.value);
  };

  //add album to database
  const addAlbum = () => {
    dispatch(saveAlbum({id:value+1, title:albumTitle, userId:1}));
    inputRef.current.value = '';
    console.log(albumTitle);
  };

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Enter Album Name
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* input for album name */}
              <input
                onChange={handleInputTitle}
                ref={inputRef}
                type="text"
                className=" form-control input-lg"
                placeholder="Text..."
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary "
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={addAlbum}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
