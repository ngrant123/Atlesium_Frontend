import React from "react";
import styled from "styled-components";
import ReticanOptions from "./ReticanOptions.js";
import ReticanDisplay from "./Retican/index.js";

const Container=styled.div`
	position:relative;
	height:100%;
	width:85%;
	justify-content:center;
	align-items:center;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
		justify-content:start;
		width:100%;
		#reticans{
			width:75% !important;
		}
	}

	@media screen and (max-width:650px){
		height:1200px;
		#reticans{
			width:85% !important;
		}
	}

    @media screen and (min-width:350px) and (max-width:500px) 
        and (min-height:650px) and (max-height:1400px){
		#reticans{
			width:85% !important;
		}
    }

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		height:900px;
		margin-bottom:5%;
		#reticans{
			height:100% !important;
		}
	}
`;

const Reticans=()=>{
	return(
		<Container>
			<div id="reticans" style={{position:"relative",display:"flex",flexDirection:"column",height:"85%",width:"70%"}}>
				<ReticanOptions/>
				<ReticanDisplay/>
			</div>
		</Container>
	)
}

export default Reticans;