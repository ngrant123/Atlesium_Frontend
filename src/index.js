import React,{Suspense,lazy} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';


const Landing=lazy(()=>import('./Components/Pages/Landing/LandingSet/index.js'));
const Settings=lazy(()=>import('./Components/Pages/Settings/SettingSet/index.js'));
const Authenticity=lazy(()=>import('./Components/Pages/Analytics/AnalyticsSet/index.js'));
const Dashboard=lazy(()=>import('./Components/Pages/Dashboard/DashboardSet/index.js'));

const application=(
	<Router>
		<Suspense fallback={<p>Hold on</p>}>
			<Switch>
				<Route exact path="/" component={Landing}/>
				<Route exact path="/settings" component={Settings}/>
				<Route exact path="/authenticity" component={Authenticity}/>
				<Route exact path="/dashboard" component={Dashboard}/>
			</Switch>
		</Suspense>
	</Router>
);

ReactDOM.render(application,document.getElementById('App'));