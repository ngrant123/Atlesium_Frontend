import React,{useContext} from "react";
import styled from "styled-components";
import Retican from "./IsolatedRetican.js";
import {ReticanContext} from "../../../DashboardSet/ReticanContext.js";
import {Link} from "react-router-dom";

const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	border-radius:5px;
	padding:10px;
`;

const ReticanInitialier=()=>{
	const reticanConsumer=useContext(ReticanContext);
	const {stackReticans}=reticanConsumer;
	return(
		<Container>
			{stackReticans.length==0?
				<p>No reticans</p>:
				<React.Fragment>
					{stackReticans.map((data,index)=>
						<Retican 
							reticanInformation={data}
							currentIndex={index}
							removeTargetedIndexRetican={reticanConsumer.removeTargetedIndexRetican}
							deleteRetican={reticanConsumer.deleteRetican}
						/>
					)}
				</React.Fragment>
			}
		</Container>
	)
}

export default ReticanInitialier;
