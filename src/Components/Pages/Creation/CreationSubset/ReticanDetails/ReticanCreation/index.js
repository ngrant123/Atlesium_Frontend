import React,{useState,useContext,useEffect} from "react";
import styled from "styled-components";
import test4 from "../../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_4.png";
import EditIcon from '@material-ui/icons/ReplayRounded';
import PauseIcon from '@material-ui/icons/Pause';
import CropIcon from '@material-ui/icons/Crop';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import CropBar from "./CropBar/index.js";
import InitialialReticanOptionsScreen from "./InitialialReticanOptionsScreen.js";
import {ReticanCreationProvider} from "./ReticanCreationContext.js";
import DeleteIcon from '@material-ui/icons/Delete';
import COLOR_CONSTANTS from "../../../../../../Utils/ColorConstants.js";
import DeleteRetican from "../../../../Creation/CreationSet/Modals-Portals/DeleteRetican.js";
import EditReticanModal from "./ReticanOptions/index.js";
import {ReticanOverviewConsumer} from "../ReticanOverviewCreationContext.js";
import {CreationContext} from "../../../CreationSet/CreationContext.js";
import {reorderPointers} from "../../../../../../Actions/Tasks/ReorderPointers.js";



const Container=styled.div`
	width:40%;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
		width:100%;
		#videoElement{
			height:200px !important;
			width:90% !important;
		}

	}

	@media screen and (max-width:650px){
		#reticanOptions{
			flex-direction:column !important;
		}

		#reticansNavigation{
			margin-left:0% !important;
		}
	}
`;

const VideoOptionsCSS={
	width:"35px",
	height:"35px",
	borderRadius:"50%",
	backgroundColor:"white",
	boxShadow:"1px 1px 5px #6e6e6e",
	transition:".8s",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer"
}

const RankingInputContainer=styled.textarea`
	position:relative;
	height:40px;
	border-style:solid;
	border-width:1px;
	border-color:${COLOR_CONSTANTS.GREY};
	resize:none;
	padding:10px;
	border-radius:5px;
`;

/*
	<video id="videoElement"
		width="400px" height="250px" borderRadius="50%"
		autoPlay loop autoBuffer playsInline muted controls>
		<source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
			type="video/mp4"/>
	</video>

	{displayCropFunctionality==false?
		<React.Fragment>
			<div style={VideoOptionsCSS}>
				<ReplayRoundedIcon/>
			</div>


			{isVideoElementPaused==false?
				<div style={VideoOptionsCSS} onClick={()=>pause()}>
					<PauseIcon/>
				</div>:
				<div style={VideoOptionsCSS} onClick={()=>play()}>
					<PlayArrowRoundedIcon/>
				</div>
			}

			<div style={VideoOptionsCSS} onClick={()=>changeCropFunctionality(true)}>
				<CropIcon/>
			</div>


		</React.Fragment>:
		<CropBar
			closeCropModal={closeCropModal}
		/>
	}
*/

const ReticanTypeCSS={
	padding:"2%",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:COLOR_CONSTANTS.PRIMARY_COLOR,
	color:COLOR_CONSTANTS.PRIMARY_COLOR
}

const ProgressNodesCSS={
	width:"35px",
	height:"35px",
	borderRadius:"50%",
	backgroundColor:COLOR_CONSTANTS.PRIMARY_SECONDARY_COLOR,
	transition:".8s",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	padding:"10%",
	marginBottom:"20%",
	cursor:"pointer"
}

