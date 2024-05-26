import { createSlice } from '@reduxjs/toolkit';
import { addNewContact, fetchContacts } from 'operations';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    status: '',
    error: null,
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
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
      });
  },
});

// export const { addContact } = contactSlice.actions;
export default contactSlice.reducer;
