import React from "react";
import styled from "styled-components";
import Details from "./Details/index.js";
import VideoCreation from "./VideoCreation/index.js";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {Link} from "react-router-dom";

const Container=styled.div`
	width:100%;
`;

const ReticanDetailsInit=({progressScreen})=>{
	return(
		<Container>
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<ArrowBackIosRoundedIcon
					onClick={()=>progressScreen("webInformation")}
					style={{fontSize:"18",marginTop:"-10px",cursor:"pointer"}}
				/>
				<p style={{fontSize:"18px",marginLeft:"4%"}}>
					<b>Retican Details</b>
				</p>
			</div>

			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
				<Details
					triggerProgressScreen={progressScreen}
				/>
				<VideoCreation/>
			</div>
		</Container>
	)
}

export default ReticanDetailsInit;