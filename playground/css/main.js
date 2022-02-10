import mod from './mod.module.css'
import sassMod from './scss.scss'
import lessMod from './less-module.less'

document.querySelector('.modules').classList.add(mod['apply-color'])
document.querySelector('.modules-code').textContent = JSON.stringify(
  mod,
  null,
  2,
)

document.querySelector('.modules-sass').classList.add(sassMod['apply-color'])
document.querySelector('.modules-sass-code').textContent = JSON.stringify(
  sassMod,
  null,
  2,
)

document.querySelector('.modules-less').classList.add(lessMod['apply-color'])
document.querySelector('.modules-less-code').textContent = JSON.stringify(
  lessMod,
  null,
  2,
)
