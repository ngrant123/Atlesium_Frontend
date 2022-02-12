import React,{useContext} from "react";
import styled from "styled-components";
import Chart from "./Chart.js";
import NumericalStatistics from "./NumericalStatistics.js";
import SecondaryOptions from "../SecondaryOptions"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {AnalyticsContext} from "../../AnalyticsSet/AnalyticsContext.js";

const Container=styled.div`
	background-color:white;
	width:100%;
	height:100%;
	padding:5%;
`;


const Analytics=()=>{
	
	const analyticsConsumer=useContext(AnalyticsContext);

	return(
		<Container>
			<div style={{display:"flex",flexDirection:"row",alignItems:"center",cursor:"pointer",marginBottom:"5%"}}
				onClick={()=>analyticsConsumer.triggerDisplayScreen("Reticans")}>
				<ArrowBackIosIcon
					style={{fontSize:"16",marginTop:"-10px"}}
				/>
				<p style={{fontSize:"16px"}}>Reticans</p>
			</div>

			<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
				<NumericalStatistics/>
				<Chart/>
				<SecondaryOptions/>
			</div>
		</Container>
	)
}


export default Analytics;