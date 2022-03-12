
export const isSpecialCharactersSeen=(url)=>{
    if(url.match(/[\&()+:;,/%*$€é.'"-=]/)==null){
        return false;
    }else  
      return true;
}