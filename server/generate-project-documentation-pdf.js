import PDFDocument from 'pdfkit';
import { execFileSync } from 'node:child_process';
import { mkdirSync, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(root, 'docs/IT_HUNT_Changes_August-October_2026.pdf');
const startDate = '2026-08-30';
const endDate = '2026-10-30';
const rawLog = execFileSync('git', [
  '-C', root, 'log',
  `--since=${startDate} 00:00:00`,
  `--until=${endDate} 23:59:59`,
  '--date=short',
  '--format=%h%x09%ad%x09%s',
  '--name-only'
], { encoding: 'utf8' });

const commits = [];
let current;
for (const line of rawLog.split(/\r?\n/)) {
  if (!line.trim()) continue;
  const match = line.match(/^([0-9a-f]{7,})\t(\d{4}-\d{2}-\d{2})\t(.*)$/);
  if (match) {
    current = { hash: match[1], date: match[2], subject: match[3], files: [] };
    commits.push(current);
  } else if (current) {
    current.files.push(line.trim());
  }
}

if (commits.length === 0) {
  throw new Error(`No Git commits found between ${startDate} and ${endDate}.`);
}

const classify = ({ subject, files }) => {
  const text = `${subject} ${files.join(' ')}`.toLowerCase();
  if (/auth|password|login|security|token|permission|jwt|super.?admin/.test(text)) return 'Authentication and administration';
  if (/admission|student|enroll|fee|exam|certificate|nielit|internship|career|course|event|review|project/.test(text)) return 'Education and portal workflows';
  if (/ui|ux|responsive|layout|style|design|theme|dashboard|row|table|\.vue|\.css/.test(text)) return 'User experience and accessibility';
  if (/email|mailer|notification|smtp|resend/.test(text)) return 'Email and notifications';
  return 'Platform, reliability and maintenance';
};

const categories = [
  'User experience and accessibility',
  'Education and portal workflows',
  'Authentication and administration',
  'Email and notifications',
  'Platform, reliability and maintenance'
];
const categoryCounts = Object.fromEntries(categories.map(category => [category, 0]));
const dailyCounts = new Map();
for (const commit of commits) {
  commit.category = classify(commit);
  categoryCounts[commit.category]++;
  dailyCounts.set(commit.date, (dailyCounts.get(commit.date) || 0) + 1);
}

const colors = {
  ink: '#12243A',
  navy: '#10263F',
  blue: '#1677A8',
  teal: '#19A5A0',
  orange: '#EF8A32',
  muted: '#64748B',
  light: '#F2F6F9',
  border: '#D9E2EA',
  white: '#FFFFFF'
};
const page = { width: 595.28, height: 841.89, margin: 48, top: 62, bottom: 56 };
mkdirSync(dirname(outputPath), { recursive: true });

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: page.top, bottom: page.bottom, left: page.margin, right: page.margin },
  bufferPages: true,
  info: {
    Title: 'IT HUNT | Project Change History',
    Author: 'IT HUNT',
    Subject: `Repository changes from ${startDate} through ${endDate}`,
    Keywords: 'IT HUNT, project documentation, release history, Git'
  }
});
const stream = createWriteStream(outputPath);
doc.pipe(stream);

function drawRunningHeader() {
  doc.save();
  doc.rect(0, 0, page.width, 34).fill(colors.navy);
  doc.rect(0, 34, page.width, 2).fill(colors.teal);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.white)
    .text('IT HUNT  /  PROJECT CHANGE HISTORY', page.margin, 12);
  doc.font('Helvetica').fontSize(8).fillColor('#DCE7F0')
    .text('30 AUGUST - 30 OCTOBER 2026', page.width - page.margin - 175, 13, { width: 175, align: 'right' });
  doc.restore();
  doc.x = page.margin;
  doc.y = page.top;
}

doc.on('pageAdded', drawRunningHeader);

