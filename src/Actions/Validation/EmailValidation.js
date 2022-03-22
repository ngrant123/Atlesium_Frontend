
export const isEmailValid=(userSubmittedEmail)=>{
	const emailValidationRegexExpr=userSubmittedEmail.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
	return emailValidationRegexExpr==null?false:true;
}