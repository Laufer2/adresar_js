import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import ContactSummary from '../../../components/ContactSummary/ContactSummary';
import Modal from "../../../components/UI/Modal/Modal";


const Contact = (props) => {

    const { id } = useParams()
    const [updating, setUpdating] = useState(false);
    const [cancel, setCancel] = useState(false);
    const contacts = useSelector(state => state.rootRdc.crudRdc.contacts);
    const navigate = useNavigate();

    useEffect(() => {
        if (cancel) {
            navigate("/contacts")
        }
    }, [cancel])

    const index = contacts.findIndex((contact) => contact.id === id);

    const updateCancelHandler = () => {
        setCancel(!cancel);
    };

    const updateContinueHandler = () => {
        setUpdating(!updating);
    };

    const btnTypes = [{
        name: "cancel",
        label: "Cancel",
        onClick: updateCancelHandler
    },
    {
        name: "update",
        label: "Update",
        onClick: updateContinueHandler
    }]

    return (
        <>
            <Modal show={updating} modalClosed={updateCancelHandler}>
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