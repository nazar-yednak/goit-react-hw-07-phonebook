import { useSelector } from 'react-redux';
import {
  getFilters,
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../redux/myContact/slice';
import {
  ContactList,
  DeleteButton,
  ContactItem,
  ContastText,
} from './ContactList.styled';

function Contact() {
  const { data } = useGetContactsQuery();
  const [deleteContact, result] = useDeleteContactMutation();
  const filter = useSelector(getFilters);
  const normalizeFilter = filter;

  const visibleContacts = data?.filter(contact =>
    contact?.name?.toLowerCase().includes(normalizeFilter)
  );

  return (
    <ContactList>
      {visibleContacts &&
        visibleContacts?.map(({ id, name, number }) => (
          <ContactItem key={id}>
            <ContastText>
              {name}: {number}
            </ContastText>
            <DeleteButton
              type="text"
              onClick={() => deleteContact(id)}
              disabled={result.isLoading}
            >
              Delete
            </DeleteButton>
          </ContactItem>
        ))}
      {visibleContacts?.length === 0 && <p>No contacts</p>}
    </ContactList>
  );
}

export default Contact;
