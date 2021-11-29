import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Introduction from "../LandingSubset/Introduction/index.js";
import SlidingWindow from "../LandingSubset/ScrollingWindow/index.js";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	padding:0px;
	display:flex;
	flex-direction:row;
`;

const SlidingWindowContainer=styled.div`
	width:50%;
	@media screen and (max-width:650px){
		#scrollingWindow{
			display:none !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#scrollingWindow{
			display:none !important;
		}
    }
`;

const Landing=()=>{
	return(
		<Container id="landingPage">
			<Introduction/>
			<SlidingWindow/>
		</Container>
	)
}

export default Landing;