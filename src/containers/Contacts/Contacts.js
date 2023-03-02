import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

import Table from '../../components/Table/Table';
import Button from '../../components/UI/Button/Button';
import Modal from "../../components/UI/Modal/Modal";
import { getContacts } from '../../store/reducers/crudRdc';
import ContactForm from './ContactForm/ContactForm';

const Contacts = () => {
    const [addNew, setAddNew] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const contacts = useSelector(state => state.rootRdc.crudRdc.contacts);
    const isLoading = useSelector(state => state.rootRdc.crudRdc.isLoadin);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const xtoken = localStorage.getItem("X-token");
    const userId = localStorage.getItem("userId");

    const requestParams = {
        token: xtoken,
        userId: userId,
    }

    useEffect(() => {
        if (!xtoken) {
            navigate('/');
        }
    }, [xtoken, navigate])

    useEffect(() => {
        dispatch(getContacts(requestParams));
        console.log("ode po podatke")
        setIsFetched(!isFetched)
    }, [])

    if (isLoading) {
        return <RingLoader color="rgba(54, 107, 214, 1)" />
    }

    let row = [];
    for (let fav in contacts) {
        if (fav.isFavorite === "true") {
            row.push(fav);
        }
    }

    const addNewHandler = () => {
        setAddNew(true);
    }

    const addNewCancelHandler = () => {
        setAddNew(false);
    }

    const addNewContactHandler = () => {
        setIsAdded(!isAdded);
    }

    return (<>

        <Button name="addnew" onClick={addNewHandler}>Add new</Button>

        {!isFetched ?
            <RingLoader color="rgba(54, 107, 214, 1)" /> :
            <Table rows={contacts} token={xtoken} userId={userId} />
        }
        <Modal
            show={addNew}
            modalClosed={addNewCancelHandler}
        >
            <ContactForm onClick={addNewContactHandler} />
        </Modal>

        <Outlet context={row} />

    </>)
}

export default Contacts;