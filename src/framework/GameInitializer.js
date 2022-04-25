import {
    Scene,
    Engine,
    FreeCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    StandardMaterial,
    Texture,
    SceneLoader,
    Animation
} from "@babylonjs/core";
import '@babylonjs/loaders';

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
            this.light.intensity = 0.75;
        },
        createCamera() {
            this.camera = new FreeCamera('camera', new Vector3(0, 7, -12), this.scene);
            this.camera.speed = 0.25;
            this.camera.rotation = new Vector3(0.5, 0, 0);
        },

        //Meshes
        createGround() {
            this.ground = MeshBuilder.CreateGround('ground', {width: 100, height: 100}, this.scene);
            this.setGroundMaterial();
        },
        createDisk() {
            this.disk = new MeshBuilder.CreateCylinder('disk', {
                height: 0.2,
                diameter: 8,
                tessellation: 28
            }, this.scene);
            this.disk.position = new Vector3(5, 0, -2);
            this.setDiskMaterial();
            this.startDiskRotation();
        },
        createCars() {
            const carPosition = new Vector3(0, 0.1, -0.15);
            SceneLoader.ImportMesh('', './assets/meshes/cars/', 'SUV.glb', this.scene, (meshes) => {
                this.cars['suv'] = meshes[0];
                this.cars['suv'].setEnabled(false);
                this.cars['suv'].parent = this.disk;
                this.cars['suv'].position = carPosition;
            });
            SceneLoader.ImportMesh('', './assets/meshes/cars/', 'Sedan.glb', this.scene, (meshes) => {
                this.cars['sedan'] = meshes[0];
                this.cars['sedan'].setEnabled(false);
                this.cars['sedan'].parent = this.disk;
                this.cars['sedan'].position = carPosition;
            });
            SceneLoader.ImportMesh('', './assets/meshes/cars/', 'Old.glb', this.scene, (meshes) => {
                this.cars['old'] = meshes[0];
                this.cars['old'].setEnabled(false);
                this.cars['old'].parent = this.disk;
                this.cars['old'].position = carPosition;
            });
            SceneLoader.ImportMesh('', './assets/meshes/cars/', 'Classic.glb', this.scene, (meshes) => {
                this.cars['classic'] = meshes[0];
                this.cars['classic'].setEnabled(false);
                this.cars['classic'].parent = this.disk;
                this.cars['classic'].position = carPosition;
            });
            SceneLoader.ImportMesh('', './assets/meshes/cars/', 'Bus.glb', this.scene, (meshes) => {
                this.cars['bus'] = meshes[0];
                this.cars['bus'].setEnabled(false);
                this.cars['bus'].parent = this.disk;
                this.cars['bus'].position = carPosition;
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
            groundMaterial.diffuseTexture = new Texture('./assets/textures/stone/Stone_12-256x256.png');

            this.ground.material = groundMaterial;
            this.ground.material.diffuseTexture.uScale = 10;
            this.ground.material.diffuseTexture.vScale = 10;
        },
        setDiskMaterial() {
            const diskMaterial = new StandardMaterial('disk_material', this.scene);
            diskMaterial.diffuseTexture = new Texture('./assets/textures/metal/Metal_07-256x256.png');

            this.disk.material = diskMaterial;
            this.disk.material.diffuseTexture.uScale = 10;
            this.disk.material.diffuseTexture.vScale = 10;
        },
        startDiskRotation() {
            const frames = 60,
                framesPerSecond = 4,
                diskAnimation = new Animation('diskAnimation', 'rotation.y', framesPerSecond, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE),
                diskKeys = [];

            diskKeys.push({
                frame: 0,
                value: 0,
            });
            diskKeys.push({
                frame: frames,
                value: 2 * Math.PI,
            });
            diskAnimation.setKeys(diskKeys);

            this.disk.animations = [];
            this.disk.animations.push(diskAnimation);
            this.scene.beginAnimation(this.disk, 0, frames, true);
        },
        renderCar(car) {
            Object.values(this.cars).forEach((car) => car.setEnabled(false));
            car.setEnabled(true);
        },
    },
}