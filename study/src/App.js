import React, { memo, useEffect, useRef} from 'react'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";


const App = memo(() => {
    var  camera, scene ,renderer ,controls =null
    var modelPath = require('./旋转测试.fbx')
    function init(){
        let container = document.getElementsByClassName('add')[0]
        let mouse = new THREE.Vector2();
        camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.01,
            2000
            )
        camera.position.set(100, 200, 300);
        scene = new THREE.Scene();
        var mesh = new THREE.Mesh(
            //地面上色
            // new THREE.PlaneBufferGeometry(2000,2000),
            // new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        )
        mesh.rotation.x = -Math.PI / 2
        mesh.receiveShadow = true;
        scene.add(mesh)
        var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
        grid.material.opacity = 0.2
        grid.material.transparent = true;
        scene.add(grid)
        renderer = new THREE.WebGLRenderer({
            antialias:true,
            alpha:true,
            precision:'highp'
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement)
        controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true 
        controls.target.set(0, 100, 0);
        controls.update();
        // var light = new THREE.HemisphereLight(0xffffff, 0x444444);
        // light.position.set(0, 200, 0);
        // scene.add(light);

        // light = new THREE.DirectionalLight(0xffffff);
        // light.position.set(0, 200, 100);
        // light.castShadow = true;
        // light.shadow.camera.top = 180;
        // light.shadow.camera.bottom = -100;
        // light.shadow.camera.left = -120;
        // light.shadow.camera.right = 120;
        // scene.add(light);
        
        changeColor(0xffffff, 0x444444)
        let fbxLoader = new FBXLoader();
        fbxLoader.load(modelPath, function (object) {
            // object.mixer = new THREE.AnimationMixer(object);
            // mixers.push(object.mixer)
            // var action = object.mixer.clipAction(object.animations[0])
            // action.play()
            // object.scale.multiplyScalar(.5)
            // scene.add(object);
            scene.add(object)
            object.translateY(-80)
            var mixer = new THREE.AnimationMixer(object);
            var AnimationAction=mixer.clipAction(object.animations[0])
            AnimationAction.play()
            var clock = new THREE.Clock();
             // 渲染函数
            function render() {
                renderer.render(scene, camera); //执行渲染操作
                requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧

                if (mixer !== null) {
                   //clock.getDelta()方法获得两帧的时间间隔
                    // 更新混合器相关的时间
                  mixer.update(clock.getDelta());
                              }
                         }
                    render();

    
          });
        



    }
    function changeColor(x,y){
        var light = new THREE.HemisphereLight(x,y);
        light.position.set(0, 200, 0);
        scene.add(light);
        // light = new THREE.DirectionalLight(x);
        // light.position.set(0, 200, 100);
        // light.castShadow = true;
        // light.shadow.camera.top = 180;
        // light.shadow.camera.bottom = -100;
        // light.shadow.camera.left = -120;
        // light.shadow.camera.right = 120;
        // scene.add(light);
    

    }
    function animate(){
        requestAnimationFrame(animate);
        renderer.clear();
        renderer.render(scene, camera);
        renderer.clearDepth();
    }
    const changcolor = () =>{

        changeColor(0x00ff00,0x00ff00)
    }
    useEffect(()=>{
       init()
       animate()
    },[])
  return (
    <div>
        <div className='add' style={{ width: "100%",height:"100vh",backgroundColor:"black"}} >
            <button>变黄</button>
            <button onClick={changcolor}>变green</button>

        </div>
    </div>
  )
})

export default App