
export function useCanvas(map) {
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    let radius = 10
    var increase = true

    function draw() {
        let size = 200
        canvas.width = size
        canvas.height = size
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.beginPath()
        ctx.arc(100, 100, radius, 0, (Math.PI / 180) * 360)
        ctx.closePath()
        //类似于粉红色
        ctx.fillStyle = 'rgba(255,20,147,0.8)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(100, 100, 10, 0, (Math.PI / 180) * 360)
        ctx.closePath()
        ctx.fillStyle = 'rgba(0,0,205,0.6)'
        ctx.fill()

        if (radius > 25) {
            increase = false
        } else if (radius < 10) {
            increase = true
        }

        if (increase) {
            radius += 1
        } else {
            radius -= 1
        }
        setTimeout(draw, 100)
        map.render()
    }
    draw()
    return canvas
}