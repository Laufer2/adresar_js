import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import ContactSummary from '../../../components/ContactSummary/ContactSummary';
import Modal from "../../../components/UI/Modal/Modal";


const Contact = (props) => {
    //potrebno mijenjati stanje radi rerenderiranja stranice jer se modal pojavljuje 
    //i skriva na istoj stranici gdje su contact podaci
    const { id } = useParams()
    console.log(id)
    const [updating, setUpdating] = useState(false);
    const contacts = useSelector(state => state.rootRdc.crudRdc.contacts);

    const index = contacts.findIndex((contact) => contact.id === id);

    const updateCancelHandler = () => {
        setUpdating(false);
    };

    const updateContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/contacts');
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