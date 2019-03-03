import React, { Component } from "react";

class Converter extends Component {
  state = {
    currencies: ["CAD", "CHF", "GBP", "SEK", "EUR", "USD"],
    base: "USD",
    amount: "",
    convertTo: "EUR",
    result: "",
    date: ""
  };

  handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value,
        result: null,
        date: null
      },
      this.calculate
    );
  };

  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then(res => res.json())
        .then(data => {
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
          this.setState({
            result,
          });
        });
    }
  };

  handleSwap = e => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState(
      {
        convertTo: base,
        base: convertTo,
        result: null
      },
      this.calculate
    );
  };
  render() {
    const { currencies, base, amount, convertTo, result } = this.state;
    return (
      <div >
        <h4>
          {amount} {base} is equevalent to
        </h4>
        <h2>
          {amount === ""
            ? "0"
            : result === null
            ? "Loading. . ."
            : result}{" "}
          {convertTo}
        </h2>
        <div className="row">
            <div>
              <form>
                <input
                  type="number"
                  value={amount}
                  onChange={this.handleInput}
                />
                <select
                  name="base"
                  value={base}
                  onChange={this.handleSelect}
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </form>

              <form>
                <input
                  disabled={true}
                  value={
                    amount === ""
                      ? "0"
                      : result === null
                      ? "Loading. . ."
                      : result
                  }
                />
                <select
                  name="convertTo"
                  value={convertTo}
                  onChange={this.handleSelect}
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </form>
            </div>

            <div className="arrow">
              <h1 onClick={this.handleSwap} className="swap">
                &#8595;&#8593;
              </h1>
            </div>
          </div>
      </div>
    );
  }
}

export default Converter;
