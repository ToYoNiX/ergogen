// Wire crossover for single-sided PCBs
// Used to route matrix traces that would otherwise require a second copper layer.
// Solder a bare wire through both holes on the back side to bridge the connection.
//
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    pin_distance: default is 7.62
//      distance between the two THT pads in mm
//      increase to clear wider traces/obstacles

module.exports = {
  params: {
    designator: "W",
    pin_distance: 7.62,
    from: undefined,
    to: undefined,
  },
  body: (p) => {
    const half = p.pin_distance / 2;

    const standard = `
      	(module WireCrossover (layer F.Cu) (tedit 5B24D78E)
        ${p.at /* parametric position */}
        ${"" /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
        ${"" /* crossover symbol — line on back silkscreen showing wire path */}
				(fp_line (start -${half} 0) (end ${half} 0) (layer B.SilkS) (width 0.1))
				(fp_line (start -${half} -1) (end -${half} 1) (layer B.SilkS) (width 0.1))
				(fp_line (start ${half} -1) (end ${half} 1) (layer B.SilkS) (width 0.1))
      `;
    const tht_pads = `
				${"" /* THT pads — wire connects them on the back */}
				(pad 1 thru_hole circle (at -${half} 0 ${p.r}) (size 1.6 1.6) (drill 0.8) (layers *.Cu *.Mask) ${p.from})
				(pad 2 thru_hole circle (at ${half} 0 ${p.r}) (size 1.6 1.6) (drill 0.8) (layers *.Cu *.Mask) ${p.to})
      `;
    return `
			${standard}
			${tht_pads}
			)
    `;
  },
};
