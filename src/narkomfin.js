import './narkomfin.css'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

document.addEventListener('DOMContentLoaded', () => {
  initThree()
  initNavigation()
})

function initNavigation() {
  const links = document.querySelectorAll('.mainMenu a')
  const closeButton = document.querySelector('.closeButton')
  const content = document.querySelector('.content')
  const header = document.querySelector('.header')

  links.forEach((link) => {
    link.addEventListener('click', () => {
      let linkId = link.href.split('#')[1]

      document.getElementById(linkId).classList.remove('none')
      document.querySelector(`.${linkId}`).classList.add('active')
      header.classList.add('none')
      content.classList.remove('none')

      closeButton.addEventListener('click', () => {
        header.classList.remove('none')
        content.classList.add('none')
        document.getElementById(linkId).classList.add('none')
        document.querySelector(`.${linkId}`).classList.remove('active')
      })
    })
  })
}

function initThree() {
  console.log('Update')
  const container = document.querySelector('.model')

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#e1e1df')
  scene.position.set(0, -30, 0)

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  )
  camera.position.set(0, 100, 200)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)

  {
    const loader = new GLTFLoader()
    loader.load(
      './model-narkomfin/scene.gltf',
      (gltf) => {
        scene.add(gltf.scene)
      },
      (error) => {
        console.log('Ошибка:' + error)
      }
    )
  }
  {
    const light = new THREE.AmbientLight(0xeeeeee)
    scene.add(light)
  }
  {
    const light = new THREE.DirectionalLight(0xeeeeee, 1)
    light.position.set(80, 120, 0)
    light.lookAt(0, 0, 0)

    // const helper = new THREE.DirectionalLightHelper(light, 5);

    scene.add(light)
  }
  {
    const light = new THREE.DirectionalLight(0xeeeeee, 1)
    light.position.set(-90, 120, 0)
    light.lookAt(0, 0, 0)

    // const helper = new THREE.DirectionalLightHelper(light, 5);

    scene.add(light)
  }

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.maxDistance = 200
  controls.maxPolarAngle = Math.PI / 2.1

  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 8;

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
}
