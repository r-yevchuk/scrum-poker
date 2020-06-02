import React from "react";
import '../styles/card.css'
import {cardSet} from "../const/config";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.active
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.state.isActive) {
      this.setState({isActive: nextProps.active});
    }
  }

  onCardClick() {
    // this.setState((currentState) => ({isActive: !currentState.isActive}));
    this.setState((currentState) => ({
      isActive: !currentState.isActive
    }), () => {
      this.props.handle();
    });
    // this.props.handle();
  }

  render() {
    const {isActive} = this.state;
    const {index, value} = this.props
    let backgroundColor = "3px solid #000"
    let textColor = "white"

    if (isActive) {
      backgroundColor = "3px solid #30af25"
      textColor = "#C1FFC1"
      cardSet.selected[index] = true;
    } else {
      cardSet.selected[index] = false
    }

    return (
      <div
        style={{border: backgroundColor, background: textColor}}
        onClick={() => this.onCardClick()} className="card-frame">
        <span className="card-value">{value}</span>
      </div>
    )
  }
}

export default Card;
