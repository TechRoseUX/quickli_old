import React from 'react'
import styled from 'styled-components'
import is from 'styled-is';
import PropTypes from 'prop-types';

import { device } from './StyledMediaQuery';

const Text = styled.p`
	font-size: 16px;
	line-height: 16px;
	color: ${({ color }) => (color || '#FFFFFF')};
	margin: ${props => (props.margin || '0')};
	padding: ${props => (props.padding || '0')};
    max-width: ${props => (props.maxWidth || 'none')};
    font-weight: ${({ fontWeight }) => (fontWeight || 'normal')};
    font-style: ${({ fontStyle }) => (fontStyle || 'normal ')};
	font-family: ${({ fontFamily }) => (fontFamily || 'Helvetica')};
	background: ${({ background }) => (background || 'none')}

	${is('mainHeading')`
		font-size: 40px;
		line-height: 44px;
		font-weight: bold;

		@media ${device.mobileS} {
			font-size: 40px;
			line-height: 44px;
		}
    `}
    
    ${is('buttonText')`
        font-size: 22px;
    `}

    ${is('navItem')`
        line-height: 70px;
        font-size: 22px;
	`}
	
	${is('inline')`
        display: inline-block;
	`}
	
	${is('lblue20')`
		font-size: 20px;
		color: #008ECC;
	`}
	
	${is('dblue16')`
		font-size: 16px;
		color: #004A6A;
	`}
	
	${is('customerIE')`
		line-height: 40px;
	`}

	${is('borderBottom')`
		border-bottom: 1px solid #004A6A;
	`}

`
/**
	This styled case was moved to WelcomeStyledComponents since it's only used in that partifulcar instance and not elsewhere
	${is('employeeDetail')`
		line-height: 30px;
		font-size: 16px;
	`}

`

**/

Text.propTypes = {
	/** Color of the text displayed */
	color: PropTypes.string,
	/** Margins that should be added, needs to be in short hand syntax ex margin: top right bottom left; */
	margin: PropTypes.string,
	//* Max width that a text can take */
	maxWidth: PropTypes.string,
	//* Font weight of the text */
	fontWeight: PropTypes.string,
	//* Font style of the text; ex: italic, normal & oblique */
	fontStyle: PropTypes.string,
	//* Font family to be used */
	fontFamily: PropTypes.string,
	//* if the text should be increased to largeText size */
	largeText: PropTypes.bool,
	//* If the text should be reduced to subtext size */
	subtext: PropTypes.bool,
	//* If the text should be reudeced to subtitle size */
	subtitle: PropTypes.bool,
	//* If the text is supposed to reprsent an error displayed */
	error: PropTypes.bool,
	//* If the text should be the website defualt gray color */
	gray: PropTypes.bool,
	//* If the text reprsents a action */
	pointer: PropTypes.bool,
	//* If the text reprsents a link */
	underline: PropTypes.bool,
	//* If the text needs to be placed on same line */
	inline: PropTypes.bool,
}

export default Text