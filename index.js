window.onload = () => {
  const btn = document.getElementById('btn')

  btn.addEventListener('click', handleBtnClick)

  function handleBtnClick() {
    const width = Math.floor(document.getElementById('width-num').value)
    const height = Math.floor(document.getElementById('height-num').value)

    if (!width || !height || width < 0 || height < 0) {
      alert('请输入宽度和高度，且必须输入正整数')
      return
    }

    generateCells(width, height)

    document.oncontextmenu = function (e) {
      e.preventDefault()
    }
    const panel = document.getElementById('panel')
    panel.onmousedown = handleBoxClick
  }
}

function generateCells(width, height) {
  console.log(width, height)
  const data = getData(width, height)
  console.log(data)
  hideForm()
  drawCells(data, width, height)
}

function getData(width, height) {
  const data = []
  for (let i = 0, len = width * height; i < len; i++) {
    data.push({
      id: i,
      color: '',
    })
  }
  return data
}

function drawCells(data, width, height) {
  const fragment = document.createDocumentFragment()
  let outter
  let inner
  data.forEach((item) => {
    outter = document.createElement('div')
    outter.classList.add('cell')
    outter.style = `width: ${(1 / width) * 100}%; height: ${
      (1 / height) * 100
    }%;`
    outter.dataset.key = item.id

    inner = document.createElement('div')
    inner.classList.add('w-full', 'h-full', 'bd-1')
    outter.append(inner)
    fragment.append(outter)
  })
  const panel = document.getElementById('panel')
  panel.classList.remove('hidden')
  panel.append(fragment)
}

function hideForm() {
  document.getElementById('form').classList.add('hidden')
}

// 生成随机颜色
function getRandomColor() {
  return (
    '#' +
    (function (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) &&
        color.length == 6
        ? color
        : arguments.callee(color)
    })('')
  )
}

// 点击盒子填充或清除颜色
function handleBoxClick(ev) {
  const el = ev.target
  if (ev.button === 0) {
    el.style.backgroundColor = getRandomColor()
  } else if (ev.button === 2) {
    el.style.backgroundColor = 'unset'
  }
}
