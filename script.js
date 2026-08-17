/**
 * ============================================================================
 * MUHAMMAD HASHIR ARAIN — ULTRA-LUXURY PORTFOLIO ENGINE
 * Ambient 60FPS Canvas Mesh, Web Audio Micro-Haptics, Interactive Hero HUD,
 * Command Palette (⌘K), Live Code Inspector, Animated Metrics, & Project Dossiers.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initAmbientCanvas();
    initAudioEngine();
    initHeroHud();
    initCommandPalette();
    initBentoCounters();
    initCodeInspector();
    initProjectFiltersAndModal();
    initCardSpotlights();
    initHeaderScroll();
    initMobileNav();
    initContactHub();
    initFloatingDock();
    initRoleRotator();
});

/* ==========================================================================
   1. AMBIENT 60FPS PARTICLE MESH CANVAS
   ========================================================================== */
function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor(width / 20), 70);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 1.6 + 0.6,
            alpha: Math.random() * 0.4 + 0.1,
            color: Math.random() > 0.6 ? 'rgba(99, 102, 241, ' : Math.random() > 0.3 ? 'rgba(6, 182, 212, ' : 'rgba(255, 255, 255, '
        });
    }

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `${p.color}${p.alpha})`;
            ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 115) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 115)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }

            // Mouse proximity line
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 140) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - mdist / 140)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }

        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   2. SYNTHESIZED WEB AUDIO MICRO-HAPTICS (Zero Dependencies)
   ========================================================================== */
let audioCtx = null;
let isAudioEnabled = false;

function initAudioEngine() {
    const audioBtn = document.getElementById('audio-toggle-btn');
    const dockAudioBtn = document.getElementById('dock-audio-btn');
    const dockAudioIcon = document.getElementById('dock-audio-icon');
    const cmdAudioBadge = document.getElementById('cmd-audio-state');

    // Retrieve previous state
    const savedAudio = localStorage.getItem('hashir_portfolio_audio');
    if (savedAudio === 'true') {
        enableAudio();
    }

    function enableAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        isAudioEnabled = true;
        document.body.setAttribute('data-audio', 'enabled');
        if (dockAudioIcon) {
            dockAudioIcon.className = 'fa-solid fa-volume-high';
        }
        if (cmdAudioBadge) {
            cmdAudioBadge.textContent = 'Active';
        }
        localStorage.setItem('hashir_portfolio_audio', 'true');
    }

    function disableAudio() {
        isAudioEnabled = false;
        document.body.setAttribute('data-audio', 'disabled');
        if (dockAudioIcon) {
            dockAudioIcon.className = 'fa-solid fa-volume-xmark';
        }
        if (cmdAudioBadge) {
            cmdAudioBadge.textContent = 'Muted';
        }
        localStorage.setItem('hashir_portfolio_audio', 'false');
    }

    function toggleAudio() {
        if (isAudioEnabled) {
            disableAudio();
            showToast('Audio FX Muted');
        } else {
            enableAudio();
            playAudioSound('success');
            showToast('Audio FX Activated');
        }
    }

    if (audioBtn) audioBtn.addEventListener('click', toggleAudio);
    if (dockAudioBtn) dockAudioBtn.addEventListener('click', toggleAudio);

    // Attach click sound triggers across interactive elements
    document.querySelectorAll('.btn, .nav-link, .insp-tab, .filter-pill, .scope-pill, .cmd-item, .open-modal-btn, .hud-tab').forEach(el => {
        el.addEventListener('click', () => playAudioSound('click'));
    });
}

function playAudioSound(type = 'click') {
    if (!isAudioEnabled || !audioCtx) return;

    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(540, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        }
    } catch (e) {
        // Fallback silently if audio context is blocked
    }
}

/* ==========================================================================
   3. HERO INTERACTIVE HUD TAB SWITCHER
   ========================================================================== */
