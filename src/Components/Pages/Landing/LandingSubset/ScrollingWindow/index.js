import React,{useState,useEffect} from "react";
import styled,{keyframes,css}  from "styled-components";
import test1 from "../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_1.png";
import test2 from "../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_2.png";
import test3 from "../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_3.png";
import test4 from "../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_4.png";

const Container=styled.div`
	position:relative;
	width:90%;
	height:100%;
	overflow:hidden;

	@media screen and (max-width:1370px){
		display:none !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		display:none !important;
    }
`;


const ScrollingWindowContainer=styled.div`
	position:relative;
	top:-300%;
	display:flex;
	flex-direction:row;
	transition:.8s;
	animation: wave 9000ms;
	flex-wrap:wrap;
	${({currentMarginTopCounter})=>
		css`
			@keyframes wave {
				0% {
					margin-top:${currentMarginTopCounter}%;
				}
				100% {
					margin-top:${currentMarginTopCounter+100}%;
				}
			}
		`
	}
`;

const ScrollingWindow=()=>{
	const [blocks,changeBlocks]=useState([]);
	const [hasFirstRenderedOccured,changeFirstRenderOccurence]=useState(false);
	const [currentMarginTopCounter,changeCurrentMarginTopCounter]=useState(0);
	const [addBlocksIndicator,changeAddBlocksIndicator]=useState(false);

	const addDefaultImages=(images)=>{
		images.splice(0,0,<Block1/>);
		images.splice(0,0,<Block2/>);
		images.splice(0,0,<Block3/>);
		images.splice(0,0,<Block4/>);
		images.splice(0,0,<Block1/>);
		images.splice(0,0,<Block2/>);
		images.splice(0,0,<Block3/>);
		images.splice(0,0,<Block4/>);
		images.splice(0,0,<Block1/>);
		images.splice(0,0,<Block2/>);
		images.splice(0,0,<Block3/>);
		images.splice(0,0,<Block4/>);
		return images;
	}
	useEffect(()=>{
		let initBlocks=[];
		initBlocks=addDefaultImages(initBlocks);

		changeBlocks([...initBlocks]);
		changeFirstRenderOccurence(true);
	},[]);

	const Block1=()=>{
		return(
			<div style={{width:"386px",height:"198px",backgroundColor:"yellow",marginBottom:"2%",marginRight:"2%"}}>
				<img src={test1} style={{width:"100%",height:"100%"}}/>
			</div>
		)
	}

	const Block2=()=>{
		return(
			<div style={{width:"205px",height:"230px",backgroundColor:"yellow",marginBottom:"2%",marginRight:"2%"}}>
				<img src={test2} style={{width:"100%",height:"100%"}}/>
			</div>
		)
	}

	const Block3=()=>{
		return(
			<div style={{width:"343px",height:"361px",backgroundColor:"yellow",marginBottom:"2%",marginRight:"2%"}}>
				<img src={test3} style={{width:"100%",height:"100%"}}/>
			</div>
		)
	}

	const Block4=()=>{
		return(
			<div style={{width:"575px",height:"240px",backgroundColor:"yellow",marginBottom:"2%",marginRight:"2%"}}>
				<img src={test4} style={{width:"100%",height:"100%"}}/>
			</div>
		)
	}
	const triggerAnalyzeFlow=()=>{
		if(currentMarginTopCounter>=200){
			resetFlow();
			let initBlocks=[];
			initBlocks=addDefaultImages(initBlocks);
			changeBlocks([...initBlocks]);
		}else{
			continueFlow();
			let initBlocks=blocks;
			initBlocks=addDefaultImages(initBlocks);
			changeBlocks([...initBlocks]);
		}
	}

	const continueFlow=()=>{
		changeCurrentMarginTopCounter(currentMarginTopCounter+100);
		var element = document.getElementById('scrollingWindow');
		element.style.animation="none";
		void element.offsetWidth;
		element.style.animation='wave 9000ms';
	}
	const resetFlow=()=>{
		changeCurrentMarginTopCounter(0);
		var element = document.getElementById('scrollingWindow');
		element.style.animation="none";
		void element.offsetWidth;
		element.style.animation='wave 9000ms';
	}

	return(
		<Container>
			<ScrollingWindowContainer 
				id="scrollingWindow" 
				currentMarginTopCounter={currentMarginTopCounter}
				onAnimationEnd={()=>triggerAnalyzeFlow()}>
				{blocks.map(data=>
					<>{data}</>
				)}
			</ScrollingWindowContainer>
		</Container>
	)
}


export default ScrollingWindow;