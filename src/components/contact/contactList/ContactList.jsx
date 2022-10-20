import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { contactService } from '../../../services/contactService';



const ContactList = () => {
    const [query, setQuery] = useState({
        text: "",
    })
    const [data, setData] = useState({
        loading: false,
        contacts: [],
        filteredContacts: [],
        errorMessage: ''
    });
    useEffect(() => {
        const getContacts = async () => {
            try {
                setData({ ...data, loading: true })
                let response = await contactService.getAllContacts();
                setData({
                    ...data,
                    loading: false,
                    contacts: response.data,
                    filteredContacts: response.data,
                });
            } catch (error) {
                setData({
                    ...data,
                    errorMessage: error
                })
            }
        }

        getContacts();
    }, [])


    const handleDeleteContact = async (contactId) => {
        try {
            let response = await contactService.deleteContact(contactId);

            if (response) {
                setData({ ...data, loading: true })
                let response = await contactService.getAllContacts();
                setData({
                    ...data,
                    loading: false,
                    contacts: response.data,
                    filteredContacts: response.data,
                });
            }
        } catch (error) {
            setData({
                ...data,
                errorMessage: error
            })
        }
    }

    const handleSearch = (e) => {
        setQuery({
            ...query, text: e.target.value
        });

        let searchContact = data.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase());
        });

        setData({
            ...data,
            filteredContacts: searchContact
        })
    }
    return (
        <div className='container'>
            <div className="row mt-4">
                <div className="col-md-6"> <h2 className="fw-bold">Contact List</h2></div>
                <div className="col-md-6">
                    <form className="form d-flex flex-row">
                        <input type="text" name="search" value={query.text} onChange={handleSearch} id="" className="form-control outline-none" placeholder='Search Contact' />

                    </form>
                </div>
            </div>
            <div className="row mt-5">
                {
                    data.filteredContacts.length > 0 &&
                        data.loading ? "loading...." : data.filteredContacts.map((contact) => {
                            return (
                                <div className="col-md-4" key={contact.id}>
                                    <div className="card">
                                        <div className="card-body d-flex flex-row align-items-center justify-content-between">
                                            <div>
                                                <img src={contact.photo} alt="userName" width={100} className="rounded" />
                                            </div>
                                            <div className="user-info">
                                                <p className="userName">Name: <span className='fw-bold'>{contact.name}</span> </p>
                                                <p className="userphone">Phone: <span className="fw-bold">{contact.mobile}</span> </p>
                                                <p className="useremail">Email: <span className="fw-bold">{contact.email}</span></p>
                                            </div>
                                            <div className="user-actions d-flex flex-column">
                                                <Link to={`/contact/view/${contact.id}`} className="btn btn-info btn-sm m-2"><i className="fa fa-eye text-white"></i></Link>
                                                <Link to={`/contact/edit/${contact.id}`} className="btn btn-warning btn-sm m-2"><i className="fa fa-pen text-white"></i></Link>
                                                <button className="btn btn-danger btn-sm m-2" onClick={() => handleDeleteContact(contact.id)}><i className="fa fa-trash text-white"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                }

            </div>
        </div>
    )
}

export default ContactList