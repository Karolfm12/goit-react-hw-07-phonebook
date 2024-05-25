import { addNewContact, fetchContacts } from 'operations';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const contactList = useSelector(state => state.contacts.contacts);
  const status = useSelector(state => state.contacts.status);

  useEffect(() => {
    if (status === '') {
      dispatch(fetchContacts());
    }
  }, [status, dispatch]);

  const handleOnChange = e => {
    if (e.target.name === 'firstName') {
      setFirstName(e.target.value);
    } else if (e.target.name === 'phoneNumber') {
      setPhoneNumber(e.target.value);
    }
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(addNewContact({ firstName, phoneNumber }));
      setFirstName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('adfs');
    }
  };

  return (
    <>
      <h1>PhoneBook</h1>
      <form onSubmit={handleOnSubmit}>
        <h2>Name:</h2>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleOnChange}
        />
        <h2>phone:</h2>
        <input
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleOnChange}
        />
        <div>
          <button type="submit">OK</button>
        </div>
      </form>
      <div>
        {status === 'succeeded' && (
          <ul>
            {contactList.map(val => {
              return (
                <li key={val.id}>
                  {val.name} <br></br>
                  {val.phone}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};
