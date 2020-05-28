import React from "react";
import '../styles/card.css'

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.active
    };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
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
    let backgroundColor = "white"

    if (isActive)
      backgroundColor = "green"

    return (
      <div
        style={{background: backgroundColor}}
        onClick={() => this.onCardClick()} className="card-frame">
        <span className="card-value">{value}</span>
      </div>
    )
  }
}

export default Card;
