
import { BoxGeometry, DirectionalLight, Mesh, ShaderMaterial } from 'three'
import Canvas from './Canvas'
import vertexShader from '@/shader/vertexShader.vert'
import fragmentShader from '@/shader/fragmentShader.frag'
import '@/scss/main'

const init = (): void => {

  // start
  console.log('starting...')

  // get canvas element
  const element = document.querySelector('#root-canvas')
  if (element != null) {
    // set canvas instance
    const canvas = new Canvas(element)

    // get scene object
    const scene = canvas.getScene()
    // get camera object
    const camera = canvas.getCamera()

    // generate box
    const box = new Mesh(
      new BoxGeometry(300, 300, 300),
      new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      })
    )
    box.position.set(0, 0, 0)
    scene.add(box)

    // directional right - sun beam
    const light = new DirectionalLight(0xffffff)
    light.position.set(0, 0, 10000)
    scene.add(light)

    // set resize event
    window.addEventListener('resize', canvas.onResize)

    // animation method
    const animate = () => {
      window.requestAnimationFrame(() => animate())

      // rolling box
      box.rotation.x += 0.01
      box.rotation.y += 0.01

      // render
      canvas.onRender()
    }

    // program start...
    animate()
  }
}

window.addEventListener('DOMContentLoaded', init)