function keepSpace(height) {
  if (doc.y + height > page.height - page.bottom) doc.addPage();
}

function heading(text, level = 1) {
  const size = level === 1 ? 18 : 12;
  keepSpace(size + 20);
  doc.moveDown(level === 1 ? 0.6 : 0.35);
  doc.font('Helvetica-Bold').fontSize(size)
    .fillColor(level === 1 ? colors.navy : colors.blue)
    .text(text, page.margin, doc.y, { width: page.width - page.margin * 2 });
  doc.moveDown(0.35);
}

function paragraph(text, options = {}) {
  doc.font(options.bold ? 'Helvetica-Bold' : 'Helvetica')
    .fontSize(options.size || 9.5)
    .fillColor(options.color || colors.ink)
    .text(text, page.margin, doc.y, {
      width: page.width - page.margin * 2,
      lineGap: 3,
      align: options.align || 'left'
    });
  doc.moveDown(options.after === undefined ? 0.45 : options.after);
}

function drawFooter(pageNumber, totalPages) {
  const previousBottomMargin = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;
  doc.save();
  doc.rect(0, page.height - 32, page.width, 32).fill(colors.navy);
  doc.font('Helvetica').fontSize(7.5).fillColor('#DCE7F0')
    .text('IT HUNT Software Solutions & Tech Academy  |  Repository history snapshot', page.margin, page.height - 20);
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor(colors.white)
    .text(`${pageNumber} / ${totalPages}`, page.width - page.margin - 40, page.height - 20, { width: 40, align: 'right' });
  doc.restore();
  doc.page.margins.bottom = previousBottomMargin;
}

function categoryLabel(label) {
  keepSpace(36);
  const y = doc.y;
  doc.roundedRect(page.margin, y, page.width - page.margin * 2, 24, 4)
    .fill(colors.light);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.navy)
    .text(label, page.margin + 10, y + 7);
  doc.y = y + 32;
}

// Cover
doc.rect(0, 0, page.width, page.height).fill(colors.navy);
doc.rect(0, 0, 12, page.height).fill(colors.teal);
doc.roundedRect(page.margin, 92, 82, 6, 3).fill(colors.orange);
doc.font('Helvetica-Bold').fontSize(11).fillColor('#A8D9E4')
  .text('IT HUNT  /  ENGINEERING & PRODUCT', page.margin, 122);
doc.font('Helvetica-Bold').fontSize(32).fillColor(colors.white)
  .text('Two-Month Project\\nChange History', page.margin, 175, {
    width: page.width - page.margin * 2,
    lineGap: 8
  });
doc.font('Helvetica').fontSize(14).fillColor('#DCE7F0')
  .text('A verified record of repository changes and delivery themes', page.margin, 284, {
    width: page.width - page.margin * 2
  });
doc.roundedRect(page.margin, 368, page.width - page.margin * 2, 104, 8).fill('#1B3855');
doc.font('Helvetica-Bold').fontSize(10).fillColor('#A8D9E4')
  .text('REPORTING WINDOW', page.margin + 20, 389);
doc.font('Helvetica-Bold').fontSize(19).fillColor(colors.white)
  .text('30 August - 30 October 2026', page.margin + 20, 410);
doc.font('Helvetica').fontSize(9).fillColor('#DCE7F0')
  .text(`${commits.length} commits reachable from the current repository HEAD`, page.margin + 20, 442);
doc.font('Helvetica').fontSize(9).fillColor('#DCE7F0')
  .text('Prepared 30 October 2026  |  Source: Git repository history', page.margin, page.height - 70);

// Executive summary
doc.addPage();
heading('Executive summary');
paragraph(
  `This report covers ${commits.length} commits dated ${startDate} through ${endDate}, inclusive. The ledger records each commit hash, date and subject, grouped by the best-fit workstream derived from commit text and changed file paths.`,
  { size: 10 }
);
paragraph(
  'It is intended as a management-friendly overview and an auditable index. A commit title is a concise history label, not a complete specification of behavior; inspect the corresponding commit diff when implementation detail is required.',
  { color: colors.muted }
);

