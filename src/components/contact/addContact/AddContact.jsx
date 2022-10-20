import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { contactService } from '../../../services/contactService';

const AddContact = () => {
    let [addContact, setAddContact] = useState({
        loading: false,
        contacts: {
            "name": "",
            "mobile": "",
            "email": "",
            "photo": "",
            "groupId": ""
        },
        groups: [],
        errorMessage: ''

    });

    let handleInputChange = (e) => {
        setAddContact({
            ...addContact,
            contacts: {
                ...addContact.contacts,
                [e.target.name]: e.target.value
            }
        })
    }


    useEffect(() => {
        const getGroups = async () => {
            try {
                setAddContact({
                    ...addContact,
                    loading: true
                });

                let groupResponse = await contactService.getAllGroups();

                setAddContact({
                    ...addContact,
                    loading: false,
                    groups: groupResponse.data
                })

            } catch (error) {
                setAddContact({
                    ...addContact,
                    errorMessage: error
                })
            }
        }
        getGroups();
    }, []);

    const navigate = useNavigate();
    let handleFormSubmit = async (e) => {
        e.preventDefault();

        let response = await contactService.createContact(addContact.contacts);

        if(response){
            navigate('/contact/list', {replace: true});
        }else{
            navigate('/contact/add', {replace: false})
        }

    }

    let { contacts, groups } = addContact;

    return (
        <div className='container bg-white' style={{ width: "600px" }}>
            <form onSubmit={handleFormSubmit} className="form shadow p-3 pb-5 mt-5">
                <h2 className="fw-bold mt-2">Add Contact</h2>

                <div className="form-group mt-4">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' value={contacts.name} onChange={handleInputChange} id="name" className="form-control" />
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="Phone">Phone</label>
                    <input type="number" name='mobile' value={contacts.mobile} onChange={handleInputChange} id="Phone" className="form-control" />
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="Email">Email</label>
                    <input type="email" name='email' value={contacts.email} onChange={handleInputChange} id="Email" className="form-control" />
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="Image">Image URL</label>
                    <input type="text" name='photo' value={contacts.photo} onChange={handleInputChange} id="Image" className="form-control" />
                </div>
                <div className="form-group mt-4">
                    <select name="groupId" id="groupId" onChange={handleInputChange} className="form-control">
                        <option>Select Group</option>
                        {
                            groups.map((group) => {
                                return <option key={group.id} value={group.id}>{group.name}</option>
                            })
                        }
                    </select>
                </div>

                <div className="d-felx mt-5 ms-auto">
                    <button className="btn btn-outline-primary m-2">Add</button>
                    <Link to="/contact/list" className="btn btn-outline-danger">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default AddContact