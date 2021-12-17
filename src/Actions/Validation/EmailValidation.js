
export const isEmailValid=(userSubmittedEmail)=>{
	debugger;
	const emailValidationRegexExpr=userSubmittedEmail.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
	return emailValidationRegexExpr==null?false:true;
}