import React, { Component } from "react";
import { PageHeader, Table} from "react-bootstrap";
import "./Home.css";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

const axios = require('axios');
const moment = require('moment');

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      startDate: new Date()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {

    try {
      let games = await this.games();
      this.setState({ games: games });
    } catch (e) {
      alert(e);
    }
  }

  games(date) {
    let theDate = moment(date).subtract(1, 'day').format("YYYY-MM-DD")
    return axios.get('https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate='+ theDate +'&endDate='+theDate)
        .then( response => {
          return response.data.dates[0].games
        })
  }

  handleChange(date) {

    this.setState({
      startDate: date
    });
    this.refreshGames(date)
  }

  async refreshGames(date){
    let games = await this.games(date);
    this.setState({ games: games });
  }


  renderGamesList(games) {
    return(
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>#</th>
        <th>Home</th>
        <th>#</th>
        <th>Away</th>
        <th>#</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {
        games.map((game, i) => {
          let homeClassName = '', awayClassName = '';
          if(game.status.abstractGameState === 'Final') {
            homeClassName= game.teams.home.isWinner === true ? 'winner' : 'loser';
            awayClassName= game.teams.away.isWinner === true ? 'winner' : 'loser'
          }
          return(
              <tr key={game.gamePk}>
                <td>{ i+1 }</td>
                <td className={homeClassName}>{game.teams.home.team.name}</td>
                <td className={homeClassName}>{game.teams.home.score}</td>
                <td className={awayClassName}>{game.teams.away.team.name}</td>
                <td className={awayClassName}>{game.teams.away.score}</td>
                <td>{game.status.abstractGameState}</td>
              </tr>
              )
        })
      }


      </tbody>
    </Table>
  )
  }

  renderGames() {
    return (
      <div className="games">
        <PageHeader>MLB Games&nbsp;
          <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
          />
        </PageHeader>

        { this.renderGamesList(this.state.games) }

      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        { this.renderGames() }
      </div>
    );
  }
}