function initHeroHud() {
    const tabs = document.querySelectorAll('.hud-tab');
    const views = {
        ai: document.getElementById('hud-view-ai'),
        backend: document.getElementById('hud-view-backend'),
        telemetry: document.getElementById('hud-view-telemetry')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetKey = tab.getAttribute('data-hud');
            Object.keys(views).forEach(k => {
                if (views[k]) {
                    views[k].classList.remove('active');
                }
            });

            if (views[targetKey]) {
                views[targetKey].classList.add('active');
            }
        });
    });

    // Animate skeleton nodes randomly to simulate live tracking
    const joints = document.querySelectorAll('.joint-node');
    if (joints.length > 0) {
        setInterval(() => {
            const randomJoint = joints[Math.floor(Math.random() * joints.length)];
            const cx = parseFloat(randomJoint.getAttribute('cx'));
            const cy = parseFloat(randomJoint.getAttribute('cy'));
            
            randomJoint.setAttribute('cx', (cx + (Math.random() - 0.5) * 1.5).toFixed(1));
            randomJoint.setAttribute('cy', (cy + (Math.random() - 0.5) * 1.5).toFixed(1));
        }, 150);
    }
}

/* ==========================================================================
   4. COMMAND PALETTE (CTRL+K / CMD+K) SPOTLIGHT SEARCH
   ========================================================================== */
function initCommandPalette() {
    const backdrop = document.getElementById('cmd-palette-backdrop');
    const input = document.getElementById('cmd-search-input');
    const triggerBtn = document.getElementById('cmd-palette-btn');
    const heroCmdBtn = document.getElementById('hero-cmd-btn');
    const dockCmdBtn = document.getElementById('dock-cmd-btn');
    const items = document.querySelectorAll('.cmd-item');

    if (!backdrop || !input) return;

    function openPalette() {
        backdrop.classList.add('active');
        backdrop.setAttribute('aria-hidden', 'false');
        input.value = '';
        filterCommands('');
        setTimeout(() => input.focus(), 50);
        playAudioSound('click');
    }

    function closePalette() {
        backdrop.classList.remove('active');
        backdrop.setAttribute('aria-hidden', 'true');
    }

    if (triggerBtn) triggerBtn.addEventListener('click', openPalette);
    if (heroCmdBtn) heroCmdBtn.addEventListener('click', openPalette);
    if (dockCmdBtn) dockCmdBtn.addEventListener('click', openPalette);

    // Keyboard shortcut: Ctrl+K or Cmd+K
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (backdrop.classList.contains('active')) {
                closePalette();
            } else {
                openPalette();
            }
        }
        if (e.key === 'Escape' && backdrop.classList.contains('active')) {
            closePalette();
        }
    });

    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closePalette();
    });

    // Search filter
    input.addEventListener('input', (e) => {
        filterCommands(e.target.value.toLowerCase().trim());
    });

    function filterCommands(query) {
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (!query || text.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Command Action Dispatcher
    items.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            if (action === 'navigate') {
                const target = item.getAttribute('data-target');
                const targetEl = document.querySelector(target);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
                closePalette();
            } else if (action === 'copy-email') {
                navigator.clipboard.writeText('hashir.dev01@gmail.com');
                showToast('Email copied to clipboard!');
                closePalette();
            } else if (action === 'open-url') {
                const url = item.getAttribute('data-url');
                window.open(url, '_blank');
                closePalette();
            } else if (action === 'toggle-sound') {
                const audioBtn = document.getElementById('audio-toggle-btn');
                if (audioBtn) audioBtn.click();
            }
        });
    });
}

/* ==========================================================================
   5. BENTO COUNTERS ANIMATION
   ========================================================================== */
function initBentoCounters() {
    const counters = document.querySelectorAll('.metric-counter');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 1400;
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        counter.textContent = Math.floor(easeOut * target);

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = target;
                        }
                    }
                    requestAnimationFrame(updateCount);
                });
            }
        });
    }, { threshold: 0.25 });

    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        observer.observe(dashboardSection);
    }
}

/* ==========================================================================
   6. LIVE CODE INSPECTOR
   ========================================================================== */
