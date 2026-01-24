import React from 'react';
import CardComponent from './CardComponent';

const CardsContainer = ({ cards }) => {
    return (
        <div className="flex flex-wrap justify-center">
            {cards.map((card, index) => (
                <div key={index} className="m-4">
                    <CardComponent card={card} />
                </div>
            ))}
        </div>
    );
};

export default CardsContainer;