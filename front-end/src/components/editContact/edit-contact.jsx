import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from "react-router-dom";
import {editContactAction } from "../../redux/actions/actions";
import "./edit-contact.css";

const EditContactComponent = ({user,updateContact}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const contact = location.state;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        data.userId = contact.userId;
        data.contactId = contact.contactId;
        console.log("edit contact form : ",data);

        updateContact(data);
        reset();
    };

    useEffect(() => {
        if (!user.login) {

          navigate('/', { replace: true });

        }

        if(user.edit_contact)
        {
            navigate('/', { replace: true });
        }
      }, [user.login, navigate,user.edit_contact]);

    return (
        <section className="view vh-100">
            <div className="container-reg h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card-view card text-black">
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Edit Contact</p>

                                        {
                                            !user.success? <p className="text-center text-danger fw-bold mb-5 mx-1 mx-md-4 mt-4">{user.message}</p> : <></>
                                        }

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-group w-100">
                                                    <input type="text" className="form-control" name="name" placeholder="Name"
                                                    {...register('name', { required: true })}
                                                    defaultValue={contact.name} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="email form-group w-100">
                                                    <input type="text" className="form-control" name="phone" placeholder="Mobile No"
                                                    {...register('phone', { required: true })} defaultValue={contact.phone}/>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="email form-group w-100">
                                                    <input type="text" className="form-control" name="email" placeholder="Email"
                                                    {...register('email', { required: true })} defaultValue={contact.email}/>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="email form-group w-100">
                                                    <input type="text" className="form-control" name="address" placeholder="Address"
                                                    {...register('address', { required: true })} defaultValue={contact.address}/>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">submit</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = ({user}) => {

    return{user}
}

const mapDispatchToProps = dispatch => {

    return {
        updateContact : (data) => dispatch(editContactAction(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditContactComponent);