import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

//entity adapter for storage
const albumsAdapter = createEntityAdapter({
  selectId: (elm) => elm.id,
  sortComparer: (a, b) => b.id - a.id,
});

//async funct to fetch the data from api
export const fetchData = createAsyncThunk(
  "albums/fetch",
  async (_, { dispatch }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    const data = await response.json();
    return data;
  }
);

//set album to databse
export const saveAlbum = createAsyncThunk(
  "albums/save",
  async (data, { dispatch }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).catch((err) => console.log(err));
    const responseData = await response.json();
    return { data: responseData, ok: response.ok };
  }
);

//delete from database
export const deleteAlbum = createAsyncThunk(
  "albums/delete",
  async (id, { dispatch }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${id}`,
      {
        method: "DELETE",
      }
    ).catch((err) => console.log(err));

    return { id, ok: response.ok };
  }
);

//update from datebase
export const updateAlbum = createAsyncThunk(
  "albums/update",
  async (data, { dispatch }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${data.id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).catch((err) => console.log(err));
    // const responseData = await response.json();
    return { data: data, ok: response.ok };
  }
);

//slice of the albums state
const albumSlice = createSlice({
  name: "albums",
  initialState: albumsAdapter.getInitialState({ loading: true }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        albumsAdapter.addMany(state, payload);
      })
      .addCase(deleteAlbum.fulfilled, (state, { payload }) => {
        if (payload.ok) {
          albumsAdapter.removeOne(state, payload.id);
        }
      })
      .addCase(updateAlbum.fulfilled, (state, { payload }) => {
        console.log(">>>> " + payload);
        albumsAdapter.updateOne(state, {
          id: payload.data.id,
          changes: { title: payload.data.title },
        });
      })
      .addCase(saveAlbum.fulfilled, (state, { payload }) => {
        albumsAdapter.addOne(state, payload.data);
      });
  },
});

//reducer
export const albumReducer = albumSlice.reducer;
//selectors
export const albumSelectors = albumsAdapter.getSelectors(
  (state) => state.albums
);
