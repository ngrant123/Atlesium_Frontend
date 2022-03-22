import React,{useState,useEffect} from "react";
import styled from "styled-components";
import COLOR_CONSTANTS from "../../../../../../Utils/ColorConstants.js";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RemoveIcon from '@material-ui/icons/Remove';
import {Link} from "react-router-dom";
import VideoLoadingPrompt from "../../../../../UniversalComponents/Loading/VideoLoadingPrompt.js";

const Container=styled.div`
	position:relative;
	width:40%;
	margin-bottom:20px;
	display:flex;
	flex-direction:column;
	padding:2%;
	border-radius:5px;
	box-shadow:1px 1px 5px ${COLOR_CONSTANTS.GREY};
	margin-right:10px;

	@media screen and (max-width:1370px){
		width:100%;
	}
`;

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginRight:"2%",
 	marginLeft:"2%"
}

const ReticanOverviewStatusIndicator={
	padding:"10px",
	borderRadius:"50%",
	backgroundColor:COLOR_CONSTANTS.SUCCESS_ACTION_COLOR,
	marginTop:"-10%"
}

const AnalysisOptionCSS={
	display:"flex",
	flexDirection:"row",
	width:"120px",
	height:"40px",
	borderRadius:"5px",
	backgroundColor:COLOR_CONSTANTS.BLACK,
	color:"white",
	boxShadow:`1px 1px 5px ${COLOR_CONSTANTS.GREY}`,
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer"
}


const Retican=({reticanData,displayScreen,reticanOverviewId})=>{
	const [visitorsPercentageDecreaseIndicator,changeVisitorsDecreasePercentageIndicator]=useState(null);
	const [completionPercentageDecreaseIndicator,changeCompletionDecreasePercentageIndicator]=useState(null);

	const [visitorsPercentage,changeVisitorsPercentage]=useState(0);
	const [completionPercentage,changeCompletionPercentage]=useState(0);

	useEffect(()=>{
		if(reticanData.progressRates.completionPercantageChange.percentageChange<0){
			changeCompletionDecreasePercentageIndicator(true);
			changeCompletionPercentage(Math.abs(reticanData.progressRates.completionPercantageChange.percentageChange));
		}else if(reticanData.progressRates.completionPercantageChange.percentageChange>0){
			changeCompletionDecreasePercentageIndicator(false);
		}

		if(reticanData.progressRates.visitationProgressChange.percentageChange<0){
			changeVisitorsDecreasePercentageIndicator(true);
			changeVisitorsPercentage(Math.abs(reticanData.progressRates.visitationProgressChange.percentageChange));
		}else if(reticanData.progressRates.visitationProgressChange.percentageChange>0){
			changeVisitorsDecreasePercentageIndicator(false);
		}
	},[]);


	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	const percentageChangeIcon=(percentageIndicator)=>{
		let icon;

		switch(percentageIndicator){
			case false:{
				icon=<ArrowUpwardIcon
						style={{fontSize:18,color:COLOR_CONSTANTS.SUCCESS_ACTION_COLOR}}
					/>
				break;
			} 

			case true:{
				icon=<ArrowDownwardIcon
						style={{fontSize:18,color:COLOR_CONSTANTS.CALL_TO_ACTION_COLOR}}
					/>
				break;
			}

			default:{
				icon=<RemoveIcon
						style={{fontSize:18,color:COLOR_CONSTANTS.ANALYSIS_NO_CHANGE_INDICATOR,marginTop:"2%"}}
					/>;
				break;
			}
		}
		return(
			<React.Fragment>
				{icon}
			</React.Fragment>
		)
	}


	return(
		<Container>
			<div style={{height:"40%"}}>
				<VideoLoadingPrompt
					videoElement={
						<video id="videoElement"
							key={uuid()}
							style={{borderRadius:"5px",backgroundColor:"#151515"}}
							width="100%" height="100%" borderRadius="50%"
							autoPlay loop autoBuffer playsInline muted>
							<source src={reticanData.videoUrl}
								type="video/mp4"
							/>
						</video>
					}
					videoId="videoElement"
				/>
			</div>

			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"5%"}}>
				<div style={{display:"flex",flexDirection:"column"}}>
					<p>Unique Visitors</p>
					<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>	
						<p>
							<b>{reticanData.progressRates.visitationProgressChange.totalScore}</b>
						</p>
						<p>
							{percentageChangeIcon(visitorsPercentageDecreaseIndicator)}

							<b>{reticanData.progressRates.visitationProgressChange.percentageChange}%</b>
						</p>
					</div>
				</div>
				<hr style={VerticalLineCSS}/>

				<div style={{display:"flex",flexDirection:"column"}}>
					<p>Completion Rate</p>
					<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>	
						<p>
							<b>{reticanData.progressRates.completionPercantageChange.totalScore}</b>
						</p>
						<p>
							{percentageChangeIcon(completionPercentageDecreaseIndicator)}
							
							<b>{reticanData.progressRates.completionPercantageChange.percentageChange}%</b>
						</p>
					</div>
				</div>
			</div>

			<div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between",marginTop:"15%"}}>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
					<div style={ReticanOverviewStatusIndicator}/>
				 	<p style={{color:COLOR_CONSTANTS.SUCCESS_ACTION_COLOR,marginLeft:"20%"}}>Active</p>
				</div>

				<Link to={{
						pathname:"/analytics/"+reticanData._id,
						state:{reticanOverviewId}
					}} style={{textDecoration:"none"}}>
					<div style={AnalysisOptionCSS} onClick={()=>displayScreen("Analyitcs")}>
						Analysis
					</div>
				</Link>

			</div>
		</Container>
	)
}

export default Retican;