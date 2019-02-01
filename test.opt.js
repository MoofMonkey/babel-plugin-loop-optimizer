//  Optimizes `.forEach`, `.every`, `.find`, `.map`, `.filter` statements to `for` stements
let ar = [1, 2, 3]; // loop-optimizer: FORWARD, POSSIBLE_UNDEFINED

let _a = ar;
let _f = console.log;

for (let _i = 0; _i < _a.length; _i++) {
  _a[_i] !== undefined && _f(_a[_i], _i, _a);
}

// loop-optimizer: KEEP
ar.forEach(console.log); // nothing (default transform)

let _a2 = ar;
let _f2 = console.log;

for (let _i2 = _a2.length; _i2--;) {
  _f2(_a2[_i2], _i2, _a2);
}

let _a3 = ar;

let _f3 = el => {
  console.log(el);
  return true;
};

for (let _i3 = _a3.length; _i3--;) {
  if (!_f3(_a3[_i3], _i3, _a3)) {
    break;
  }
}

let _a4 = ar;

let _f4 = el => {
  console.log(el);
  return true;
};

for (let _i4 = _a4.length; _i4--;) {
  if (_a4[_i4] !== undefined && !_f4(_a4[_i4], _i4, _a4)) {
    break;
  }
}

let _a5 = ar;
let _f5 = console.log;
let _r = [];

for (let _i5 = _a5.length; _i5--;) {
  _r.push(_f5(_a5[_i5], _i5, _a5));
}

// nothing (default transform)
console.log(_r); // loop-optimizer: POSSIBLE_UNDEFINED

let _a6 = ar;
let _f6 = console.log;
let _r2 = [];

for (let _i6 = _a6.length; _i6--;) {
  if (_a6[_i6] !== undefined) {
    _r2.push(_f6(_a6[_i6], _i6, _a6));
  }
}

console.log(_r2); // nothing (default transform)

let _a7 = ar;

let _f7 = el => {
  console.log(el);
  return false;
};

let _r3 = [];

for (let _i7 = _a7.length; _i7--;) {
  if (_f7(_a7[_i7], _i7, _a7)) {
    _r3.push(_a7[_i7]);
  }
}

console.log(_r3); // loop-optimizer: POSSIBLE_UNDEFINED

let _a8 = ar;

let _f8 = el => {
  console.log(el);
  return false;
};

let _r4 = [];

for (let _i8 = _a8.length; _i8--;) {
  if (_a8[_i8] !== undefined && _f8(_a8[_i8], _i8, _a8)) {
    _r4.push(_a8[_i8]);
  }
}

console.log(_r4);
