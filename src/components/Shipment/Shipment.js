import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../../Login/useAuth';

const Shipment = () => {
    const auth = useAuth();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { console.log(data) }

  return (
    //"handleSubmit" will validate your inputs before invoking "onSubmit"
    //register your input into the hook by invoking the "register" function
    //include validation with required or other standard HTML validation rules
    //errors will return when field validation fails

    <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
      
      <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Enter Name"/>
      {errors.name && <span className="error">*Name is required</span>}

      <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Enter Email"/>
      {errors.email && <span className="error">*Email is required</span>}

      <input name="address" ref={register({ required: true })} placeholder="Enter Address"/>
      {errors.address && <span className="error">*Address is required</span>}

      <input name="city" ref={register({ required: true })} placeholder="Enter City"/>
      {errors.city && <span className="error">*City is required</span>}

      <input name="country" ref={register({ required: true })} placeholder="Enter Country"/>
      {errors.country && <span className="error">*Country is required</span>}

      <input name="zipCode" ref={register({ required: true })} placeholder="Enter Zip Code"/>
      {errors.zipCode && <span className="error">*Zip Code is required</span>}
      
      <input type="submit" />
    </form>
  
    );
};

export default Shipment;