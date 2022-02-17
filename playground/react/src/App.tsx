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
      <p className={cssM.applyColor}>css.module</p>
      <p className={css.applyColor}>css module</p>
      <p className={less.applyColor}>less module</p>
      <p className={sass.applyColor}>sass module</p>
      <p className="less">less</p>
      <p className="sass">sass</p>
    </div>
  )
}

export default App
