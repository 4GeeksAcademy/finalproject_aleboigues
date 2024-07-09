import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/rick-and-morty-31015.png"; 
import "/workspaces/finalproject_aleboigues/src/front/styles/styles.css"
export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand custom-navbar-bg">
			<div className="container">
				<Link to="/">
					<img src={logo} width="100" alt="Rick and Morty Logo" />
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary">Sign Up</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary">Log In</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
