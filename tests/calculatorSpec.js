describe("Tests on isNumber regex", () => {
  it("should know 1 is a number", () => {
    let result = isNumber("1");
    expect(result).toEqual(true);
  });

  it("should know 0.1 is a number", () => {
    let result = isNumber("0.1");
    expect(result).toEqual(true);
  });

  it("should know 0. is a number", () => {
    let result = isNumber("0.");
    expect(result).toEqual(true);
  });

  it("should know 1.0 is a number", () => {
    let result = isNumber("1.0");
    expect(result).toEqual(true);
  });

  it("should know 1. is a number", () => {
    let result = isNumber("1.");
    expect(result).toEqual(true);
  });

  it("should know 42 is a number", () => {
    let result = isNumber("42");
    expect(result).toEqual(true);
  });

  it("should know + is not a number", () => {
    let result = isNumber("+");
    expect(result).toEqual(false);
  });
});

describe("Tests on isPeriod regex", () => {
  it("should know 1. ends with period", () => {
    let result = isPeriod("1.");
    expect(result).toEqual(true);
  });

  it("should know 12 does not end with period", () => {
    let result = isPeriod("12");
    expect(result).toEqual(false);
  });
});

describe("Tests on isOperand regex", () => {
  it("should know + is a valid operand", () => {
    let result = isOperand("+");
    expect(result).toEqual(true);
  });

  it("should know - is a valid operand", () => {
    let result = isOperand("-");
    expect(result).toEqual(true);
  });

  it("should know / is a valid operand", () => {
    let result = isOperand("/");
    expect(result).toEqual(true);
  });

  it("should know * is a valid operand", () => {
    let result = isOperand("*");
    expect(result).toEqual(true);
  });

  it("should know ( is not a valid operand", () => {
    let result = isOperand("(");
    expect(result).toEqual(false);
  });

  it("should know 1.0 is not a valid operand", () => {
    let result = isOperand("1.0");
    expect(result).toEqual(false);
  });
});

describe("Tests for calculation", () => {
  it("should calculate correctly simple addition", () => {
    let result = calculate(["4", "+", "3"]);
    expect(result).toEqual(7);
  });

  it("should replace calculations with the result", () => {
    let calculations = ["4", "+", "3"];
    let result = calculate(calculations);

    expect(result).toEqual(7);
    expect(calculations).toEqual(["7"]);
  });
});
