document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step-item');
    const visualizer = document.getElementById('visualizer-container');
    const narrativePane = document.getElementById('narrative-pane');
    const scrollProgress = document.getElementById('scroll-progress');

    // Módulos HTML con diseño Stitch (Tailwind + Glassmorphism)
    const modules = {
        'intro': `
            <div class="w-full flex flex-col items-center justify-center min-h-[400px] animate-module">
                <div class="relative flex items-center justify-center w-full max-w-md mx-auto">
                    <!-- Background Glow -->
                    <div class="absolute inset-0 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                    
                    <div class="flex items-center w-full justify-between relative z-10">
                        <!-- Human Node -->
                        <div class="flex flex-col items-center gap-2">
                            <div class="w-16 h-16 rounded-2xl bg-surface-container border border-border-zinc flex items-center justify-center shadow-lg relative overflow-hidden group">
                                <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                                <span class="material-symbols-outlined text-3xl text-text-primary">person</span>
                            </div>
                            <span class="text-xs font-code-sm text-text-muted">Human Input</span>
                        </div>

                        <!-- Connecting Line -->
                        <div class="flex-1 h-px bg-gradient-to-r from-border-zinc via-primary/50 to-border-zinc relative">
                            <div class="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-primary animate-[shimmer_2s_infinite]"></div>
                        </div>

                        <!-- AI Node -->
                        <div class="flex flex-col items-center gap-2 relative">
                            <!-- Copilot Core -->
                            <div class="w-24 h-24 rounded-3xl bg-surface-base border-2 border-primary shadow-[0_0_30px_rgba(78,222,163,0.2)] flex items-center justify-center relative overflow-hidden">
                                <div class="absolute inset-0 bg-primary/10 animate-pulse"></div>
                                <span class="material-symbols-outlined text-4xl text-primary">psychology</span>
                            </div>
                            <div class="absolute -top-3 -right-3 bg-primary text-on-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg">Copilot</div>
                            <span class="text-xs font-code-sm text-primary mt-2">Deterministic Engine</span>
                        </div>

                        <!-- Connecting Line -->
                        <div class="flex-1 h-px bg-gradient-to-r from-primary/50 via-secondary/50 to-secondary/20 relative">
                            <div class="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-secondary animate-[shimmer_2s_infinite]" style="animation-delay: 1s"></div>
                        </div>

                        <!-- Output Node -->
                        <div class="flex flex-col items-center gap-2">
                            <div class="w-16 h-16 rounded-2xl bg-surface-container border border-border-zinc flex items-center justify-center shadow-lg relative overflow-hidden group">
                                <div class="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent"></div>
                                <span class="material-symbols-outlined text-3xl text-secondary">rocket_launch</span>
                            </div>
                            <span class="text-xs font-code-sm text-text-muted">Production</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-12 text-center max-w-sm">
                    <p class="text-sm font-code-sm text-text-muted bg-surface-container px-4 py-2 rounded-full border border-border-zinc inline-block">
                        <span class="text-primary">Human-AI Copilot</span> = Evidencia + Estructura
                    </p>
                </div>
            </div>
        `,
        'hero': `
            <div class="w-full flex flex-col gap-6 animate-module">
                <!-- AI Flow 1: Default AI (Illusion) -->
                <div class="glass-panel p-6 rounded-xl border-l-4 border-error-red relative overflow-hidden group shadow-lg">
                    <div class="absolute inset-0 bg-gradient-to-r from-error-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div class="flex items-center gap-4 relative z-10">
                        <div class="w-10 h-10 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-text-muted">
                            <span class="material-symbols-outlined text-sm">person</span>
                        </div>
                        <div class="flex-1 border-t border-dashed border-border-zinc relative min-w-[40px]">
                            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0A0A0A] px-2 text-[10px] text-text-muted font-code-sm">PROMPT</div>
                        </div>
                        <div class="w-10 h-10 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-text-muted">
                            <span class="material-symbols-outlined text-sm">smart_toy</span>
                        </div>
                        <div class="flex-1 border-t border-dashed border-error-red relative overflow-hidden min-w-[40px]">
                            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0A0A0A] px-2 text-[10px] text-error-red font-code-sm text-center">HALLUCINATION</div>
                            <div class="absolute top-[-1px] left-0 h-[2px] bg-error-red w-full -translate-x-full animate-[slide_2s_infinite]"></div>
                        </div>
                        <div class="w-10 h-10 shrink-0 rounded-full bg-error-red/10 border border-error-red/50 flex items-center justify-center text-error-red">
                            <span class="material-symbols-outlined text-sm">warning</span>
                        </div>
                    </div>
                    <div class="mt-6 text-center">
                        <span class="text-label-caps font-label-caps text-text-muted">Default AI: Asume sin validación</span>
                    </div>
                </div>

                <!-- AI Flow 2: Human-AI Copilot -->
                <div class="glass-panel p-6 rounded-xl border-l-4 border-primary relative overflow-hidden group shadow-[0_0_30px_rgba(78,222,163,0.05)]">
                    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div class="flex items-center gap-4 relative z-10">
                        <div class="w-10 h-10 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-text-muted">
                            <span class="material-symbols-outlined text-sm">person</span>
                        </div>
                        <div class="flex-1 border-t border-dashed border-border-zinc relative min-w-[40px]">
                            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0A0A0A] px-2 text-[10px] text-text-muted font-code-sm">PROMPT</div>
                        </div>
                        <div class="w-12 h-12 shrink-0 rounded-xl bg-primary/10 border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(78,222,163,0.2)]">
                            <span class="material-symbols-outlined">architecture</span>
                        </div>
                        <div class="flex-1 border-t border-solid border-primary relative overflow-hidden min-w-[40px]">
                            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0A0A0A] px-2 text-[10px] text-primary font-code-sm text-center">QUALITY GATE</div>
                            <div class="absolute top-[-1px] left-0 h-[2px] bg-primary w-full -translate-x-full animate-[slide_2s_infinite_0.5s]"></div>
                        </div>
                        <div class="w-10 h-10 shrink-0 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined text-sm">check_circle</span>
                        </div>
                    </div>
                    <div class="mt-6 text-center">
                        <span class="text-label-caps font-label-caps text-primary">Human-AI Copilot: Basado en Evidencia (Regla A.1)</span>
                    </div>
                </div>
            </div>
            <style>
                @keyframes slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            </style>
        `,
        'evidence': `
            <div class="bg-surface-base/80 backdrop-blur-[12px] border border-border-zinc rounded-xl overflow-hidden shadow-2xl relative z-10 w-full animate-module">
                <div class="bg-surface-container/50 border-b border-border-zinc p-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-primary">robot_2</span>
                        <span class="text-label-caps font-label-caps text-text-primary">Default Agent vs VJC Enforcement</span>
                    </div>
                    <div class="flex gap-1.5">
                        <div class="w-3 h-3 rounded-full bg-border-zinc"></div>
                        <div class="w-3 h-3 rounded-full bg-border-zinc"></div>
                        <div class="w-3 h-3 rounded-full bg-border-zinc"></div>
                    </div>
                </div>
                <div class="p-6 flex flex-col gap-6">
                    <div class="flex flex-col gap-2 max-w-[85%] self-end">
                        <div class="flex items-center gap-2 justify-end mb-1">
                            <span class="text-label-caps font-label-caps text-text-muted">User</span>
                        </div>
                        <div class="bg-surface-container/30 border border-primary-container/30 rounded-lg rounded-tr-none p-4 shadow-sm text-right">
                            <p class="text-body-md font-body-md text-primary-container">"Haz un landing de SaaS y ponle precio competitivo."</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 max-w-[85%] self-start opacity-50">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-label-caps font-label-caps text-text-muted">Default AI</span>
                        </div>
                        <div class="bg-surface-container border border-border-zinc rounded-lg rounded-tl-none p-4 shadow-sm">
                            <p class="text-body-md font-body-md text-text-muted line-through">"Claro, será $29/mes. El plan incluye 5 usuarios..."</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 max-w-[95%] self-start">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="material-symbols-outlined text-sm text-error-red">gavel</span>
                            <span class="text-label-caps font-label-caps text-error-red">VJC Quality Gate</span>
                        </div>
                        <div class="bg-error-red/20 border-l-4 border-error-red rounded-r-lg p-4 shadow-sm backdrop-blur-md">
                            <div class="flex items-start gap-3">
                                <span class="material-symbols-outlined text-error-red mt-0.5">block</span>
                                <div>
                                    <p class="text-body-md font-body-md text-text-primary mb-2">
                                        <code class="font-code-sm text-code-sm font-bold">[BLOQUEO]</code> Violación A.1: Prohibido Inventar Datos.
                                    </p>
                                    <p class="text-body-md font-body-md text-error-red/90">
                                        El precio es empírico. Marcar como <code class="font-code-sm bg-surface-base px-1 py-0.5 rounded border border-border-zinc">[PENDIENTE]</code>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        'expand': `
            <div class="w-full flex flex-col gap-4 animate-module">
                <div class="text-center mb-2">
                    <span class="text-label-caps font-label-caps text-secondary mb-1 block">Requisito Original</span>
                    <div class="text-body-lg text-text-primary">"El usuario debe poder subir un archivo."</div>
                    <div class="font-code-sm text-secondary mt-2">↓ /expand (Ratio 1:8) ↓</div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="glass-panel p-4 rounded-xl hover:border-secondary transition-colors">
                        <h3 class="font-code-sm text-secondary mb-1">1. Ciclo de Vida</h3>
                        <p class="text-sm text-text-muted">¿Cuándo caduca el archivo subido?</p>
                    </div>
                    <div class="glass-panel p-4 rounded-xl hover:border-secondary transition-colors">
                        <h3 class="font-code-sm text-secondary mb-1">2. Permisos</h3>
                        <p class="text-sm text-text-muted">¿Quién puede verlo después?</p>
                    </div>
                    <div class="glass-panel p-4 rounded-xl hover:border-secondary transition-colors">
                        <h3 class="font-code-sm text-secondary mb-1">3. Modos de Fallo</h3>
                        <p class="text-sm text-text-muted">¿Qué pasa si el archivo > 5MB?</p>
                    </div>
                    <div class="glass-panel p-4 rounded-xl hover:border-secondary transition-colors">
                        <h3 class="font-code-sm text-secondary mb-1">4. Auditoría</h3>
                        <p class="text-sm text-text-muted">Log: Hash, Tamaño, Fecha.</p>
                    </div>
                </div>
            </div>
        `,
        'quality': `
            <div class="w-full flex flex-col gap-6 animate-module">
                <div class="glass-panel p-6 rounded-xl">
                    <h4 class="text-label-caps font-label-caps text-text-muted uppercase mb-4 border-b border-border-zinc pb-2">Blindfolded Review Report</h4>
                    <ul class="space-y-4">
                        <li class="flex items-center justify-between">
                            <span class="text-body-md text-on-surface">D1: Alineación Funcional</span>
                            <span class="px-2 py-1 bg-primary/10 border border-primary/30 text-primary font-code-sm text-xs rounded">9.0 - PASS</span>
                        </li>
                        <li class="flex items-center justify-between">
                            <span class="text-body-md text-on-surface">D2: Manejo de Errores</span>
                            <span class="px-2 py-1 bg-primary/10 border border-primary/30 text-primary font-code-sm text-xs rounded">8.5 - PASS</span>
                        </li>
                        <li class="flex items-center justify-between">
                            <span class="text-body-md text-on-surface">D3: Seguridad (Secretos)</span>
                            <span class="px-2 py-1 bg-error-red/10 border border-error-red/30 text-error-red font-code-sm text-xs rounded">5.5 - FAIL</span>
                        </li>
                    </ul>
                </div>
                <div class="border-l-4 border-error-red pl-4 py-2">
                    <h3 class="text-body-lg font-bold text-text-primary mb-1 flex items-center gap-2">
                        <span class="material-symbols-outlined text-error-red">gpp_bad</span>
                        Veredicto: NO-GO
                    </h3>
                    <p class="text-sm text-on-surface-variant">
                        La media es 7.6, pero la dimensión D3 está por debajo del <strong>Umbral Mínimo (6.0)</strong>. Un 9 brillante en diseño no compensa un 5 crítico en seguridad.
                    </p>
                </div>
            </div>
        `,
        'exposure': `
            <div class="w-full glass-panel rounded-xl overflow-hidden animate-module flex flex-col">
                <div class="px-6 py-4 border-b border-border-zinc hover:bg-surface-container-high transition-colors">
                    <span class="font-code-sm text-text-primary block">X0 (Privado)</span>
                    <span class="text-sm text-text-muted">Herramienta interna. Scripts locales.</span>
                </div>
                <div class="px-6 py-4 border-b border-border-zinc hover:bg-surface-container-high transition-colors">
                    <span class="font-code-sm text-text-primary block">X1 (Público sin cuentas)</span>
                    <span class="text-sm text-text-muted">Landing page / Prototipo visual.</span>
                </div>
                <div class="px-6 py-4 border-l-4 border-tertiary-container bg-tertiary-container/5 relative">
                    <div class="absolute right-4 top-4 text-tertiary-container">
                        <span class="material-symbols-outlined">warning</span>
                    </div>
                    <span class="font-code-sm text-tertiary-container block">X2 (Usuarios con datos)</span>
                    <span class="text-sm text-text-muted block mb-3">Recolección de Emails / MVP.</span>
                    
                    <div class="text-xs bg-surface-base p-3 rounded border border-border-zinc">
                        <strong class="text-text-primary block mb-1">Checklist GDPR Activada:</strong>
                        <ul class="list-disc pl-4 text-on-surface-variant space-y-1">
                            <li>Mapa de datos en Spec (Dato → Finalidad)</li>
                            <li>Justificación estricta (Minimización)</li>
                            <li>Script de borrado E2E</li>
                        </ul>
                    </div>
                </div>
                <div class="px-6 py-4 hover:bg-surface-container-high transition-colors opacity-50">
                    <span class="font-code-sm text-text-primary block">X3 (Alto Riesgo)</span>
                    <span class="text-sm text-text-muted">Pagos, Salud, Compliance.</span>
                </div>
            </div>
        `,
        'flow-diagram': `
            <div class="bg-surface-base/80 backdrop-blur-[12px] border border-border-zinc rounded-xl shadow-2xl relative z-10 w-full animate-module flex flex-col p-8 items-center justify-center min-h-[500px]">
                <h3 class="text-xl font-bold text-text-primary mb-8 text-center">Un flujo determinista ejecutado en Claude Code / Antigravity</h3>
                
                <!-- Core Flow (Vía Núcleo) -->
                <div class="relative w-full max-w-2xl">
                    <div class="absolute inset-0 bg-primary/5 rounded-3xl border border-primary/20 blur-xl"></div>
                    
                    <div class="relative z-10 p-6 rounded-3xl border border-primary/30 flex flex-wrap justify-center gap-4 bg-surface-container/50 backdrop-blur-sm">
                        <div class="absolute -top-3 left-4 bg-primary/20 text-primary px-3 rounded-full text-xs font-bold border border-primary/30">Vía Núcleo</div>
                        
                        <div class="flex flex-col gap-1 items-center bg-surface-container p-3 rounded-lg border border-border-zinc shadow w-[140px] text-center">
                            <span class="text-xs font-code-sm text-text-muted">/spec-init</span>
                            <span class="text-sm font-bold text-text-primary">Triaje de ejes</span>
                        </div>
                        <span class="material-symbols-outlined text-primary self-center">arrow_forward</span>
                        
                        <div class="flex flex-col gap-1 items-center bg-surface-container p-3 rounded-lg border border-border-zinc shadow w-[140px] text-center">
                            <span class="text-xs font-code-sm text-text-muted">/prd-lite</span>
                            <span class="text-sm font-bold text-text-primary">Hipótesis/Negocio</span>
                        </div>
                        <span class="material-symbols-outlined text-primary self-center">arrow_forward</span>
                        
                        <div class="flex flex-col gap-1 items-center bg-surface-container p-3 rounded-lg border border-border-zinc shadow w-[140px] text-center">
                            <span class="text-xs font-code-sm text-text-muted">/expand</span>
                            <span class="text-sm font-bold text-text-primary">Multiplicador</span>
                        </div>
                        
                        <!-- Next row of core -->
                        <div class="w-full h-4 flex justify-end pr-[70px]">
                            <span class="material-symbols-outlined text-primary rotate-90">arrow_forward</span>
                        </div>
                        
                        <div class="flex flex-col gap-1 items-center bg-surface-container p-3 rounded-lg border border-border-zinc shadow w-[140px] text-center">
                            <span class="text-xs font-code-sm text-text-muted">/specify</span>
                            <span class="text-sm font-bold text-text-primary">Arquitectura</span>
                        </div>
                        <span class="material-symbols-outlined text-primary self-center rotate-180">arrow_forward</span>

                        <div class="flex flex-col gap-1 items-center bg-surface-container p-3 rounded-lg border border-border-zinc shadow w-[140px] text-center">
                            <span class="text-xs font-code-sm text-text-muted">/plan & /tasks</span>
                            <span class="text-sm font-bold text-text-primary">Esqueleto</span>
                        </div>
                        <span class="material-symbols-outlined text-primary self-center rotate-180">arrow_forward</span>

                        <div class="flex flex-col gap-1 items-center bg-surface-container p-3 rounded-lg border border-primary/50 shadow-[0_0_15px_rgba(78,222,163,0.15)] w-[140px] text-center">
                            <span class="text-xs font-code-sm text-primary">/implement</span>
                            <span class="text-sm font-bold text-text-primary">Ejecución</span>
                        </div>
                        <span class="material-symbols-outlined text-primary self-center rotate-180">arrow_forward</span>

                        <div class="flex flex-col gap-1 items-center bg-surface-container p-3 rounded-lg border border-error-red/50 shadow w-[140px] text-center relative overflow-hidden group">
                            <div class="absolute inset-0 bg-error-red/10 group-hover:bg-error-red/20 transition-colors"></div>
                            <span class="text-xs font-code-sm text-error-red relative z-10">/quality-gate</span>
                            <span class="text-sm font-bold text-text-primary relative z-10">Revisión ciega</span>
                        </div>
                    </div>
                </div>

                <!-- Arrow down -->
                <div class="h-12 w-full flex justify-center items-center">
                    <span class="material-symbols-outlined text-secondary animate-bounce">arrow_downward</span>
                </div>

                <!-- Production Flow (Vía Producción) -->
                <div class="relative w-full max-w-2xl">
                    <div class="absolute inset-0 bg-secondary/5 rounded-3xl border border-secondary/20 blur-xl"></div>
                    
                    <div class="relative z-10 p-6 rounded-3xl border border-secondary/30 flex justify-center gap-4 bg-surface-container/50 backdrop-blur-sm">
                        <div class="absolute -top-3 left-4 bg-secondary/20 text-secondary px-3 rounded-full text-xs font-bold border border-secondary/30">Vía Producción</div>
                        
                        <div class="flex flex-col gap-1 items-center bg-surface-container p-3 rounded-lg border border-border-zinc shadow w-[140px] text-center">
                            <span class="text-xs font-code-sm text-text-muted">/go-live</span>
                            <span class="text-sm font-bold text-text-primary">Hardening</span>
                        </div>
                        <span class="material-symbols-outlined text-secondary self-center">arrow_forward</span>
                        
                        <div class="flex flex-col gap-1 items-center bg-surface-container p-3 rounded-lg border border-border-zinc shadow w-[140px] text-center">
                            <span class="text-xs font-code-sm text-text-muted">/preflight</span>
                            <span class="text-sm font-bold text-text-primary">Check final</span>
                        </div>
                        <span class="material-symbols-outlined text-secondary self-center">arrow_forward</span>
                        
                        <div class="flex flex-col gap-1 items-center bg-primary/20 p-3 rounded-lg border border-primary shadow-[0_0_20px_rgba(78,222,163,0.3)] w-[140px] text-center relative overflow-hidden">
                            <div class="absolute top-0 right-0 w-8 h-full bg-white/20 skew-x-[45deg] animate-[shimmer_2s_infinite]"></div>
                            <span class="text-xs font-code-sm text-primary relative z-10">/go-nogo</span>
                            <span class="text-sm font-bold text-text-primary relative z-10">Decisión</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    };

    // Scroll Progress Logic
    if (narrativePane && scrollProgress) {
        narrativePane.addEventListener('scroll', () => {
            const scrollTop = narrativePane.scrollTop;
            const scrollHeight = narrativePane.scrollHeight - narrativePane.clientHeight;
            const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollProgress.style.height = scrollPercentage + '%';
        });
    }

    // Intersection Observer to track which section is currently visible
    const observerOptions = {
        root: narrativePane,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Highlight active narrative step
                steps.forEach(s => {
                    s.classList.remove('step-active');
                    s.classList.add('step-inactive');
                });
                entry.target.classList.remove('step-inactive');
                entry.target.classList.add('step-active');

                // Update right pane visualizer based on active step
                const targetMod = entry.target.getAttribute('data-target');
                if (targetMod && modules[targetMod]) {
                    // Inject and re-trigger animation
                    visualizer.innerHTML = modules[targetMod];
                }
            }
        });
    }, observerOptions);

    steps.forEach(step => observer.observe(step));
    
    // Reveal Observer for scroll-fade elements
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, { root: narrativePane, rootMargin: '0px', threshold: 0.15 });
    
    revealElements.forEach(el => revealObserver.observe(el));
});

