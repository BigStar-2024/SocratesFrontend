import styled from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import background from 'views/assets/colored-shapes-bg.svg';

export const Wrapper = styled.div`
    background-image  : url(${background});
    background-repeat : no-repeat;
    background-size   : cover;
    height            : 100vh;
`;
export const Container = styled.div`
    display        : flex;
    flex-direction : column;
    align-items    : center;
    max-width      : ${ScreenSize.widescreen};
    width          : 100vw;
    margin         : auto;
    padding        : 0;
    box-sizing     : border-box;
    // margin-left: 50%;
    // transform: translateX(-50%);
    @media (max-width: ${ScreenSize.widescreen}) {
        padding-left: 0rem;
        padding-right: 0rem;
    }
`;

export const SvgContainer = styled.div`
    &:hover {
        svg {
            transform: scale(1.2);
            path {
            }
        }
    }
`
