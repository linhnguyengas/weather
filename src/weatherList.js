import React, { Component } from 'react'
import compass from './compass.json';
import moment from 'moment';
export default class weatherList extends Component {
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
            <div id="heoding">
              <div className="container padding">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                        <div className="forecast">
                            <div className="day">{moment(weather.Date).format("MMM DD YYYY")}</div>
                            <div className="date">{moment(weather.Date).format("MMM DD")}</div>
                            <img src={imgSrc} alt=""/>
                            <h4>{weather.Temperature.Maximum.Value}<sup>o</sup>C</h4>
                            <p><img src={umberellaUrl} alt=""/>{weather.Day.RainProbability}%</p>
                            <p><img src={windUrl} alt=""/>{weather.Day.Wind.Speed.Value}km</p>
                            <p><img src={compassUrl}/>{this.loadCompass(weather.Day.Wind.Direction.English)}</p>
                            
                        </div>    
                    </div>
                   
                </div>
              </div> 
            </div>
        )
    }
}
