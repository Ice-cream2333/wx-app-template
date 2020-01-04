require('shelljs/global')

const webpack = require('webpack')
const fs = require('fs') //读取文件
const _ = require('lodash') //工具函数
const { resolve } = require('path')

const r = url => resolve(process.cwd(), url) //处理文件目录

const webpackConf = require('./webpack.conf') //配置文件
const config = require(r('./mina-config')) //约定页面所在位置以及资源变量
const project = require(r('./project.config'))
const sitemap = require(r('./sitemap'))
const assetsPath = r('./mina') //编辑后的文件夹

rm('-rf', assetsPath)
mkdir(assetsPath)

var renderConf = webpackConf

var entry = () =>
  _.reduce(
    config.json.pages,
    (en, i) => {
      en[i] = resolve(process.cwd(), './', `${i}.mina`)
      return en
    },
    {}
  )

renderConf.entry = entry()
renderConf.entry.app = config.app

renderConf.output = {
  path: r('./mina'),
  filename: '[name].js'
}

var compiler = webpack(renderConf)

fs.writeFileSync(r('./mina/app.json'), JSON.stringify(config.json), 'utf8')
fs.writeFileSync(r('./mina/sitemap.json'), JSON.stringify(sitemap), 'utf8')
fs.writeFileSync(
  r('./mina/project.config.json'),
  JSON.stringify(project),
  'utf8'
)

compiler.watch(
  {
    aggregateTimeout: 300,
    poll: true
  },
  (err, stats) => {
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: true,
        chunks: true,
        chunkModules: true
      })
    ) + '\n\n'
  }
)
