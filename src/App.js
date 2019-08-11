import React,{Component} from 'react';
import Sunny from './img/sunny.png';
import Autosuggest from 'react-autosuggest';
import cities from './cities.json';
import Axios from 'axios';
import './App.css';
import Today from './today';
import WeatherList from './weatherList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      arrWeather:[],
      value: '',
      suggestions: [],
      location:[]
    };    
  }
  
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };
  
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  
  requestApi = (cityname) =>{
      if(cities.find(city => city.name === cityname) !== undefined){
      let key ='ANS4ds5p56JiBPGk5AEfb4EQGN4ZQB4l';
      let locationID = cities.find(city => city.name === cityname).locationId ;
      let name =  cities.find(city => city.name === cityname).name
      let url = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationID + '?apikey=' + key + '&q=' + name +'&language=vi&details=true&metric=true';
      Axios.get(url).then(res =>{
        this.setState({
          arrWeather: res.data.DailyForecasts,

        });
      }).catch(err =>{
        console.log(err);
      })
    }
  }
  loadLocation = () =>{
    const url ='https://ipinfo.io/geo';
    Axios.get(url).then(response =>{
      this.setState({
        value: response.data.city
      });
      this.requestAPI(response.data.city);
    })
    .catch(err =>{
      console.log(err);
    })
  }
  loadCurrentWeather = () =>{
    this.state.value ==="" || (cities.find(city => city.name === this.state.value)===undefined) ? this.loadLocation() : this.requestApi(this.state.value);
  }

  render(){
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Find your location....",
      value,
      onChange: this.onChange
    };

        return (
        <div>
          <div id="header">
            <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
                <div className="container-fluid">
                    <a className="navbar-branch" href="#sector">
                        <h3>Weather</h3>
                    </a>
                    <div className="col-md-1">
                        <div className="checkbox animated fadeInDown">
                            <div className="inner" >
                                <div className="toggle"></div>
                            </div>
                        </div>
                    </div>
                    <div className="search">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                      />
                      <button className="load-weather" onClick={this.loadCurrentWeather}>
                        Get weather
                      </button>
                    </div>
                </div>
            </nav> 
          </div>
          <div id="main-content">
              {
                this.state.arrWeather.map((weather, index) =>{
                  if(index === 0 ){
                    return (<Today location = {this.state.value} weather={weather} key = {index} />)
                  }else{
                    return (<WeatherList weather ={weather} key = {index}/>)
                  }
                })
              }
          </div>
            <div id="copyright">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                          <p>Copyright &copy;2019</p>
                      </div>
                      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                          <p>By Linhgas</p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      );
    };
  };
  
export default App;

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return cities.filter(city => regex.test(city.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}