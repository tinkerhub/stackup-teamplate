import React from "react";

const Card = ({name,phone,imageId}) => {
  console.log("card key : ",imageId);
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
                <button className="btn btn-danger">
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

export default Card;