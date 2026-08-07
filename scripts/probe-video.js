const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');

const video = path.join(__dirname, '../public/auto-demos/sorting_bubble-sort-walkthrough.webm');
try {
    const out = execSync(`"${ffmpeg}" -i "${video}" -hide_banner 2>&1`, { shell: true }).toString();
    console.log(out);
} catch (e) {
    // ffmpeg -i without output always exits with error, but stderr has the info
    console.log(e.stdout ? e.stdout.toString() : e.stderr ? e.stderr.toString() : e.message);
}
