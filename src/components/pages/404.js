import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Page404 = () => {
	return (
		<div>
			<Helmet>
				<meta name="description" content="Error" />
				<title>Error page</title>
			</Helmet>
			<ErrorMessage />
			<p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist...</p>
			<Link style={{
				'display': 'block',
				'textAlign': 'center',
				'color': 'blue',
				'textDecoration': 'underline',
				'fontWeight': 'bold',
				'fontSize': '24px',
				'marginTop': '30px'
			}} to="/">Back to main page</Link>
			<p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>or</p>
			<Link style={{
				'display': 'block',
				'textAlign': 'center',
				'color': 'blue',
				'textDecoration': 'underline',
				'fontWeight': 'bold',
				'fontSize': '24px',
			}} to="/comics/">Back to comics page</Link>
		</div>
	);
};

export default Page404;