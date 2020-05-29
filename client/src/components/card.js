import React from "react";
import '../styles/card.css'

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
    this.setState((currentState) => ({isActive: !currentState.isActive}));
  }

  render() {
    const {isActive} = this.state;
    const {value} = this.props
    let backgroundColor = "3px solid #000"
    let textColor = "white"

    if (isActive) {
      backgroundColor = "3px solid #30af25"
      textColor = "#C1FFC1"
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
