import React from 'react';

const List = (props) => {
	return(
		<ul>
	        {props.data.map(value => 
	        <li key={value.id}>{value.name}</li>
	        )}
        </ul>
	);
}

export const Card = (props) => {
	return(
        <div className="card">
            <h2>{props.content.name}</h2>
            <List {...props.content} />
        </div>
	);
}
