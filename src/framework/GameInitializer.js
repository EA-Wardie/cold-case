import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture, Space, SceneLoader } from "@babylonjs/core";
import '@babylonjs/loaders';
import { _ } from "core-js";

export default {
    data() {
        return {
            engine: null,
            scene: null,
            camera: null,
            assetManager: null,
            light: null,
            ground: null,
            disk: null,
            cars: {},
            gui: null,
            menu: null,
        };
    },
    methods: {
        initGame(canvas) {
            //Setup game environment
            this.createEngine(canvas);
            this.createScene();
            this.createLight();
            this.createCamera();

            // //Create game meshes
            this.createGround();
            this.createDisk();
            this.createCars();

            //Start game render
            this.renderGame();
        },

        //Environment
        createEngine(canvas) {
            this.engine = new Engine(canvas, true);
        },
        createScene() {
            this.scene = new Scene(this.engine);
        },
        createLight() {
            this.light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
            this.light.intensity = 0.5;
        },
        createCamera() {
            this.camera = new FreeCamera('camera', new Vector3(0, 7, -12), this.scene);
            this.camera.speed = 0.25;
            this.camera.rotation = new Vector3(0.5, 0, 0);
        },

        //Meshes
        createGround() {
            this.ground = MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, this.scene);
            this.setGroundMaterial();
        },
        createDisk() {
            this.disk = new MeshBuilder.CreateCylinder("disk", { height: 0.2, diameter: 6, tessellation: 50 }, this.scene);
            this.disk.position = new Vector3(5, 0, -2);
            this.setDiskMaterial();
            this.startDiskRotation();
        },
        createCars() {
            SceneLoader.ImportMesh('', './assets/meshes/cars/', 'SUV.glb', this.scene, (meshes) => {
                this.cars['suv'] = meshes[0];
                this.cars['suv'].setEnabled(false);
                this.cars['suv'].parent = this.disk;
                this.cars['suv'].position = new Vector3(0, 0.1, -0.25);
            });
            SceneLoader.ImportMesh('', './assets/meshes/cars/', 'Sedan.glb', this.scene, (meshes) => {
                this.cars['sedan'] = meshes[0];
                this.cars['sedan'].setEnabled(false);
                this.cars['sedan'].parent = this.disk;
                this.cars['sedan'].position = new Vector3(0, 0.1, -0.25);
            });
            SceneLoader.ImportMesh('', './assets/meshes/cars/', 'Old.glb', this.scene, (meshes) => {
                this.cars['old'] = meshes[0];
                this.cars['old'].setEnabled(false);
                this.cars['old'].parent = this.disk;
                this.cars['old'].position = new Vector3(0, 0.1, -0.25);
            });
            SceneLoader.ImportMesh('', './assets/meshes/cars/', 'Classic.glb', this.scene, (meshes) => {
                this.cars['classic'] = meshes[0];
                this.cars['classic'].setEnabled(false);
                this.cars['classic'].parent = this.disk;
                this.cars['classic'].position = new Vector3(0, 0.1, -0.25);
            });
            SceneLoader.ImportMesh('', './assets/meshes/cars/', 'Bus.glb', this.scene, (meshes) => {
                this.cars['bus'] = meshes[0];
                this.cars['bus'].setEnabled(false);
                this.cars['bus'].parent = this.disk;
                this.cars['bus'].position = new Vector3(0, 0.1, -0.25);
            });
        },

        //Render Main Game
        renderGame() {
            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        },

        //Helpers
        setGroundMaterial() {
            const groundMaterial = new StandardMaterial('ground_material', this.scene);
            groundMaterial.bumpTexture = new Texture('./assets/textures/asphalt/asphalt_02_nor_gl_4k.jpg');
            groundMaterial.diffuseTexture = new Texture('./assets/textures/asphalt/asphalt_02_diff_4k.jpg');
            groundMaterial.ambientTexture = new Texture('./assets/textures/asphalt/asphalt_02_ao_4k.jpg');
            groundMaterial.invertNormalMapX = true;
            groundMaterial.invertNormalMapY = true;

            this.ground.material = groundMaterial;
        },
        setDiskMaterial() {
            const diskMaterial = new StandardMaterial('disk_material', this.scene);
            diskMaterial.bumpTexture = new Texture('./assets/textures/metal/rust_coarse_01_nor_gl_4k.jpg');
            diskMaterial.diffuseTexture = new Texture('./assets/textures/metal/rust_coarse_01_diff_4k.jpg');
            diskMaterial.ambientTexture = new Texture('./assets/textures/metal/rust_coarse_01_ao_4k.jpg');

            this.disk.material = diskMaterial;
        },
        startDiskRotation() {
            const diskAxis = new Vector3(0, 1, 0);
            const rotationSpeed = 0.004;
            this.scene.registerBeforeRender(() => {
                this.disk.rotate(diskAxis, rotationSpeed, Space.WORLD);
            })
        },
        renderCar(car) {
            Object.values(this.cars).forEach((car) => car.setEnabled(false));
            car.setEnabled(true);
        }
    },
}