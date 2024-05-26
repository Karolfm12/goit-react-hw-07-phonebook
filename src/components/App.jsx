import { setFilter } from 'contactSlice';
import { DeleteContact, addNewContact, fetchContacts } from 'operations';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const contactList = useSelector(state => state.contacts.contacts);
  const status = useSelector(state => state.contacts.status);
  const filterState = useSelector(state => state.contacts.filter);

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
    } else if (e.target.name === 'filter') {
      // setFilter(e.target.value);
      dispatch(setFilter(e.target.value));
    }
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    dispatch(addNewContact({ name: firstName, phone: phoneNumber }));
    setFirstName('');
    setPhoneNumber('');
  };

  const handleOnDelete = (e, index) => {
    e.preventDefault();
    dispatch(DeleteContact(index));
  };

  const filteredContacts = contactList.filter(val =>
    val.name.toLowerCase().includes(filterState.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <div className="left">
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
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contactList.map(val => (
                    <tr key={val.id}>
                      <td>{val.name}</td>
                      <td>{val.phone}</td>
                      <td>
                        <button onClick={e => handleOnDelete(e, val.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="right">
          <h2>Find Contact</h2>
          <input
            type="text"
            name="filter"
            value={filterState}
            onChange={handleOnChange}
          />
          {filterState && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map(val => (
                  <tr key={val.id}>
                    <td>{val.name}</td>
                    <td>{val.phone}</td>
                    <td>
                      <button onClick={e => handleOnDelete(e, val.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
