import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "../card/card";
import { contactFetchAction } from "../../redux/actions/actions";
import "./view.css";

const UserView = ({ user ,fetchContacts}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.login) {
      // User is not logged in, navigate to another route
      navigate("/", { replace: true });
      return; // Return early to prevent further execution
    }
  
    const userId = user.user?.id; // Use optional chaining to safely access user.user.id
  
    if (userId !== undefined) {
      fetchContacts(userId);
    }

  }, [user.login, navigate]);

  if(user.delete_contact)
  {
    fetchContacts(user.user.id);
    user.delete_contact = false;
  }

  if(user.edit_contact)
  {
    fetchContacts(user.user.id);
    user.edit_contact = false;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search" />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          <Link to="/add-contact" className="btn btn-success btn-block">Add Contact</Link>
        </div>
      </div>
      {user.contacts && user.contacts.length > 0 ? (
        user.contacts.map((item) => (
          <Card key={item._id} name={item.name} phone={item.phone} userId={user.user.id} contactId={item._id} email={item.email} address={item.address}/>
        ))
      ) : (
        <p>No contacts available</p>
      )}
      </div>
  );
};

const mapDispatchToProps = dispatch => {
    return{
        fetchContacts : (id) => dispatch(contactFetchAction(id))
    }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
