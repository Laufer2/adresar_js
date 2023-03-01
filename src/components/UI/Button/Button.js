import classes from "./Button.module.css"
import Btn from '@mui/material/Button';

const Button = (props) => {
  return (
    <Btn
      value={props.value}
      type={props.type}
      name={props.name}
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.onClick}
      variant={props.variant}
      size={props.size}>
      {props.children}
    </Btn>
  )
};

Button.defaultProps = {
  type: "button",
  disabled: false
}

export default Button;
