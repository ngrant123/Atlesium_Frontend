import React,{Suspense,lazy} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import { createStore,compose } from 'redux';
import {loadState,saveState} from './Actions/Redux/reduxState.js';
import allReducers from "./Actions/Redux/Reducers/index.js";
import throttle from 'lodash.throttle';
import {Provider} from 'react-redux';


const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const previousState=loadState();
const store=createStore(
	allReducers,
	previousState,
	enhancers
);

store.subscribe(throttle(() =>{
  saveState(store.getState());
}, 1000));


const Landing=lazy(()=>import('./Components/Pages/Landing/LandingSet/index.js'));
const Settings=lazy(()=>import('./Components/Pages/Settings/SettingSet/index.js'));
const Analytics=lazy(()=>import('./Components/Pages/Analytics/AnalyticCards/AnalyticsSet/index.js'));
const SpecifiedAnalytics=lazy(()=>import('./Components/Pages/Analytics/SpecifiedAnalytic/AnalyticSet/index.js'));
const Dashboard=lazy(()=>import('./Components/Pages/Dashboard/DashboardSet/index.js'));
const Creation=lazy(()=>import('./Components/Pages/Creation/CreationSet/index.js'));
const ReticanDetails=lazy(()=>import('./Components/Pages/ReticanDetails/DetailsSet/index.js'));
const PrivacyPolicy=React.lazy(()=>import('./Components/Pages/LegalDocuments/PrivacyPolicy/index.js'));
const TermsOfConditions=React.lazy(()=>import('./Components/Pages/LegalDocuments/TermsOfService/index.js'));
const PasswordReset=React.lazy(()=>import('./Components/Pages/PasswordReset/PasswordResetSet/index.js'));
const ReviewRetican=React.lazy(()=>import('./Components/Pages/Creation/CreationSubset/Review/index.js'));

const application=(
	<Provider store={store}>
		<Router>
			<Suspense fallback={<p>Atlesium</p>}>
				<Switch>
					<Route exact path="/" component={Landing}/>
					<Route exact path="/settings" component={Settings}/>
					<Route exact path="/analytics" component={Analytics}/>
					<Route exact path="/analytics/:id" component={SpecifiedAnalytics}/>

					<Route exact path="/dashboard" component={Dashboard}/>
					<Route exact path="/creation" component={Creation}/>
					<Route exact path="/creation/:id" component={Creation}/>

					<Route exact path="/reticanDetails/:reticanOverviewId" component={ReticanDetails}/>
					<Route exact path="/privacyPolicy" component={PrivacyPolicy}/>
					<Route exact path="/termsOfService" component={TermsOfConditions}/>
					<Route exact path="/passwordReset" component={PasswordReset}/>
					<Route exact path="/review/:id" component={ReviewRetican}/>
				</Switch>
			</Suspense>
		</Router>
	</Provider>
);

ReactDOM.render(application,document.getElementById('App'));