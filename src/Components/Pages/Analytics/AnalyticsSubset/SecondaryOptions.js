import React from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import COLOR_CONSTANTS from "../../../../Utils/ColorConstants.js";

const AnalyticsOptions={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:COLOR_CONSTANTS.GREY,
	cursor:"pointer",
	fontSize:"16px",
	color:COLOR_CONSTANTS.BLACK
}
const SecondaryOptions=({headerText,options})=>{
	return(
		<div class="btn-group">
			<button class="btn btn-primary dropdown-toggle" type="button" 
				data-toggle="dropdown" style={AnalyticsOptions}>
				{headerText}
				<KeyboardArrowDownIcon
					style={{fontSize:"16"}}
				/>
			</button>
			<ul class="dropdown-menu" style={{padding:"10px"}}>
				{options.map(data=>
					<React.Fragment>
						<li style={{listStyle:"none",cursor:"pointer"}}>
							{data.option}
						</li>
						<hr/>
					</React.Fragment>
				)}
			</ul>
		</div>
	)
}

export default SecondaryOptions;