import './detail.scss'


console.log('我是详情页')

const img = new Image()
// public 中的文件在打包时会自动拷贝到 build 目录中
img.src = './vite.svg'
document.body.appendChild(img)


console.log(__APP_VERSION__)
console.log(process.env.NODE_ENV)