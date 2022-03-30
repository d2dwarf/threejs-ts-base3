import { GridHelper, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Canvas {

  // properties
  protected windowSize = {
    w: 0,
    h: 0
  }
  protected cameraState = {
    fov: 0,
    aspect: 0,
    near: 0,
    far: 0,
    lookAt: new Vector3(0, 0, 0)
  }
  protected scene: Scene | null = null
  protected renderer: WebGLRenderer | null = null
  protected camera: PerspectiveCamera | null = null

  // constructor
  constructor(canvasElement: Element) {

    // init window
    this.windowSize.w = window.innerWidth
    this.windowSize.h = window.innerHeight
    // init camera status
    this.cameraState.fov = 60
    this.cameraState.aspect = this.windowSize.w / this.windowSize.h
    this.cameraState.near = 0.1
    this.cameraState.far = 10000
    // generate scene
    this.scene = new Scene()
    // generate renderer
    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true
    })
    this.renderer.setSize(this.windowSize.w, this.windowSize.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // generate camera
    this.camera = new PerspectiveCamera(this.cameraState.fov, this.cameraState.aspect, this.cameraState.near, this.cameraState.far)
    this.camera.position.set(0, 0, 1000)
    this.camera.lookAt(this.cameraState.lookAt)
    this.scene.add(this.camera)
    // create canvas
    canvasElement.appendChild(this.renderer.domElement)

    // controls
    new OrbitControls(this.camera, this.renderer.domElement)
    // grid
    const gridHelper = new GridHelper(5000, 100, 0x00ff00, 0x00ff99)
    this.scene.add(gridHelper)
  }

  // get scene method
  public getScene = (): Scene => {
    return this.scene as Scene
  }
  // get camera method
  public getCamera = (): PerspectiveCamera => {
    return this.camera as PerspectiveCamera
  }
  // resize method
  public onResize = (): void => {
    if (this.camera != null && this.renderer != null) {
      this.windowSize.w = window.innerWidth
      this.windowSize.h = window.innerHeight
      this.cameraState.aspect = this.windowSize.w / this.windowSize.h
      this.camera.aspect = this.cameraState.aspect
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.windowSize.w, this.windowSize.h)
      this.renderer.setPixelRatio(window.devicePixelRatio)
    }
  }
  // render method
  public onRender = (): void => {
    if (this.scene != null && this.camera != null && this.renderer != null) {
      this.renderer.render(this.scene, this.camera)
    }
  }
}