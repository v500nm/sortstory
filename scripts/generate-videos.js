const { chromium } = require('@playwright/test');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ==========================================
// CONFIGURATION & PATHS
// ==========================================
const TARGET_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../public/auto-demos');
const TEMP_DIR = path.join(__dirname, '../public/auto-demos/.temp');
const PROMO_URL = 'sortstory.adnan-mangaonkar.com';

// ── Voice Configuration ──
// en-US-JennyNeural  — Warm, calm, conversational female
// en-US-AriaNeural   — Versatile, professional female
// en-US-SaraNeural   — Soft, younger female
const TTS_VOICE = 'en-US-JennyNeural';

// Workaround for msedge-tts bug: it attempts to asynchronously unlink the temp file
// on stream errors, which can crash the process with ENOENT if it doesn't exist.
process.on('uncaughtException', (err) => {
    if (err.code === 'ENOENT' && err.syscall === 'unlink') {
        // Suppress this specific third-party library bug
    } else {
        console.error('Uncaught Exception:', err);
        process.exit(1);
    }
});

// Resolve ffmpeg binary from ffmpeg-static
let FFMPEG_BIN;
try {
    FFMPEG_BIN = require('ffmpeg-static');
    console.log(`✅ ffmpeg found: ${FFMPEG_BIN}`);
} catch (e) {
    console.error('❌ ffmpeg-static not installed. Run: npm install ffmpeg-static');
    process.exit(1);
}

