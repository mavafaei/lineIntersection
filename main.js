const algebra = require('algebra.js');
const { Fraction, Expression, Equation } = algebra
const math = require('mathjs')
const parser = math.parser()


// insert rent and rahn Range for renter
// also insert range rahn and rent
const data = {
    min_rahn: 5000000,
    max_rahn: 15000000,
    min_rent: 500000,
    max_rent: 1000000,
    range_rahn: 20000000,
    range_rent: 800000
}

// create renter expression
const renterExpression = [
    { name: 'Min Rent', key: algebra.parse(`y - ${data.min_rent}`), ans: [{ y: data.min_rent }, { x: 0 }] },
    { name: 'Max Rent', key: algebra.parse(`y - ${data.max_rent}`), ans: [{ y: data.max_rent }, { x: 0 }] },
    { name: 'Max Rahn', key: algebra.parse(`x - ${data.max_rahn}`), ans: [{ y: 0 }, { x: data.max_rahn }] },
    { name: 'Min Rahn', key: algebra.parse(`x - ${data.min_rahn}`), ans: [{ y: 0 }, { x: data.min_rahn }] }
]

const range = rangeCalculator()
console.log(`This is range Expression Formula => ${range} = 0`)
let summary = []
for (let i in renterExpression) {

    var expr1 = range;
    var expr2 = renterExpression[i].key;

    console.log(`\n================ ${renterExpression[i].name} ==================\n`)
    console.log('Check intersection between segments')
    console.log(expr1.toString(), "=", expr2.toString())
    var eq = new Equation(expr1, expr2);

    var xAnswer = eq.solveFor("x");
    var yAnswer = eq.solveFor("y");


    var answer_x = xAnswer.eval(renterExpression[i].ans[0]);
    var answer_y = yAnswer.eval(renterExpression[i].ans[1]);

    console.log(`x = ${xAnswer} evaluate to ${answer_x}`);
    console.log(`y = ${yAnswer} evaluate to ${answer_y}`);

    const evalX = parser.evaluate(answer_x.toString())
    const evalY = parser.evaluate(answer_y.toString())

    // check has intersection with segments
    const intersection_x = evalX <= data.max_rahn && evalX >= data.min_rahn
    const intersection_y = evalY <= data.max_rent && evalY >= data.min_rent
    console.log(`Point (${evalX},${evalY}) is ${intersection_x ? 'IN' : 'NOT IN'} (${data.max_rahn},${data.min_rahn}) range`);
    console.log(`Point (${evalX},${evalY}) is ${intersection_y ? 'IN' : 'NOT IN'} (${data.max_rent},${data.min_rent}) range`);

    summary.push(intersection_x)
    summary.push(intersection_y)
    console.log(`\n================ ${renterExpression[i].name} ==================\n`)

}

console.log(`Segments ${summary.includes(true) ? 'have' : 'don\'t have'} intersection`)


// create range formula based on range_rahn and range_rent
function rangeCalculator () {
    // suppose ArcTan(1/30) ~ 0.33
    var x1 = algebra.parse(`0.33*${data.range_rahn} + z`);
    var x2 = algebra.parse(`${data.range_rent}`);
    var eq = new Equation(x1, x2);
    var answer = eq.solveFor("z");

    return algebra.parse(`(0.33 * x) + (${answer}) - y`)
}