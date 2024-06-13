import React from "react";
import Todolist from "./Todolist";

//include images into your bundle


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1>Aplicación de Todolist usando React y Fetch</h1>
			<Todolist/>
		</div>
	);
};

export default Home;
