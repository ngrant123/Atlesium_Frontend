import React from "react";
import styled from "styled-components";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginRight:"2%",
 	marginLeft:"2%"
}


const NumericalStatistics=()=>{
	return(
		<div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between",alignItems:"center"}}>
			<div style={{display:"flex",flexDirection:"row",width:"100%"}}>
				<div style={{display:"flex",flexDirection:"column"}}>
					<p>Unique Visitors</p>
					<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
						<p>
							<b>25</b>
						</p>

						<div style={{display:"flex",flexDirection:"row"}}>
							<ArrowUpwardIcon/>
							<p>18</p>
						</div>
					</div>
				</div>
				<div style={VerticalLineCSS}/>
				<div style={{display:"flex",flexDirection:"column"}}>
					<p>Completion Rate</p>
					<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
						<p>
							<b>25</b>
						</p>

						<div style={{display:"flex",flexDirection:"row"}}>
							<ArrowDownwardIcon/>
							<p>18</p>
						</div>
					</div>
				</div>
			</div>
			<GetAppRoundedIcon
				style={{fontSize:"30"}}
			/>
		</div>
	)
}

export default NumericalStatistics;