import classes from "./ContactSummary.module.css";

const ContactSummary = (props) => {
    return (
        <>
            <div className={classes.Contact}>
                <div>First Name: {props.firstname}</div>
                <div>Last Name: {props.lastname}</div>
                <div>Birthday: {props.bday}</div>
                <div>{props.contactType}: {props.contactValue}</div>
            </div>
        </>
    )
}

export default ContactSummary;