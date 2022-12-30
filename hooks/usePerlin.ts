/* https://github.com/joeiddon/perlin */

/** @internal */
type Memory = {
    [index: string]: number
}

/** @internal */
const gradients: Memory = {};
/** @internal */
const memory: Memory = {};

const perlin = {
    rand_vect: function() {
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },
    dot_prod_grid: function(x: number, y: number, vx: number, vy: number) {
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        if (gradients[`${vx},${vy}`]){
            g_vect = gradients[`${vx},${vy}`];
        } else {
            g_vect = this.rand_vect();
            gradients[`${vx},${vy}`] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    smootherstep: function(x: number) {
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    interp: function(x: number, a: number, b: number) {
        return a + this.smootherstep(x) * (b-a);
    },
    get: function(x: number, y: number) : number {
        if (memory.hasOwnProperty(`${x},${y}`))
            return memory[`${x},${y}`];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        memory[`${x},${y}`] = v;
        return v;
    },
    purge: function() {
        for (const key in gradients) {
            delete gradients[key];
        }

        for (const key in memory) {
            delete memory[key];
        }
    }
}

export default perlin;
