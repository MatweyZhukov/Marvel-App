import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner />;
		case 'loading':
			return newItemLoading ? <Component /> : <Spinner />;
		case 'confirmed':
			return <Component />;
		case 'error':
			return <ErrorMessage />;
		default:
			throw new Error('Unexpected process state');
	}
};

const CharList = (props) => {
	const [charList, setCharList] = useState([]),
		[newItemLoading, setNewItemLoading] = useState(false),
		[offset, setOffset] = useState(210),
		[charEnded, setCharEnded] = useState(false);

	const { getAllCharacters, process, setProcess } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
		// eslint-disable-next-line
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);

		getAllCharacters(offset)
			.then(onCharListLoaded)
			.then(() => setProcess('confirmed'));
	};

	const onCharListLoaded = (newCharlist) => {
		let ended = false;

		if (newCharlist.length < 9) {
			ended = true;
		}

		setCharList([...charList, ...newCharlist]);
		setNewItemLoading(false);
		setOffset(offset + 9);
		setCharEnded(ended);
	};

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	};
	/* 
	Это метод для оптимизации, 
	 чтобы не помещать такую конструкцию в метод render
	*/
	function renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = { 'objectFit': 'cover' };
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ||
				item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
				imgStyle = { 'objectFit': 'unset' };
			}

			return (
				<li
					className="char__item"
					tabIndex={0}
					ref={el => itemRefs.current[i] = el}
					key={item.id}
					onClick={() => {
						props.onCharSelected(item.id);
						focusOnItem(i);
					}}
					onKeyPress={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							props.onCharSelected(item.id);
							focusOnItem(i);
						}
					}}>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className="char__name">{item.name}</div>
				</li>
			);
		});
		// эта конструкция вынесена для центровки спиннера или ошибки
		return (
			<ul className="char__grid">
				{items}
			</ul>
		);
	};

	const elements = useMemo(() => {
		return setContent(process, () => renderItems(charList), newItemLoading);
		//eslint-disable-next-line
	}, [process]);

	return (
		<div className="char__list">
			{elements}
			<button disabled={newItemLoading}
				onClick={() => onRequest(offset)}
				style={{ 'display': charEnded ? 'none' : 'block' }}
				className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
};

export default CharList;