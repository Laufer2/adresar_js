import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RingLoader } from 'react-spinners';

import Button from "../../../components/UI/Button/Button";
import ContactSummary from '../../../components/ContactSummary/ContactSummary';
import Modal from "../../../components/UI/Modal/Modal";
import { patchContact } from '../../../store/reducers/crudRdc';

const Contact = (props) => {

    const { id } = useParams()
    const [updating, setUpdating] = useState(false);
    const [canceling, setCanceling] = useState(false);
    const contacts = useSelector(state => state.rootRdc.crudRdc.contacts);
    const isLoading = useSelector(state => state.rootRdc.crudRdc.isLoading);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("X-token");
    const userId = localStorage.getItem("userId");


    useEffect(() => {
        if (canceling) {
            navigate("/contacts")
        }
    }, [canceling])

    if (isLoading) {
        return <RingLoader color="rgba(54, 107, 214, 1)" />
    }

    //Updating contact index
    const index = contacts.findIndex((contact) => contact.id === id);

    const cancelHandler = () => {
        setCanceling(!canceling);
    };

    const deleteHandler = () => {
        dispatch(patchContact({ token: token, key: contacts[index].key, userId: userId, method: "DELETE" }))
        console.log("userId ", userId)
        navigate("/contacts")
        //setDeleting(!deleting);
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