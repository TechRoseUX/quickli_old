import React from 'react';
import styled from 'styled-components';
import { device } from '../Styled/StyledMediaQuery';
import Colors from '../../constants/colors';
import { NewDiv } from '../Styled/StyledComponents';

const StyledBackIcon = styled(NewDiv)`
@media ${device.tablet} {
    position: absolute;
    height: 35px;
    width: 20px;
    margin-left: 25px;
    margin-top: 35px;
    
    svg {
        width: 20px;
        height: 35px;
    }
}
`
export default StyledBackIcon;