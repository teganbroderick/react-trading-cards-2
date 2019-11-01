var tradingCardData = [
  {
    name: 'Balloonicorn',
    skill: 'video games',
    imgUrl: '/static/img/balloonicorn.jpg'
  },

  {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg'
  },

  {
    name: 'Llambda',
    skill: 'knitting scarves',
    imgUrl: '/static/img/llambda.jpg'
  }
];

class TradingCard extends React.Component {
  render() {
    return (
      <div className="card">
        <p>Name: {this.props.name}</p>
        <img src={this.props.imgUrl} />
        <p>Skill: {this.props.skill} </p>
      </div>
    );
  }
}


class TradingCardContainer extends React.Component {
  constructor() {
    super();

    this.state = { cards: [] }; // Set initial value
    this.updateCards = this.updateCards.bind(this);
  }


  getCardData() {
    $.get('/cards.json', this.updateCards);
  }


  updateCards(response) {
    //update the state to have one card object inside
    const cards = response.cards;
    this.setState({cards: cards});
  }

  componentDidMount() {
    this.getCardData();
  }

  // render() {
  //   // code that loops and creates cards here

  //   return (
  //     <div>
  //       <TradingCardForm />
  //       <div>{tradingCards}</div>
  //     </div>
  //   );
  // }

  render() {
    const tradingCards = [];

    for (const currentCard of this.state.cards) { 
      //this.state.cards renders the cards in our component’s state 
      //instead of the static data defined in our file

      tradingCards.push(
        <TradingCard
          key={currentCard.name}
          name={currentCard.name}
          skill={currentCard.skill}
          imgUrl={currentCard.imgUrl}
        />
      );
    }

    return (
      <div>{tradingCards}</div>
    );
  }
}

class TradingCardForm extends React.Component {
  constructor() {
    super()

    this.state = {
      //set initial value for state
      name: '',
      skill: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
    //bind things because you need to bind them
  }

  addNewCard() {
    // FIXME
    alert('trying to add a new card!')
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
    //set state to have a new name value
  }

  handleSkillChange(e) {
    this.setState({ skill: e.target.value });
    //set state to have a new skill value
  }

  render() {
    return (
      <form>
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <label for="skill">Skill:</label>
        <input
          id="skill"
          type="text"
          value={this.state.skill}
          onChange={this.handleSkillChange}
        />

        <button onClick={this.addNewCard}>Add</button>
      </form>
    );
  }
}

ReactDOM.render(
  <TradingCardContainer />,
  document.getElementById('container')
);
