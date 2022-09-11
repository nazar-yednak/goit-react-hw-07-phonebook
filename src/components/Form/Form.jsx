import { memo } from 'react';
import { FormPhonebook, FormInput, FormButton } from './Form.styled';
import { useGetContactsQuery } from '../../redux/myContact/slice';
import { useAddContactsMutation } from '../../redux/myContact/slice';
function Form() {
  const { data } = useGetContactsQuery();
  const [addContact] = useAddContactsMutation();
  const contacts = data;

  const handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const number = event.target.number.value;
    const existingContact = contacts?.find(contact => name === contact.name);
    if (existingContact) {
      return alert(`${name} is already in contacts`);
    } else {
      const contact = {
        name,
        number,
      };
      addContact(contact);
    }

    event.target.reset();
  };
  return (
    <div>
      <FormPhonebook onSubmit={handleSubmit}>
        <label>Name</label>
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label>Number</label>
        <FormInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <FormButton type="submit">add contact</FormButton>
      </FormPhonebook>
    </div>
  );
}

export default memo(Form);
