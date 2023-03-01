import { useState } from 'react';
import Button from "../../../components/UI/Button/Button";
import ContactSummary from '../../../components/ContactSummary/ContactSummary';
import Modal from "../../../components/UI/Modal/Modal";
//import Layout from '../../../hoc/Layout';

const Contact = (props) => {
    //potrebno mijenjati stanje radi rerenderiranja stranice jer se modal pojavljuje 
    //i skriva na istoj stranici gdje su contact podaci
    const [updating, setUpdating] = useState(false);

    // const purchaseHandler = () => {
    //     if (props.isAuthenticated) {
    //         setPurchasing(true);
    //     } else {
    //         props.onSetAuthRedirectPath('/checkout');
    //         props.history.push('/auth');
    //     }
    // };

    const updateCancelHandler = () => {
        setUpdating(false);
    };

    const updateContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/contacts/:id');
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
                firstname={props.firstname}
                lastname={props.lastname}
                bday={props.bday}
                contactType={props.contactType}
                contactValue={props.contactValue}
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