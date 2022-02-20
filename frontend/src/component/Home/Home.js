import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getico } from "../../redux/actions/icoAction";
import Header from "../Home/Header";
import Banner from "./Banner";
import Pool from "./Pool";
import FeaturedPool from "./FeaturedPool";
import "./Home.css";
//import CompletedPool from "./CompletedPool"
import MergeCompletedPool from './MergeCompletedPool'
import Footer from "./footer";
import { getcompletedpool } from "../../redux/actions/completedPoolAction"


//home component to see all upcoming and feartured pool.
const Home = () => {
	const { ico, completedpoolredcr } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [pageSize, setPageSize] = useState(10);
	const [upcommingtba, setUpcommingtba] = useState('');
	const [closePhishing, setClosePhishing] = useState(false)
	//const z = 1;
	useEffect(() => {
		dispatch(getico());
		dispatch(getcompletedpool(10))
	}, [dispatch]);

	const getCompletedPool = () => {
		var numberOfPool = pageSize + 10
		dispatch(getcompletedpool(numberOfPool))
		setPageSize(numberOfPool)
	}


	var comming = 0;
	if (ico.upcpool && ico.upcpool.length) {
		comming = 1;
	}

	var completed = 0;
	if (completedpoolredcr.paginatedCompletedAdmin_pool && completedpoolredcr.paginatedCompletedAdmin_pool.length) {
		completed = 1;
	}

	var featured = 0;
	if (ico.featured && ico.featured.length) {
		featured = 1;
	}
	var upcommingdecending = []
	useEffect(() => {
		if (comming) {

			ico.upcpool.forEach((x) => {
				if (x.time_duration !== -1) {
					upcommingdecending.push(x)
				}
			})

			ico.upcpool.forEach((x) => {
				if (x.time_duration === -1) {
					upcommingdecending.push(x)
				}
			})

		}
		setUpcommingtba(upcommingdecending)
	}, [comming, ico.upcpool]);

	window.onload = function () {
		setClosePhishing(true)
	}
	return (
		<div>
			{closePhishing ?
				<div className="war-msg">
					<p><span>Phishing Warning:</span> please make sure you're visiting <span>https://launchpad.seedify.fund</span> - check the URL carefully.</p>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true" onClick={() => setClosePhishing(false)}>&times;</span>
					</button>
				</div>
				: ""}
			<Header />
			<Banner />
			{featured ?
				<div className="pools feat_ured">
					<div className="container_cust">
						<div className="inner_pools">
							<h2>Featured Pools</h2>
							<div className="pool_grid home">

								{ico.featured
									? ico.featured.map((pool) => (
										<FeaturedPool key={pool._id} pool={pool} />
									))
									: ""}
							</div>
						</div>
					</div>
				</div>
				: ""}


			{upcommingtba ?
				<div className="pools upcomeing-d">
					<div className="container_cust">
						<div className="inner_pools">
							<h2>Upcoming Pools</h2>
							<div className="pool_grid home">
								{
									upcommingtba.map((pool) => (
										<Pool key={pool._id} pool={pool} />
									))

								}
							</div>
						</div>
					</div>
				</div>
				: ""}

			{completed ?
				<div className="pools feat_ured complets">
					<div className="container_cust">
						<div className="inner_pools">
							<h2>Completed Pools</h2>
							<div className="pool_grid home">
								{completedpoolredcr.paginatedCompletedAdmin_pool
									? completedpoolredcr.paginatedCompletedAdmin_pool.map((pool) => (
										<MergeCompletedPool key={pool._id} pool={pool} />
									))
									: ""}
							</div>
						</div>
					</div>
				</div>
				: ""}
			<div className="shw-more">
				<button type="button" className="btn " onClick={() => getCompletedPool()}>Show More</button>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
