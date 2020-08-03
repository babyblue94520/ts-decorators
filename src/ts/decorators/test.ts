
// function test(...args) {
//     const _this = this;
//     return function () {
//         const use = _this;
//         const arg = args;
//     };
// }
// let t = Date.now();
// let fns = {};
// for (let i = 0; i < 1000000; i++) {
//     fns[i] = test(i);
// }
// console.log(Date.now() - t);


// function test2(...args) {
//     const use = this;
//     const arg = args;
// }
// const t = Date.now();
// for (let i = 0; i < 1000000; i++) {
//     const fn = test2.bind(this, i);
// }
// console.log(Date.now() - t);

// function test2(...args) {
//     const use = this;
//     const arg = args;
// }
// const t = Date.now();
// const fns = {};
// for (let i = 0; i < 1000000; i++) {
//     fns[i] = (...args) => {
//         const use = this;
//         const arg = args;
//     };
// }
// console.log(Date.now() - t);
