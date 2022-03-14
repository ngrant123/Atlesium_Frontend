import React,{useContext} from "react";
import styled from "styled-components"
import ArrowForwardIosIcon from '@material-ui/icons/KeyboardArrowDown';
import {DetailsContext} from "../../DetailsSet/DetailsContext.js";

const NextButtonCSS={
	display:"flex",
	cursor:"pointer",
	flexDirection:"row",
	alignItems:"center",
	color:"#303030",
	width:"100%",
	justifyContent:"center"
}

const NextButton=()=>{
	const detailsConsumer=useContext(DetailsContext);
	return(
		<div style={{width:"100%"}}>
			{detailsConsumer.isLoadingNextPosts==true?
				<p>Loading...</p>:
				<React.Fragment>
					{detailsConsumer.endOfPostIndicator==false &&(
						<div style={NextButtonCSS}
							onClick={()=>detailsConsumer.triggerFetchResponses()}>
							<p id="nextButton" style={{fontSize:"18px"}}>
								<b>Next</b>
							</p>
			    			<ArrowForwardIosIcon
			    				style={{fontSize:24,marginTop:"-10px"}}
			    			/>
			    		</div>
					)}
				</React.Fragment>
			}
		</div>
	)
}

export default NextButton;