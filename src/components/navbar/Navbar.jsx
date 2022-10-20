import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navba-brand text-decoration-none text-white p-3 fw-bold" to="/"><i className="fa fa-mobile text-warning m-1" />Conatct <span className="text-warning fw-bold">Manager</span></Link>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="btn btn-outline-primary me-5" to='/contact/add'><i className="fa fa-plus" /> Add Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar