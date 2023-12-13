import React,{useEffect} from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { loginAction } from '../../redux/actions/actions';
import "./login.css";

const LoginComponent = ({loginSubmit,user}) => {

    //console.log(user);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        loginSubmit(data);
        reset();
    };

    useEffect(() => {
        if (user.login) {
          // User is logged in, navigate to another route
          navigate('/view', { replace: true });
        }
      }, [user.login, navigate]);

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                            </div>

                            <div className="email form-group mt-4">
                                <input type="text" className="form-control" name="email" placeholder="Email or Username"  {...register('email', { required: true })}/>
                            </div>
                            <div className="password form-group mt-3">
                                <input type="password" className="form-control" name="password" placeholder="Password"  {...register('password', { required: true })}/>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" name='remember' {...register('remember', { required: false })} />
                                    <label className="form-check-label">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="buttons text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg">Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                                    className="link-danger">Register</Link></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <div
                className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>
            </div>
        </section>
    );
}

const mapDispatchToProps = dispatch => {
    return{
        loginSubmit : (data) => dispatch(loginAction(data))
    }
}

const mapStateToProps = ({user}) => {

    return {user};
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);