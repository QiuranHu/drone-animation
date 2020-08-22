import React, { Component } from 'react';
import Zdog, { Illustration } from 'zdog';
import './DroneAnimation.scss';
import { Button } from 'reactstrap';
interface DroneAnimationProp {

}
interface DroneAnimationState {
    dronePosition: {
        x: number,
        y: number,
        z: number
    }
    droneElement: Zdog.Rect | null,
    illo: Zdog.Illustration | null
}
export class DroneAnimation extends Component<DroneAnimationProp, DroneAnimationState> {
    state: DroneAnimationState = {
        dronePosition: {
            x: 0,
            y: 0,
            z: 100
        },
        droneElement: null,
        illo: null
    }

    goUpOrDown = (distance: number) => {
        const droneElement = this.state.droneElement;
        const newHeight = this.state.dronePosition.z + distance;
        if(newHeight >= 200 || newHeight <= 0) {
            return;
        }
        const newPosition = {
            x: this.state.dronePosition.x,
            y: this.state.dronePosition.y,
            z: newHeight
        };
        droneElement!.translate = new Zdog.Vector({
            ...newPosition
        })
        this.setState({
            dronePosition: {
                ...newPosition
            }
        });   
    };

    moveOnX = (distance: number) => {
        const droneElement = this.state.droneElement;
        const newX = this.state.dronePosition.x + distance;
        if(newX >= 100 || newX <= -100) {
            return;
        }
        const newPosition = {
            x: newX,
            y: this.state.dronePosition.y,
            z: this.state.dronePosition.z
        };
        droneElement!.translate = new Zdog.Vector({
            ...newPosition
        })
        this.setState({
            dronePosition: {
                ...newPosition
            }
        });   
    };

    moveOnY = (distance: number) => {
        const droneElement = this.state.droneElement;
        const newY = this.state.dronePosition.y + distance;
        if(newY >= 100 || newY <= -100) {
            return;
        }
        const newPosition = {
            x: this.state.dronePosition.x,
            y: newY,
            z: this.state.dronePosition.z
        };
        droneElement!.translate = new Zdog.Vector({
            ...newPosition
        })
        this.setState({
            dronePosition: {
                ...newPosition
            }
        });   
    };

    componentDidMount() {
        let isSpinning = false;
        // illo is the high level object dealing with canvas.
        let illo = new Zdog.Illustration({
            element: '.zdog-canvas',
            dragRotate: true,
            onDragStart: function () {
            },
        });

        const rotation = {
            x: Zdog.TAU * (6 / 32),
            z: Zdog.TAU * (1 / 16),
        }

        const stroke = 5;
        const bottom = new Zdog.Rect({
            addTo: illo,
            width: 200,
            height: 200,
            translate: {

            },
            stroke,
            color: '#5AE',
            fill: true,
        });

        const bottomLine = new Zdog.Rect({
            addTo: illo,
            width: 200,
            height: 200,
            translate: {
            },
            stroke,
            color: '#247',
            fill: false,
        });

        const line1 = new Zdog.Shape({
            addTo: illo,
            path: [
                { x: -100, y: -100, z: 0 }, // start at 1st point
                { x: -100, y: -100, z: 200 }, // line to 2nd point
            ],
            stroke,
            color: '#247',
        });

        const line2 = new Zdog.Shape({
            addTo: illo,
            path: [
                { x: 100, y: -100, z: 0 }, // start at 1st point
                { x: 100, y: -100, z: 200 }, // line to 2nd point
            ],
            stroke,
            color: '#247',
        });

        const line3 = new Zdog.Shape({
            addTo: illo,
            path: [
                { x: 100, y: 100, z: 0 }, // start at 1st point
                { x: 100, y: 100, z: 200 }, // line to 2nd point
            ],
            stroke,
            color: '#247',
        });

        const line4 = new Zdog.Shape({
            addTo: illo,
            path: [
                { x: -100, y: 100, z: 0 }, // start at 1st point
                { x: -100, y: 100, z: 200 }, // line to 2nd point
            ],
            stroke,
            color: '#247',
        });

        const top = new Zdog.Rect({
            addTo: illo,
            width: 200,
            height: 200,
            translate: {
                z: 200
            },
            stroke,
            color: '#247',
            fill: false,
        });


        const drone = new Zdog.Rect({
            addTo: illo,
            width: 10,
            height: 10,
            stroke,
            color: '#247',
            fill: true,
        });

        const droneLine1 = new Zdog.Shape({
            addTo: illo,
            path: [
                { x: -10, y: -10, z: 0 }, // start at 1st point
                { x: 10, y: 10, z: 0 }, // line to 2nd point
            ],
            stroke: 3,
            color: '#247',
        });

        const droneLine2 = new Zdog.Shape({
            addTo: illo,
            path: [
                { x: 10, y: -10, z: 0 }, // start at 1st point
                { x: -10, y: 10, z: 0 }, // line to 2nd point
            ],
            stroke: 3,
            color: '#247',
        });

        drone.addChild(droneLine1);
        drone.addChild(droneLine2);

        bottom.addChild(bottomLine);
        bottom.addChild(line1);
        bottom.addChild(line2);
        bottom.addChild(line3);
        bottom.addChild(line4);
        bottom.addChild(top);
        bottom.addChild(drone);

        bottom.rotate = new Zdog.Vector({
            ...rotation
        });


        function animate() {
            illo.rotate.y += isSpinning ? 0.03 : 0;
            illo.updateRenderGraph();
            requestAnimationFrame(animate);
        }
        animate();

        drone.translate = new Zdog.Vector({
            z: 100
        })

        this.setState({
            droneElement: drone,
            illo: illo
        });
    }


    render() {
        return (
            <>
                <div className='control-button-container'>
                    <Button color="success" onClick={() => this.goUpOrDown(5)}>
                        向上
                    </Button>
                    <Button color="success" onClick={() => this.goUpOrDown(-5)}>
                        向下
                    </Button>
                </div>
                <div className='control-button-container'>
                    <Button color="success" onClick={() => this.moveOnX(5)}>
                        X轴正方向移动
                    </Button>
                    <Button color="success" onClick={() => this.moveOnX(-5)}>
                        X轴负方向移动
                    </Button>
                    
                </div>
                <div className='control-button-container'>
                    <Button color="success" onClick={() => this.moveOnY(5)}>
                        Y轴正方向移动
                    </Button>
                    <Button color="success" onClick={() => this.moveOnY(-5)}>
                        Y轴负方向移动
                    </Button>
                    
                </div>
                <div className='drone-animation-container'>
                    <canvas className="zdog-canvas" width="400" height="600">
                    </canvas>
                </div>
            </>
        )
    }
}