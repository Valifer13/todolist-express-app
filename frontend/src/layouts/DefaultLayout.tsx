import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
	return (
		<div className="flex">
			<Navbar />
			<div className="min-h-screen max-w-[1920px]">
				<Outlet />
			</div>
		</div>
	)
}