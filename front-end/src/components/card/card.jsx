import React from "react";
import { deleteContactAction } from "../../redux/actions/actions";
import { connect } from "react-redux";

const Card = ({name,phone,contactId,userId,deleteContact}) => {

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
      <div className="col-md-4 mx-auto">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src="profile-pic.jpg" // Replace with the actual image URL
                className="card-img"
                alt="Profile"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{phone}</p>
                <button className="btn btn-danger" onClick={() => handleDelete()}>
                  <i className="fas fa-trash"></i>
                </button>
                <button className="btn btn-primary ml-2">
                  <i className="fas fa-edit"></i>
                </button>
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