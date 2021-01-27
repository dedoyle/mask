// es6 module，变量只在模块内有效
// 暂时不考虑事件移除

// 横向格子数量
let width = 0
// 纵向格子数量
let height = 0
// 收集颜色格子坐标 grid[x][y] = 1
// x 为纵轴，y 为 横轴
let grid = []
let islandNumEl = null
let numTimer = null

window.onload = () => {
  const btn = document.getElementById('btn')
  islandNumEl = document.getElementById('island-num')

  btn.addEventListener('click', handleBtnClick)

  document.oncontextmenu = function (e) {
    e.preventDefault()
  }
  document.addEventListener('keydown', handleKeyDown)
}

function handleBtnClick() {
  width = Math.floor(document.getElementById('width-num').value)
  height = Math.floor(document.getElementById('height-num').value)

  if (!width || !height || width < 0 || height < 0) {
    alert('请输入宽度和高度，且必须输入正整数')
    return
  }

  initCells(width, height)
}

function initCells(width, height) {
  hideForm()
  const data = getData(width, height)
  drawCells(data, width, height)

  document
    .getElementById('panel')
    .addEventListener('mousedown', handleCellClick)
}

function getData(width, height) {
  const data = []
  for (let x = 0; x < height; x++) {
    grid[x] = []
    for (let y = 0; y < width; y++) {
      // 每个格子颜色初始化为 0，表示无颜色
      grid[x][y] = 0
      data.push({
        x,
        y,
        color: '',
      })
    }
  }
  return data
}

function drawCells(data, width, height) {
  const copy = [...data]
  let per = 100
  const panel = document.getElementById('panel')
  panel.classList.remove('hidden')

  function drawLines() {
    const part = copy.splice(0, per)
    if (part.length === 0) {
      return
    }

    const fragement = document.createDocumentFragment()

    let cell = null
    part.forEach((item) => {
      cell = document.createElement('div')
      cell.setAttribute('id', `key-${item.x}-${item.y}`)
      cell.classList.add(
        'cell',
        'bd-1',
        'bd-solid',
        'bd-grey',
        'inline-block',
        'transition-colors'
      )
      cell.style = `width: ${(1 / width) * 100}%; height: ${
        (1 / height) * 100
      }%;`
      cell.dataset.x = item.x
      cell.dataset.y = item.y
      fragement.append(cell)
    })

    panel.append(fragement)

    requestAnimationFrame(drawLines)
  }

  requestAnimationFrame(drawLines)
}

function hideForm() {
  document.getElementById('form').classList.add('hidden')
}

// 生成随机颜色
function getRandomColor() {
  let color = '#'
  //随机生成 6 位 0-15 之间的数字，再用 toString(16) 将数字转成 16进制
  for (let i = 0; i < 6; i++) {
    color += parseInt(Math.random() * 16).toString(16)
  }
  return color
}

// 点击盒子填充或清除颜色
function handleCellClick(e) {
  const el = e.target
  if (!el.classList.contains('cell')) {
    return
  }
  const { x, y } = el.dataset
  if (e.button === 0) {
    el.style.backgroundColor = getRandomColor()
    grid[x][y] = 1
  } else if (e.button === 2) {
    el.style.backgroundColor = 'unset'
    grid[x][y] = 0
  }

  getIslandNum(grid)
}

function getIslandNum(grid) {
  function dfs(grid, i, j) {
    if (i < 0 || i > height || j < 0 || j > width || grid[i][j] === 0) {
      return
    }
    grid[i][j] = 0
    dfs(grid, i - 1, j)
    dfs(grid, i + 1, j)
    dfs(grid, i, j - 1)
    dfs(grid, i, j + 1)
  }
  let count = 0
  let copy = JSON.parse(JSON.stringify(grid))
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (copy[i][j] === 1) {
        dfs(copy, i, j)
        count++
      }
    }
  }
  showIslandNum(count)
  return count
}

function showIslandNum(num) {
  clearTimeout(numTimer)
  islandNumEl.classList.remove('opacity-0')
  islandNumEl.classList.add('opacity-1')
  islandNumEl.innerText = '' + num
  numTimer = setTimeout(() => {
    islandNumEl.classList.remove('opacity-1')
    islandNumEl.classList.add('opacity-0')
  }, 1000)
}

function handleKeyDown(e) {
  const keyNum = window.event ? e.keyCode : e.which
  // c 对应的键码为 67
  if (keyNum !== 67) {
    return
  }
  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      if (grid[x][y] === 1) {
        document.getElementById(
          `key-${x}-${y}`
        ).style.backgroundColor = getRandomColor()
      }
    }
  }
}
