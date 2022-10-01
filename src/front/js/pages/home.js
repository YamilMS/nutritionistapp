import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center container">
			<div id="jumb" className="jumbotron">
				<h1 class="display-4">I'm the Jumbo's Homepage</h1>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				<div class="d-flex justify-content-center align-items-end">	
				<hr class="my-4"></hr>
					<a href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Nutritionist</a>
					<a href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Patient</a>
				</div>
			</div>
		</div>
	);
};
