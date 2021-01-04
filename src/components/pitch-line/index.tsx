import React from 'react';
import styled from 'styled-components';

interface PitchLineProps {
    width: string;
    marginRight: string;
    y: string;
    percentage: string;
    isSpoken: boolean;
}

export const StyledPitchLine = styled.div<PitchLineProps>`
    display: block;
    width: ${props => props.width};
    margin-right: ${props => props.marginRight};
    height: ${props => props.isSpoken ? '40px' : '20px'};
    transform: translateY(${props => props.y});
    background-color: ${props => props.isSpoken ? 'grey' : 'darkred'};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 7px 10px 5px rgba(0,0,0,0.12);

    > span {
        display: block;
        height: 100%;
        background-color: red;
    }
`

export const PitchLine: React.FC<PitchLineProps> = ({ width, y, percentage, marginRight, isSpoken }) => {
    return (
        <StyledPitchLine
            width={width}
            y={y}
            percentage={percentage}
            marginRight={marginRight}
            isSpoken={isSpoken}
        >
            <span style={{
                width: percentage
            }}></span>
        </StyledPitchLine>
    )
}