import React, { Component, Fragment } from 'react'
import styled from 'styled-components';
import { device } from '../Styled/StyledMediaQuery';

export const NewDiv = styled.div`
	width: ${({ width }) => (width || 'auto')};
	height: ${({ height }) => (height || 'auto')};
	margin: ${({ margin }) => (margin || 'auto')};
	padding: ${({ padding }) => (padding || '0')};
	border: ${({ border }) => (border || 'none')};
	border-radius: ${({ borderRadius }) => (borderRadius || 'none')};
	text-align: ${({ textAlign }) => (textAlign || 'auto')};
	z-index: ${({ zIndex }) => (zIndex || 'auto')};
	float: ${({ float }) => (float || 'none')};
    display: ${({ display }) => (display || 'block')};
    background: ${({ background }) => (background || 'none')};
`

export const MainBG = styled.div`
    width: 100%;
    background: rgb(0,142,204);
	background: linear-gradient(90deg, rgba(0,142,204,1) 0%, rgba(89,200,248,1) 100%);
	height: 1200px;

    @media ${device.tablet} {
        
    }
`

export const MainHeading = styled(NewDiv)`
	@media ${device.tablet} {
		max-width: 500px;
		margin: 0 auto;
	}
`