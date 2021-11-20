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

const Landing=()=>{
	return(
		<Container>
			<Introduction/>
			<SlidingWindow/>
		</Container>
	)
}


export default Landing;