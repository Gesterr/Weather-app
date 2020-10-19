import React from "react";
import Info from "./Components/info";
import Form from "./Components/form.js";
import Weather from "./Components/weather.js";

const API_KEY = "5d26c4629a8d12f3c1d91b66374b1018";

class App extends React.Component{
//Данная переменная хранит в себе ТЕ состояния, которые после буду вызываться на сайте
  state ={
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }

//Весь код снизу, позволяет с помощью стороннего сайта OpenWeatherMap благодаря API получить информацию он погоде разных городов мира
//event(e) служит для отслеживания различных событий
//preventDefault - уничтожаем обыкновенное поведение странички(Перезагрузка странички)const city
//ТАК эти строки к const city: e - обращение к event(То есть, отслеживаем события); target - тот объект с которым мы сейчас работаем(Конкретно здесь это Form);elements - обращение к элементам;city - обращени к имени city в Form;value - и берём значение.
  gettingWeather = async (e) => {//async позволяет без перезагрузки страницы получить все данные с api
    e.preventDefault();
    const city = e.target.elements.city.value;
//Ниже код нужен для того, чтобы если пользователь ничего не вписал в строку города, то сайт не вылетал, а просто оставлял сайт в том состянии, в котором он был ДО отправления пустого запроса
    if(city){
      const api_url = await
    fetch( `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);//fetch позволяет получить все данные с api; так же требуется написать await т.к. это необходимый аргумент при вызове async
    const data = await api_url.json();
    console.log(data);

//Код ниже нужен для того, чтобы перевести секунды, которые мы получаем из переменных sunrise и sunset в дату
//Крч, получаем секунды
var sunset = data.sys.sunset;
//Фигачим сегодняшнюю переменную
var date = new Date();
//Подставляем данные нам секунды в сегодняшнюю дату
date.setTime(sunset);
//Создаём новую переменную, которая с помощью команд:getHours,getMinutes,getSeconds - переводит в нынешнее время(Для восхода)
//А после подставляем данную переменную в функцию ниже
var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

//Код переводит Фарингейты в Градусы
var tempeture = data.main.temp;
var real_tempeture = Math.round(tempeture * 0.048); 


//Так, короче, что делаем... Сначала из-за того, что мы вводим свойства в переменну которая УЖЕ в этом классе, используя this
//После используем слово set и имя переременной по тактике camelCase
//Затем вписываем свойства которые мы берем из API которое дал сайт, по такой тактике:
//Сначала мы используем данные API которые были названы как data.
//После мы обращаем к элементу main(через точку), а названия этих элементов можно узнать из API
//Затем мы обращаем к тому что нам из main нужно, опять же через точку.
      this.setState({
      temp: real_tempeture,
      city: data.name,
      country: data.sys.country,
      pressure: data.main.pressure,
      sunset: sunset_date, //data.sys.sunset вместо этого, вписываем переменную, которую мы задали выше
      error: undefined
    });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите корректное название города"
      });
    }
  }
  render (){
    return (
      //Сначало я дал название свойству(ОНО МОЖЕТ БЫТЬ ЛЮБЫМ, но у меня оно:weatherMethond) и передал данные(число,функции,массивы) от константы gettingWeather
      <div className="wrapper">
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 info">
              <Info />
            </div>
            <div className="col-sm-7 form">
              <Form weatherMethond={this.gettingWeather} />
              <Weather 
                temp ={this.state.temp}
                city ={this.state.city}
                country ={this.state.country}
                pressure ={this.state.pressure}
                sunset ={this.state.sunset}
                error ={this.state.error}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;