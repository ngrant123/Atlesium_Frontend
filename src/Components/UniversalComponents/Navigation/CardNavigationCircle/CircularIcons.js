import React,{useRef,useState,useEffect} from "react";
import styled from "styled-components";

const Container=styled.div`
	width:28px;
	height:28px;
	border-radius:50%;
	${({isSelectedButton})=>
		isSelectedButton==true?
		'background-color:white;':
		'background-color:#C4C4C4;'
	}
	box-shadow:1px 1px 5px #6e6e6e;
	transition:.8s;
	margin-bottom:20%;
	margin-right:20px;
	cursor:pointer;
`;

const CircleContainer=({iteratedIndex,currentSelectedIndex,triggerUpdatedSelectedIndex})=>{
	const [isSelectedButton,changeIsSelectedButton]=useState(false);

	useEffect(()=>{

		if(iteratedIndex==currentSelectedIndex){
			changeIsSelectedButton(true);
		}else{
			changeIsSelectedButton(false);
		}
	},[iteratedIndex,currentSelectedIndex]);
	return(
		<Container isSelectedButton={isSelectedButton}
			onClick={()=>triggerUpdatedSelectedIndex(iteratedIndex)}
		/>
	)
}

export default CircleContainer;