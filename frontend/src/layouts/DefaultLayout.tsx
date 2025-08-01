import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen max-w-[1920px] mx-auto px-4 py-16">
				<Outlet />
			</div>
			<Footer />
		</>
	)
}