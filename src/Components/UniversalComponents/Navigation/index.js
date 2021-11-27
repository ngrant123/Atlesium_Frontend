import React,{useEffect,useState} from "react";
import styled from "styled-components";
import Color_Constants from "../../../Utils/ColorConstants.js";
import TestImage from "../../../Assets/Logos/StampIcon.png";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import GridOnIcon from '@material-ui/icons/GridOn';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {Link} from "react-router-dom";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	width:35%;
	justify-content:space-between;
	border-right: 1px solid #ECECEC;

	@media screen and (max-width:1370px){
		width:100%;
		padding:4%;
		border-bottom: 1px solid #ECECEC;

		#navigationOptionHeaderText{
			margin-top:10px !important; 
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:100%;
		padding:2%;
		border-bottom: 1px solid #ECECEC;

		#navigationOptionHeaderText{
			margin-top:10px !important; 
		}

    }
`;

const CreateCampaignCSS={
	backgroundColor:Color_Constants.PRIMARY_COLOR,
	padding:"10px",
	borderRadius:"5px",
	color:"white",
	display:"flex",
	fontSize:"18px",
	alignItems:"center",
	justifyContent:"center",
	cursor:"pointer",
	width:"60%"
}

const NaviagationButtonCSS={
	display:"flex",
	flexDirection:"row",
	alignItems:"center",
	justifyContent:"center",
	width:"100%",
	marginBottom:"5%",
	cursor:"pointer"
}


const UnSelectCSS={
	borderStyle:"none",
	backgroundColor:"white",
	color:"black",
	display:"flex",
	flexDirection:"row",
	alignItems:"center",
	justifyContent:"space-between",
	width:"130%"
}

const SelectedNavigationDivCSS={
	color:"white",
	backgroundColor:Color_Constants.PRIMARY_SECONDARY_COLOR,
	padding:"10px",
	...NaviagationButtonCSS
}

const UnSelectedNavigationDivCSS={
	backgroundColor:"white",
	color:"black",
	...NaviagationButtonCSS
}

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginRight:"2%"
}


const Navigation=({pageType})=>{
	const [dashboardSelection,changeDashBoardSelection]=useState(false);
	const [analyticsSelection,changeAnalyticsSelection]=useState(false);
	const [settingsSelection,changeSettingsSelection]=useState(false);
	const [displayPhoneUI,changeDisplayPhoneUI]=useState(false);

	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeDisplayPhoneUI(true);
		}else{
			changeDisplayPhoneUI(false);
		}
	}

	useEffect(()=>{
		triggerUIChange();
		window.addEventListener('resize', triggerUIChange)
	},[window.innerWidth]);

	useEffect(()=>{
		switch(pageType){
			case "Settings":{
				changeSettingsSelection(true);
				break;
			}
			case "Analytics":{
				changeAnalyticsSelection(true);
				break;
			}
		}
	},[]);
	const dashBoardDisplay=()=>{
		return(
			<React.Fragment>
				<DesktopWindowsIcon
					style={{fontSize:"24"}}
				/>
				<p style={{fontSize:"18px",marginLeft:"5%"}}>
					<b>Dashboard</b>
				</p>
			</React.Fragment>
		)
	}

	const analysisDisplay=()=>{
		return(
			<React.Fragment>
				<ShowChartIcon
					style={{fontSize:"24"}}
				/>
				<p style={{fontSize:"18px",marginLeft:"5%"}}>
					<b>Analytics</b>
				</p>
			</React.Fragment>
		)
	}

	const settingsDisplay=()=>{
		return(
			<React.Fragment>
				<GridOnIcon
					style={{fontSize:"24"}}
				/>
				<p id="navigationOptionHeaderText" style={{fontSize:"18px",marginLeft:"5%",marginTop:"4%"}}>
					<b>Settings</b>
				</p>
			</React.Fragment>
		)
	}

	const mobileNavigation=()=>{
		let component;
		switch(pageType){
			case "Settings":{
				component=settingsDisplay();
				break;
			}
		}
		return(
			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
				<div class="btn-group">
					<button class="btn btn-primary dropdown-toggle" type="button" 
						data-toggle="dropdown" style={UnSelectCSS}>
						<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
							{component}
						</div>

						<div style={VerticalLineCSS}/>
						<ArrowDropDownCircleOutlinedIcon
							style={{fontSize:"24",color:"black"}}
						/>
					</button>
					<ul class="dropdown-menu" style={{padding:"10px"}}>
						<li style={{cursor:"pointer"}}>
							Dashboard
						</li>
						<hr/>

						<li style={{cursor:"pointer"}}>
							Analytics
						</li>
						<hr/>

						<li style={{cursor:"pointer"}}>
							Settings
						</li>
					</ul>
					</div>
				<img src={TestImage} style={{width:"40px",height:"40px",borderRadius:"50px",marginRight:"2%"}}/>
			</div>
		)
	}

	const navigationOptions=()=>{
		return(
			<React.Fragment>
				<Link to={{pathname:'/dashboard'}} style={{textDecoration:"none"}}>
					<div style={dashboardSelection==true?SelectedNavigationDivCSS:UnSelectedNavigationDivCSS}>
						{dashBoardDisplay()}
					</div>
				</Link>

				<Link to={{pathname:'/authenticity'}} style={{textDecoration:"none"}}>
					<div style={analyticsSelection==true?SelectedNavigationDivCSS:UnSelectedNavigationDivCSS}>
						{analysisDisplay()}
					</div>
				</Link>

				<Link to={{pathname:'/settings'}} style={{textDecoration:"none"}}>
					<div style={settingsSelection==true?SelectedNavigationDivCSS:UnSelectedNavigationDivCSS}>
						{settingsDisplay()}
					</div>
				</Link>
			</React.Fragment>
		)
	}

	const desktopNavigation=()=>{
		return(
			<React.Fragment>	
				<div style={{display:"flex",justifyContent:"center",flexDirection:"column",marginTop:"15%"}}>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%"}}>
						<img src={TestImage} style={{width:"50px",height:"50px",borderRadius:"50px",marginRight:"2%"}}/>
						<p style={{fontSize:"18px",marginLeft:"5%"}}>
							<b>Nathan Grant</b>
						</p>
					</div>

					<div style={{marginTop:"10%"}}>
						{navigationOptions()}
					</div>
				</div>

				<div style={{display:"flex",justifyContent:"center",width:"100%",marginBottom:"20%"}}>
					<div style={CreateCampaignCSS}>
						Create Campaign
					</div>
				</div>
			</React.Fragment>
		)
	}
	return(
		<Container>
			{displayPhoneUI==false?
				<>{desktopNavigation()}</>:
				<>{mobileNavigation()}</>
			}
		</Container>
	)
}

export default Navigation;