heading('Change themes');
for (const category of categories) {
  const count = categoryCounts[category];
  const width = page.width - page.margin * 2;
  const y = doc.y;
  keepSpace(34);
  doc.roundedRect(page.margin, y, width, 25, 4).fill(colors.light);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.ink)
    .text(category, page.margin + 10, y + 8, { width: width - 95 });
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.blue)
    .text(String(count), page.width - page.margin - 65, y + 7, { width: 45, align: 'right' });
  doc.y = y + 32;
}

const busiest = [...dailyCounts.entries()].sort((a, b) => b[1] - a[1] || b[0].localeCompare(a[0])).slice(0, 5);
heading('Repository activity', 2);
paragraph(`Commits were recorded on ${dailyCounts.size} distinct calendar dates. The busiest dates by commit count were: ${busiest.map(([date, count]) => `${date} (${count})`).join('; ')}.`, { size: 9 });
heading('How to read this report', 2);
paragraph('The categorized summary is heuristic and based on commit subjects plus changed paths. The complete ledger that follows retains the repository\'s original short hashes and commit subjects. Times are not displayed because the source report uses calendar dates as recorded in Git.', { color: colors.muted });

// Complete ledger
doc.addPage();
heading('Complete commit ledger');
paragraph(`All ${commits.length} commits in the reporting window, in reverse chronological order.`, { color: colors.muted });

let activeCategory = '';
for (const commit of commits) {
  if (activeCategory !== commit.category) {
    activeCategory = commit.category;
    categoryLabel(activeCategory);
  }
  const line = `${commit.date}   ${commit.hash}   ${commit.subject}`;
  const textHeight = doc.heightOfString(line, {
    width: page.width - page.margin * 2 - 18,
    font: 'Helvetica',
    fontSize: 8,
    lineGap: 2
  });
  keepSpace(textHeight + 9);
  const y = doc.y;
  doc.font('Helvetica').fontSize(8).fillColor(colors.ink)
    .text(line, page.margin + 8, y, { width: page.width - page.margin * 2 - 16, lineGap: 2 });
  doc.moveDown(0.32);
  if (Math.floor(doc.y) > Math.floor(y)) {
    doc.save();
    doc.moveTo(page.margin + 8, doc.y - 2)
      .lineTo(page.width - page.margin, doc.y - 2)
      .lineWidth(0.35)
      .strokeColor(colors.border)
      .stroke();
    doc.restore();
  }
}

// Methodology and record scope
doc.addPage();
heading('Scope and methodology');
paragraph(`Reporting window: ${startDate} 00:00:00 through ${endDate} 23:59:59, inclusive, using Git's commit date filters.`, { size: 10 });
paragraph('Source: commits reachable from the current local HEAD at report-generation time. The report excludes uncommitted changes, unmerged branches, external issue discussions, and work that did not result in a commit in this repository.');
paragraph('The workstream classification is generated from each commit subject and the paths changed in that commit. A commit may touch multiple concerns; each entry is assigned one primary category for readability. Category labels are not formal release or quality assessments.');
paragraph('To regenerate this report from the repository root, run `npm run docs:pdf`. The PDF is written to `docs/IT_HUNT_Changes_August-October_2026.pdf`.', { color: colors.muted });

const range = doc.bufferedPageRange();
for (let index = range.start; index < range.start + range.count; index++) {
  doc.switchToPage(index);
  if (index > range.start) drawFooter(index - range.start + 1, range.count);
}
doc.end();

await new Promise((resolvePromise, rejectPromise) => {
  stream.once('finish', resolvePromise);
  stream.once('error', rejectPromise);
});
console.log(`Generated ${outputPath} (${commits.length} commits, ${range.count} pages).`);
