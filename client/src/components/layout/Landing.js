import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';

const Landing = (props) => {
	if (props.isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	if (!props.isAuthenticated && props.loading) {
		return <div className="container">loading...</div>;
	}

	return (
		<div className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Developer Network</h1>
					<p className="lead">
						Create a developer profile/portfolio, share posts and get help from
						other developers
					</p>

					<div className="buttons">
						<Link to="/register" className="btn btn-primary">
							Sign Up
						</Link>
						<Link to="/login" className="btn btn-light">
							Login
						</Link>
					</div>
				</div>
				<div className="footer">
					<h4>Build with ❤️ by Prashant</h4>
					<p>Created By Developer For Developers</p>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth_reducer.isAuthenticated,
	loading: state.auth_reducer.loading,
});

export default connect(mapStateToProps, { setAlert })(Landing);
