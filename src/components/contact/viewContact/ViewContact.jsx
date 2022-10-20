import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { contactService } from '../../../services/contactService';

const ViewContact = () => {
    const { contactid } = useParams();
    const [contact, setContact] = useState({
        loading: false,
        contacts: {},
        errorMessage: '',
        group: {}
    })

    useEffect(() => {
        const getContact = async () => {
            try {
                setContact({
                    ...contact,
                    loading: true
                })
                let response = await contactService.getSingleContact(contactid);
                let groupResponse = await contactService.getSingeGroup(response.data);

                setContact({
                    ...contact,
                    loading: false,
                    contacts: response.data,
                    group: groupResponse.data
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
    }, [contactid])
    return (

        <>

            <h2 className="mt-3 fw-bold">View Contact</h2>

            <div className='container bg-white shadow' style={{ width: "500px" }}>

                {
                    contact.loading ? "Loading..." : <>
                        <div className="row d-flex align-items-center p-3">
                            <div className="col-md-4">
                                <img src={contact.contacts.photo} alt="userName" width={140} className="rounded" />
                            </div>
                            <div className="col-md-8">
                                <ul className="list-group">
                                    <li className="list-group-item">Name: <span className="fw-bold">{contact.contacts.name}</span></li>
                                    <li className="list-group-item">Phone: <span className="fw-bold">{contact.contacts.mobile}</span></li>
                                    <li className="list-group-item">Email: <span className="fw-bold">{contact.contacts.email}</span></li>
                                    <li className="list-group-item">Group: <span className="fw-bold">{contact.group.name}</span></li>
                                </ul>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>

    )
}

export default ViewContact