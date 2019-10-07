import React from 'react'
import styled from 'styled-components'
import is from 'styled-is';

import Colors from '../../constants/colors'

import { device } from './StyledMediaQuery';


const Button = styled.button`
    border-radius: ${({ borderRadius }) => (borderRadius || '10px')};
    color: ${({ color }) => (color || Colors.fullWhite)};
    border: ${({ border }) => (border || 'none')};;
    width: ${({ width }) => (width || '150px')};
    height: ${({ height }) => (height || '40px')};
    margin ${({ margin }) => (margin || '0')}; 
    padding ${({ padding }) => (padding || '0')}; 
    background-color: ${({ backgroundColor }) => (backgroundColor || 'initial')};
    display: ${({ display }) => (display || 'flex')};
    -webkit-box-shadow: 0px 7px 6px 1px rgba(0,0,0,0.2);
    -moz-box-shadow: 0px 7px 6px 1px rgba(0,0,0,0.2);
    box-shadow: 0px 7px 6px 1px rgba(0,0,0,0.2);
    transition: all ease .3s;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    :hover{
        box-shadow: 0 6px 12px 0 rgba(0,0,0,0.20), 0 1px 4px 0 rgba(0,0,0,0.30);
    }
    :active{
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20), 0 1px 3px 0 rgba(0,0,0,0.30);
    }
    :focus{
        outline: 0;
    }
    ${is('primary')`

    `}
    ${is('secondary')`

    `}
    ${is('invalid')`
        background-color: ${Colors.fullWhite};
    `}
    
    ${is('standardBtn')`
        width: 156px;
        height: 40px;
        border-radius: 20px;
        background-color: ${Colors.darkBlue};
    `}

    ${is('largeBtn')`
        width: 328px;
        height: 40px;
        border-radius: 50px;
        background-color: ${Colors.darkBlue};
    `}


`
export default Button
