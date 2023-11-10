import React from "react";
import { deleteContactAction } from "../../redux/actions/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({name,phone,contactId,userId,deleteContact,email,address}) => {

  const edit_data = {
    userId : userId,
    contactId : contactId,
    name : name,
    email : email,
    address : address,
    phone : phone
  }

  function handleDelete()
  {
    const data = {
      userId : userId,
      contactId : contactId
    }
    console.log("handle delete : ",data);

    deleteContact(data);
  }

  return (
    
    <div className="row mt-4">
      <div className="col-md-12 mx-auto">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src="contact.png" // Replace with the actual image URL
                className="card-image"
                alt="Profile"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="name card-title">{name}</h5>
                <p className="phone card-text">{phone}</p>
                <button className="btn btn-danger" onClick={() => handleDelete()}>
                  <i className="btn-trash fas fa-trash"></i>
                </button>
                <Link to="/edit-contact" state={edit_data} className="btn btn-primary ml-2 edit-btn">
                <i className="fas fa-edit"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch =>{

  return{
    deleteContact : (data) => dispatch(deleteContactAction(data))
  }
}

export default connect(null,mapDispatchToProps)(Card);