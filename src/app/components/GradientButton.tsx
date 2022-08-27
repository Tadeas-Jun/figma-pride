import * as React from 'react';

const GradientButton = ({ flag, onApplyGradient }) => {

    const onButtonClick = () => {

        onApplyGradient(flag);

    };

    return (
        <div className="gradientButton" id={flag.id} onClick={onButtonClick} style={{ backgroundImage: `linear-gradient(${flag.background})` }}>

            <p className="gradientName">
                {flag.name}
            </p>

        </div>
    );
};

export default GradientButton;
