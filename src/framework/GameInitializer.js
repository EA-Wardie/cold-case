import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, Texture, StandardMaterial} from "@babylonjs/core";

export class GameInitializer {
    engine;
    scene;
    camera;
    light;
    ground;
    player;

    constructor(canvas) {
        this.initGame(canvas);
    }
    initGame(canvas) {
        this.createEngine(canvas);
        this.createScene();
        this.createLight();
        this.createCamera();
        this.createGround();
        this.createPlayer();
        this.startRender();
    }
    createEngine(canvas) {
        this.engine = new Engine(canvas, true);
    }
    createScene() {
        this.scene = new Scene(this.engine);
    }
    createLight() {
        this.light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
        this.light.intensity = 0.75;
    }
    createCamera() {
        this.camera = new FreeCamera('camera', new Vector3(0, 5, -8), this.scene);
        this.camera.speed = 0.25;
        this.camera.rotation = new Vector3(0.5, 0, 0);
        this.camera.attachControl();
    }
    createGround() {
        this.ground = MeshBuilder.CreateGround('ground', {width: 10, height: 10}, this.scene);
        this.ground.position = new Vector3(0, 0, 0);

        // this.setGroundTexture();
    }
    createPlayer() {
        this.player = new MeshBuilder.CreateCapsule("player", {height: 0.5, radius: 0.1}, this.scene)
        this.player.position = new Vector3(0, 0.25, 0);
    }
    startRender() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    // setGroundTexture() {
    //     this.ground.material = this.generateFloorPBR();
    // }
    // generateFloorPBR() {
    //     const floorTexture = new StandardMaterial('floor_texture', this.scene),
    //         uvScale = 50,
    //         textureArray = [],
    //         diffTexture = new Texture(require('@/assets/textures/floor/wood_floor_diff.jpg'), this.scene),
    //         norTexture = new Texture(require('@/assets/textures/floor/wood_floor_nor.jpg'), this.scene),
    //         aoTexture = new Texture(require('@/assets/textures/floor/wood_floor_ao.jpg'), this.scene);
    //
    //     floorTexture.diffuseTexture = diffTexture;
    //     textureArray.push(diffTexture);
    //     floorTexture.bumpTexture = norTexture;
    //     textureArray.push(norTexture);
    //     floorTexture.ambientTexture = aoTexture;
    //     textureArray.push(aoTexture);
    //
    //     textureArray.forEach((texture) => {
    //         texture.uScale = uvScale;
    //         texture.vScale = uvScale;
    //     });
    //
    //     return floorTexture;
    // }
}