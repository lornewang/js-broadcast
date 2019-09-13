var handles

if (!handles) {
  handles = {}
}

// 监听事件
// options.flag 指定监听标识符
function on(name, fn, options) {
  options = Object.assign({
    flag: "anonymous"
  }, options || {});

  if (!handles[name]) {
    handles[name] = {}
  }

  if (!handles[name][options.flag]) {
    handles[name][options.flag] = []
  }

  handles[name][options.flag].push(fn)
}

// 卸载事件
// options.flag 可移除指定标识符的事件
function off(name, options) {
  options = Object.assign({
    flag: "anonymous"
  }, options || {});

  if (handles[name]) {
    if (options.flag === "anonymous") {
      delete handles[name]
    } else if (handles[name][options.flag]) {
      delete handles[name][options.flag]
    }
  }
}

// 呼叫事件
function emit(name, value) {
  if (handles[name]) {
    for (var flag in handles[name]) {
      for (var i = 0; i < handles[name][flag].length; i++) {
        handles[name][flag][i](value)
      }
    }
  }
}

module.exports = {
  on,
  off,
  emit
}