// ==========================================
// SCENARIO DEFINITIONS: Page by Page, Button by Button
// ==========================================
const videoScenarios = [
    {
        category: 'sorting',
        name: 'bubble-sort-walkthrough',
        path: '/sort?algo=bubbleSort',
        title: 'Sorting Visualizer - Bubble Sort',
        subtitle: 'Step-by-step Array Sorting & Interactive Controls',
        walkthrough: async (page, engine) => {
            await engine.narrate(page, 'Welcome to the Sorting Visualizer on SortStory.');
            await engine.narrate(page, 'Clicking the Shuffle button to generate a new randomized array.');
            const shuffleBtn = page.locator('button:has-text("Shuffle")');
            if (await shuffleBtn.isVisible()) {
                await shuffleBtn.click();
                await page.waitForTimeout(1500);
            }

            await engine.narrate(page, 'Now clicking Run to start the Bubble Sort visualization.');
            const runBtn = page.locator('button:has-text("Run")');
            if (await runBtn.isVisible()) {
                await runBtn.click();
                await engine.scrollToTop(page);
                await page.waitForTimeout(10000);
            }

            await engine.narrate(page, 'Notice how adjacent bars compare and swap until the entire array is fully sorted.');
            await page.waitForTimeout(3000);
        }
    },
    {
        category: 'sorting',
        name: 'compare-race-mode',
        path: '/sort?algo=quickSortWrapper',
        title: 'Sorting Race Mode - Quick Sort vs Selection Sort',
        subtitle: 'Side-by-side Dual Algorithm Comparison',
        walkthrough: async (page, engine) => {
            await engine.narrate(page, 'SortStory supports a side-by-side Dual Algorithm Race Mode.');
            await engine.narrate(page, 'Clicking the Compare Mode toggle to enable dual algorithm comparison.');
            const compareToggle = page.locator('#compare-toggle');
            if (await compareToggle.isVisible()) {
                await compareToggle.click();
                await page.waitForTimeout(1500);
            }

            await engine.narrate(page, 'Now clicking Run to race Quick Sort against Selection Sort in real time.');
            const runBtn = page.locator('button:has-text("Run")');
            if (await runBtn.isVisible()) {
                await runBtn.click();
                await engine.scrollToTop(page);
                await page.waitForTimeout(10000);
            }

            await engine.narrate(page, 'Watch both algorithms compete simultaneously to see which finishes first.');
            await page.waitForTimeout(2500);
        }
    },
    {
        category: 'pathfinding',
        name: 'astar-grid-walkthrough',
        path: '/pathfinding?algo=astar',
        title: 'Pathfinding Visualizer - A Star Search',
        subtitle: 'Heuristic Grid Search & Dynamic Wall Placement',
        walkthrough: async (page, engine) => {
            await engine.narrate(page, 'Welcome to the Pathfinding Visualizer. Let us explore the A Star Search algorithm.');
            await engine.narrate(page, 'Clicking Generate Walls to place random obstacle barriers on the grid.');
            const genWallsBtn = page.locator('button:has-text("GENERATE WALLS")');
            if (await genWallsBtn.isVisible()) {
                await genWallsBtn.click();
                await page.waitForTimeout(1500);
            }

            await engine.narrate(page, 'Now clicking Start Finding to navigate from the start node to the goal node.');
            const startBtn = page.locator('button:has-text("START FINDING")');
            if (await startBtn.isVisible()) {
                await startBtn.click();
                await engine.scrollToTop(page);
                await page.waitForTimeout(12000);
            }

            await engine.narrate(page, 'The algorithm efficiently finds the shortest path while avoiding obstacles.');
            await page.waitForTimeout(2500);
        }
    },
    {
        category: 'search',
        name: 'binary-search-walkthrough',
        path: '/search?algo=binarySearch',
        title: 'Searching Visualizer - Binary Search',
        subtitle: 'Logarithmic O(log n) Searching in Sorted Arrays',
        walkthrough: async (page, engine) => {
            await engine.narrate(page, 'Welcome to the Search Visualizer. Let us demonstrate Binary Search on sorted data.');
            await engine.narrate(page, 'Clicking Shuffle to generate a new sorted dataset.');
            const shuffleBtn = page.locator('button:has-text("Shuffle")');
            if (await shuffleBtn.isVisible()) {
                await shuffleBtn.click();
                await page.waitForTimeout(1500);
            }

            await engine.narrate(page, 'Now clicking Start Search. The search space is divided in half with each iteration.');
            const startBtn = page.locator('button:has-text("START SEARCH")');
            if (await startBtn.isVisible()) {
                await startBtn.click();
                await engine.scrollToTop(page);
                await page.waitForTimeout(9000);
            }

            await engine.narrate(page, 'Binary Search achieves logarithmic time complexity, making it extremely efficient.');
            await page.waitForTimeout(2500);
        }
    },
    {
        category: 'trees',
        name: 'dfs-traversal-walkthrough',
        path: '/trees?algo=dfs',
        title: 'Binary Tree Visualizer - Depth First Search',
        subtitle: 'Hierarchical Tree Data Structure Traversals',
        walkthrough: async (page, engine) => {
            await engine.narrate(page, 'Let us explore Tree Data Structures with a Depth First Search traversal.');
            await engine.narrate(page, 'Clicking Start to traverse tree branches all the way down to the leaf nodes.');
            const startBtn = page.locator('button:has-text("START")');
            if (await startBtn.isVisible()) {
                await startBtn.click();
                await engine.scrollToTop(page);
                await page.waitForTimeout(10000);
            }

            await engine.narrate(page, 'Each node is visited by exploring as far as possible along each branch before backtracking.');
            await page.waitForTimeout(2500);
        }
    },
    {
        category: 'graphs',
        name: 'bfs-traversal-walkthrough',
        path: '/graphs',
        title: 'Graph Network Visualizer - BFS Traversal',
        subtitle: 'Node-Edge Network Exploration & Traversal Algorithms',
        walkthrough: async (page, engine) => {
            await engine.narrate(page, 'Welcome to the Graph Visualizer. Let us demonstrate Breadth First Search across nodes.');
            await engine.narrate(page, 'Clicking Start to explore graph network nodes layer by layer.');
            const startBtn = page.locator('button:has-text("START")');
            if (await startBtn.isVisible()) {
                await startBtn.click();
                await engine.scrollToTop(page);
                await page.waitForTimeout(10000);
            }

            await engine.narrate(page, 'Breadth First Search visits all neighbors at the current depth before moving to the next level.');
            await page.waitForTimeout(2500);
        }
    },
    {
        category: 'linked-lists',
        name: 'operations-walkthrough',
        path: '/linked-lists',
        title: 'Linked List Visualizer - Node Insertion & Deletion',
        subtitle: 'Dynamic Pointer Manipulation & Memory Simulation',
        walkthrough: async (page, engine) => {
            await engine.narrate(page, 'Welcome to the Linked List Visualizer. Here you can manipulate nodes dynamically.');
            await engine.narrate(page, 'Clicking Insert Head to add a new node at the front of the list.');
            const insertHeadBtn = page.locator('button:has-text("Insert Head")');
            if (await insertHeadBtn.isVisible()) {
                await insertHeadBtn.click();
                await engine.scrollToTop(page);
                await page.waitForTimeout(2500);
            }

            await engine.narrate(page, 'Now clicking Insert Tail to append a node at the end of the list.');
            const insertTailBtn = page.locator('button:has-text("Insert Tail")');
            if (await insertTailBtn.isVisible()) {
                await insertTailBtn.click();
                await engine.scrollToTop(page);
                await page.waitForTimeout(2500);
            }

            await engine.narrate(page, 'Each node contains data and a pointer linking it to the next node in the sequence.');
            await page.waitForTimeout(2500);
        }
    },
    {
        category: 'automata',
        name: 'game-of-life-walkthrough',
        path: '/automata?algo=gol',
        title: "Cellular Automata - Conway's Game of Life",
        subtitle: 'Zero-Player Grid Simulation & Pattern Evolution',
        walkthrough: async (page, engine) => {
            await engine.narrate(page, "Welcome to Cellular Automata, featuring Conway's Game of Life.");
            await engine.narrate(page, 'Clicking Start to observe cellular growth and pattern evolution on the grid.');
            const startBtn = page.locator('button:has-text("START")');
            if (await startBtn.isVisible()) {
                await startBtn.click();
                await engine.scrollToTop(page);
                await page.waitForTimeout(11000);
            }

            await engine.narrate(page, 'Cells live, die, or reproduce based on simple rules, creating mesmerizing emergent patterns.');
            await page.waitForTimeout(2500);
        }
    },
    {
        category: 'learn',
        name: 'interactive-learning-walkthrough',
        path: '/learn/sorting/bubbleSort',
        title: 'Learn & Practice Module - Code & Complexity',
        subtitle: 'Multi-Language Implementations in Python, C++, Java, and JavaScript',
        walkthrough: async (page, engine) => {
            await engine.narrate(page, 'SortStory features an interactive Learn Module with multi-language code snippets and complexity analysis.');
            await page.mouse.wheel(0, 350);
            await page.waitForTimeout(1200);

            await engine.narrate(page, 'Switching to the Python code implementation tab.');
            const pythonTab = page.locator('button:has-text("Python")');
            if (await pythonTab.isVisible()) {
                await pythonTab.click();
                await page.waitForTimeout(2000);
            }

            await engine.narrate(page, 'Now switching to the C plus plus implementation tab.');
            const cppTab = page.locator('button:has-text("C++")');
            if (await cppTab.isVisible()) {
                await cppTab.click();
                await page.waitForTimeout(2000);
            }

            await engine.narrate(page, 'Each algorithm includes full code implementations, time and space complexity breakdowns.');
            await page.waitForTimeout(2500);
        }
    }
];

