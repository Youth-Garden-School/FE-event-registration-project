"use client";

import { useEffect, useRef } from "react";

export default function LoadingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ticketRef = useRef<HTMLDivElement | null>(null);
  let animationFrameId: number;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ticket = ticketRef.current!;
    const ctx = canvas.getContext("2d")!;
    if (!canvas || !ticket || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const confetti: Particle[] = [];

    const starTypes = [drawFourPointStar, drawStarburst];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      gravity: number;
      friction: number;
      opacity: number;
      starType: typeof drawFourPointStar;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 10;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * -10 - 5;
        this.color = "#FFB347";
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.gravity = 0.3;
        this.friction = 0.97;
        this.opacity = 1;
        this.starType = starTypes[Math.floor(Math.random() * starTypes.length)];
      }

      update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX *= this.friction;
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.008;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        this.starType(ctx, 0, 0, this.size);
        ctx.restore();
      }
    }

    function drawFourPointStar(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
    ) {
      const outer = size / 2;
      const inner = size / 5;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i;
        ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
        ctx.lineTo(
          cx + Math.cos(angle + Math.PI / 4) * inner,
          cy + Math.sin(angle + Math.PI / 4) * inner,
        );
      }
      ctx.closePath();
      ctx.fill();
    }

    function drawStarburst(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
    ) {
      const spikes = 8;
      const outer = size / 2;
      const inner = size / 4;
      ctx.beginPath();
      for (let i = 0; i < spikes; i++) {
        const angle = (Math.PI * 2 * i) / spikes;
        const next = (Math.PI * 2 * (i + 0.5)) / spikes;
        ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
        ctx.lineTo(cx + Math.cos(next) * inner, cy + Math.sin(next) * inner);
      }
      ctx.closePath();
      ctx.fill();
    }

    function createConfetti(x: number, y: number) {
      for (let i = 0; i < 30; i++) {
        confetti.push(new Particle(x, y));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((p, i) => {
        p.update();
        p.draw(ctx);
        if (p.opacity <= 0) confetti.splice(i, 1);
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    function shakeTicket() {
      console.log("shaking ticket...");
      ticket.classList.add("animate-shake");

      const rect = ticket.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      createConfetti(x, y);

      setTimeout(() => {
        ticket.classList.remove("animate-shake");
        console.log("shake removed");
      }, 1000);
    }

    shakeTicket();
    const interval = setInterval(shakeTicket, 3000);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40">
      {/* Lớp phủ làm tối */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-40" />

      {/* Ticket nằm trên lớp phủ */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          ref={ticketRef}
          className="w-52 h-24 bg-rose-400 rounded-lg shadow-xl transform -rotate-12 flex items-center justify-center relative animate-shake"
        >
          <div className="w-10 h-10 relative">
            <div className="absolute w-[35%] h-[15%] bg-white rotate-45 left-[20%] top-[50%] origin-bottom-left" />
            <div className="absolute w-[70%] h-[15%] bg-white -rotate-45 left-[20%] top-[50%] origin-bottom-left" />
          </div>
          <div className="absolute w-5 h-5 rounded-full bg-gray-100 left-[-10px] top-[40px]" />
          <div className="absolute w-5 h-5 rounded-full bg-gray-100 right-[-10px] top-[40px]" />
        </div>
      </div>

      {/* Canvas vẽ confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50"
      />
      <span className="hidden animate-shake" />
    </div>
  );
}
