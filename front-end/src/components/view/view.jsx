import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "../card/card";
import { contactFetchAction} from "../../redux/actions/actions";
import "./view.css";

const UserView = ({ user ,fetchContacts}) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

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

    if(user.contact_add)
    {
      user.contact_add = false;
    }

  }, [user.login, navigate,user.contact_add]);

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

  const filteredContacts = user.contacts
    ? user.contacts.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="container view-container">
      <div className="row search-view">
        <div className="col-md-5 mx-auto">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={handleSearchInputChange}
              value={searchInput}
            />
            <div className="input-group-append">
            <Link to="/add-contact" className="btn btn-success btn-block search-btn">
            Add Contact
          </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row col-md-12">
        {filteredContacts && filteredContacts.length > 0 ? (
          filteredContacts.map((item) => (
            <div key={item._id} className="col-md-6 mb-2">
              <Card
                name={item.name}
                phone={item.phone}
                userId={user.user.id}
                contactId={item._id}
                email={item.email}
                address={item.address}
              />
            </div>
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </div>
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
