import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL =
  'https://6651b98d20f4f4c4427886be.mockapi.io/contacts/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get('/');
  console.log(response);
  return response.data;
});

export const addNewContact = createAsyncThunk(
  'contacts/addNew',
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post('/', newContact);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const DeleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactID, thrunkAPI) => {
    try {
      await axios.delete(`/${contactID}`);
      return contactID;
    } catch (e) {
      return thrunkAPI.rejectWithValue(e.message);
    }
  }
);
