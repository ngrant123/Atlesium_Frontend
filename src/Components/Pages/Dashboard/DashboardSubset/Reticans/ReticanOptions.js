import React,{useContext} from "react";
import styled from "styled-components";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {ReticanContext} from "../../DashboardSet/ReticanContext.js";

const ReticanOptionsCSS={
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"black",
	borderStyle:"none",
	width:"100%",
	display:"flex",
	flexDirection:"row",
	alignItems:"center"
}

const Container=styled.div`
	display:flex;
	width:100%;
	margin-bottom:2%;

	@media screen and (max-width:650px){
		margin-bottom:10%;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		margin-bottom:5%;
    }
`;

const CampaignOptions=({})=>{
	const {
		reticans,
		updateReticanOrdering
	}=useContext(ReticanContext);

	const reorderReticansByRecent=()=>{
		debugger;
		reticans.sort(function(a, b){return a.dateCreated - b.dateCreated});
		updateReticanOrdering(reticans);
	}

	const reorderReticanByOldest=()=>{
		debugger;
		reticans.sort(function(a, b){return b.dateCreated - a.dateCreated});
		updateReticanOrdering(reticans);
	}

	return(
		<Container>
			<div class="btn-group">
				<button class="btn btn-primary dropdown-toggle" type="button" 
					data-toggle="dropdown" style={ReticanOptionsCSS}>
					<p style={{fontSize:"18px",marginRight:"5%"}}>
						<b>Reticans</b>
					</p>
					<ArrowDropDownCircleOutlinedIcon
						style={{fontSize:"24",marginTop:"-5px"}}
					/>
				</button>
				<ul class="dropdown-menu" style={{padding:"10px"}}>
					<li style={{listStyle:"none",cursor:"pointer"}} onClick={()=>reorderReticansByRecent()}>
						Recent
					</li>
					<hr/>
					<li style={{listStyle:"none",cursor:"pointer"}} onClick={()=>reorderReticanByOldest()}>
						Oldest
					</li>
				</ul>
			</div>
		</Container>
	)
}
export default CampaignOptions;