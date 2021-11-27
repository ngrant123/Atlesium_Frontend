import React from "react";
import styled from "styled-components";

const AnalyticsOptions={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer"
}
const SecondaryOptions=()=>{
	return(
		<div style={{display:"flex",width:"100%",marginTop:"5%"}}>
			<div class="btn-group">
				<button class="btn btn-primary dropdown-toggle" type="button" 
					data-toggle="dropdown" style={AnalyticsOptions}>
					Sort By:
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu" style={{padding:"10px",marginLeft:"-120px"}}>
				</ul>
			</div>
		</div>
	)
}

export default SecondaryOptions;