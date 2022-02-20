import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { useEffect, memo } from "react";
import "./App.css";
import Home from "./component/Home/Home";
import PoolDetail from "./component/PoolDetail/PoolDetail";
import Login from "./component/Auth/Login";
import AdminLayout from "./component/Dashboard/AdminLayout";
import Docs from "./component/PoolDetail/Docs";
import Notify from "./component/Auth/Notify";
import UserProfile from "./component/Home/UserProfile";
import iframeHeader from "./component/Home/Header";
import iframeFooter from "./component/Home/footer";
import DetailCompletedPool from "./component/PoolDetail/DetailCompletedPool"
import TermsOfPOlicy from "./component/Home/TermsOfPOlicy";
import PrivacyPOlicy from "./component/Home/PrivacyPOlicy";
import PrivateRoute from "./PrivateRoute"
import NotFound from "./component/Auth/NotFound"


function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshToken());
	}, [dispatch]);
	return (
		<Router>
			
				<div className="App">

					<Notify />
					<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/pool_detail/:name/:id" exact component={PoolDetail} />
					<Route path="/admin/login" exact component={Login} />
					<Route path="/docs/:name/:dir" exact component={Docs} />
					<Route path="/user-profile" exact component={UserProfile} />
					<Route path="/iframe-header/" exact component={iframeHeader} />
					<Route path="/iframe-footer/" exact component={iframeFooter} />
					<Route path="/termsofservices" exact component={TermsOfPOlicy} />
					<Route path="/privacypolicy" exact component={PrivacyPOlicy} />
					<Route path="/detailcompletedpool/:name/:id" exact component={DetailCompletedPool} />


					<PrivateRoute component={AdminLayout} path="/admin/upcommingpool" exact />
					<PrivateRoute component={AdminLayout} path="/admin/mergecompleted" exact />
					<PrivateRoute component={AdminLayout} path="/admin/deploynewico" exact />
					<PrivateRoute component={AdminLayout} path="/admin/updateContract" exact />
					<PrivateRoute component={AdminLayout} path="/admin/contractdetail" exact />
					<PrivateRoute component={AdminLayout} path="/admin/transferownership/:id" exact />
					<PrivateRoute component={AdminLayout} path="/admin/updatetier" exact />
					<PrivateRoute component={AdminLayout} path="/admin/createico" exact />
					<PrivateRoute component={AdminLayout} path="/admin/completedpool" exact />
					<PrivateRoute component={AdminLayout} path="/admin/featuredpool" exact />
					<PrivateRoute component={AdminLayout} path="/admin/editico/:id" exact />
					<PrivateRoute component={AdminLayout} path="/admin/updatecompletedpool/:id" exact />
					<PrivateRoute component={AdminLayout} path="/admin/adduserinwhitelist/:id" exact />
					<PrivateRoute component={AdminLayout} path="/admin/readwhitelist/:address" exact />
					<PrivateRoute component={AdminLayout} path="/admin/listwhitelist/:name/:id" exact />
					<PrivateRoute component={AdminLayout} path="/admin/searchpool/:id" exact />
					<PrivateRoute component={AdminLayout} path="/admin/claimtokenlisting/:address" exact />
					<PrivateRoute component={AdminLayout} path="/admin/createcompletedpool" exact />
					<PrivateRoute component={AdminLayout} path="/admin/vestingDetails" exact />

				
					<Route exact component={NotFound} />
					</Switch>
				</div>
			


		</Router>
	);
}

export default memo(App);
