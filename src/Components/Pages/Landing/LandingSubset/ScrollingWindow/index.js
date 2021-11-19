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
`;


const ScrollingWindowContainer=styled.div`
	position:relative;
	top:-300%;
	display:flex;
	flex-direction:row;
	transition:.8s;
	animation: wave 9000ms infinite;
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
	const test=true;
	const [blocks,changeBlocks]=useState([]);
	const [hasFirstRenderedOccured,changeFirstRenderOccurence]=useState(false);
	const [currentMarginTopCounter,changeCurrentMarginTopCounter]=useState(0);

	useEffect(()=>{
		let initBlocks=[];
		initBlocks.push(<Block1/>);
		initBlocks.push(<Block2/>);
		initBlocks.push(<Block3/>);
		initBlocks.push(<Block4/>);
		initBlocks.push(<Block1/>);
		initBlocks.push(<Block2/>);
		initBlocks.push(<Block3/>);
		initBlocks.push(<Block4/>);
		initBlocks.push(<Block1/>);
		initBlocks.push(<Block2/>);
		initBlocks.push(<Block3/>);
		initBlocks.push(<Block4/>);

		changeBlocks([...initBlocks]);
		changeFirstRenderOccurence(true);
	},[]);

	useEffect(()=>{
		debugger;
		if(hasFirstRenderedOccured){
			setTimeout(()=>{
				setTimeout(()=>{
					document.getElementById("scrollingWindow").style.animationPlayState="paused";
					let initBlocks=blocks;
					initBlocks.splice(0,0,<Block1/>);
					initBlocks.splice(0,0,<Block2/>);
					initBlocks.splice(0,0,<Block3/>);
					initBlocks.splice(0,0,<Block4/>);
					if(currentMarginTopCounter>200){
						changeCurrentMarginTopCounter(-300);
						const currentBlocksIteration=blocks;

						currentBlocksIteration.splice(0, (11)/2);
						changeBlocks([...currentBlocksIteration]);
					}else{
						changeCurrentMarginTopCounter(currentMarginTopCounter+100);
					}
					changeBlocks([...initBlocks]);
					document.getElementById("scrollingWindow").style.animationPlayState="running";

				},1500);
			},8800);
		}
	},[blocks.length]);

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
	return(
		<Container>
			<ScrollingWindowContainer id="scrollingWindow" currentMarginTopCounter={currentMarginTopCounter}>
				{blocks.map(data=>
					<>{data}</>
				)}
			</ScrollingWindowContainer>
		</Container>
	)
}


export default ScrollingWindow;