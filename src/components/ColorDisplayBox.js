import React from 'react';


export const ColorDisplayBox = (props) => {
	const { selectedColor } = props;
	return (
		<div className='color-controller-box' style={{ backgroundColor: selectedColor }} />
	);
}