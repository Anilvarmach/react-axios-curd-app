import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AddContact from './components/contact/addContact/AddContact'
import ContactList from './components/contact/contactList/ContactList'
import EditContact from './components/contact/editContact/EditContact'
import ViewContact from './components/contact/viewContact/ViewContact'
import Navbar from './components/navbar/Navbar'

const App = () => {
  return (
    <>
    <Navbar />

    <Routes>
      <Route path='/' element={<Navigate  to="contact/list"/>}/>
      <Route path='/contact/list' element={<ContactList />}/>
      <Route path='/contact/add' element={<AddContact />}/>
      <Route path='/contact/view/:contactid' element={<ViewContact />}/>
      <Route path='/contact/edit/:contactid' element={<EditContact />}/>
    </Routes>
    </>
  )
}

export default App