import { Link } from "react-router-dom"
import './Nav.css'

export default function Nav () {

    return (
        <>
            <div className="navbar">
                <img src="client/src/assets/react.svg" alt="logo" />
                <h4>Home</h4>
                <p>Features</p>
                <p>About</p>
            </div>
        </>
    )
}