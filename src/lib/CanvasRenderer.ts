// cache for loading images
const imageCache = new Map<string, HTMLImageElement>();

export interface SVGElement {
    src: string;
    width: number;
    height: number;
}

class CanvasRenderer {
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    constructor(ctx: CanvasRenderingContext2D, height: number, width: number) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    private async loadSVG(src: string): Promise<HTMLImageElement> {
        // if the image is already loaded in cache, return it
        let img = imageCache.get(src);
        if (img) {
            return img;
        }

        // load new image
        img = new Image();
        const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = reject;
        });

        img.src = src;
        await loadPromise;

        // save image into cache
        imageCache.set(src, img);

        return img;
    }

    public async drawSVG(element: SVGElement, x: number, y: number) {
        const img = await this.loadSVG(element.src);
        this.ctx.save();
        this.ctx.drawImage(img, x, y, element.width, element.height)
        this.ctx.restore();
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

export default CanvasRenderer;
