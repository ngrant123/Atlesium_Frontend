import React from "react";
import styled from "styled-components";
import Text from "./TextComments.js";
import Video from "./VideoComments.js";

const Container=styled.div`
	position:relative;
	height:100%;
	width:60%;
	overflow-y:auto;

	@media screen and (max-width:1370px){
		width:100%;
		overflow-y:visible;
		margin-bottom:15%;
	}

	@media screen and (max-width:650px){
		#generalComments{
			width:100% !important;
		}
		margin-left:-10px !important;



		#button{
			width:90% !important;
		}
	}
`;

const Comments=({responses,responseType})=>{
	return(
		<Container>
			{responses.length==0?
				<p>No responses</p>:
				<React.Fragment>
					{responseType=="Text Response Retican"?
						<Text comments={responses}/>:
						<Video comments={responses}/>
					}
				</React.Fragment>
			}
		</Container>
	)
}

export default Comments;