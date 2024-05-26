import { createSlice } from '@reduxjs/toolkit';
import { DeleteContact, addNewContact, fetchContacts } from 'operations';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    status: '',
    error: null,
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts.push(action.payload);
      })
      .addCase(addNewContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(DeleteContact.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(DeleteContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload
        );
        state.contacts.splice(index, 1);
      })
      .addCase(DeleteContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// export const { addContact } = contactSlice.actions;
export const { setFilter } = contactSlice.actions;
export default contactSlice.reducer;