// Presentation Deck Logic
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-deck-btn');
    const closeBtn = document.getElementById('close-deck-btn');
    const modal = document.getElementById('deck-modal');
    
    if (!openBtn || !modal) return;

    const slides = Array.from(document.querySelectorAll('.deck-slide'));
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const indicatorsContainer = document.getElementById('slide-indicators');
    let currentSlide = 0;

    // Create Indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `w-10 h-1 rounded-full transition-all duration-300 ${index === 0 ? 'bg-primary' : 'bg-surface-variant hover:bg-border-zinc'}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(dot);
    });

    const updateSlides = () => {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('opacity-100', 'scale-100', 'translate-y-0', 'z-10');
                slide.classList.remove('opacity-0', 'scale-95', 'translate-y-4', 'z-0', 'pointer-events-none');
            } else {
                slide.classList.remove('opacity-100', 'scale-100', 'translate-y-0', 'z-10');
                slide.classList.add('opacity-0', 'scale-95', 'translate-y-4', 'z-0', 'pointer-events-none');
            }
        });

        // Update Indicators
        const dots = indicatorsContainer.children;
        Array.from(dots).forEach((dot, index) => {
            if (index === currentSlide) {
                dot.className = 'w-10 h-1.5 rounded-full transition-all duration-300 bg-primary';
            } else {
                dot.className = 'w-6 h-1.5 rounded-full transition-all duration-300 bg-surface-variant hover:bg-border-zinc';
            }
        });

        // Update Button States
        prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentSlide === slides.length - 1 ? 'none' : 'auto';
    };

    const goToSlide = (index) => {
        if (index >= 0 && index < slides.length) {
            currentSlide = index;
            updateSlides();
        }
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Modal Visibility
    const openModal = () => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
        goToSlide(0); // Reset on open
    };

    const closeModal = () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = '';
    };

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('opacity-100')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        }
    });

    // Initialize state
    updateSlides();
});
