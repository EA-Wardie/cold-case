import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture, Space, SceneLoader } from "@babylonjs/core";

export class GameInitializer {
    engine;
    scene;
    camera;
    assetManager;
    light;
    ground;
    disk;
    car;

    constructor(canvas) {
        this.initGame(canvas);
    }
    initGame(canvas) {
        //Setup game environment
        this.createEngine(canvas);
        this.createScene();
        this.createLight();
        this.createCamera();
        // this.createAssetManager();

        //Create game meshes
        this.createGround();
        this.createDisk();
        this.createCar();

        //Start game render
        this.renderGame();
    }

    //Environment
    createEngine(canvas) {
        this.engine = new Engine(canvas, true);
    }
    createScene() {
        this.scene = new Scene(this.engine);
    }
    createLight() {
        this.light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.5;
    }
    createCamera() {
        this.camera = new FreeCamera('camera', new Vector3(0, 5, -10), this.scene);
        this.camera.speed = 0.25;
        this.camera.rotation = new Vector3(0.5, 0, 0);
        this.camera.attachControl();
    }
    // createAssetManager() {
        // this.assetManager = new AssetsManager(this.scene);
    // }

    //Meshes
    createGround() {
        this.ground = MeshBuilder.CreateGround('ground', {width: 20, height: 20}, this.scene);
        this.setGroundMaterial();
    }
    createDisk() {
        this.disk = new MeshBuilder.CreateCylinder("disk", {height: 0.2, diameter: 6, tessellation: 50}, this.scene);
        this.disk.position = new Vector3(3.5, 0, -2.5);
        this.setDiskMaterial();
        this.startDiskRotation();
    }
    createCar() {
        // const carLoader = this.assetManager.addMeshTask('car_load_task', '', './assets/meshes/cars/', 'Taxi.obj');
        // carLoader.onSuccess = (task) => {
        //     // this.car = task.loadedMeshes[0];
        //     console.log(task);
        // }
        SceneLoader.Append('./assets/meshes/cars/', 'Taxi.gltf', this.scene, (scene) => {
            console.log(scene.meshes[2]);
            this.disk.target = scene.meshes[2];
        });
    }
    renderGame() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    //Helpers
    setGroundMaterial() {
        const groundMaterial = new StandardMaterial('ground_material', this.scene);
        groundMaterial.bumpTexture = new Texture('./assets/textures/asphalt/asphalt_02_nor_gl_4k.jpg');
        groundMaterial.diffuseTexture = new Texture('./assets/textures/asphalt/asphalt_02_diff_4k.jpg');
        groundMaterial.ambientTexture = new Texture('./assets/textures/asphalt/asphalt_02_ao_4k.jpg');
        groundMaterial.invertNormalMapX = true;
        groundMaterial.invertNormalMapY = true;

        this.ground.material = groundMaterial;
    }
    setDiskMaterial() {
        const diskMaterial = new StandardMaterial('disk_material', this.scene);
        diskMaterial.bumpTexture = new Texture('./assets/textures/metal/rust_coarse_01_nor_gl_4k.jpg');
        diskMaterial.diffuseTexture = new Texture('./assets/textures/metal/rust_coarse_01_diff_4k.jpg');
        diskMaterial.ambientTexture = new Texture('./assets/textures/metal/rust_coarse_01_ao_4k.jpg');

        this.disk.material = diskMaterial;
    }
    startDiskRotation() {
        const diskAxis = new Vector3(0, 1, 0);
        const rotationSpeed = 0.001;
            this.scene.registerBeforeRender(() => {
                this.disk.rotate(diskAxis, rotationSpeed, Space.WORLD);
        })
    }
}