function initCodeInspector() {
    const tabs = document.querySelectorAll('.insp-tab');
    const codeDisplay = document.getElementById('inspector-code-display');
    const langBadge = document.getElementById('insp-lang-badge');
    const copyBtn = document.getElementById('copy-code-btn');

    const snippets = {
        dotnet: {
            lang: 'C# 10 / ASP.NET CORE',
            code: `// 1. CabCampaignService.cs — ASP.NET Core 10 / C# Architecture
namespace RadioCabs.Core.Services
{
    public class CampaignExecutionService : ICampaignExecutionService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CampaignExecutionService> _logger;
        private readonly IExcelExportService _excelExport;

        public CampaignExecutionService(
            ApplicationDbContext context,
            ILogger<CampaignExecutionService> logger,
            IExcelExportService excelExport)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger;
            _excelExport = excelExport;
        }

        public async Task<Result<CampaignSummaryDto>> ProcessCampaignLifecycleAsync(
            int campaignId, 
            CancellationToken ct = default)
        {
            var campaign = await _context.Campaigns
                .Include(c => c.AssignedCabs)
                .ThenInclude(c => c.Driver)
                .AsSplitQuery()
                .FirstOrDefaultAsync(c => c.Id == campaignId, ct);

            if (campaign == null)
                return Result.Failure<CampaignSummaryDto>("Campaign not found");

            // Recalculate daily impression thresholds & compliance
            var metrics = await CalculateImpressionsAsync(campaign, ct);
            return Result.Success(metrics);
        }
    }
}`
        },
        mediapipe: {
            lang: 'JAVASCRIPT / MEDIAPIPE AI',
            code: `// 2. KinematicPoseTracker.js — Real-Time 33-Joint Biomechanics
class KinematicPoseTracker {
    constructor(videoElement, canvasElement) {
        this.video = videoElement;
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.pose = new Pose({
            locateFile: (file) => \`https://cdn.jsdelivr.net/npm/@mediapipe/pose/\${file}\`
        });
        this.pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.65,
            minTrackingConfidence: 0.65
        });
        this.pose.onResults(this.processLandmarks.bind(this));
    }

    calculateJointAngle(p1, p2, p3) {
        const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - 
                        Math.atan2(p1.y - p2.y, p1.x - p2.x);
        let angle = Math.abs((radians * 180.0) / Math.PI);
        if (angle > 180.0) angle = 360.0 - angle;
        return angle;
    }
}`
        },
        sql: {
            lang: 'SQL SERVER SCHEMA & MIGRATIONS',
            code: `-- 3. FleetBiometricsSchema.sql — Enterprise Relational Schema
CREATE TABLE dbo.CabAdvertisingCampaigns (
    CampaignId INT IDENTITY(1,1) PRIMARY KEY,
    ClientCompanyId INT NOT NULL,
    CampaignName NVARCHAR(150) NOT NULL,
    TotalBudget DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(50) DEFAULT 'PendingReview',
    StartDate DATETIME2 NOT NULL,
    EndDate DATETIME2 NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Campaign_Company FOREIGN KEY (ClientCompanyId)
        REFERENCES dbo.ClientCompanies(CompanyId) ON DELETE CASCADE
);

CREATE NONCLUSTERED INDEX IX_Campaign_Status_Dates 
ON dbo.CabAdvertisingCampaigns (Status, StartDate, EndDate)
INCLUDE (CampaignName, TotalBudget);`
        },
        php: {
            lang: 'PHP 8+ (STRICT TYPES) / OAUTH 2.0',
            code: `<?php
declare(strict_types=1);

namespace AuraFit\\Security;

use AuraFit\\Database\\ConnectionPool;
use PDO;

final class OAuthTelemetryService 
{
    private PDO $pdo;

    public function __construct(ConnectionPool $pool) {
        $this->pdo = $pool->getConnection();
    }

    public function ingestBiometrics(int $userId, array $payload, string $aesKey): bool 
    {
        $iv = random_bytes(16);
        $encrypted = openssl_encrypt(
            json_encode($payload, JSON_THROW_ON_ERROR),
            'AES-256-CBC',
            $aesKey,
            0,
            $iv
        );

        $stmt = $this->pdo->prepare(
            "INSERT INTO biometrics_log (user_id, encrypted_data, iv_salt, created_at) 
             VALUES (:uid, :data, :iv, UTC_TIMESTAMP())"
        );
        return $stmt->execute([
            ':uid'  => $userId,
            ':data' => $encrypted,
            ':iv'   => base64_encode($iv)
        ]);
    }
}`
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const key = tab.getAttribute('data-tab');
            if (snippets[key] && codeDisplay && langBadge) {
                langBadge.textContent = snippets[key].lang;
                codeDisplay.textContent = snippets[key].code;
            }
        });
    });

    if (copyBtn && codeDisplay) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(codeDisplay.textContent);
            copyBtn.innerHTML = '<i class="fa-solid fa-check text-emerald"></i> <span>Copied!</span>';
            playAudioSound('success');
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span>Copy Code</span>';
            }, 2000);
        });
    }
}

