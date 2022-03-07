
//Should be a test (?)

/*

	Since this basically resembles a linkedlist reassenble pointer 
	an alogirthm in the future can be developed to do just that 
	but brute force method will be implemented right now for the sake of time

	params:
		targetIndex,reticans,selectedReticanIndex

	previous code:
		let reticanMap=new Map();

		for(var i=0;i<reticans.length;i++){
			reticanMap.set(reticans[i]._id,{
				nextCardPointer:reticans[i].nextCardPointer,
				previousCardPointer:reticans[i].previousCardPointer,
				index:i
			})
		}

		const selectedRetican=reticans[selectedReticanIndex];

		if(reticanMap.get(selectedRetican.nextCardPointer)!=null){
			const previousCardReticanInformatoin=reticanMap.get(selectedRetican.previousCardPointer);
			if(previousCardReticanInformatoin!=null){
				reticans[previousCardReticanInformatoin.index].nextCardPointer=reticanMap.get(selectedRetican.nextCardPointer)._id;
			}
		}
		if(reticanMap.get(selectedRetican.previousCardPointer)!=null){
			const nextCardReticanInformatoin=reticanMap.get(selectedRetican.nextCardPointer);
			if(nextCardReticanInformatoin!=null){
				reticans[nextCardReticanInformatoin.index].previousCardPointer=reticanMap.get(selectedRetican.previousCardPointer)._id;
			}
		}

		const targetRetican=reticans[targetIndex];
		const previousCardFromTarget_Id=targetRetican.previousCardPointer;
		const nextCardFromTarget_Id=targetRetican.nextCardPointer;

		const previousRetican=reticanMap.get(previousCardFromTarget_Id);

		if(previousRetican!=null){
			reticans[previousRetican.index].nextCardPointer=selectedRetican._id;
			reticans[targetIndex].previousCardPointer=selectedRetican._id;
		}
*/



export const reorderPointers=(reticans)=>{
	debugger;
	if(reticans.length==1){
		reticans[0].nextCardPointer=null;
		reticans[0].previousCardPointer=null;
	}else{
		for(var i=0;i<reticans.length;i++){
			const currentIteratedRetican=reticans[i];
			if(i>0){
				const previousRetican=reticans[i-1];
				currentIteratedRetican.previousCardPointer=previousRetican._id;
				previousRetican.nextCardPointer=currentIteratedRetican._id;
				currentIteratedRetican.nextCardPointer=null;
				reticans[i]=currentIteratedRetican;
				reticans[i-1]=previousRetican;
			}
			if(i==0){
				const nextRetican=reticans[i+1];
				currentIteratedRetican.nextCardPointer=nextRetican._id;
				currentIteratedRetican.previousCardPointer=null;
				reticans[i]=currentIteratedRetican;
			}
		}
	}

	return reticans;
}

