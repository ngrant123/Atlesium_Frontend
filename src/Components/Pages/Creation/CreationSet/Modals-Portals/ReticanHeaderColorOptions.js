import React from "react";
import styled from "styled-components";
import CallToActionSkeleton from "../../../../UniversalComponents/Skeletons/CallToActionSkeleton.js";
import COLOR_OPTIONS from "../../../../../Utils/ReticanHeaderColorOptions.js";

const ColorHeaderCSS={
	width:"100%",
	height:"60px",
	borderRadius:"5px",
	marginBottom:"2%",
	cursor:"pointer",
	flexShrink:0
}

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const ReticanHeaderColorOptions=({closeModal,updateReticanDetailInformationInformation})=>{
	const reticanHeaderColorOptions=()=>{
		return(
			<React.Fragment>
				<p>Click on the color block you want your header to be</p>
				<hr style={HorizontalLineCSS}/>
				{COLOR_OPTIONS.RETICAN_HEADER_COLOR_OPTIONS.map(data=>
					<div style={{
						...ColorHeaderCSS,
						background:data.color,
						backgroundColor:data.color
					}}
						onClick={()=>updateReticanDetailInformationInformation(data)}
					/>
				)}
			</React.Fragment>
		)
	}
	return(
		<CallToActionSkeleton
			component={reticanHeaderColorOptions()}
			closeModal={closeModal}
			targetDom={"reticanCreation"}
		/>
	)
}

export default ReticanHeaderColorOptions;