/* ==========================================================================
   7. PROJECT FILTERS & MODAL DEEP-DIVE DOSSIERS
   ========================================================================== */
function initProjectFiltersAndModal() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card, .featured-live-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.35s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project Modal Deep Dives
    const modalBackdrop = document.getElementById('project-modal-backdrop');
    const modalContent = document.getElementById('modal-content-wrap');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const projectDossiers = {
        aurafit: {
            title: 'AuraFit — AI Fitness & Pose Coach Ecosystem',
            tag: 'Real-Time Computer Vision & Biometric Pipeline',
            desc: 'A comprehensive fitness intelligence platform that brings 60 FPS 3D computer vision kinematics directly into user browsers without server latency. Integrated with smartwatch biometrics and voice feedback.',
            highlights: [
                '33-Landmark Pose Estimation with Google MediaPipe WebGL pipeline',
                'Smartwatch OAuth 2.0 Biometric Ingestion with AES-256 encryption',
                'IronBuddy AI Real-time Voice Coach via Web Speech API',
                'Automated PDF Readiness Dossiers engineered with Dompdf',
                'PvP Arena Workout of the Day (WOD) Challenge Engine'
            ],
            liveUrl: 'https://aurafit-gym.netlify.app',
            ghUrl: 'https://github.com/Hashir-dev0/Aura_Fit_Gym'
        },
        radiocabs: {
            title: 'Radio Cabs — Fleet & Advertising Management Platform',
            tag: 'Enterprise ASP.NET Core (.NET 10) Architecture',
            desc: 'Full-cycle enterprise management system designed for cab advertising networks. Manages vehicle fleet inventory, multi-company advertising campaigns, driver dispatch, and automated financial report generation.',
            highlights: [
                'Entity Framework Core AsSplitQuery optimized query pipelines',
                'ClosedXML automated high-throughput Excel financial reporting',
                'QuestPDF vector PDF invoice generation and export',
                'Multi-role claim-based authentication (Admin, Company, Driver)',
                'Normalized SQL Server database schema with parameterized security'
            ],
            liveUrl: null,
            ghUrl: 'https://github.com/Hashir-dev0/RadioCabs'
        },
        apiengine: {
            title: 'RESTful API Engine & Data Security Pipeline',
            tag: 'Microservices, Crypto & Parameterized Security',
            desc: 'Scalable service layer engineered with strict PHP 8+ PDO and C# ASP.NET Core endpoints, featuring encrypted token validation and high-throughput JSON document processing.',
            highlights: [
                'AES-256-CBC symmetric token encryption with salt rotation',
                'Strictly-typed PHP 8+ PDO prepared query pipelines with zero SQL injection risk',
                'RESTful structured JSON response protocols with global error middleware',
                'Automated health check and latency telemetry probes'
            ],
            liveUrl: null,
            ghUrl: 'https://github.com/Hashir-dev0'
        }
    };

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = projectDossiers[projectKey];
            if (!data || !modalContent || !modalBackdrop) return;

            modalContent.innerHTML = `
                <div class="modal-header-section" style="margin-bottom: 24px;">
                    <span class="mono-tag" style="display: block; margin-bottom: 8px;">// CASE STUDY SPECIFICATION</span>
                    <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 8px;">${data.title}</h2>
                    <p style="color: var(--accent-indigo); font-family: var(--font-mono); font-size: 0.85rem;">${data.tag}</p>
                </div>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px; font-size: 1.02rem;">${data.desc}</p>
                
                <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 14px;">Key Architectural Highlights</h3>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px;">
                    ${data.highlights.map(h => `<li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.94rem; color: var(--text-primary);"><i class="fa-solid fa-circle-check text-emerald" style="margin-top: 4px;"></i> <span>${h}</span></li>`).join('')}
                </ul>

                <div style="display: flex; gap: 12px; flex-wrap: wrap; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
                    ${data.liveUrl ? `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-glow"><i class="fa-solid fa-arrow-up-right-from-square"></i> Launch Live Platform</a>` : ''}
                    <a href="${data.ghUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-glass"><i class="fa-brands fa-github"></i> Inspect GitHub Repository</a>
                </div>
            `;

            modalBackdrop.classList.add('active');
            modalBackdrop.setAttribute('aria-hidden', 'false');
            playAudioSound('click');
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modalBackdrop.classList.remove('active');
            modalBackdrop.setAttribute('aria-hidden', 'true');
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.classList.remove('active');
                modalBackdrop.setAttribute('aria-hidden', 'true');
            }
        });
    }
}

/* ==========================================================================
   8. CARD SPOTLIGHT MOUSE TRACKING
   ========================================================================== */
function initCardSpotlights() {
    const cards = document.querySelectorAll('.glass-card, .featured-live-card, .fact-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ==========================================================================
   9. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   10. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
        playAudioSound('click');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
        });
    });
}

/* ==========================================================================
   11. CONTACT HUB & SCOPE SELECTOR
   ========================================================================== */
function initContactHub() {
    // 1-Click Email Copy
    const copyEmailCard = document.getElementById('copy-email-card');
    const quickCopyBtn = document.getElementById('quick-copy-email-btn');
    const emailText = 'hashir.dev01@gmail.com';

    function copyEmail() {
        navigator.clipboard.writeText(emailText);
        showToast('Email address copied: ' + emailText);
        playAudioSound('success');

        if (quickCopyBtn) {
            quickCopyBtn.innerHTML = '<i class="fa-solid fa-check text-emerald"></i> <span class="copy-label">Copied</span>';
            setTimeout(() => {
                quickCopyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span class="copy-label">Copy</span>';
            }, 2000);
        }
    }

    if (copyEmailCard) copyEmailCard.addEventListener('click', copyEmail);
    if (quickCopyBtn) quickCopyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        copyEmail();
    });

    // Copy Spec JSON button
    const copyJsonBtn = document.getElementById('copy-json-btn');
    if (copyJsonBtn) {
        copyJsonBtn.addEventListener('click', () => {
            const jsonText = document.getElementById('profile-json-content')?.textContent;
            if (jsonText) {
                navigator.clipboard.writeText(jsonText);
                showToast('JSON Spec copied to clipboard!');
                playAudioSound('success');
            }
        });
    }

    // Scope selector pills
    const scopePills = document.querySelectorAll('.scope-pill');
    const scopeInput = document.getElementById('selected-scope-input');

    scopePills.forEach(pill => {
        pill.addEventListener('click', () => {
            scopePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            if (scopeInput) {
                scopeInput.value = pill.getAttribute('data-scope');
            }
        });
    });

    // Form Submission Simulation
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('form-submit-btn');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Transmitting...</span>';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fa-solid fa-check text-emerald"></i> <span>Transmitted Successfully</span>';
                    showToast('Message sent! Hashir will reply shortly.');
                    playAudioSound('success');
                    form.reset();

                    setTimeout(() => {
                        submitBtn.innerHTML = '<span>Transmit Direct Message</span> <i class="fa-solid fa-paper-plane"></i>';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1200);
            }
        });
    }
}

/* ==========================================================================
   12. FLOATING DOCK
   ========================================================================== */
function initFloatingDock() {
    const topBtn = document.getElementById('dock-top-btn');
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playAudioSound('click');
        });
    }
}

/* ==========================================================================
   13. ROLE ROTATOR
   ========================================================================== */
function initRoleRotator() {
    const rotator = document.getElementById('hero-role-rotator');
    if (!rotator) return;

    const roles = [
        'Full-Stack & AI Systems',
        'C# .NET 10 Architect',
        'Computer Vision Engineer',
        'ASP.NET Core Specialist',
        'PHP 8+ Backend Developer'
    ];

    let index = 0;
    setInterval(() => {
        index = (index + 1) % roles.length;
        rotator.style.opacity = '0';
        rotator.style.transform = 'translateY(-4px)';
        setTimeout(() => {
            rotator.textContent = roles[index];
            rotator.style.opacity = '1';
            rotator.style.transform = 'translateY(0)';
        }, 250);
    }, 3200);
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
    const toast = document.getElementById('toast-popup');
    const toastBody = document.getElementById('toast-body');
    if (!toast) return;

    if (toastBody) {
        toastBody.textContent = message;
    }

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}