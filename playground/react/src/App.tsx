import './App.css'
import './App.less'
import './App.scss'
import cssM from './App.module.css'
import css from './App-module.css'
import less from './App-module.less'
import sass from './App-module.scss'

function App() {
  return (
    <div className="App">
      <p className={cssM.applyColor}>App.module.css: firebrick</p>
      <p className={css.applyColor}>App-module.css: antiquewhite</p>
      <p className={less.applyColor}>App-module.less: bisque</p>
      <p className={sass.applyColor}>App-module.scss: cadetblue</p>
      <p className={sass.applyBg}>App-module.scss: background-image</p>
      <p className="less">App.less: darkblue</p>
      <p className="sass">App.scss: gray</p>
      <p className="css">App.css: coral</p>
    </div>
  )
}

export default App
