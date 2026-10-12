import sharp from 'sharp';

const img = process.argv[2];

sharp(img)
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then((res) => {
    const { data, info } = res;
    const n = data.length / 3;
    let sr = 0;
    let sg = 0;
    let sb = 0;
    const rVals = [];
    const gVals = [];
    const bVals = [];
    const step = Math.max(1, Math.floor(data.length / 40000));
    for (let i = 0; i < data.length; i += step * 3) {
      sr += data[i];
      sg += data[i + 1];
      sb += data[i + 2];
      rVals.push(data[i]);
      gVals.push(data[i + 1]);
      bVals.push(data[i + 2]);
    }
    const r = Math.round(sr / n);
    const g = Math.round(sg / n);
    const b = Math.round(sb / n);

    rVals.sort((a, b) => a - b);
    gVals.sort((a, b) => a - b);
    bVals.sort((a, b) => a - b);
    const q95 = (v) => v[Math.floor(v.length * 0.95)];
    const peakR = q95(rVals);
    const peakG = q95(gVals);
    const peakB = q95(bVals);

    function rgbToHex(rr, gg, bb) {
      return '#' + [rr, gg, bb].map((x) => x.toString(16).padStart(2, '0')).join('');
    }

    function lum(rr, gg, bb) {
      const [rs, gs, bs] = [rr / 255, gg / 255, bb / 255].map((c) =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      );
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function ratio(l1, l2) {
      const a = Math.max(l1, l2);
      const b = Math.min(l1, l2);
      return (a + 0.05) / (b + 0.05);
    }

    console.log('size=' + info.width + 'x' + info.height);
    console.log('mean_rgb=' + r + ',' + g + ',' + b);
    console.log('mean_hex=' + rgbToHex(r, g, b));
    console.log('p95_rgb=' + peakR + ',' + peakG + ',' + peakB);
    console.log('p95_hex=' + rgbToHex(peakR, peakG, peakB));

    // composited over 42% dark green overlay (13,20,17)
    const ov = [13, 20, 17];
    const compose = (c, g, b) => ({
      r: Math.round(c * (1 - 0.42) + ov[0] * 0.42),
      g: Math.round(g * (1 - 0.42) + ov[1] * 0.42),
      b: Math.round(b * (1 - 0.42) + ov[2] * 0.42),
    });
    const bg = compose(r, g, b);
    const peak = compose(peakR, peakG, peakB);

    console.log('bg_mean_composited=' + bg.r + ',' + bg.g + ',' + bg.b);
    console.log('bg_p95_composited=' + peak.r + ',' + peak.g + ',' + peak.b);

    const cream = [245, 243, 233];
    const body70 = [173, 172, 165];
    const dark = [13, 20, 17];

    console.log('ratio_heading_cream_over_bg_mean=' + ratio(lum(bg.r, bg.g, bg.b), lum(cream[0], cream[1], cream[2])));
    console.log('ratio_body70_cream_over_bg_mean=' + ratio(lum(bg.r, bg.g, bg.b), lum(body70[0], body70[1], body70[2])));
    console.log('ratio_heading_cream_over_bg_p95=' + ratio(lum(peak.r, peak.g, peak.b), lum(cream[0], cream[1], cream[2])));
    console.log('ratio_link_cream_over_bg_mean=' + ratio(lum(bg.r, bg.g, bg.b), lum(cream[0], cream[1], cream[2])));
    console.log('ratio_ink_over_bg_mean=' + ratio(lum(bg.r, bg.g, bg.b), lum(dark[0], dark[1], dark[2])));
  })
  .catch((e) => {
    console.error('ERR', e.message);
    process.exit(1);
  });