// ==========================================
// EDGE NEURAL TTS ENGINE (High-Quality Female Voice)
// ==========================================

/**
 * Create and cache a TTS instance with the configured voice.
 */
async function createTTSInstance() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(TTS_VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    return tts;
}

/**
 * Generate an MP3 audio file from text using Microsoft Edge Neural TTS.
 * NOTE: msedge-tts toFile() takes a DIRECTORY path and creates audio.mp3 inside it.
 * We create a unique temp subdirectory, generate there, then move the result.
 */
async function generateTTSAudio(tts, text, outputPath) {
    // Create a unique temp directory for this clip
    const clipDir = outputPath + '_ttsdir';
    if (!fs.existsSync(clipDir)) fs.mkdirSync(clipDir, { recursive: true });

    try {
        // msedge-tts toFile takes (directoryPath, text, prosodyOptions) and outputs audio.mp3 inside
        await tts.toFile(clipDir, text, {
            rate: 0.9,          // Slightly slower for calm delivery
            pitch: '-2Hz',      // Slightly deeper for warmth
            volume: 100
        });

        // Find and move the generated audio file
        const generatedFile = path.join(clipDir, 'audio.mp3');
        if (fs.existsSync(generatedFile)) {
            fs.renameSync(generatedFile, outputPath);
            // Clean up the temp directory and metadata
            try {
                const leftover = fs.readdirSync(clipDir);
                for (const f of leftover) fs.unlinkSync(path.join(clipDir, f));
                fs.rmdirSync(clipDir);
            } catch (e) { /* ignore */ }
            return true;
        }
        throw new Error('No audio file generated');
    } catch (err) {
        console.warn(`   ⚠️ Edge TTS failed: ${err.message}`);
        // Generate short silence as fallback
        generateSilenceMp3(outputPath, 1.5);
        try { fs.rmdirSync(clipDir, { recursive: true }); } catch (e) { /* ignore */ }
        return false;
    }
}

