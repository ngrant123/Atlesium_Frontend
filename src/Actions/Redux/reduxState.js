const loadState=()=>{

	try{
	 	const serializedState = localStorage.getItem('state');
	    if (serializedState === null) {
	      return undefined;
	    }
	    return JSON.parse(serializedState);
	}catch(err){
	}
}

const saveState=(state)=>{

	try{
		const serializedState = JSON.stringify(state);
	    localStorage.setItem('state', serializedState);
	}catch(err){
	}
}

module.exports={
	loadState,
	saveState
}