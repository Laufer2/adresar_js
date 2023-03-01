import { Typography, Box } from "@mui/material";

const TabPanel = (props) => {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 2 }}>
               <Typography component={'span'}>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

export default TabPanel;