// (escapeXml removed — no longer needed with ProsodyOptions API)

/**
 * Generate a silent MP3 file of given duration using ffmpeg.
 */
function generateSilenceMp3(outputPath, durationSec) {
    try {
        execSync(
            `"${FFMPEG_BIN}" -y -f lavfi -i anullsrc=r=24000:cl=mono -t ${durationSec} -c:a libmp3lame -b:a 96k "${outputPath}"`,
            { stdio: 'pipe', timeout: 10000 }
        );
    } catch (e) {
        // Last resort: write empty file
        fs.writeFileSync(outputPath, Buffer.alloc(0));
    }
}

/**
 * Get duration of an audio file in seconds using ffmpeg.
 */
function getAudioDuration(filePath) {
    try {
        const output = execSync(
            `"${FFMPEG_BIN}" -i "${filePath}" -f null - 2>&1`,
            { stdio: 'pipe', timeout: 10000, shell: true }
        ).toString();
        const match = output.match(/Duration:\s*(\d+):(\d+):(\d+)\.(\d+)/);
        if (match) {
            return parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseInt(match[3]) + parseInt(match[4]) / 100;
        }
    } catch (e) {
        const stderr = e.stderr ? e.stderr.toString() : '';
        const match = stderr.match(/Duration:\s*(\d+):(\d+):(\d+)\.(\d+)/);
        if (match) {
            return parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseInt(match[3]) + parseInt(match[4]) / 100;
        }
    }
    return 2.5; // Fallback estimate
}

/**
 * Build the complete narration audio track from recorded segments.
 * Generates individual TTS clips with Edge Neural voice, then concatenates with silence gaps.
 */
