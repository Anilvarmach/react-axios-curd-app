import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { contactService } from '../../../services/contactService';

const EditContact = () => {
    const { contactid } = useParams();
    const [contact, setContact] = useState({
        loading: false,
        contacts: {
            "name": "",
            "mobile": "",
            "email": "",
            "photo": "",
            "groupId": ""
        },
        errorMessage: '',
        groups: []
    })

    useEffect(() => {
        const getContact = async () => {
            try {
                setContact({
                    ...contact,
                    loading: true
                })
                let response = await contactService.getSingleContact(contactid);
                let groupResponse = await contactService.getAllGroups();

                setContact({
                    ...contact,
                    loading: false,
                    contacts: response.data,
                    groups: groupResponse.data
                })


            } catch (error) {
                setContact({
                    ...contact,
                    errorMessage: error
                })
            }
        }

        getContact();
        return (
            () => {
                setContact({
                    loading: false,
                    contacts: {},
                    errorMessage: ''
                })
            }
        )
    }, [contactid]);



    let handleInputChange = (e) => {
        setContact({
            ...contact,
            contacts: {
                ...contact.contacts,
                [e.target.name]: e.target.value
            }
        })
    }


    const navigate = useNavigate();
    let handleFormSubmit = async (e) => {
        e.preventDefault();

        let response = await contactService.updateContact(contact.contacts, contactid);

        if (response) {
            navigate('/contact/list', { replace: true });
        } else {
            navigate(`/contact/edit/${contactid}`, { replace: false })
        }

    }


    let { loading,contacts, groups } = contact;
    return (
        <div className='container bg-white shadow'>
            {
                loading ? "Loading ..." : <>
                    <div className="row d-flex align-items-center">
                        <div className="col-md-8">
                            <form onSubmit={handleFormSubmit} className="form  p-3 pb-5 mt-5">
                                <h2 className="fw-bold mt-2">Edit Contact</h2>

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
                                    <select name="groupId" value={contacts.groupId} id="groupId" onChange={handleInputChange} className="form-control">
                                        <option>Select Group</option>
                                        {
                                            groups.map((group) => {
                                                return <option key={group.id} value={group.id}>{group.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="d-felx mt-5 ms-auto">
                                    <button className="btn btn-outline-primary m-2">Edit</button>
                                    <Link to="/contact/list" className="btn btn-outline-danger">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <img src={contacts.photo} alt="userName" width={300} className="rounded" />
                        </div>
                    </div>

                </>
            }
        </div>
    )
}

export default EditContact