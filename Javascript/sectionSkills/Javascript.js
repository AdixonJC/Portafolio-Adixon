addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("====================================");
    console.log(ctx);
    console.log("====================================");
  
    class Particle {
      constructor(effect, x, y, color) {
        this.effect = effect;
        this.x = Math.random() * this.effect.canvasWidth;
        this.y = 0;
        this.color = color;
        this.originX = x;
        this.originY = y;
        this.size = this.effect.gap;
        this.dx = 0;
        this.dy = 0;
        this.vx = 0;
        this.vy = 0;
        this.force = 0;
        this.angle = 0;
        this.distance = 0;
        this.friction = Math.random() * 0.6 + 0.15;
        this.ease = Math.random() * 0.1 + 0.005;
      }
      draw() {
        this.effect.context.fillStyle = this.color;
        this.effect.context.fillRect(this.x, this.y, this.size, this.size);
      }
      update() {
        this.dx = this.effect.mouse.x - this.x;
        this.dy = this.effect.mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        this.force = -this.effect.mouse.radius / this.distance;
  
        if (this.distance < this.effect.mouse.radius) {
          this.angle = Math.atan2(this.dy, this.dx);
          this.vx += this.force * Math.cos(this.angle);
          this.vy += this.force * Math.sin(this.angle);
        }
  
        this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
      }
    }
  
    class Effect {
      constructor(context, canvasWidth, canvasHeight) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.textX = this.canvasWidth / 2;
        this.textY = this.canvasHeight / 2;
        this.fontSize = 130;
        this.lineHeight = this.fontSize * 1.1;
        this.maxTextWidth = this.canvasWidth * 0.8;
        this.textInput = document.getElementById("textInput");
        this.verticalOffset = 0;
        this.textInput.addEventListener("keyup", (e) => {
          let textValue = e.target.value;
          if (e.key !== " ") {
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.wrapText(textValue);
          }
        });
        this.particles = [];
        this.gap = 3; // size particle
        this.mouse = {
          radius: 40000,
          x: 0,
          y: 0,
        };
        window.addEventListener("mousemove", (e) => {
          this.mouse.x = e.x;
          this.mouse.y = e.y;
        });
      }
      wrapText(text) {
        // canvas setting
        const gradient = this.context.createLinearGradient(
          0,
          0,
          this.canvasWidth,
          this.canvasHeight
        );
        gradient.addColorStop(0.3, "#F0E3CA");
        gradient.addColorStop(0.5, "#1B1A17");
        gradient.addColorStop(0.7, "#DBDBDB");
        this.context.fillStyle = gradient;
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.lineWidth = 3;
        this.context.strokeStyle = "#FF8303";
        this.context.letterSpacing = "10px";
        this.context.font = this.fontSize + "px Impact";
        this.context.fillStyle;
        // break multiline text
        let linesArray = [];
        let lineCounter = 0;
        let line = "";
        let words = text.split(" ");
        for (let i = 0; i < words.length; i++) {
          let testLine = line + words[i] + " ";
          if (this.context.measureText(testLine).width > this.maxTextWidth) {
            line = words[i] + " ";
            lineCounter++;
          } else {
            line = testLine;
          }
          linesArray[lineCounter] = line;
        }
        let textHeight = this.lineHeight * lineCounter;
        this.textY = this.canvasHeight / 2 - textHeight / 2 + this.verticalOffset;
        linesArray.forEach((el, index) => {
          this.context.fillText(
            el,
            this.textX,
            this.textY + index * this.lineHeight
          );
          this.context.strokeText(
            el,
            this.textX,
            this.textY + index * this.lineHeight
          );
        });
        this.convertToParticles();
      }
      convertToParticles() {
        this.particles = [];
        const pixels = this.context.getImageData(
          0,
          0,
          this.canvasWidth,
          this.canvasHeight
        ).data;
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let y = 0; y < this.canvasHeight; y += this.gap) {
          for (let x = 0; x < this.canvasWidth; x += this.gap) {
            const index = (y * this.canvasWidth + x) * 4;
            const alpha = pixels[index + 3];
            if (alpha > 0) {
              const red = pixels[index];
              const green = pixels[index + 1];
              const blue = pixels[index + 2];
              const color = `rgb(${red},${green},${blue})`;
              this.particles.push(new Particle(this, x, y, color));
            }
          }
        }
        console.log(this.particles);
      }
      render() {
        this.particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });
      }
      resize(width, height){
          this.canvasWidth = width;
        this.canvasHeight = height;
        this.textX = this.canvasWidth / 2;
        this.textY = this.canvasHeight / 2;
        this.maxTextWidth = this.canvasWidth * 0.8;
      }
    }
  
    const effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText(effect.textInput.value);
    effect.render();
  
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.render();
      requestAnimationFrame(animate);
    };
    animate();
  
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      effect.resize(canvas.width, canvas.height);
      effect.wrapText(effect.textInput.value);
    });
  
    /* ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
  
    ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  
    const gradient = ctx.createLinearGradient(0, 0 , canvas.width , canvas.height);
    gradient.addColorStop(0.3 , 'red');
    gradient.addColorStop(0.5 , 'orange');
    gradient.addColorStop(0.7 , 'yellow');
    ctx.fillStyle = gradient;
    ctx.strokeStyle = "white";
    ctx.font = "80px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  
    const maxTextWidth = canvas.width * 0.4;
  
    console.log(maxTextWidth);
    const lineHeight = 80;
  
    const wrapText = (text) => {
      let linesArray = [];
      let lineCounter = 0;
      let line = '';
      let words = text.split(' ');
      for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + ' ';
        if (ctx.measureText(testLine).width > maxTextWidth) {
          line = words[i] + ' ';
          lineCounter++;
        } else {
          line = testLine;
        }
        linesArray[lineCounter] = line;
      }
      let textHeight = lineHeight * lineCounter;
      let textY = canvas.height/2 - textHeight/2;
      linesArray.forEach((el, index) => {
        ctx.fillText(el, canvas.width / 2, textY + (index * lineHeight));
      });
      console.log(linesArray);
    };
  
    //wrapText("hi!, how are you");
  
    textInput.addEventListener("keyup", (e) => {
      let textValue = e.target.value
      ctx.clearRect(0 , 0, canvas.width , canvas.height)
      wrapText(textValue)
    }) */
  });
  