async function buildNarrationTrack(tts, segments, outputPath, totalDurationMs) {
    if (segments.length === 0) {
        generateSilenceMp3(outputPath, totalDurationMs / 1000);
        return;
    }

    const clipPaths = [];
    let currentTimeMs = 0;

    for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];

        // Add silence gap from current position to this segment's start
        const gapMs = Math.max(0, seg.offsetMs - currentTimeMs);
        if (gapMs > 150) {
            const silencePath = path.join(TEMP_DIR, `silence_${i}.mp3`);
            generateSilenceMp3(silencePath, gapMs / 1000);
            clipPaths.push(silencePath);
            currentTimeMs += gapMs;
        }

        // Generate TTS audio for this narration line
        const clipPath = path.join(TEMP_DIR, `clip_${i}.mp3`);
        console.log(`      🗣️ TTS [${i + 1}/${segments.length}]: "${seg.text.substring(0, 60)}..."`);
        await generateTTSAudio(tts, seg.text, clipPath);

        if (fs.existsSync(clipPath) && fs.statSync(clipPath).size > 0) {
            const clipDur = getAudioDuration(clipPath);
            clipPaths.push(clipPath);
            currentTimeMs = seg.offsetMs + clipDur * 1000;
        }
    }

    // Add trailing silence to match total video duration
    const trailingMs = Math.max(0, totalDurationMs - currentTimeMs);
    if (trailingMs > 500) {
        const trailPath = path.join(TEMP_DIR, 'trail_silence.mp3');
        generateSilenceMp3(trailPath, trailingMs / 1000);
        clipPaths.push(trailPath);
    }

    if (clipPaths.length === 0) {
        generateSilenceMp3(outputPath, totalDurationMs / 1000);
        return;
    }

    // Concatenate all audio clips using ffmpeg concat demuxer
    const concatListPath = path.join(TEMP_DIR, 'concat_list.txt');
    const concatContent = clipPaths
        .filter(p => fs.existsSync(p) && fs.statSync(p).size > 0)
        .map(p => `file '${p.replace(/\\/g, '/')}'`)
        .join('\n');
    fs.writeFileSync(concatListPath, concatContent, 'utf8');

    try {
        execSync(
            `"${FFMPEG_BIN}" -y -f concat -safe 0 -i "${concatListPath}" -c:a libmp3lame -b:a 96k -ar 24000 -ac 1 "${outputPath}"`,
            { stdio: 'pipe', timeout: 60000 }
        );
        console.log(`      ✅ Narration track built successfully`);
    } catch (err) {
        console.warn('   ⚠️ Audio concat failed, generating fallback silence.');
        generateSilenceMp3(outputPath, totalDurationMs / 1000);
    }

    // Clean up intermediate clips
    for (const p of clipPaths) {
        try { fs.unlinkSync(p); } catch (e) { /* ignore */ }
    }
    try { fs.unlinkSync(concatListPath); } catch (e) { /* ignore */ }
}

/**
 * Merge a video file with an audio track using ffmpeg.
 * Output: .webm with VP8 video + Vorbis audio.
 */
function mergeVideoAudio(videoPath, audioPath, outputPath) {
    try {
        // Use libopus for audio (WebM native, supports 24kHz from Edge TTS)
        // -ar 48000 resamples to standard rate for maximum compatibility
        execSync(
            `"${FFMPEG_BIN}" -y -i "${videoPath}" -i "${audioPath}" -c:v copy -c:a libopus -b:a 128k -ar 48000 -shortest "${outputPath}"`,
            { stdio: 'pipe', timeout: 120000 }
        );
        return true;
    } catch (err) {
        console.warn('   ⚠️ Video-audio merge failed:', err.message?.substring(0, 200));
        return false;
    }
}


// ==========================================
// VOICEOVER ENGINE (Captions + Timestamp Tracking)
// ==========================================
class VoiceoverEngine {
    constructor() {
        /** @type {Array<{offsetMs: number, text: string}>} */
        this.narrationSegments = [];
        this.recordingStartTime = 0;
    }

    resetSegments() {
        this.narrationSegments = [];
        this.recordingStartTime = Date.now();
    }

    async setupPage(page) {
        await page.addInitScript(() => {
            localStorage.setItem('sortviz_intro', 'true');
            localStorage.setItem('sortstory-analytics-dismissed', 'true');
        });
    }

