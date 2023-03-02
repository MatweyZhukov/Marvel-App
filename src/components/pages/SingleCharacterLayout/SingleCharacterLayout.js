import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({ data }) => {

	const { name, description, thumbnail } = data;

	return (
		<div className="single-comic">
			<Helmet>
				<meta name="description" content={`Marvel character: ${name}`} />
				<title>{`Marvel Character: ${name}`}</title>
			</Helmet>
			<img src={thumbnail} alt={name} className="single-comic__char-img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{name}</h2>
				<p className="single-comic__descr">{description}</p>
			</div>
			<Link to="/" className="single-comic__back">Back to main page</Link>
		</div>
	)
}

export default SingleCharacterLayout;