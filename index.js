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
