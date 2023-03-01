import { CardContent, Card } from "@mui/material";
import ContactSummary from "../ContactSummary/ContactSummary";

const Favorite = (props) => {

   return (
      <Card >
         <CardContent>
            <ContactSummary
               firstname={props.firstname}
               lastname={props.lastname}
               bday={props.bday}
               contactType={props.contactType}
               contactValue={props.contactValue}
            />
         </CardContent>
      </Card>
   );

}

export default Favorite;