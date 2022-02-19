import React from "react";
import styled from "styled-components";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

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

const CampaignOptions=()=>{
	return(
		<div style={{display:"flex",width:"100%",marginBottom:"2%"}}>
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
				</ul>
			</div>
		</div>
	)
}
export default CampaignOptions;