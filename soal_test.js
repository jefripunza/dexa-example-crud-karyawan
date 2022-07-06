// data yg akan di train
let nums = [2, 6, 8, 12, 12];
// focus
const target = 14;

// membuat sebuah function (array function) untuk mengeksekusi setiap value data
const execute = (sample, i_sample) => {
  // buat terlebih dahulu penampung data yang match
  const match = [];
  // kita train satu2 data yang sekarang di trains
  for (let i = 0; i < nums.length; i++) {
    const num_now = nums[i];
    const calculate = sample + num_now;
    if (calculate === target) {
      match.push([i_sample, i]);
    }
  }
  return match;
};

const prepare = nums.reduce((simpan, sample, i) => {
  const result = execute(sample, i);
  return [...simpan, ...result];
}, []);
const mid = prepare.length / 2;
const finish = prepare.filter((_, i) => i <= mid - 1); //

console.log({ finish });
