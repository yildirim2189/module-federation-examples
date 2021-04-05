import React from "react";
import PropTypes from 'prop-types'
import Joi from 'joi'

const style = {
  background: "#800",
  color: "#fff",
  padding: 12,
};

export const Button = (props) => <button style={style}>{props.children}</button>;
const FederatedButton = (props) => {

  // specify prop schema
  const schema = Joi.object({
    children: [Joi.string(),Joi.array(),Joi.object()]
  })
  // memoize validation result
  const {error} = React.useMemo(()=>schema.validate(props),[])
  if(error) {
    // if it fails, return a fallback, or allow a fallback to be passed in
    return <span>Validation Error</span>
  }
  // if validation passes, expose the underlaying component.
  // this wrapper also allows <button> to change without the consumer having to re-implement it.
  // the wrapper can serve as an adapter
  return <Button>{props.children}</Button>

}
export default FederatedButton;
