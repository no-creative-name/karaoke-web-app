import styled from 'styled-components';

interface LyricLineProps {
    isActive?: boolean;
    isPreview?: boolean;
}

export const LyricLine = styled.div<LyricLineProps>`
    display: block;
    font-size: 60px;
    ${props => props.isActive ? `
        animation: makeLineActive 1s;
    ` : ''}
    ${props => props.isPreview ? `
        font-size: 40px;
        opacity: 0.5;
    ` : ''}

    @keyframes makeLineActive {
        0% {
        transform:  translate(0px,0px)  ;
        }
        13% {
        transform:  translate(0px,-20px)  ;
        }
        100% {
        transform:  translate(0px,0px)  ;
        }
    }
`