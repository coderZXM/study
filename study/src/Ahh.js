import React, { memo } from 'react'

import * as THREE from 'three'
import * as Stats from 'stats.js'
// import * as dat from 'dat.gui'
import OrbitControls from 'three-orbitcontrols'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
const $ = name => document.querySelector(name)
let scene , camera,renderer,mesh,textureLoader,mixer,groupBox,stats,control,clearAnim,clock = null
// let publicPath: process.env.BASE_URL
function init(){
    scene = new THREE.Scene()//场景
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(360,360,360)
    camera.lookAt(scene.position)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    textureLoader = new THREE.TextureLoader();
    textureLoader = new THREE.TextureLoader();
    let axes = new THREE.AxesHelper(1000);
    scene.add(axes)
    //设置环境
    renderer.setClearColor(new THREE.Color("#f1f9fb"))
    renderer.setSize(
        $('#container').getBoundingClientRect().width,
        $('#container').getBoundingClientRect().height
      )
    renderer.shadowMap.enabled = true;
    let point = new THREE.PointLight(0xffffff);
    point.position.set(500, 300, 400);
    scene.add(point)
    let ambient = new THREE.AmbientLight(0x999999)
    scene.add(ambient)
    
}


const Ahh = memo(() => {
  return (
    <div className='import-template'>
        <div className='stats'></div>
        <div className='container'></div>
    </div>
  )
})

export default Ahh