const ReticanCreation=({triggerUpdateReticanParentInformation,listReticanAsEdited,isEditReticanDesired})=>{
	debugger;
	const [isVideoElementPaused,changeVideoElementPauseStatus]=useState(false);
	
	let [currentReticanCounter,changeCurrentReticanCounter]=useState(0);
	const [displayDeleteRetican,changeDisplayDeleteRetican]=useState(false);
	const [editReticanModal,changeEditReticanModal]=useState(false);

	const reticanOverviewConsumer=useContext(ReticanOverviewConsumer);
	console.log(reticanOverviewConsumer);
	const [reticans,changeReticans]=useState(reticanOverviewConsumer.reticanAssembly.reticans==null
											?[]:
											reticanOverviewConsumer.reticanAssembly.reticans);
	const [displayInitialReticanScreen,changeReticanScreen]=useState(
		reticanOverviewConsumer.reticanAssembly.reticans==null
		?true
		:false);
	const [displayRankingReOrderSuccess,changeDisplayRankingReorderSuccess]=useState();
	const reticanCreationParentConsumer=useContext(CreationContext);




	console.log(reticans);

	useEffect(()=>{
		debugger;
		if(document.getElementById("rankingContainer")!=null){
			document.getElementById("rankingContainer").value=currentReticanCounter+1;
		}
	},[reticans,currentReticanCounter]);

	useEffect(()=>{
		if(displayRankingReOrderSuccess){
			setTimeout(()=>{
				changeDisplayRankingReorderSuccess(null);
			},1000);
		}
	},[displayRankingReOrderSuccess]);

	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	const closeDeleteModal=()=>{
		changeDisplayDeleteRetican(false);
	}

	const deleteReticanModal=()=>{
		return(
			<React.Fragment>
				{displayDeleteRetican==true &&(
					<DeleteRetican
						deleteRetican={deleteRetican}
						closeModal={closeDeleteModal}
					/>
				)}
			</React.Fragment>
		)
	}

	const deleteRetican=()=>{
		debugger;
		reticans.splice(currentReticanCounter,1);
		let reorderedReticans=reorderPointers(reticans);
		triggerUpdateReticanParentInformation({reticans:[...reorderedReticans]});
		changeDisplayDeleteRetican(false);
		const updatedCounter=currentReticanCounter==0?0:currentReticanCounter-1;
		changeCurrentReticanCounter(updatedCounter);
	}

	const displayCurrentlySelectedReticans=()=>{
		changeEditReticanModal(false);
	}

	const triggerDisplayReticanDisplay=()=>{
		changeReticanScreen(false);
	}
//
	const analyzeInput=(event)=>{
		debugger;
		changeDisplayRankingReorderSuccess(null);
		if((!!event.key.trim() && event.key > -1)==false){
			event.preventDefault();
		}else{
			if(event.key<=reticans.length && event.key>0){
				let currentReticans=reticans;
				let currentSelectedRetican=reticans[currentReticanCounter];
				currentReticans.splice(currentReticanCounter,1);
				currentReticans.splice(event.key==0?0:event.key-1, 0, currentSelectedRetican);
				let reorderedReticans=reorderPointers(currentReticans);
				changeReticans([...reorderedReticans]);
				triggerUpdateReticanParentInformation({reticans:[...reorderedReticans]});

				changeDisplayRankingReorderSuccess(true);
			}else{
				event.preventDefault();
				changeDisplayRankingReorderSuccess(false);
			}
		}
	}

	const triggerDisplayInitialReticanScreen=()=>{
		if(isEditReticanDesired){
			const possibleDisabledNotificationText={
        		header:"(Warning) Editing will be disabled if continued",
        		description:"If you continue and add a new retican then the editing feature will be disabled and we will create a new retican overview for you."
			}
			reticanCreationParentConsumer.displayAlertScreen(possibleDisabledNotificationText);
		}

		changeReticanScreen(true);
	}

	return(
		<ReticanCreationProvider
			value={{
				displayReticans:()=>{
					triggerDisplayReticanDisplay();
				},
				createRetican:(reticanInformation)=>{
					debugger;
					reticans.push(reticanInformation);
					changeReticans([...reticans]);
					triggerUpdateReticanParentInformation({reticans:[...reticans]});
					triggerDisplayReticanDisplay();
					changeCurrentReticanCounter(currentReticanCounter++);
					if(isEditReticanDesired){
						reticanCreationParentConsumer.disableEditReticanStatus();
					}
				},
				editRetican:(editedReticanInformation)=>{
					debugger;
					const {
						videoInformation:{
							videoUrl,
							isPhoneEnabled
						},
						...reticanInformationSansVideoInformation
					}=editedReticanInformation;

					reticans[currentReticanCounter]={
						...reticans[currentReticanCounter],
						...reticanInformationSansVideoInformation,
						videoInformation:{
							...reticans[currentReticanCounter].videoInformation,
							videoUrl
						}
					}
					listReticanAsEdited({
						...editedReticanInformation,
						reticanId:reticans[currentReticanCounter]._id
					});
					displayCurrentlySelectedReticans();
					triggerUpdateReticanParentInformation({reticans:[...reticans]});
				}
			}}
		>
			<Container>
				{editReticanModal==true?
					<EditReticanModal
						reticanOptionType={reticans[currentReticanCounter].reticanOptionType}
						reticanInformation={reticans[currentReticanCounter]}
						displayInitialReticanScreen={displayCurrentlySelectedReticans}
					/>:
					<React.Fragment>
						{deleteReticanModal()}
						{reticans.length==0 || displayInitialReticanScreen==true?
							<InitialialReticanOptionsScreen
								reticansLength={reticans.length}
								displayDefaultReticans={triggerDisplayReticanDisplay}
							/>:
							<React.Fragment>
								<div style={{display:"flex",flexDirection:"row"}}>
									<div style={{display:"flex",flexDirection:"column"}}>
										<video id="videoElement"
											key={uuid()}
											width="400px" height="250px" borderRadius="50%"
											autoPlay loop autoBuffer playsInline muted controls>
											<source src={reticans[currentReticanCounter].videoInformation.videoUrl}
												type="video/mp4"/>
										</video>
										<div id="reticanOptions" 
											style={{display:"flex",flexDirection:"row",marginTop:"5%",marginBottom:"5%"}}>
											<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
												<div style={{...VideoOptionsCSS}}
													onClick={()=>changeEditReticanModal(true)}>
													<EditIcon/>
												</div>

												<div style={{...VideoOptionsCSS,marginLeft:"5%"}}
													onClick={()=>changeDisplayDeleteRetican(true)}>
													<DeleteIcon/>
												</div>
											</div>

											<div style={{marginLeft:"10%",display:"flex",flexDirection:"row"}}>
												<p style={{marginLeft:"10%",marginRight:"2%"}}>
													<b>Ranking:</b>
												</p>
												<RankingInputContainer type="number" id="rankingContainer"
													onKeyPress={e=>analyzeInput(e)}
												/>
											</div> 

										</div>
										{displayRankingReOrderSuccess!=null &&(
											<React.Fragment>
												<p style={{
													color:displayRankingReOrderSuccess==false?
													COLOR_CONSTANTS.CALL_TO_ACTION_COLOR:
													COLOR_CONSTANTS.SUCCESS_ACTION_COLOR}}>
													<b>
														{displayRankingReOrderSuccess==true?
															<>Ranking Re-Order Success</>:
															<>
																Ranking Re-Order Failure. Ranking provided is out of bounds. Please provide
																a number between 1 and {reticans.length}
															</>
														}
													</b>
												</p>
											</React.Fragment>
										)}
										<div style={ReticanTypeCSS}>{reticans[currentReticanCounter].reticanOptionType} </div>
									</div>
									<div id="reticansNavigation" 
										style={{display:"flex",flexDirection:"column",marginLeft:"5%"}}>
										{reticans.map((data,index)=>
											<div style={ProgressNodesCSS}
												onClick={()=>changeCurrentReticanCounter(index)}
											/>
										)}

										<div style={VideoOptionsCSS} onClick={()=>triggerDisplayInitialReticanScreen()}>
											<AddCircleOutlineIcon/>
										</div>

										{/*
											{reticans.length!=3 &&(
												<div style={{...VideoOptionsCSS,transform:"rotate(130deg)"}}
													onClick={()=>changeReticanScreen(true)}>
													<CancelOutlinedIcon/>
												</div>
											)}
										*/}
									</div>
								</div>
								<p style={{marginTop:"5%"}}>You have <b>{3-reticans.length}</b> reticans remaining</p>
							</React.Fragment>
						}
					</React.Fragment>
				}
			</Container>
		</ReticanCreationProvider>
	)
}

export default ReticanCreation;