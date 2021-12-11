import React,{useState} from "react";
import styled from "styled-components";
import Video from "../DetailsSubset/Video/index.js";
import Comments from "../DetailsSubset/Comments/index.js";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {Link} from "react-router-dom";

const Container=styled.div`
	position:absolute;
	width:100%;
	padding:0px;
	height:100%;
	display:flex;
	flex-direction:row;
	overflow-y:auto;
	align-items:center;
	padding:15%;
	padding-top:7%;
	margin-top:5%;

	@media screen and (max-width:1370px){
		flex-direction:column !important;
		height:auto;
		#verticalLine{
			display:none !important;
		}

		#mobileHorizontalLine{
			display:block !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:auto;
    }
`;

const VerticalLineCSS={
	position:"relative",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"100%",
 	marginRight:"2%",
 	marginLeft:"2%"
}

const MobileHorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"10px",
	borderRadius:"5px",
	borderRadius:"5px",
	display:"none",
	borderColor:"#EBEBEB",
	display:"none"
}

const reticanVideos=[
	{
		_id:1234,
		comments:[
			{
				comment:"geagegg4sbr rhrsgsr jsrhrs srbhsrhrshrss srrsnrhrhrhrsb rssrvrsbrsbr"
			},
			{
				comment:"Yessir"
			}
		],
		commentType:"Text"
	},
	{
		_id:123333,
		comments:[
			{
				comment:"Test"
			},
			{
				comment:"Yessir"
			}
		],
		commentType:"Video"
	},
	{
		_id:123333,
		comments:[
			{
				comment:"Test"
			},
			{
				comment:"Yessir"
			}
		],
		commentType:"Video"
	}
]

const ReticanDetails=()=>{
	const [currentSelectedIndex,changeCurrentSelectedIndex]=useState(1);
	const currentSelectedReticanVideo=reticanVideos[currentSelectedIndex];
	const updateIndex=(selectedIndex)=>{
		changeCurrentSelectedIndex(selectedIndex);
	}
	return(
		<Container>
			<div style={{position:"relative",display:"flex",flexDirection:"column",height:"100%",justifyContent:"space-between"}}>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<Link to={{pathname:"/dashboard"}}>
						<ArrowBackIosRoundedIcon
							style={{fontSize:"18",marginTop:"-10px",color:"black"}}
						/>
					</Link>
					<p style={{fontSize:"18px",marginLeft:"4%"}}>
						<b>Retican Details</b>
					</p>
				</div>
				<Video
					triggerUpdatedSelectedIndex={updateIndex}
					currentSelectedIndex={currentSelectedIndex}
					videos={reticanVideos}
					currentSelectedReticanVideo={currentSelectedReticanVideo.videoUrl}
				/>
			</div>
			<div id="verticalLine" style={VerticalLineCSS}/>
			<hr id="mobileHorizontalLine" style={MobileHorizontalLineCSS}/>
			<Comments
				currentSelectedReticanVideo={currentSelectedReticanVideo}
			/>
		</Container>
	)
}


export default ReticanDetails;