    async scrollToTop(page) {
        await page.evaluate(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        await page.waitForTimeout(600);
    }

    async injectCaptionBanner(page) {
        await page.evaluate(() => {
            if (document.getElementById('sortstory-voice-banner')) return;
            const banner = document.createElement('div');
            banner.id = 'sortstory-voice-banner';
            banner.style.cssText = `
                position: fixed !important;
                bottom: 32px !important;
                left: 50% !important;
                transform: translateX(-50%) translateY(8px) !important;
                background: rgba(9, 13, 22, 0.88) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                color: #e4e4e7 !important;
                padding: 14px 28px !important;
                border-radius: 12px !important;
                font-family: 'Inter', 'SF Pro Display', ui-sans-serif, system-ui, -apple-system, sans-serif !important;
                font-size: 15px !important;
                font-weight: 500 !important;
                letter-spacing: 0.01em !important;
                line-height: 1.5 !important;
                z-index: 2147483647 !important;
                display: flex !important;
                align-items: center !important;
                gap: 12px !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
                max-width: 85vw !important;
                box-sizing: border-box !important;
                transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
            `;
            banner.innerHTML = `
                <span style="display:inline-flex; align-items:center; justify-content:center; width:6px; height:6px; border-radius:50%; background:#a78bfa; box-shadow:0 0 8px rgba(167,139,250,0.5); flex-shrink:0;"></span>
                <span id="sortstory-voice-text" style="color:#d4d4d8;"></span>
            `;
            document.body.appendChild(banner);
        });
    }

    /**
     * Show caption on screen AND record timestamp for TTS generation.
     * Pauses long enough for the viewer to read the caption comfortably.
     */
    async narrate(page, message) {
        const offsetMs = Date.now() - this.recordingStartTime;
        this.narrationSegments.push({ offsetMs, text: message });
        console.log(`   🎙️ [${(offsetMs / 1000).toFixed(1)}s] "${message}"`);

        // Smooth caption transition
        await page.evaluate((msg) => {
            const banner = document.getElementById('sortstory-voice-banner');
            const textEl = document.getElementById('sortstory-voice-text');
            if (banner && textEl) {
                // Fade out
                banner.style.opacity = '0';
                banner.style.transform = 'translateX(-50%) translateY(8px)';
                setTimeout(() => {
                    textEl.innerText = msg;
                    banner.style.visibility = 'visible';
                    banner.style.opacity = '1';
                    banner.style.transform = 'translateX(-50%) translateY(0)';
                }, 300);
            }
        }, message);

        // Wait based on text length — calm pacing (roughly 140 words/min)
        const wordCount = message.split(/\s+/).length;
        const readTimeMs = Math.max(2000, (wordCount / 2.3) * 1000);
        await page.waitForTimeout(readTimeMs);
    }

    async showPromoIntro(page, title, subtitle) {
        console.log(`   🎬 Premium Intro: ${title}`);
        await page.evaluate(({ title, subtitle, promoUrl }) => {
            const overlay = document.createElement('div');
            overlay.id = 'sortstory-promo-intro';
            overlay.style.cssText = `
                position: fixed; inset: 0;
                background: #070709;
                z-index: 999999;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #fff;
                font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
                text-align: center;
                padding: 48px; box-sizing: border-box;
            `;
            overlay.innerHTML = `
                <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 8px 24px; border-radius: 9999px; font-size: 11px; font-weight: 700; color: #a1a1aa; letter-spacing: 3.5px; text-transform: uppercase; margin-bottom: 32px;">
                    SORTSTORY — DSA VISUALISER
                </div>
                <h1 style="font-size: 44px; font-weight: 800; color: #fafafa; margin: 0 0 18px 0; letter-spacing: -0.025em; max-width: 850px; line-height: 1.15;">
                    ${title}
                </h1>
                <p style="font-size: 19px; color: #71717a; max-width: 680px; margin: 0 0 40px 0; line-height: 1.6; font-weight: 400;">
                    ${subtitle}
                </p>
                <div style="font-family: 'SF Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 14px; font-weight: 500; color: #a1a1aa; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 4px;">
                    ${promoUrl}
                </div>
            `;
            document.body.appendChild(overlay);
        }, { title, subtitle, promoUrl: PROMO_URL });

        await this.narrate(page, `SortStory DSA Visualiser. Presenting: ${title}.`);
        await page.waitForTimeout(2000);

        await page.evaluate(() => {
            const overlay = document.getElementById('sortstory-promo-intro');
            if (overlay) overlay.remove();
        });

        await this.scrollToTop(page);
    }

    async showPromoOutro(page) {
        console.log(`   🎬 Premium Outro`);
        await page.evaluate(({ promoUrl }) => {
            const overlay = document.createElement('div');
            overlay.id = 'sortstory-promo-outro';
            overlay.style.cssText = `
                position: fixed; inset: 0;
                background: #070709;
                z-index: 999999;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #fff;
                font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
                text-align: center;
                padding: 48px; box-sizing: border-box;
            `;
            overlay.innerHTML = `
                <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 8px 24px; border-radius: 9999px; font-size: 11px; font-weight: 700; color: #a1a1aa; letter-spacing: 3.5px; text-transform: uppercase; margin-bottom: 32px;">
                    SORTSTORY — DSA VISUALISER
                </div>
                <h2 style="font-size: 42px; font-weight: 800; color: #fafafa; margin: 0 0 18px 0; letter-spacing: -0.025em;">
                    Master Algorithms Visually
                </h2>
                <p style="font-size: 17px; color: #71717a; margin: 0 0 36px 0; line-height: 1.6;">
                    Explore interactive visualizers, dual race modes, and full code breakdowns.
                </p>
                <div style="font-family: 'SF Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 16px; font-weight: 600; color: #fafafa; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); padding: 14px 36px; border-radius: 9999px;">
                    ${promoUrl}
                </div>
            `;
            document.body.appendChild(overlay);
        }, { promoUrl: PROMO_URL });

        await this.narrate(page, `Explore interactive visualizations today at ${PROMO_URL}.`);
        await page.waitForTimeout(2500);
    }
}

// ==========================================
// MAIN RUNNER
// ==========================================
function clearOutputDir() {
    console.log('🧹 Clearing existing demo videos...');
    if (fs.existsSync(OUTPUT_DIR)) {
        const files = fs.readdirSync(OUTPUT_DIR);
        for (const file of files) {
            if (file.endsWith('.webm') || file.endsWith('.mp3') || file.endsWith('.wav')) {
                try { fs.unlinkSync(path.join(OUTPUT_DIR, file)); } catch (e) { /* ignore */ }
            }
        }
    } else {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    if (!fs.existsSync(TEMP_DIR)) {
        fs.mkdirSync(TEMP_DIR, { recursive: true });
    }
}

function cleanupTemp() {
    try {
        if (fs.existsSync(TEMP_DIR)) {
            const files = fs.readdirSync(TEMP_DIR);
            for (const f of files) {
                try { fs.unlinkSync(path.join(TEMP_DIR, f)); } catch (e) { /* ignore */ }
            }
            try { fs.rmdirSync(TEMP_DIR); } catch (e) { /* ignore */ }
        }
    } catch (e) { /* ignore */ }
}

async function main() {
    console.log('');
    console.log('  ┌──────────────────────────────────────────────────┐');
    console.log('  │  SortStory — Automated Video Generation Engine  │');
    console.log('  │  Voice: Microsoft Edge Neural TTS (JennyNeural) │');
    console.log('  │  Quality: 24kHz, 96kbps MP3 → Vorbis in WebM   │');
    console.log('  └──────────────────────────────────────────────────┘');
    console.log('');

    clearOutputDir();

    // Initialize Edge Neural TTS
    console.log(`🔊 Initializing Edge Neural TTS (${TTS_VOICE})...`);
    let tts;
    try {
        tts = await createTTSInstance();
        console.log(`✅ TTS ready: ${TTS_VOICE} | Rate: 0.9 (calm) | Pitch: -2Hz (warm)`);
    } catch (err) {
        console.error('❌ Failed to initialize Edge TTS:', err.message);
        process.exit(1);
    }

    const browser = await chromium.launch({
        headless: true,
        args: ['--autoplay-policy=no-user-gesture-required']
    });

    const engine = new VoiceoverEngine();
    let successCount = 0;

    for (let si = 0; si < videoScenarios.length; si++) {
        const scenario = videoScenarios[si];
        console.log(`\n${'━'.repeat(64)}`);
        console.log(`  📹 [${si + 1}/${videoScenarios.length}] ${scenario.category} / ${scenario.name}`);
        console.log(`${'━'.repeat(64)}`);

        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 },
            deviceScaleFactor: 1,
            recordVideo: { dir: TEMP_DIR, size: { width: 1920, height: 1080 } },
            colorScheme: 'dark'
        });

