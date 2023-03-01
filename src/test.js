import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Test = () => {
   const xtoken = localStorage.getItem("X-token");
   const navigate = useNavigate();

   useEffect(() => {
      if (!xtoken) {
         navigate('/');
      }
   }, [xtoken])

   return (
      <div>
         testiiiiiiiiiiiiiiiin
      </div>
   )
}

export default Test;