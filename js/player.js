class Player {
    constructor(canvasTag, ctx, mouseWidth, mouseHeight, canvasWidth, canvasHeight) {

        this.canvasTag = canvasTag
        this.ctx = ctx
        this.mousePos = {
            x: undefined,
            y: undefined
        }

        this.mouseSize = {
            w: mouseWidth,
            h: mouseHeight
        },

            this.canvasSize = {
                w: canvasWidth,
                h: canvasHeight

            }
        this.getMousePosition()
    }

    getMousePosition() {
        this.canvasTag = document.getElementById("myCanvas")
        let canvas = this.canvasTag
        this.ctx = this.canvasTag.getContext('2d')
        canvas.addEventListener('mousemove', (e) => {
            let cRect = canvas.getBoundingClientRect();
            let canvasX = Math.round(e.clientX - cRect.left);
            let canvasY = Math.round(e.clientY - cRect.top);
            this.mousePos.x = canvasX
            this.mousePos.y = canvasY
        })
    }
}