        const page = await context.newPage();
        await engine.setupPage(page);
        engine.resetSegments();

        try {
            // ── Phase 1: Record video with on-screen captions ──
            console.log('   Phase 1 → Recording video with captions...');
            await page.goto(`${TARGET_URL}${scenario.path}`, { waitUntil: 'networkidle' });
            await engine.injectCaptionBanner(page);
            await engine.showPromoIntro(page, scenario.title, scenario.subtitle);
            await engine.injectCaptionBanner(page);
            await scenario.walkthrough(page, engine);
            await engine.showPromoOutro(page);

            const video = page.video();
            await page.close();

            if (!video) {
                console.error('   ❌ No video recorded');
                await context.close();
                continue;
            }

            const rawVideoPath = path.join(TEMP_DIR, `${scenario.name}_raw.webm`);
            await video.saveAs(rawVideoPath);
            await context.close();

            const totalDurationMs = Date.now() - engine.recordingStartTime;
            console.log(`   Phase 1 ✓ Video recorded (${(totalDurationMs / 1000).toFixed(1)}s, ${engine.narrationSegments.length} narration segments)`);

            // ── Phase 2: Generate TTS narration with Edge Neural voice ──
            console.log(`   Phase 2 → Generating neural TTS narration...`);
            const narrationPath = path.join(TEMP_DIR, `${scenario.name}_narration.mp3`);
            await buildNarrationTrack(tts, engine.narrationSegments, narrationPath, totalDurationMs);

            if (!fs.existsSync(narrationPath) || fs.statSync(narrationPath).size === 0) {
                console.warn('   ⚠️ No narration generated — saving video without audio');
                const finalPath = path.join(OUTPUT_DIR, `${scenario.category}_${scenario.name}.webm`);
                fs.copyFileSync(rawVideoPath, finalPath);
                continue;
            }
            console.log(`   Phase 2 ✓ Narration audio ready`);

            // ── Phase 3: Merge video + audio ──
            console.log(`   Phase 3 → Merging video + narration audio...`);
            const finalPath = path.join(OUTPUT_DIR, `${scenario.category}_${scenario.name}.webm`);
            const merged = mergeVideoAudio(rawVideoPath, narrationPath, finalPath);

            if (merged && fs.existsSync(finalPath)) {
                const sizeMB = (fs.statSync(finalPath).size / (1024 * 1024)).toFixed(2);
                console.log(`   ✅ Done: ${scenario.category}_${scenario.name}.webm (${sizeMB} MB)`);
                successCount++;
            } else {
                fs.copyFileSync(rawVideoPath, finalPath);
                console.log(`   ⚠️ Saved without audio: ${scenario.category}_${scenario.name}.webm`);
            }

            // Clean up temp files for this scenario
            try { fs.unlinkSync(rawVideoPath); } catch (e) { /* ignore */ }
            try { fs.unlinkSync(narrationPath); } catch (e) { /* ignore */ }

        } catch (error) {
            console.error(`   ❌ Failed: ${error.message}`);
            try { await context.close(); } catch (e) { /* ignore */ }
        }
    }

    await browser.close();
    cleanupTemp();

    console.log(`\n${'━'.repeat(64)}`);
    console.log(`  🎉 Complete! ${successCount}/${videoScenarios.length} videos generated with neural voice`);
    console.log(`  📂 Output: public/auto-demos/`);
    console.log(`  🔊 Voice: ${TTS_VOICE} (soft, calm female)`);
    console.log(`${'━'.repeat(64)}\n`);
}

main();