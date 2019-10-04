import React from 'react';
import styled from 'styled-components';
import { device } from './Styled/StyledMediaQuery';
import { NewDiv } from './Styled/StyledComponents';
import Colors from '../constants/colors';
import lockb from '../../rersources/svg/lockb.svg';
import userb from '../../rersources/svg/userb.svg';
//import ReactSVG from 'react-svg';
import SVG from 'react-inlinesvg';

const FormField = styled.input`
    -webkit-appearance: none;
    background-color: ${Colors.fullWhite};
    outline: none;
    border: none;
    border-radius: 0px 10px 10px 0px;
    padding: 0;
    padding-left: 10px;
    font-size: 16px;

    @media ${device.tablet} {
        width: ${({ width }) => (width || '345px')};
        height: 50px;
        float: right;
        margin: 0 auto;
    }
`

const FormFieldContainer = styled.div`

    @media ${device.tablet} {
        width: ${({ width }) => (width || '417px')};
        height: 50px;
        margin-bottom: 50px;
    }

    border-radius: 10px;
    -webkit-box-shadow: 0px 7px 6px 1px rgba(0,0,0,0.2);
    -moz-box-shadow: 0px 7px 6px 1px rgba(0,0,0,0.2);
    box-shadow: 0px 7px 6px 1px rgba(0,0,0,0.2);
`

const FormFieldLeft = styled.div`
    border-radius: 10px 0px 0px 10px;
    width: 61px;
    height: 50px;
    background-color: ${Colors.fullWhite};
    float: left;
`

const FormFieldSplit = styled.div`
    width: 1px;
    height: 50px;
    background: ${Colors.lightBlue};
    float: left;
`

const FormIconContainer = styled(NewDiv)`
    width: 33px;
    height: 33px;
    margin: 0 auto;
    margin-top: 8px;

    svg {
        width: 33px;
        height: 33px;
    }
`

export default ({ input, label, svg, placeholder, defaultValue, value, fieldWidth, containerWidth, meta: { error, touched } }) => {
    console.log(defaultValue);
    return (
        <FormFieldContainer
            width={containerWidth}
        >
                <FormFieldLeft>
                    <FormIconContainer
                    >
                        <SVG src={svg} />
                    </FormIconContainer>
                </FormFieldLeft>
                <FormFieldSplit />
                <FormField {...input} placeholder={placeholder} value={value} defaultValue={defaultValue} width={fieldWidth} /> <br/>
                {touched && error}
        </FormFieldContainer>
    )
}


