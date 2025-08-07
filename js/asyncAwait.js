function awaitFn(num) {
  return new Promise((rj) => {
    setTimeout(() => {
      rj(num);
    }, 1000);
  });
}

function* asyncFn() {
  console.log("start");

  let res = yield awaitFn("async123");
  console.log("res", res);
}

function async(fn) {
  const f = fn();
  function next(data) {
    console.log("🚀 ~ next ~ data:", data);
    const res = f.next(data);
    console.log("🚀 ~ next ~ res:", res);
    if (res.done) return res.value;
    Promise.resolve(res.value).then(next);
  }

  next();
}

async(asyncFn);
