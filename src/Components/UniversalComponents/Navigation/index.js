import React,{useEffect,useState} from "react";
import styled from "styled-components";
import Color_Constants from "../../../Utils/ColorConstants.js";
import TestImage from "../../../Assets/Logos/StampIcon.png";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import GridOnIcon from '@material-ui/icons/GridOn';

const Container=styled.div`
	display:flex;
	flex-direction:column;
	width:35%;
	height:100%;
	justify-content:space-between;
	border-right: 1px solid #ECECEC;
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

const Navigation=({pageType})=>{
	const [dashboardSelection,changeDashBoardSelection]=useState(false);
	const [analyticsSelection,changeAnalyticsSelection]=useState(false);
	const [settingsSelection,changeSettingsSelection]=useState(false);

	useEffect(()=>{
		switch(pageType){
			case "Settings":{
				changeSettingsSelection(true);
				break;
			}
		}
	},[]);
	return(
		<Container>
			<div style={{display:"flex",justifyContent:"center",flexDirection:"column",marginTop:"15%"}}>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",width:"100%"}}>
					<img src={TestImage} style={{width:"50px",height:"50px",borderRadius:"50px",marginRight:"2%"}}/>
					<p style={{fontSize:"18px",marginLeft:"5%"}}>
						<b>Nathan Grant</b>
					</p>
				</div>

				<div style={{marginTop:"10%"}}>
					<div style={dashboardSelection==true?SelectedNavigationDivCSS:UnSelectedNavigationDivCSS}>
						<DesktopWindowsIcon
							style={{fontSize:"24"}}
						/>
						<p style={{fontSize:"18px",marginLeft:"5%"}}>
							<b>Dashboard</b>
						</p>
					</div>

					<div style={analyticsSelection==true?SelectedNavigationDivCSS:UnSelectedNavigationDivCSS}>
						<ShowChartIcon
							style={{fontSize:"24"}}
						/>
						<p style={{fontSize:"18px",marginLeft:"5%"}}>
							<b>Analytics</b>
						</p>
					</div>

					<div style={settingsSelection==true?SelectedNavigationDivCSS:UnSelectedNavigationDivCSS}>
						<GridOnIcon
							style={{fontSize:"24"}}
						/>
						<p style={{fontSize:"18px",marginLeft:"5%",marginTop:"4%"}}>
							<b>Settings</b>
						</p>
					</div>
				</div>
			</div>

			<div style={{display:"flex",justifyContent:"center",width:"100%",marginBottom:"20%"}}>
				<div style={CreateCampaignCSS}>
					Create Campaign
				</div>
			</div>
		</Container>
	)
}

export default Navigation;