import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404')),
	MainPage = lazy(() => import('../pages/MainPage')),
	ComicsPage = lazy(() => import('../pages/ComicsPage')),
	SingleComicLayot = lazy(() => import('../pages/SingleComicLayout/SingleComicLayout')),
	SingleCharacterLayot = lazy(() => import('../pages/SingleCharacterLayout/SingleCharacterLayout')),
	SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
	return (
		<Router>
			<div className="app" >
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route
								path='/'
								element={<MainPage />} />
							<Route
								path="/comics/"
								element={<ComicsPage />} />
							<Route
								path='/comics/:id'
								element={<SinglePage Component={SingleComicLayot} dataType='comic' />} />
							<Route
								path='/characters/:id'
								element={<SinglePage Component={SingleCharacterLayot} dataType='character' />} />
							<Route
								path="*"
								element={<Page404 />} />
						</Routes>
					</Suspense>
				</main>
			</div >
		</Router>
	);
};

export default App;