import React, { useEffect, useState } from "react";

const css = {
  fontSize: "12px",
};

function CarsFuuel(props) {
  return <h1 style={css}>Car's fuel consumed: {props.children}</h1>;
}

function Alert(props) {
  const fuel = props.fuel;
  const [state, setState] = useState(0);

  useEffect(() => {
    if (fuel > 1200) {
      setState(1);
    }
  });

  if (state) {
    return <h2 style={{ color: "red" }}>Alert</h2>;
  } else {
    return <h2>All is fine</h2>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    // We declare the state
    this.state = {
      x: 1,
      f: 0,
    };
  }

  updateCoordinates() {
    setInterval(() => {
      this.setState((prevState) => ({
        x: prevState.x + 1,
        f: 1 + prevState.f + prevState.x * 10,
      }));
    }, 1000);
  }

  componentDidMount() {
    this.updateCoordinates();
  }

  render() {
    var x1 = this.state.x;
    var fuel = this.state.f;

    return (
      <div>
        <h1>Position - {x1}</h1>
        <CarsFuuel>{fuel}</CarsFuuel>
        <Alert fuel={fuel} />
      </div>
    );
  }
}

export default App;

/*
 General comments:
  - Lack of content:
      - how styles are organized? (inline styles are not the best idea),
      - mix of functional/class components (is it ok according to project agreements?),
      - how fuel consumption should be calculated? I assume it's buggy now,
      - is it required to support translations, maybe there is a plan for the future to do it?
      - it's not good practice to keep all components in one file - should i comment on that?

 Review comments:     
    7: Nit: Typo in component name should be CarsFuel.
    7: You can pass only fuel prop and use destructuring assignment next time.
        (Please see Unpacking fields from objects passed as a function parameter from this doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring).
        In this case, there is no need to create additional component to display only that value, so you can move it directly to App.
    11: Alert component should be more reusable, currently is tightly coupled with our logic.
        I would suggest to keep it simple and only as presentational component, without any logic.
        For now, it can expose props like variant & children, and based on the variant apply correct styling (like error color).
    12: Lines 12-19 are redundant even in current shape of that component - there is no need to set internal state which is based on one prop value (more about it here: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)
        For things like 1200 value - please move it to variable with descriptive name and leave the comment to describe it.
    34: Please use more descriptive names, like position & fuelConsumption instead of x & f
    41: You are not saving timerId, and later it's not cleared. You should save what setInterval returns and later call it in componentWillUnmount:
        componentWillUnmount() { 
            clearInterval(this.state.intervalId)
        }
    45: Please double check this line with business requirements according to fuel consumption calculations.
        Currently, consumption will grow far too fast comparable to the distance traveled
    55: Please use const instead of var, also you can call it in one line, like f.e. { var1, var2 } = this.state;
    60: This block is not really HTML semantic friendly (you are using two h1 tags, one after another).
        Please use h1, h2, h3 with proper styles.
 */
