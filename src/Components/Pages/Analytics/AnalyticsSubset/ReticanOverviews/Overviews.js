import React,{useState,useContext,useEffect} from "react";
import styled from "styled-components";
import COLOR_CONSTANTS from "../../../../../Utils/ColorConstants.js";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {AnalyticsContext} from "../../AnalyticsSet/AnalyticsContext.js";


const Container=styled.div`
	position:relative;
	width:80%;
	margin-bottom:20px;
	display:flex;
	flex-direction:column;
	padding:2%;
	border-radius:5px;
	box-shadow:1px 1px 5px ${COLOR_CONSTANTS.GREY};
`;

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const ReticanAnalysisOptionsCSS={
	display:"flex",
	flexDirection:"row",
	width:"120px",
	height:"30%",
	borderRadius:"5px",
	boxShadow:`1px 1px 5px ${COLOR_CONSTANTS.GREY}`,
	marginBottom:"5px",
	cursor:"pointer"
}

const ArrowButtonCSS={
	position:"relative",
	width:"100%",
	height:"100%",
	backgroundColor:COLOR_CONSTANTS.BLACK,
	borderRadius:"0px 5px 5px 0px",
	display:"flex",
	justifyContent:"center",
	alignItems:"center"
}

const ReticanOverviewStatusIndicator={
	padding:"10px",
	borderRadius:"50%",
	marginTop:"-10%"
}


const ReticanOverivew=({overviewData,selectedReticanStatus})=>{
	const analyticsConsumer=useContext(AnalyticsContext);
	const [visitorsPercentageDecreaseIndicator,changeVisitorsDecreasePercentageIndicator]=useState(false);
	const [completionPercentageDecreaseIndicator,changeCompletionDecreasePercentageIndicator]=useState(false);

	const [visitorsPercentage,changeVisitorsPercentage]=useState(0);
	const [completionPercentage,changeCompletionPercentage]=useState(0);

	useEffect(()=>{
		debugger;
		if(overviewData.progressRates.completionPercantageChange.percentageChange<0){
			changeCompletionDecreasePercentageIndicator(true);
			changeCompletionPercentage(Math.abs(overviewData.progressRates.completionPercantageChange.percentageChange));
		}

		if(overviewData.progressRates.visitationProgressChange.percentageChange<0){
			changeVisitorsDecreasePercentageIndicator(true);
			changeVisitorsPercentage(Math.abs(overviewData.progressRates.visitationProgressChange.percentageChange));
		}
	},[]);

	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	return(
		<Container>
			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",height:"60%"}}>
				<video id="videoElement"
					key={uuid()}
					style={{borderRadius:"5px",backgroundColor:"#151515"}}
					width="30%" height="100%" borderRadius="50%"
					autoPlay loop autoBuffer playsInline muted>
					<source src={overviewData.videoUrl}
						type="video/mp4"/>
				</video>

				<div style={{display:"column",flexDirection:"column"}}>
					<div style={{display:"flex",flexDirection:"column"}}>
						<p style={{fontSize:"16px"}}>Unique Visitors</p>
						<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
							<p>
								<b>{overviewData.progressRates.visitationProgressChange.totalScore}</b>
							</p>
							<p>
								{visitorsPercentageDecreaseIndicator==true?
									<ArrowDownwardIcon
										style={{fontSize:18,color:COLOR_CONSTANTS.CALL_TO_ACTION_COLOR}}
									/>:
									<ArrowUpwardIcon
										style={{fontSize:18,color:COLOR_CONSTANTS.SUCCESS_ACTION_COLOR}}
									/>
								}

								<b>{overviewData.progressRates.visitationProgressChange.percentageChange}%</b>
							</p>
						</div>
					</div>

					<div style={{display:"flex",flexDirection:"column",marginTop:"10%"}}>
						<p style={{fontSize:"16px"}}>Completion Rate</p>
						<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
							<p>
								<b>{overviewData.progressRates.completionPercantageChange.totalScore}</b>
							</p>
							<p>
								{completionPercentageDecreaseIndicator==true?
									<ArrowDownwardIcon
										style={{fontSize:18,color:COLOR_CONSTANTS.CALL_TO_ACTION_COLOR}}
									/>:
									<ArrowUpwardIcon
										style={{fontSize:18,color:COLOR_CONSTANTS.SUCCESS_ACTION_COLOR}}
									/>
								}
								<b>{overviewData.progressRates.completionPercantageChange.percentageChange}%</b>
							</p>
						</div>
					</div>
				</div>

				<div style={{display:"column",flexDirection:"column",justifyContent:"space-between",height:"100%"}}>
					<div style={ReticanAnalysisOptionsCSS} 
						onClick={()=>analyticsConsumer.triggerDisplayScreen("Reticans")}>
						<div style={{padding:"10px"}}>
							<p>Reticans</p>
						</div>
						<div style={ArrowButtonCSS}>
							<ArrowForwardIosIcon
								style={{color:"white"}}
							/>
						</div>
					</div>

					<div style={ReticanAnalysisOptionsCSS} 
						onClick={()=>analyticsConsumer.triggerDisplayScreen("Analytics")}>
						<div style={{padding:"10px"}}>
							Overview
						</div>

						<div style={ArrowButtonCSS}>
							<ArrowForwardIosIcon
								style={{color:"white"}}
							/>
						</div>
					</div>

					<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:"15%"}}>
						<div style={{...ReticanOverviewStatusIndicator,
							backgroundColor:selectedReticanStatus=="Active"?
					 				COLOR_CONSTANTS.SUCCESS_ACTION_COLOR:
					 				COLOR_CONSTANTS.CALL_TO_ACTION_COLOR
						}}/>
					 	<p style={{color:selectedReticanStatus=="Active"?
					 				COLOR_CONSTANTS.SUCCESS_ACTION_COLOR:
					 				COLOR_CONSTANTS.CALL_TO_ACTION_COLOR}}>
					 		{selectedReticanStatus}
					 	</p>
					</div>
				</div>
			</div>
			<hr style={HorizontalLineCSS}/>
			<p>
				<b>{overviewData.title}</b>
			</p>

			<p>{overviewData.description}</p>
		</Container>
	)
}

export default ReticanOverivew;