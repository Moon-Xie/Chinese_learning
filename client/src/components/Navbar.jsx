import React from 'react';
import { Link } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import './Nav.css'

export default function Nav() {
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <div className="navbar">
            <div className="nav-left">
                <img src="client/src/assets/react.svg" alt="logo" />
                <h4>HSK Adventures</h4>
            </div>
            <div className="nav-center">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <p>Home</p>
                </Link>
                <p>Features</p>
                <p>About</p>
            </div>
            <div className="nav-right">
                {currentUser ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>Welcome, {currentUser.username || currentUser.email}</span>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to="/login">
                            <button style={{
                                padding: '8px 16px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button style={{
                                padding: '8px 16px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}