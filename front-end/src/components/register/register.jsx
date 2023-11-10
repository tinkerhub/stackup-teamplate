import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signUpAction } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import "./register.css"
const RegisterComponent = ({signUp,user}) => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm();

    const password = useRef({});

    password.current = watch("password", "");


    const onSubmit = (data) => {
        console.log(data);
        signUp(data);
        reset();
    };

    useEffect(() => {
        if (user.login) {

          navigate('/', { replace: true });

        }
      }, [user.login, navigate]);

      console.log("signup user",user);


    return (
        <section className="view vh-100">
            <div className="container-reg h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card-view card text-black">
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        {
                                            !user.success? <p className="text-center text-danger fw-bold mb-5 mx-1 mx-md-4 mt-4">{user.message}</p> : <></>
                                        }

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-group w-100">
                                                    <input type="text" className="form-control" name="username" placeholder="Username"
                                                    {...register('username', { required: true })} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="email form-group w-100">
                                                    <input type="email" className="form-control" name="email" placeholder="Email"
                                                    {...register('email', { required: true })} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="from-group w-100">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        placeholder="password"
                                                        {...register('password', {
                                                            required: true,
                                                            minLength: {
                                                                value: 8,
                                                                message: "Password must have at least 8 characters"
                                                            }
                                                        })}
                                                    />

                                                    {errors.password && <p>{errors.password.message}</p>}

                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-group w-100">
                                                <input
                                                        type="password"
                                                        className="form-control"
                                                        name="cnfpassword"
                                                        placeholder="confirm password"
                                                        {...register('cnfpassword', {
                                                            required: true,
                                                            minLength: {
                                                            value: 8,
                                                            message: "Password must have at least 8 characters"
                                                            },
                                                            validate :(value)=> value === password.current || "Password do not match"
                                                        })}
                                                        />

                                                    {errors.cnfpassword && <p>{errors.cnfpassword.message}</p>}

                                                </div>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" name="tos" {...register('tos', { required: true })} />
                                                <label className="form-check-label">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
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
        signUp: (data) => dispatch(signUpAction(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterComponent);