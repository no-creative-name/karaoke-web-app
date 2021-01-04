import React from 'react';
import styled from 'styled-components';

interface PitchLineProps {
    width: string;
    marginRight: string;
    y: string;
    percentage: string;
}

export const StyledPitchLine = styled.div<PitchLineProps>`
    display: block;
    width: ${props => props.width};
    margin-right: ${props => props.marginRight};
    height: 20px;
    transform: translateY(${props => props.y});
    background-color: darkred;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 7px 10px 5px rgba(0,0,0,0.12);

    > span {
        display: block;
        height: 100%;
        background-color: red;
    }
`

export const PitchLine: React.FC<PitchLineProps> = ({ width, y, percentage, marginRight }) => {
    return (
        <StyledPitchLine width={width} y={y} percentage={percentage} marginRight={marginRight}>
            <span style={{
                width: percentage
            }}></span>
        </StyledPitchLine>
    )
}