import React, { Component } from 'react'
import compass from './compass.json';
export default class today extends Component {
    constructor(props){
        super(props);
        this.location = this.props.location;
    }
    
    loadImage = (icon) =>{
        let imgNum =(icon < 10 ? '0' : '') + icon;
        return 'https://developer.accuweather.com/sites/default/files/' + imgNum + '-s.png';
    }
    loadCompass = (directAbb) =>{
        return compass.find(com => com.abbreviation === directAbb).direction;
    }
    
    render() {
        let weather = this.props.weather;
        let imgSrc = this.loadImage(weather.Day.Icon);
        let compassUrl = "http://res.cloudinary.com/duongph/image/upload/v1527525276/icon-compass_qofhlv.png"
        let windUrl = "http://res.cloudinary.com/duongph/image/upload/v1527525242/icon-wind_c9axdn.png";
        let umberellaUrl = "http://res.cloudinary.com/duongph/image/upload/v1527525239/icon-umberella_ewdep8.png";
        return (
            <div id="main">
                <div className="container padding">
                    <div className="content">
                        <div className="row">      
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                <div className="item">
                                    <img src={imgSrc} alt=""/>
                                </div>
                                </div>
                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                <div className="temperate">
                                    <h3>{weather.Temperature.Maximum.Value}<sup>o</sup>C</h3>
                                    <span className="umberella"><img src={umberellaUrl} alt=""/>{weather.Day.RainProbability}%</span>
                                    <span className="windy"><img src={windUrl} alt=""/>{weather.Day.Wind.Speed.Value}km</span>
                                    <span className="compass"><img src={compassUrl}/>{this.loadCompass(weather.Day.Wind.Direction.English)}</span>
                                </div>
                            </div>
                            <h4 className="titleWeather">Weather today!</h4>
                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                <div className="country">
                                    <h2 className="display-4">{this.location}</h2>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
              </div>
        )
    }
}
