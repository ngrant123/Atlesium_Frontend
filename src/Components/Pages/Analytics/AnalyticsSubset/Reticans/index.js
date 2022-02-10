import React,{useState,useContext,useEffect} from "react";
import styled from "styled-components";
import SecondaryOptions from "../SecondaryOptions.js";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Retican from "./Retican.js";
import {AnalyticsContext} from "../../AnalyticsSet/AnalyticsContext.js";
import {
	retrieveReticanCards
} from "../../../../../Actions/Requests/AnalyticsRequests/Retrieval/AnalyticsRetrieval.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	padding-left:5%;
	padding-right:5%;
	display:flex;
	flex-direction:column;
	padding-bottom:10px;
	overflow-y:auto;
`;

const ReticanContainer=styled.div`
	display:flex;
	flex-direction:row;
	position:relative;
	width:100%;
	margin-top:10px;
	flex-wrap:wrap;
`;

const HeaderCSS={
	display:"flex",
	flexDirection:"row",
	justifyContent:"space-between",
	marginTop:"5%",
	alignItems:"center"
}


const ReticansAnalysis=({reticanOverviewId})=>{
	const analyticsConsumer=useContext(AnalyticsContext);
	const userId=useSelector(state=>state.personalInformation._id);
	const [reticans,changeReticans]=useState([]);
	const [loading,changeLoadingIndicator]=useState(true);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await retrieveReticanCards(reticanOverviewId,userId);

			if(confirmation=="Success"){
				const {message}=data;
				changeReticans(message);
			}else{
				const {statusCode}=data;
				let alertMessage;

				if(statusCode==400){
					alertMessage={
						header:"Retican Retrieval Error",
						description:"Unfortunately there has been an error when retrieving your reticans. Please try again"
					}
				}else{
					alertMessage={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}
				analyticsConsumer.triggerDisplayAlertMessage(alertMessage);
			}
			changeLoadingIndicator(false);
		}
		fetchData();
	},[]);
	return(
		<Container>
			<div style={HeaderCSS}>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",cursor:"pointer"}}
					onClick={()=>analyticsConsumer.triggerDisplayScreen("Overviews")}>
					<ArrowBackIosIcon
						style={{fontSize:"16",marginTop:"-10px"}}
					/>
					<p style={{fontSize:"16px"}}>Reticans</p>
				</div>

				<div>
					<SecondaryOptions
						headerText={"Sort-By"}
						options={[
							{option:"Date"},
							{option:"Popularity"}
						]}
					/>
				</div>
			</div>

			<ReticanContainer>
				{loading==true?
					<p>Loading...</p>:
					<React.Fragment>
						{reticans.map(data=>
							<Retican
								reticanData={data}
								displayScreen={analyticsConsumer.triggerDisplayScreen}
							/>
						)}
					</React.Fragment>
				}
			</ReticanContainer>
		</Container>
	)
}

export default ReticansAnalysis;