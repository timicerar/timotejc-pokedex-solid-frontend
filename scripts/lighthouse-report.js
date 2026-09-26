#!/usr/bin/env node

/**
 * Aggregates Lighthouse JSON reports into CSV tables (raw + per-label summary).
 *
 * Expected filenames: "<label>--run<N>.json", e.g.:
 *   react--run1.json
 *   react--run2.json
 *   react-slow3g--run1.json
 *   next-25--run1.json
 *
 * The "--run<N>" suffix is stripped to form the grouping label; everything
 * before it (app name, condition, etc.) is up to you.
 *
 * Usage:
 *   node scripts/lighthouse-report.js <resultsDir> [outputPrefix]
 *
 * Example:
 *   node scripts/lighthouse-report.js ./results/exp1
 *   -> writes ./results/exp1/report-raw.csv and ./results/exp1/report-summary.csv
 */

import fs from 'node:fs';
import path from 'node:path';

const METRICS = [
  { key: 'first-contentful-paint', label: 'FCP (ms)' },
  { key: 'largest-contentful-paint', label: 'LCP (ms)' },
  { key: 'cumulative-layout-shift', label: 'CLS' },
  { key: 'total-blocking-time', label: 'TBT (ms)' },
  { key: 'speed-index', label: 'SI (ms)' },
  { key: 'interactive', label: 'TTI (ms)' },
  { key: 'total-byte-weight', label: 'Transferred (bytes)' },
];

const round2 = (value) => Math.round(value * 100) / 100;

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

const mean = (values) =>
  values.reduce((sum, value) => sum + value, 0) / values.length;

const stddev = (values) => {
  const avg = mean(values);
  const variance =
    values.reduce((sum, value) => sum + (value - avg) ** 2, 0) /
    values.length;

  return Math.sqrt(variance);
};

const labelFromFilename = (filePath) => {
  const base = path.basename(filePath, '.json');
  const match = base.match(/^(.*)--run\d+$/i);

  return match ? match[1] : base;
};

const readReport = (filePath) => {
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const row = {
    file: path.basename(filePath),
    label: labelFromFilename(filePath),
    url: json.finalUrl ?? json.requestedUrl ?? '',
  };

  for (const { key } of METRICS) {
    row[key] = json.audits?.[key]?.numericValue ?? null;
  }

  const networkRequests = json.audits?.['network-requests']?.details?.items;
  row.requests = Array.isArray(networkRequests) ? networkRequests.length : null;

  return row;
};

const collectJsonFiles = (dir) =>
  fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.join(dir, file));

const toCsv = (rows, columns) => {
  const header = columns.join(',');
  const lines = rows.map((row) =>
    columns.map((column) => row[column] ?? '').join(','),
  );

  return [header, ...lines].join('\n');
};

const buildSummaryRows = (rows) => {
  const groups = new Map();

  for (const row of rows) {
    if (!groups.has(row.label)) {
      groups.set(row.label, []);
    }

    groups.get(row.label).push(row);
  }

  return [...groups.entries()].map(([label, groupRows]) => {
    const summaryRow = { label, runs: groupRows.length };

    for (const { key } of METRICS) {
      const values = groupRows
        .map((row) => row[key])
        .filter((value) => typeof value === 'number');

      if (values.length === 0) {
        continue;
      }

      summaryRow[`${key}_median`] = round2(median(values));
      summaryRow[`${key}_mean`] = round2(mean(values));
      summaryRow[`${key}_stddev`] = round2(stddev(values));
    }

    const requestValues = groupRows
      .map((row) => row.requests)
      .filter((value) => typeof value === 'number');

    if (requestValues.length > 0) {
      summaryRow.requests_median = median(requestValues);
    }

    return summaryRow;
  });
};

const printConsoleSummary = (summaryRows) => {
  console.log(
    `\nProcessed ${summaryRows.reduce((sum, row) => sum + row.runs, 0)} report(s) across ${summaryRows.length} label(s):`,
  );

  for (const summaryRow of summaryRows) {
    console.log(`\n${summaryRow.label} (n=${summaryRow.runs})`);

    for (const { key, label } of METRICS) {
      const value = summaryRow[`${key}_median`];

      if (value === undefined) {
        continue;
      }

      console.log(`  ${label.padEnd(22)} median=${value}`);
    }
  }
};

const main = () => {
  const [, , resultsDir, outputPrefixArg] = process.argv;

  if (!resultsDir) {
    console.error(
      'Usage: node scripts/lighthouse-report.js <resultsDir> [outputPrefix]',
    );
    process.exitCode = 1;
    return;
  }

  const files = collectJsonFiles(resultsDir);

  if (files.length === 0) {
    console.error(`No .json files found in ${resultsDir}`);
    process.exitCode = 1;
    return;
  }

  const outputPrefix = outputPrefixArg ?? path.join(resultsDir, 'report');
  const rows = files.map(readReport);
  const summaryRows = buildSummaryRows(rows);

  const rawColumns = [
    'file',
    'label',
    'url',
    ...METRICS.map(({ key }) => key),
    'requests',
  ];
  fs.writeFileSync(`${outputPrefix}-raw.csv`, toCsv(rows, rawColumns), 'utf8');

  const summaryColumns = [
    'label',
    'runs',
    ...METRICS.flatMap(({ key }) => [
      `${key}_median`,
      `${key}_mean`,
      `${key}_stddev`,
    ]),
    'requests_median',
  ];
  fs.writeFileSync(
    `${outputPrefix}-summary.csv`,
    toCsv(summaryRows, summaryColumns),
    'utf8',
  );

  printConsoleSummary(summaryRows);
  console.log(
    `\nWritten:\n  ${outputPrefix}-raw.csv\n  ${outputPrefix}-summary.csv\n`,
  );
};

main();
