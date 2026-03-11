import React from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // ── Custom cursor ──────────────────────────────────
        const cursor = cursorRef.current;
        const ring = ringRef.current;
        if (!cursor || !ring) return;

        let mx = 0, my = 0, rx = 0, ry = 0;
        let rafCursor: number;

        const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
        document.addEventListener("mousemove", onMouseMove);

        const animCursor = () => {
            cursor.style.left = mx + "px"; cursor.style.top = my + "px";
            rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
            ring.style.left = rx + "px"; ring.style.top = ry + "px";
            rafCursor = requestAnimationFrame(animCursor);
        };
        rafCursor = requestAnimationFrame(animCursor);

        const hoverEls = document.querySelectorAll<HTMLElement>(".lp-root a, .lp-root button, .lp-role-tab, .lp-feat-card");
        hoverEls.forEach(el => {
            el.addEventListener("mouseenter", () => { cursor.style.width = "18px"; cursor.style.height = "18px"; ring.style.width = "50px"; ring.style.height = "50px"; });
            el.addEventListener("mouseleave", () => { cursor.style.width = "12px"; cursor.style.height = "12px"; ring.style.width = "36px"; ring.style.height = "36px"; });
        });

        // ── Scroll nav ─────────────────────────────────────
        const nav = navRef.current;
        const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 50);
        window.addEventListener("scroll", onScroll);

        // ── Particle canvas ────────────────────────────────
        const cv = canvasRef.current;
        if (!cv) return;
        const ct = cv.getContext("2d")!;
        let rafPts: number;

        const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
        resize();
        window.addEventListener("resize", resize);

        const pts = Array.from({ length: 70 }, () => ({
            x: Math.random() * cv.width,
            y: Math.random() * cv.height,
            r: Math.random() * 1.2 + 0.3,
            vx: (Math.random() - 0.5) * 0.32,
            vy: (Math.random() - 0.5) * 0.32,
            alpha: Math.random() * 0.45 + 0.08,
            hue: 210 + Math.random() * 80,
        }));

        const drawPts = () => {
            ct.clearRect(0, 0, cv.width, cv.height);
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = cv.width; if (p.x > cv.width) p.x = 0;
                if (p.y < 0) p.y = cv.height; if (p.y > cv.height) p.y = 0;
                ct.beginPath(); ct.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ct.fillStyle = `hsla(${p.hue},80%,70%,${p.alpha})`; ct.fill();
            });
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 110) {
                        ct.beginPath(); ct.moveTo(pts[i].x, pts[i].y); ct.lineTo(pts[j].x, pts[j].y);
                        ct.strokeStyle = `rgba(79,110,247,${(1 - d / 110) * 0.07})`;
                        ct.lineWidth = 0.5; ct.stroke();
                    }
                }
            }
            rafPts = requestAnimationFrame(drawPts);
        };
        rafPts = requestAnimationFrame(drawPts);

        // ── Intersection observers ─────────────────────────
        const obs = new IntersectionObserver(entries => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) setTimeout(() => e.target.classList.add("visible"), i * 80);
            });
        }, { threshold: 0.1 });
        document.querySelectorAll(".lp-reveal, .lp-stat, .lp-feat-card, .lp-test-card").forEach(el => obs.observe(el));

        const featGrid = document.querySelector(".lp-feat-grid");
        const fo = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    document.querySelectorAll(".lp-feat-card").forEach((c, i) =>
                        setTimeout(() => c.classList.add("visible"), i * 90)
                    );
                    fo.disconnect();
                }
            });
        }, { threshold: 0.1 });
        if (featGrid) fo.observe(featGrid);

        // ── Counter animation ──────────────────────────────
        const countUp = (el: Element, target: number, delay: number) => {
            setTimeout(() => {
                let c = 0; const step = target / 60;
                const id = setInterval(() => {
                    c = Math.min(c + step, target);
                    el.textContent = Math.floor(c).toLocaleString();
                    if (c >= target) clearInterval(id);
                }, 25);
            }, delay);
        };
        const statsSection = document.getElementById("lp-stats");
        const so = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    document.querySelectorAll(".lp-stat-num").forEach((el, i) =>
                        countUp(el, parseInt((el as HTMLElement).dataset.target || "0"), i * 140)
                    );
                    so.disconnect();
                }
            });
        }, { threshold: 0.3 });
        if (statsSection) so.observe(statsSection);

        // ── Cleanup ────────────────────────────────────────
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(rafCursor);
            cancelAnimationFrame(rafPts);
            obs.disconnect(); so.disconnect();
        };
    }, []);

    // Role tab handler
    const setRole = (e: React.MouseEvent<HTMLDivElement>) => {
        document.querySelectorAll(".lp-role-tab").forEach(t => t.classList.remove("active"));
        e.currentTarget.classList.add("active");
    };

    return (
        <div className="lp-root">
            {/* Cursor */}
            <div className="lp-cursor" ref={cursorRef} />
            <div className="lp-cursor-ring" ref={ringRef} />

            {/* Noise + canvas */}
            <div className="lp-noise" />
            <canvas className="lp-canvas" ref={canvasRef} />

            {/* ── NAV ── */}
            <nav className="lp-nav" ref={navRef}>
                <a href="#" className="lp-logo">
                    <div className="lp-logo-icon">🧠</div>
                    <div>
                        <div className="lp-logo-name">Mann Mitra</div>
                        <div className="lp-logo-tag">Your Mental Health Companion</div>
                    </div>
                </a>
                <ul className="lp-nav-links">
                    <li><a href="#lp-features">Features</a></li>
                    <li><a href="#lp-roles">For You</a></li>
                    <li><a href="#lp-testimonials">Stories</a></li>
                </ul>
                <button className="lp-nav-cta" onClick={() => navigate("/login")}>Get Started</button>
            </nav>

            {/* ── HERO ── */}
            <section className="lp-hero">
                <div className="lp-glow-blue" />
                <div className="lp-glow-purple" />

                <div className="lp-badge"><span className="lp-badge-dot" />Now live across campuses in India</div>

                <h1 className="lp-h1">Your mind deserves a <em>companion</em></h1>
                <h2 className="lp-h2">not just support</h2>

                <p className="lp-sub">
                    Mann Mitra is a student mental health platform where empathetic AI, professional counsellors,
                    and wellness tools come together — built for campus life.
                </p>

                <div className="lp-actions">
                    <button className="lp-btn-primary" onClick={() => navigate("/login")}>Start Your Journey</button>
                    <a href="#lp-features" className="lp-btn-ghost">Explore Features →</a>
                </div>

                <div className="lp-hero-cards">
                    <div className="lp-hcard g"><span className="lp-hc-icon">⭐</span><div><div className="lp-hc-val">12K+</div><div className="lp-hc-lbl">Students Supported</div></div></div>
                    <div className="lp-hcard o"><span className="lp-hc-icon">🔥</span><div><div className="lp-hc-val">7</div><div className="lp-hc-lbl">Avg. Day Streak</div></div></div>
                    <div className="lp-hcard p"><span className="lp-hc-icon">📅</span><div><div className="lp-hc-val">200+</div><div className="lp-hc-lbl">Counsellors</div></div></div>
                    <div className="lp-hcard pk"><span className="lp-hc-icon">🌸</span><div><div className="lp-hc-val">24/7</div><div className="lp-hc-lbl">AI Available</div></div></div>
                </div>

                <div className="lp-scroll-ind">
                    <span className="lp-scroll-txt">Scroll to explore</span>
                    <div className="lp-scroll-line" />
                </div>
            </section>

            {/* ── STATS ── */}
            <section id="lp-stats" className="lp-stats">
                <div className="lp-stat"><span className="lp-stat-num" data-target="12000">0</span><span className="lp-stat-suf">+</span><div className="lp-stat-lbl">Students Supported</div></div>
                <div className="lp-stat"><span className="lp-stat-num" data-target="98">0</span><span className="lp-stat-suf">%</span><div className="lp-stat-lbl">Satisfaction Rate</div></div>
                <div className="lp-stat"><span className="lp-stat-num" data-target="200">0</span><span className="lp-stat-suf">+</span><div className="lp-stat-lbl">Certified Counsellors</div></div>
                <div className="lp-stat"><span className="lp-stat-num" data-target="24">0</span><span className="lp-stat-suf">/7</span><div className="lp-stat-lbl">AI Support Available</div></div>
            </section>

            {/* ── FEATURES ── */}
            <section id="lp-features" className="lp-section lp-features">
                <div className="lp-feat-header lp-reveal">
                    <p className="lp-eyebrow">What we offer</p>
                    <h2 className="lp-sec-title">Everything you need to <span>flourish</span></h2>
                    <p className="lp-sec-body">Six powerful tools woven into one seamless experience, designed around the rhythms of student life.</p>
                </div>
                <div className="lp-feat-grid">
                    <div className="lp-feat-card"><div className="lp-feat-icon">🧠</div><h3 className="lp-feat-title">AI Mental Health Companion</h3><p className="lp-feat-text">Always-on, judgment-free conversations powered by empathetic AI. Available at 2am before exams or whenever you need support.</p><span className="lp-feat-tag">24/7 Available</span></div>
                    <div className="lp-feat-card"><div className="lp-feat-icon">🌱</div><h3 className="lp-feat-title">Mood Garden</h3><p className="lp-feat-text">Track your emotional journey by growing a digital garden. Every wellness activity earns XP, levels up your plants, and builds real streaks.</p><span className="lp-feat-tag">Gamified Wellness</span></div>
                    <div className="lp-feat-card"><div className="lp-feat-icon">🗓️</div><h3 className="lp-feat-title">Book a Session</h3><p className="lp-feat-text">Connect with verified counsellors specializing in anxiety, academic burnout, and relationships — seamlessly and confidentially.</p><span className="lp-feat-tag">Verified Professionals</span></div>
                    <div className="lp-feat-card"><div className="lp-feat-icon">👥</div><h3 className="lp-feat-title">Peer Support Network</h3><p className="lp-feat-text">Find your people. Connect with peers who understand what you're going through in moderated, safe support communities.</p><span className="lp-feat-tag">Community</span></div>
                    <div className="lp-feat-card"><div className="lp-feat-icon">📚</div><h3 className="lp-feat-title">Study Buddy</h3><p className="lp-feat-text">Mental wellness includes academic confidence. Find focus partners and build study routines that actually stick.</p><span className="lp-feat-tag">Academic Wellness</span></div>
                    <div className="lp-feat-card"><div className="lp-feat-icon">🛠️</div><h3 className="lp-feat-title">Wellness Toolkit</h3><p className="lp-feat-text">Breathing exercises, sleep guides, mindfulness timers, and journaling — curated specifically for the student mind.</p><span className="lp-feat-tag">Self-Care Tools</span></div>
                </div>
            </section>

            {/* ── ROLES ── */}
            <section id="lp-roles" className="lp-section lp-roles">
                <div className="lp-roles-wrap">
                    <div className="lp-reveal">
                        <p className="lp-eyebrow">Built for everyone on campus</p>
                        <h2 className="lp-sec-title">One platform,<br /><span>three perspectives</span></h2>
                        <p className="lp-sec-body" style={{ marginTop: "1rem" }}>
                            Whether you're seeking support, providing it, or managing the campus ecosystem — Mann Mitra adapts to your role.
                        </p>
                        <div className="lp-role-tabs">
                            <div className="lp-role-tab active" onClick={setRole}>
                                <div className="lp-role-hd"><span className="lp-role-emoji">🎓</span><span className="lp-role-name">Students</span></div>
                                <p className="lp-role-desc">Access your wellness dashboard, mood garden, AI support, and book real counselling sessions.</p>
                            </div>
                            <div className="lp-role-tab" onClick={setRole}>
                                <div className="lp-role-hd"><span className="lp-role-emoji">🧑‍⚕️</span><span className="lp-role-name">Counsellors</span></div>
                                <p className="lp-role-desc">Manage appointments, track client progress, write session notes, and manage your schedule.</p>
                            </div>
                            <div className="lp-role-tab" onClick={setRole}>
                                <div className="lp-role-hd"><span className="lp-role-emoji">🏛️</span><span className="lp-role-name">Administrators</span></div>
                                <p className="lp-role-desc">Monitor wellness trends via Campus Pulse, manage users, review counsellors, and generate reports.</p>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard preview */}
                    <div className="lp-reveal">
                        <div className="lp-dash-preview">
                            <div className="lp-dash-topbar">
                                <div className="lp-dash-dots">
                                    <div className="lp-dot" style={{ background: "#ff5f57" }} />
                                    <div className="lp-dot" style={{ background: "#ffbd2e" }} />
                                    <div className="lp-dot" style={{ background: "#28c840" }} />
                                </div>
                                <span className="lp-dash-url">mannmitra.app/dashboard</span>
                                <span style={{ fontSize: ".65rem", color: "var(--text-muted)" }}>●</span>
                            </div>
                            <div className="lp-dash-body">
                                <div className="lp-dash-welcome">
                                    <div className="lp-dw-title">Welcome Back! 👋</div>
                                    <div className="lp-dw-sub">Keep up your amazing progress on your wellness journey</div>
                                </div>
                                <div className="lp-dash-stats">
                                    <div className="lp-ds g"><div className="lp-ds-val">245</div><div className="lp-ds-lbl">Weekly Points ⭐</div></div>
                                    <div className="lp-ds o"><div className="lp-ds-val">7</div><div className="lp-ds-lbl">Streak 🔥 days</div></div>
                                    <div className="lp-ds p"><div className="lp-ds-val">2</div><div className="lp-ds-lbl">Sessions 📅</div></div>
                                    <div className="lp-ds pk"><div className="lp-ds-val">2</div><div className="lp-ds-lbl">Garden Lvl 🌸</div></div>
                                </div>
                                <div className="lp-dash-sec-lbl">Today's Wellness Activities</div>
                                <div className="lp-dash-act"><div className="lp-da-l"><span className="lp-da-emoji">🧘</span><div><div className="lp-da-name">10-Minute Meditation</div><div className="lp-da-pts">10 min · +10 points</div></div></div><div className="lp-da-btn">Start</div></div>
                                <div className="lp-dash-act"><div className="lp-da-l"><span className="lp-da-emoji">📝</span><div><div className="lp-da-name">Gratitude Journal</div><div className="lp-da-pts">5 min · +15 points</div></div></div><div className="lp-da-btn">Start</div></div>
                                <div className="lp-dash-act"><div className="lp-da-l"><span className="lp-da-emoji">🚶</span><div><div className="lp-da-name">Quick Walk</div><div className="lp-da-pts">15 min · +20 points</div></div></div><div className="lp-da-btn">Start</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section id="lp-testimonials" className="lp-section lp-testimonials">
                <div className="lp-test-header lp-reveal">
                    <p className="lp-eyebrow">Real voices</p>
                    <h2 className="lp-sec-title">Stories from our <span>community</span></h2>
                </div>
                <div className="lp-test-grid">
                    <div className="lp-test-card"><div className="lp-quote">"</div><p className="lp-test-text">The Mood Garden made me realise how much my habits affect my mental state. Watching my plants grow with each activity became something I genuinely looked forward to.</p><div className="lp-test-author"><div className="lp-author-av">🧑‍💻</div><div><div className="lp-author-name">Aryan Mehta</div><div className="lp-author-role">B.Tech, 3rd Year · IIT Delhi</div></div></div></div>
                    <div className="lp-test-card"><div className="lp-quote">"</div><p className="lp-test-text">The session management tools save me hours every week. I can focus on what matters — actually helping students — rather than administrative work.</p><div className="lp-test-author"><div className="lp-author-av">👩‍⚕️</div><div><div className="lp-author-name">Dr. Priya Sharma</div><div className="lp-author-role">Licensed Counsellor · Mumbai</div></div></div></div>
                    <div className="lp-test-card"><div className="lp-quote">"</div><p className="lp-test-text">Campus Pulse gives us real data on student wellbeing trends. We can see the impact of our initiatives and respond before issues escalate.</p><div className="lp-test-author"><div className="lp-author-av">👨‍💼</div><div><div className="lp-author-name">Prof. Rajesh Kumar</div><div className="lp-author-role">Student Welfare Director · NIT Bangalore</div></div></div></div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="lp-section lp-cta">
                <div className="lp-cta-inner lp-reveal">
                    <p className="lp-eyebrow">Begin today</p>
                    <h2 className="lp-cta-title">Your wellness journey<br />starts with <span>one step</span></h2>
                    <p className="lp-cta-sub">Join thousands of students already on their wellness journey. Free to start, always confidential.</p>
                    <div className="lp-cta-actions">
                        <button className="lp-btn-primary" onClick={() => navigate("/login")}>Create Your Account</button>
                        <button className="lp-btn-ghost" onClick={() => navigate("/login")}>Sign in →</button>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="lp-footer">
                <div className="lp-ft-logo">
                    <div className="lp-ft-icon">🧠</div>
                    <span className="lp-ft-name">Mann Mitra — Your Mental Health Companion</span>
                </div>
                <div className="lp-ft-right">© 2025 MANN MITRA · ALL RIGHTS RESERVED</div>
            </footer>
        </div>
    );
};

export default Landing;