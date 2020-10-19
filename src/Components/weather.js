import React from "react";

/*class Weather extends React.Component{
	render(){
		return(
			//Крч this.props.city позволяет проверить, если есть что-то в переменной city, весь код снизу отображается на странице, если ещё ничего не было введено(То есть, страницу только загрузили),то ничего из ниже-представленных строчек кода, не будет на сайта показаны
			<div>
			{ this.props.city &&
				<div>
				<p>Страна: {this.props.country}</p>
				<p>Город: {this.props.city}</p>
				<p>Температура: {this.props.temp}</p>
				<p>Давление: {this.props.pressure}</p>
				<p>Заход Солнца: {this.props.sunset}</p>
				</div>
			}
			<p>{this.props.error}</p>
			</div>
		);
	}
}
Код выше является НЕУПРОЩЁННОЙ версией
*/ 
//Код ниже является УПРОЩЁННОЙ
const Weather = (props) => {
	return(
		<div className="infoWeath">
			{ props.city &&
				<div>
				<p>Страна: {props.country}</p>
				<p>Город: {props.city}</p>
				<p>Температура: {props.temp}</p>
				<p>Давление: {props.pressure}</p>
				<p>Заход Солнца: {props.sunset}</p>
				</div>
			}
			<p className="error">{props.error}</p>
		</div>
	);
}


export default Weather;