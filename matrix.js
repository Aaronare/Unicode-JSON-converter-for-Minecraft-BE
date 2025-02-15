class MatrixBackground {
    constructor() {
        this.canvas = document.getElementById('matrixBackground');
        this.ctx = this.canvas.getContext('2d');
        
        this.chars = "01";
        this.fontSize = 14;
        this.drops = [];
        
        // Slower speed - smaller number means slower
        this.speed = 0.3;
        
        // Create gradient colors
        this.createGradient();
        
        this.initialize();
        this.animate();
    }
    
    createGradient() {
        this.gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        this.gradient.addColorStop(0, '#1e3c72');
        this.gradient.addColorStop(1, '#2a5298');
    }
    
    initialize() {
        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
            this.createGradient();
        });
        
        const columns = Math.floor(this.canvas.width / this.fontSize);
        for(let i = 0; i < columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    draw() {
        // Draw gradient background
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Semi-transparent overlay for fade effect
        this.ctx.fillStyle = 'rgba(30, 60, 114, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Blue text with slight glow effect
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = '#4a90e2';
        this.ctx.fillStyle = '#4a90e2';
        this.ctx.font = this.fontSize + 'px monospace';
        
        for(let i = 0; i < this.drops.length; i++) {
            const char = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
            
            // Add some opacity variation for depth effect
            const opacity = Math.random() * 0.5 + 0.5;
            this.ctx.fillStyle = `rgba(74, 144, 226, ${opacity})`;
            
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.99) {
                this.drops[i] = 0;
            }
            
            // Slower movement speed
            this.drops[i] += this.speed;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MatrixBackground();
}); 