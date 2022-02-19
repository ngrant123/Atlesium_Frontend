import React,{useEffect,useState} from "react";
import styled from "styled-components";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RemoveIcon from '@material-ui/icons/Remove';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import COLOR_CONSTANTS from "../../../../../Utils/ColorConstants.js";

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginRight:"2%",
 	marginLeft:"2%"
}


const NumericalStatistics=({progressRates})=>{
	const [visitorsPercentageDecreaseIndicator,changeVisitorsDecreasePercentageIndicator]=useState(null);
	const [completionPercentageDecreaseIndicator,changeCompletionDecreasePercentageIndicator]=useState(null);

	const [visitorsPercentage,changeVisitorsPercentage]=useState(0);
	const [completionPercentage,changeCompletionPercentage]=useState(0);

	useEffect(()=>{
		debugger;
		if(progressRates.completionPercantageChange.percentageChange<0){
			changeCompletionDecreasePercentageIndicator(true);
			changeCompletionPercentage(Math.abs(progressRates.completionPercantageChange.percentageChange));
		}else if(progressRates.completionPercantageChange.percentageChange>0){
			changeCompletionDecreasePercentageIndicator(false);
		}

		if(progressRates.visitationProgressChange.percentageChange<0){
			changeVisitorsDecreasePercentageIndicator(true);
			changeVisitorsPercentage(Math.abs(progressRates.visitationProgressChange.percentageChange));
		}else if(progressRates.visitationProgressChange.percentageChange>0){
			changeVisitorsDecreasePercentageIndicator(false);
		}
	},[]);


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
		<div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between",alignItems:"center"}}>
			<div style={{display:"flex",flexDirection:"row",width:"100%"}}>	
				{/*
					<div style={{display:"flex",flexDirection:"column",width:"100%"}}>
						<p>Unique Visitors</p>
						<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>	
							<p>
								<b>{progressRates.visitationProgressChange.totalScore}</b>
							</p>
							<p>
								{percentageChangeIcon(visitorsPercentageDecreaseIndicator)}

								<b>{progressRates.visitationProgressChange.percentageChange}%</b>
							</p>
						</div>
					</div>
					<hr style={VerticalLineCSS}/>

					<div style={{display:"flex",flexDirection:"column",width:"100%"}}>
						<p>Completion Rate</p>
						<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>	
							<p>
								<b>{progressRates.completionPercantageChange.totalScore}</b>
							</p>
							<p>
								{percentageChangeIcon(completionPercentageDecreaseIndicator)}
								
								<b>{progressRates.completionPercantageChange.percentageChange}%</b>
							</p>
						</div>
					</div>
				*/}
				<div style={{display:"flex",flexDirection:"column"}}>
					<p>Unique Visitors</p>
					<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>	
						<p>
							<b>{progressRates.visitationProgressChange.totalScore}</b>
						</p>
						<p>
							{percentageChangeIcon(visitorsPercentageDecreaseIndicator)}

							<b>{progressRates.visitationProgressChange.percentageChange}%</b>
						</p>
					</div>
				</div>
				<div style={VerticalLineCSS}/>
				<div style={{display:"flex",flexDirection:"column"}}>
					<p>Completion Rate</p>
					<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>	
						<p>
							<b>{progressRates.completionPercantageChange.totalScore}</b>
						</p>
						<p>
							{percentageChangeIcon(completionPercentageDecreaseIndicator)}
							
							<b>{progressRates.completionPercantageChange.percentageChange}%</b>
						</p>
					</div>
				</div>
			</div>
			<GetAppRoundedIcon
				style={{fontSize:"30"}}
			/>
		</div>
	)
}

export default NumericalStatistics;