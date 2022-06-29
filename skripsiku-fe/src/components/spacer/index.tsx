import React from 'react';


interface SpacerInterface {
    size?: number,
    variant?: string
}

const Spacer = (props: SpacerInterface) => {
    const size = props.size ? props.size : 16;
    const variant = props.variant ? props.variant : "horizontal"

    const style = {
        [variant === "vertical" ? "height" : "width"]: `${size}px`,
        display: "inline-block"
    };

    return <div style={style}></div>;
};

export default Spacer;