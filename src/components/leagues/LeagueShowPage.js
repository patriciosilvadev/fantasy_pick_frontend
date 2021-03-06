import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { sortByPoints } from "../../services/helpers";
import JoinLeague from "./JoinLeague";
import EditLeague from "./EditLeague";
import Chat from "../chat/Chat";
import { message } from "../../services/svg-icons";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// CHECK IF USER IS LEAGUE MEMBER OR IF THERE IS USER AT ALL WHEN RENDERING MESSAGES
class LeagueShowPage extends React.Component {
  state = {
    modal: false,
  };
  checkUserJoin = (league) => {
    if (this.props.user.id === league.user.id) {
      return this.renderEditLeague(league);
    } else {
      let userJoin = this.props.userLeagues.filter(
        (l) => l.league_name === league.league_name
      );
      if (!userJoin) {
        return this.renderJoinLeague(league);
      }
    }
  };
  renderJoinLeague = (league) => <JoinLeague league={league} />;
  renderEditLeague = (league) => <EditLeague league={league} />;

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const league = this.props.leagues.find(
      (league) => league.id === this.props.id
    );
    const link = `http://localhost:3001/leagues/${league.id}`;
    const userLeagueMember = league.join.filter(
      (join) => join.user_id === this.props.user.id
    );
    console.log(userLeagueMember);
    return (
      <div className="league-table-container">
        <div className="league-info">
          <h1 id="league-name">{league.league_name}</h1>
        </div>
        <div className="league-info">
          <FacebookShareButton
            url={`http://localhost:3001/leagues/${league.id}`}
            quote={`Check out ${league.league_name} league on Fantasy Pick`}
            hashtag="#fantasyPick"
          >
            <FacebookIcon size={32} />
          </FacebookShareButton>
          <EmailShareButton
            url={`http://localhost:3001/leagues/${league.id}`}
            subject={`Check out ${league.league_name} league on Fantasy Pick`}
            body={`Hey,
              Join ${league.league_name} league in this link:
              ${link}`}
          >
            <EmailIcon size={32} />
          </EmailShareButton>
        </div>
        {this.props.isUser ? this.checkUserJoin(league) : null}
        <table className="ui selectable celled table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {sortByPoints(league.join).map((user) => (
              <tr key={user.user.id}>
                <td>{league.join.indexOf(user) + 1}</td>
                <td>
                  {user.user.username}
                  {user.user.id !== this.props.user.id ? (
                    <button
                      onClick={this.toggle}
                      data-bs-toggle="modal"
                      data-bs-target="#chat"
                      className="btn"
                    >
                      {message}
                    </button>
                  ) : null}
                </td>
                <td>{user.user.wins ? user.user.wins : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          style={{ height: "100vh", width: "100vw" }}
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalBody>
            <Chat user={this.props.user} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isUser: state.isUser,
    leagues: state.leagues,
    userLeagues: state.userLeagues,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     addJoinToLeague(join) {
//       dispatch(addJoinToLeague(join));
//     },
//     setLeagues(leagues) {
//       dispatch(setLeagues(leagues));
//     },
//   };
// }

export default connect(mapStateToProps)(withRouter(LeagueShowPage));
