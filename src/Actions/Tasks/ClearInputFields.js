  
  export const clearInputField=(changeErroredInputIds,erroredInputIds,id)=>{
    let isInputErroredOut=false;
    for(var i=0;i<erroredInputIds.length;i++){
      if(erroredInputIds[i]==id){
        isInputErroredOut=true;
        erroredInputIds.splice(i,1);
        break;
      }
    }
    if(isInputErroredOut){
      changeErroredInputIds([...erroredInputIds]);
    }
  }