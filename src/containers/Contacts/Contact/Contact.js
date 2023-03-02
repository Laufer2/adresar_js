import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import ContactSummary from '../../../components/ContactSummary/ContactSummary';
import Modal from "../../../components/UI/Modal/Modal";
import { deleteContact } from '../../../store/reducers/crudRdc';


const Contact = (props) => {

    const { id } = useParams()
    const [updating, setUpdating] = useState(false);
    const [canceling, setCanceling] = useState(false);
    const [deleting, setDeleting] = useState(false)
    const contacts = useSelector(state => state.rootRdc.crudRdc.contacts);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("X-token");

    useEffect(() => {
        if (canceling) {
            navigate("/contacts")
        }
    }, [canceling])

    //Updating contact index
    const index = contacts.findIndex((contact) => contact.id === id);

    const cancelHandler = () => {
        setCanceling(!canceling);
    };

    const deleteHandler = () => {
        dispatch(deleteContact({ token: token, key: contacts[index].key }))
        console.log("index ", contacts[index].key)
        setDeleting(!deleting);
    };

    const updateHandler = () => {
        setUpdating(!updating);
    };

    const btnTypes = [{
        name: "cancel",
        label: "Cancel",
        onClick: cancelHandler
    },
    {
        name: "delete",
        label: "Delete",
        onClick: deleteHandler
    },
    {
        name: "update",
        label: "Update",
        onClick: updateHandler
    }]

    return (
        <>
            <Modal show={updating} modalClosed={cancelHandler}>
                <div>Forma za ažuriranje kontakta</div>
            </Modal>
            <ContactSummary
                firstname={contacts[index].firstname}
                lastname={contacts[index].lastname}
                bday={contacts[index].bday}
                contactType={contacts[index].contactType}
                contactValue={contacts[index].contact}
            />
            {btnTypes.map(btnType => (
                <Button
                    key={btnType.name}
                    name={btnType.name} onClick={btnType.onClick}
                >{btnType.label}</Button>
            ))}
        </>
    );
}

export default Contact;