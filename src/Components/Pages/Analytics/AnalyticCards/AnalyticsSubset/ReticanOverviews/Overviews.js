import React,{useState,useContext,useEffect} from "react";
import styled from "styled-components";
import COLOR_CONSTANTS from "../../../../../../Utils/ColorConstants.js";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import RemoveIcon from '@material-ui/icons/Remove';
import VideoLoadingPrompt from "../../../../../UniversalComponents/Loading/VideoLoadingPrompt.js";
import {AnalyticsContext} from "../../AnalyticsSet/AnalyticsContext.js";
import {Link} from "react-router-dom";


const Container=styled.div`
	position:relative;
	width:80%;
	margin-bottom:20px;
	padding:2%;
	border-radius:5px;
	box-shadow:1px 1px 5px ${COLOR_CONSTANTS.GREY};


	@media screen and (max-width:1370px){
		width:100%;
		#videoAndOptionsContainer{
			height:160px !important;
		}
		#videoElement{
			height:100% !important;
		}
	}

	@media screen and (max-width:650px){
		#videoAndOptionsContainer{
			flex-direction:column !important;
		}
		#progressRatesContainer{
			flex-direction:row !important;
			justify-content:space-between !important;
		}


		#videoAndOptionsContainer{
			justify-content:start !important;
			height:300px !important;
		}

		#videoElement{
			width:100% !important;
			height:90px !important;
		}

		#completionProgressRates{
			margin-top:0% !important;
		}

		#mobileProgressRatesDivider{
			display:block !important;
		}

		#statusIcon{
			margin-top:0% !important;
		}

		#analyticOption{
			flex-direction:row !important;
		}
	}
`;

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginRight:"2%",
 	marginLeft:"2%",
 	display:"none"
}


const ReticanAnalysisOptionsCSS={
	display:"flex",
	flexDirection:"row",
	width:"120px",
	height:"60px",
	borderRadius:"5px",
	boxShadow:`1px 1px 5px ${COLOR_CONSTANTS.GREY}`,
	marginBottom:"5px",
	cursor:"pointer",
	color:"black"
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
	const [visitorsPercentageDecreaseIndicator,changeVisitorsDecreasePercentageIndicator]=useState(null);
	const [completionPercentageDecreaseIndicator,changeCompletionDecreasePercentageIndicator]=useState(null);

	const [visitorsPercentage,changeVisitorsPercentage]=useState(0);
	const [completionPercentage,changeCompletionPercentage]=useState(0);

	useEffect(()=>{
		debugger;
		if(overviewData.progressRates.completionPercantageChange.percentageChange<0){
			changeCompletionDecreasePercentageIndicator(true);
			changeCompletionPercentage(Math.abs(overviewData.progressRates.completionPercantageChange.percentageChange));
		}else if(overviewData.progressRates.completionPercantageChange.percentageChange>0){
			changeCompletionDecreasePercentageIndicator(false);
		}

		if(overviewData.progressRates.visitationProgressChange.percentageChange<0){
			changeVisitorsDecreasePercentageIndicator(true);
			changeVisitorsPercentage(Math.abs(overviewData.progressRates.visitationProgressChange.percentageChange));
		}else if(overviewData.progressRates.visitationProgressChange.percentageChange>0){
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
		debugger;
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
			<div id="videoAndOptionsContainer"
			 	style={{display:"flex",flexDirection:"row",justifyContent:"space-between",height:"25%"}}>
			 	<VideoLoadingPrompt
					videoElement={
						<video id="videoElement"
							key={uuid()}
							style={{borderRadius:"5px",backgroundColor:"#151515"}}
							width="30%" height="100%" borderRadius="50%"
							autoPlay loop autoBuffer playsInline muted>
							<source src={overviewData.videoUrl}
								type="video/mp4"/>
						</video>
					}
					videoId="videoElement"
				/>

				<div id="progressRatesContainer" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
					<div style={{display:"flex",flexDirection:"column"}}>
						<p style={{fontSize:"16px"}}>Unique Visitors</p>
						<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
							<p>
								<b>{overviewData.progressRates.visitationProgressChange.totalScore}</b>
							</p>
							<p>
								{percentageChangeIcon(visitorsPercentageDecreaseIndicator)}

								<b>{overviewData.progressRates.visitationProgressChange.percentageChange}%</b>
							</p>
						</div>
					</div>
					
					<div id="mobileProgressRatesDivider" style={VerticalLineCSS}/>

					<div id="completionProgressRates" style={{display:"flex",flexDirection:"column",marginTop:"10%"}}>
						<p style={{fontSize:"16px"}}>Completion Rate</p>
						<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
							<p>
								<b>{overviewData.progressRates.completionPercantageChange.totalScore}</b>
							</p>
							<p>
								{percentageChangeIcon(completionPercentageDecreaseIndicator)}
								<b>{overviewData.progressRates.completionPercantageChange.percentageChange}%</b>
							</p>
						</div>
					</div>
				</div>

				<div id="analyticsOptions" 
					style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
					<div id="analyticOption" style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
						<div style={ReticanAnalysisOptionsCSS} 
							onClick={()=>analyticsConsumer.triggerDisplayScreen("Reticans",overviewData._id)}>
							<div style={{padding:"10px"}}>
								<p>Reticans</p>
							</div>
							<div style={ArrowButtonCSS}>
								<ArrowForwardIosIcon
									style={{color:"white"}}
								/>
							</div>
						</div>

						<Link to={{pathname:"/analytics/"+overviewData._id}} style={{textDecoration:"none"}}>
							<div style={ReticanAnalysisOptionsCSS}>
									<div style={{padding:"10px"}}>
										Overview
									</div>

									<div style={ArrowButtonCSS}>
										<ArrowForwardIosIcon
											style={{color:"white"}}
										/>
									</div>
							</div>
						</Link> 
					</div>

					<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:"15%"}}>
						<div id="statusIcon" style={{...ReticanOverviewStatusIndicator,
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
			<div>
				<hr style={HorizontalLineCSS}/>
				<p>
					<b>{overviewData.title}</b>
				</p>

				<p>{overviewData.description}</p>
			</div>
		</Container>
	)
}

export default ReticanOverivew;