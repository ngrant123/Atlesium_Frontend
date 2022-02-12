import React from "react";
import styled from "styled-components";
import CallToActionSkeleton from "../../../../UniversalComponents/Skeletons/CallToActionSkeleton.js";
import COLOR_OPTIONS from "../../../../../Utils/ReticanHeaderColorOptions.js";

const ColorHeaderCSS={
	width:"100%",
	height:"60px",
	borderRadius:"5px",
	marginBottom:"2%",
	cursor:"pointer"
}

const ReticanHeaderColorOptions=({closeModal,updateReticanDetailInformationInformation})=>{
	const reticanHeaderColorOptions=()=>{
		return(
			<div style={{overflowY:"auto"}}>
				<p>Click on the color block you want your header to be</p>
				<hr/>
				{COLOR_OPTIONS.RETICAN_HEADER_COLOR_OPTIONS.map(data=>
					<div style={{...ColorHeaderCSS,backgroundColor:data.backgroundColor}}
						onClick={()=>updateReticanDetailInformationInformation(data.backgroundColor)}
					/>
				)}
			</div>
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