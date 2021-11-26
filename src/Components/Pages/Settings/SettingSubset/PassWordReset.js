import React from "react";
import styled from "styled-components";
import ArrowCircleDownIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import Color_Constants from "../../../../Utils/ColorConstants.js";


const InputContainer=styled.textarea`
	position:relative;
	width:40%;
	height:60px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:10px;
	border-top-left-radius: 5px 5px;
	border-bottom-left-radius: 5px 5px;
`;

const PasswordResetSubmitButtonCSS={
	borderRadius:"5px",
	color:"white",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	marginTop:"2%",
	width:"20%",
	padding:"2%",
	backgroundColor:Color_Constants.PRIMARY_COLOR,
	cursor:"pointer"
}

const PassWordReset=({closePasswordReset})=>{
	return(
		<React.Fragment>
			<ArrowCircleDownIcon 
				style={{transform:"rotate(90deg)",fontSize:"36",cursor:"pointer"}}
				onClick={()=>closePasswordReset()}
			/>
			<hr/>
			<div style={{display:"flex",flexDirection:"row",marginTop:"3%",alignItems:"center"}}>
				<p style={{width:"10%"}}>Old Password</p>
				<InputContainer/>
			</div>
			<div style={{display:"flex",flexDirection:"row",marginTop:"3%",alignItems:"center"}}>
				<p style={{width:"10%"}}>New Password</p>
				<InputContainer/>

			</div>

			<div style={{display:"flex",flexDirection:"row",marginTop:"3%",alignItems:"center"}}>
				<p style={{width:"10%"}}>Re-type New Password</p>
				<InputContainer/>
			</div>

			<div style={PasswordResetSubmitButtonCSS}>
				Submit
			</div>

		</React.Fragment>
	)
}

export default PassWordReset;